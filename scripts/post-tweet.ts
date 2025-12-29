#!/usr/bin/env tsx

/**
 * Manual Tweet Posting Script
 * 
 * Run this script to post a tweet manually:
 * 
 * npm run tweet
 * npm run tweet -- --type tool-spotlight
 * npm run tweet -- --type tip
 * npm run tweet -- --text "Your custom tweet here"
 * 
 * Or directly:
 * tsx scripts/post-tweet.ts
 * tsx scripts/post-tweet.ts --type tool-spotlight
 */

import { TwitterClient } from "../lib/twitter";
import { TweetContentGenerator } from "../lib/tweet-content";

async function main() {
  // Parse command line arguments
  const args = process.argv.slice(2);
  const typeIndex = args.indexOf("--type");
  const textIndex = args.indexOf("--text");
  const previewIndex = args.indexOf("--preview");

  const isPreview = previewIndex !== -1;
  const type = typeIndex !== -1 ? args[typeIndex + 1] : "random";
  const customText = textIndex !== -1 ? args[textIndex + 1] : null;

  try {
    const generator = new TweetContentGenerator();
    let tweetText: string;
    let tweetType: string;

    if (customText) {
      tweetText = customText;
      tweetType = "custom";
    } else {
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

    // Validate tweet
    const validation = generator.validateTweet(tweetText);
    if (!validation.valid) {
      console.error("❌ Invalid tweet:", validation.error);
      console.log("\nTweet text:");
      console.log(tweetText);
      process.exit(1);
    }

    // Preview mode
    if (isPreview) {
      console.log("📝 Tweet Preview:");
      console.log("─".repeat(50));
      console.log(tweetText);
      console.log("─".repeat(50));
      console.log(`Type: ${tweetType}`);
      console.log(`Length: ${tweetText.length}/280 characters`);
      console.log(`Valid: ${validation.valid ? "✅" : "❌"}`);
      return;
    }

    // Check if Twitter is configured
    if (!process.env.TWITTER_BEARER_TOKEN) {
      console.error("❌ Twitter not configured!");
      console.error("Set TWITTER_BEARER_TOKEN in your .env file");
      process.exit(1);
    }

    // Post tweet
    console.log("🐦 Posting tweet...");
    console.log("─".repeat(50));
    console.log(tweetText);
    console.log("─".repeat(50));

    const twitter = new TwitterClient();
    const result = await twitter.postTweet(tweetText);

    console.log("\n✅ Tweet posted successfully!");
    console.log(`Tweet ID: ${result.id}`);
    console.log(`Type: ${tweetType}`);
    console.log(`Length: ${tweetText.length}/280 characters`);
    console.log(`URL: https://twitter.com/i/web/status/${result.id}`);
  } catch (error: any) {
    console.error("❌ Error posting tweet:", error.message);
    process.exit(1);
  }
}

main();

