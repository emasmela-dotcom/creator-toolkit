/**
 * Twitter/X API Client
 * Handles posting tweets to Twitter/X
 */

interface TweetOptions {
  text: string;
}

export class TwitterClient {
  private apiKey: string;
  private apiSecret: string;
  private accessToken: string;
  private accessTokenSecret: string;
  private bearerToken: string;
  private baseUrl = "https://api.twitter.com/2";

  constructor() {
    // For OAuth 1.0a (user context)
    this.apiKey = process.env.TWITTER_API_KEY || "";
    this.apiSecret = process.env.TWITTER_API_SECRET || "";
    this.accessToken = process.env.TWITTER_ACCESS_TOKEN || "";
    this.accessTokenSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET || "";

    // For OAuth 2.0 (app context) - simpler, but limited
    this.bearerToken = process.env.TWITTER_BEARER_TOKEN || "";

    if (!this.bearerToken && (!this.apiKey || !this.accessToken)) {
      throw new Error(
        "Twitter credentials not configured. Set TWITTER_BEARER_TOKEN or OAuth 1.0a credentials."
      );
    }
  }

  /**
   * Post a tweet using OAuth 2.0 (simpler, recommended)
   */
  async postTweet(text: string): Promise<{ id: string; text: string }> {
    if (!this.bearerToken) {
      throw new Error("TWITTER_BEARER_TOKEN is required");
    }

    // Twitter/X has a 280 character limit
    if (text.length > 280) {
      throw new Error(`Tweet is too long: ${text.length} characters (max 280)`);
    }

    try {
      const response = await fetch(`${this.baseUrl}/tweets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.bearerToken}`,
        },
        body: JSON.stringify({
          text,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          `Twitter API error: ${JSON.stringify(error)}`
        );
      }

      const data = await response.json();
      return {
        id: data.data.id,
        text: data.data.text,
      };
    } catch (error) {
      console.error("Error posting tweet:", error);
      throw error;
    }
  }

  /**
   * Post a tweet using OAuth 1.0a (more complex, but more features)
   * Use this if you need user context features
   */
  async postTweetOAuth1(text: string): Promise<{ id: string; text: string }> {
    // This requires crypto for OAuth 1.0a signing
    // For simplicity, we'll use OAuth 2.0 (bearer token) instead
    // If you need OAuth 1.0a, you can use a library like 'oauth-1.0a'
    throw new Error("OAuth 1.0a not implemented. Use postTweet() with bearer token instead.");
  }

  /**
   * Validate tweet text
   */
  validateTweet(text: string): { valid: boolean; error?: string } {
    if (!text || text.trim().length === 0) {
      return { valid: false, error: "Tweet text is empty" };
    }

    if (text.length > 280) {
      return {
        valid: false,
        error: `Tweet is too long: ${text.length} characters (max 280)`,
      };
    }

    return { valid: true };
  }
}

