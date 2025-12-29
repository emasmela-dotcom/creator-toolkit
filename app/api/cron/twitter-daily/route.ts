import { NextResponse } from "next/server";
import { TwitterClient } from "@/lib/twitter";
import { TweetContentGenerator } from "@/lib/tweet-content";

/**
 * Vercel Cron Job: Daily Twitter Post
 * 
 * This endpoint is called by Vercel Cron Jobs once per day
 * 
 * To set up in Vercel:
 * 1. Go to your project settings
 * 2. Navigate to "Cron Jobs"
 * 3. Add a new cron job:
 *    - Path: /api/cron/twitter-daily
 *    - Schedule: 0 9 * * * (9 AM UTC daily, adjust as needed)
 * 
 * Or use vercel.json to configure:
 * {
 *   "crons": [{
 *     "path": "/api/cron/twitter-daily",
 *     "schedule": "0 9 * * *"
 *   }]
 * }
 */
export async function GET(request: Request) {
  try {
    // Verify this is a Vercel Cron request (optional but recommended)
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;
    
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check if Twitter is configured
    if (!process.env.TWITTER_BEARER_TOKEN) {
      return NextResponse.json(
        { 
          error: "Twitter not configured",
          message: "TWITTER_BEARER_TOKEN is not set"
        },
        { status: 500 }
      );
    }

    // Generate random tweet
    const generator = new TweetContentGenerator();
    const tweet = await generator.generateRandomTweet();

    // Validate tweet
    const validation = generator.validateTweet(tweet.text);
    if (!validation.valid) {
      return NextResponse.json(
        { 
          error: "Invalid tweet",
          message: validation.error,
          tweet: tweet.text
        },
        { status: 400 }
      );
    }

    // Post to Twitter
    const twitter = new TwitterClient();
    const result = await twitter.postTweet(tweet.text);

    return NextResponse.json({
      success: true,
      message: "Tweet posted successfully",
      tweet: {
        id: result.id,
        text: result.text,
        type: tweet.type,
        length: tweet.text.length,
      },
      postedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Error in daily Twitter cron job:", error);
    
    return NextResponse.json(
      {
        error: "Failed to post tweet",
        message: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}

