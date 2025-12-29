/**
 * Tweet Content Generator
 * Generates different types of tweets for daily posting
 */

import { prisma } from "./prisma";

export interface TweetContent {
  text: string;
  type: "tool-spotlight" | "tip" | "announcement" | "community" | "stats";
}

export class TweetContentGenerator {
  /**
   * Get a random tool from the database and create a spotlight tweet
   */
  async generateToolSpotlight(): Promise<TweetContent> {
    try {
      const tools = await prisma.tool.findMany({
        where: { isPublished: true },
        take: 50,
        orderBy: { createdAt: "desc" },
      });

      if (tools.length === 0) {
        return this.getFallbackTweet();
      }

      // Pick a random tool
      const tool = tools[Math.floor(Math.random() * tools.length)];

      const tweetText = `🛠️ Tool Spotlight: ${tool.name}

${tool.shortDescription}

💰 $${tool.price}/${tool.priceType === "one-time" ? "once" : tool.priceType}
📂 ${tool.category}

Check it out: micro-saasmarketplace.com/tools/${tool.slug}

#MicroSaaS #CreatorTools`;

      return {
        text: tweetText,
        type: "tool-spotlight",
      };
    } catch (error) {
      console.error("Error generating tool spotlight:", error);
      return this.getFallbackTweet();
    }
  }

  /**
   * Generate a tip tweet
   */
  async generateTip(): Promise<TweetContent> {
    const tips = [
      `💡 Tip: The best micro-SaaS tools do ONE thing exceptionally well.

Focus beats features. Simplicity beats complexity.

What's your favorite simple tool? 👇

#MicroSaaS #CreatorTools`,

      `💡 Tip: Before building a new tool, check if it already exists.

The Micro-SaaS Marketplace has curated tools for creators:
micro-saasmarketplace.com

Save time. Build on what works.

#MicroSaaS`,

      `💡 Tip: Micro-SaaS tools are perfect for creators because they:

✅ Solve specific problems
✅ Have low learning curves
✅ Don't require tech skills
✅ Are affordable

Find tools that work for you:
micro-saasmarketplace.com

#CreatorTools`,

      `💡 Tip: When choosing a tool, ask yourself:

"Does this solve my exact problem?"

Not "Does this have the most features?"

Simple, focused tools > Bloated platforms

#MicroSaaS #CreatorTools`,

      `💡 Tip: The best creator tools are built by creators.

They understand the pain points because they've lived them.

That's why we built a marketplace specifically for creator tools.

#MicroSaaS #CreatorTools`,
    ];

    const tip = tips[Math.floor(Math.random() * tips.length)];

    return {
      text: tip,
      type: "tip",
    };
  }

  /**
   * Generate an announcement tweet
   */
  async generateAnnouncement(): Promise<TweetContent> {
    const announcements = [
      `🚀 New tools added to the Micro-SaaS Marketplace!

We're constantly adding creator-focused tools.

Browse the latest: micro-saasmarketplace.com/marketplace

Have a tool to share? List it for free: micro-saasmarketplace.com/sell

#MicroSaaS #CreatorTools`,

      `🎉 Building a micro-SaaS tool?

List it on the Micro-SaaS Marketplace and get discovered by creators.

✅ 15% fee (vs 30% elsewhere)
✅ Creator-focused audience
✅ Simple listing process

Get started: micro-saasmarketplace.com/sell

#MicroSaaS`,

      `📊 New stats: The Micro-SaaS Marketplace is growing!

More tools. More creators. More opportunities.

Join the movement: micro-saasmarketplace.com

#MicroSaaS #CreatorTools`,
    ];

    const announcement =
      announcements[Math.floor(Math.random() * announcements.length)];

    return {
      text: announcement,
      type: "announcement",
    };
  }

  /**
   * Generate a community/engagement tweet
   */
  async generateCommunity(): Promise<TweetContent> {
    const communityTweets = [
      `👋 Calling all creators!

What's the ONE tool you can't live without?

Share it below 👇

(And check out our marketplace for more: micro-saasmarketplace.com)

#CreatorTools #MicroSaaS`,

      `💬 Quick question for creators:

What problem do you wish someone would solve with a simple tool?

Let us know 👇

#MicroSaaS #CreatorTools`,

      `🎯 What makes a great micro-SaaS tool?

Share your thoughts 👇

We're building a marketplace for tools that creators actually need.

#MicroSaaS #CreatorTools`,
    ];

    const tweet =
      communityTweets[Math.floor(Math.random() * communityTweets.length)];

    return {
      text: tweet,
      type: "community",
    };
  }

  /**
   * Generate a stats tweet
   */
  async generateStats(): Promise<TweetContent> {
    try {
      const toolCount = await prisma.tool.count({
        where: { isPublished: true },
      });

      const statsTweets = [
        `📊 Marketplace Stats:

${toolCount}+ tools available
6 categories
Creator-focused curation

Browse tools: micro-saasmarketplace.com

#MicroSaaS #CreatorTools`,

        `📈 Growing fast!

${toolCount} tools and counting on the Micro-SaaS Marketplace.

Find your next tool: micro-saasmarketplace.com

#MicroSaaS`,
      ];

      const tweet =
        statsTweets[Math.floor(Math.random() * statsTweets.length)];

      return {
        text: tweet,
        type: "stats",
      };
    } catch (error) {
      console.error("Error generating stats tweet:", error);
      return this.getFallbackTweet();
    }
  }

  /**
   * Get a random tweet type
   */
  async generateRandomTweet(): Promise<TweetContent> {
    const types = [
      "tool-spotlight",
      "tip",
      "announcement",
      "community",
      "stats",
    ] as const;

    const type = types[Math.floor(Math.random() * types.length)];

    switch (type) {
      case "tool-spotlight":
        return this.generateToolSpotlight();
      case "tip":
        return this.generateTip();
      case "announcement":
        return this.generateAnnouncement();
      case "community":
        return this.generateCommunity();
      case "stats":
        return this.generateStats();
      default:
        return this.getFallbackTweet();
    }
  }

  /**
   * Get a fallback tweet if content generation fails
   */
  private getFallbackTweet(): TweetContent {
    return {
      text: `🛠️ Micro-SaaS Marketplace

A curated marketplace for simple, focused creator tools.

Browse tools: micro-saasmarketplace.com
Sell your tool: micro-saasmarketplace.com/sell

#MicroSaaS #CreatorTools`,
      type: "announcement",
    };
  }

  /**
   * Validate tweet length (Twitter limit is 280 characters)
   */
  validateTweet(text: string): { valid: boolean; length: number; error?: string } {
    const length = text.length;
    
    if (length > 280) {
      return {
        valid: false,
        length,
        error: `Tweet is too long: ${length} characters (max 280)`,
      };
    }

    return { valid: true, length };
  }
}

