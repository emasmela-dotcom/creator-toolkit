import { NextResponse } from "next/server";
import { TwitterClient } from "@/lib/twitter";
import { TweetContentGenerator } from "@/lib/tweet-content";

/**
 * POST /api/twitter/post
 * 
 * Posts a tweet to Twitter/X
 * 
 * Query params:
 * - type: 'tool-spotlight' | 'tip' | 'announcement' | 'community' | 'stats' | 'random'
 * - text: Custom tweet text (optional, overrides type)
 * 
 * Headers:
 * - Authorization: Bearer token (for security, optional)
 */
export async function POST(request: Request) {
  try {
    // Optional: Add API key protection
    const authHeader = request.headers.get("authorization");
    const apiKey = process.env.TWITTER_API_KEY_PROTECTION;
    
    if (apiKey && authHeader !== `Bearer ${apiKey}`) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get query params or body
    const url = new URL(request.url);
    const type = url.searchParams.get("type") || "random";
    const customText = url.searchParams.get("text");

    let tweetText: string;
    let tweetType: string;

    if (customText) {
      // Use custom text if provided
      tweetText = customText;
      tweetType = "custom";
    } else {
      // Generate content based on type
      const generator = new TweetContentGenerator();
      
      switch (type) {
        case "tool-spotlight":
          const spotlight = await generator.generateToolSpotlight();
          tweetText = spotlight.text;
          tweetType = spotlight.type;
          break;
        case "tip":
          const tip = await generator.generateTip();
          tweetText = tip.text;
          tweetType = tip.type;
          break;
        case "announcement":
          const announcement = await generator.generateAnnouncement();
          tweetText = announcement.text;
          tweetType = announcement.type;
          break;
        case "community":
          const community = await generator.generateCommunity();
          tweetText = community.text;
          tweetType = community.type;
          break;
        case "stats":
          const stats = await generator.generateStats();
          tweetText = stats.text;
          tweetType = stats.type;
          break;
        case "random":
        default:
          const random = await generator.generateRandomTweet();
          tweetText = random.text;
          tweetType = random.type;
          break;
      }
    }

    // Validate tweet length
    const generator = new TweetContentGenerator();
    const validation = generator.validateTweet(tweetText);
    
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error, length: validation.length },
        { status: 400 }
      );
    }

    // Post to Twitter
    const twitter = new TwitterClient();
    const result = await twitter.postTweet(tweetText);

    return NextResponse.json({
      success: true,
      tweet: {
        id: result.id,
        text: result.text,
        type: tweetType,
        length: tweetText.length,
      },
      postedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Error posting tweet:", error);
    
    return NextResponse.json(
      {
        error: "Failed to post tweet",
        message: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/twitter/post
 * 
 * Preview a tweet without posting
 */
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const type = url.searchParams.get("type") || "random";
    const customText = url.searchParams.get("text");

    let tweetText: string;
    let tweetType: string;

    if (customText) {
      tweetText = customText;
      tweetType = "custom";
    } else {
      const generator = new TweetContentGenerator();
      
      switch (type) {
        case "tool-spotlight":
          const spotlight = await generator.generateToolSpotlight();
          tweetText = spotlight.text;
          tweetType = spotlight.type;
          break;
        case "tip":
          const tip = await generator.generateTip();
          tweetText = tip.text;
          tweetType = tip.type;
          break;
        case "announcement":
          const announcement = await generator.generateAnnouncement();
          tweetText = announcement.text;
          tweetType = announcement.type;
          break;
        case "community":
          const community = await generator.generateCommunity();
          tweetText = community.text;
          tweetType = community.type;
          break;
        case "stats":
          const stats = await generator.generateStats();
          tweetText = stats.text;
          tweetType = stats.type;
          break;
        case "random":
        default:
          const random = await generator.generateRandomTweet();
          tweetText = random.text;
          tweetType = random.type;
          break;
      }
    }

    const generator = new TweetContentGenerator();
    const validation = generator.validateTweet(tweetText);

    return NextResponse.json({
      preview: true,
      tweet: {
        text: tweetText,
        type: tweetType,
        length: tweetText.length,
        valid: validation.valid,
        error: validation.error,
      },
    });
  } catch (error: any) {
    console.error("Error generating preview:", error);
    
    return NextResponse.json(
      {
        error: "Failed to generate preview",
        message: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}

