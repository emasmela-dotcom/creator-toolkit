# Twitter/X Bot Setup Guide

Complete guide to set up and use the automated Twitter/X posting bot for your Micro-SaaS Marketplace.

## Features

✅ **Daily Automated Posts** - Posts once per day automatically  
✅ **Multiple Content Types** - Tool spotlights, tips, announcements, community posts, stats  
✅ **Database Integration** - Features real tools from your marketplace  
✅ **Manual Posting** - Post tweets on-demand via script or API  
✅ **Preview Mode** - Preview tweets before posting  
✅ **Vercel Cron Integration** - Automatic daily posting on Vercel  

## Quick Start

### 1. Get Twitter API Credentials

1. **Go to [Twitter Developer Portal](https://developer.twitter.com/)**
2. **Sign up/Login** with your Twitter account
3. **Create a new App:**
   - Click "Create App" or "Create Project"
   - Fill in app details
   - Note your app name (you'll need it)

4. **Get Bearer Token:**
   - Go to "Keys and Tokens" tab
   - Under "Bearer Token", click "Generate"
   - **Copy the token** (you won't see it again!)

### 2. Add Environment Variables

Add to your `.env` file:

```env
# Twitter API Credentials
TWITTER_BEARER_TOKEN=your-bearer-token-here

# Optional: For API route protection
TWITTER_API_KEY_PROTECTION=your-secret-key-here

# Optional: For Vercel Cron protection
CRON_SECRET=your-cron-secret-here
```

**For Production (Vercel):**
- Add these to your Vercel project's Environment Variables
- Settings → Environment Variables → Add

### 3. Test the Bot

**Preview a tweet (doesn't post):**
```bash
npm run tweet:preview
```

**Post a random tweet:**
```bash
npm run tweet
```

**Post a specific type:**
```bash
npm run tweet -- --type tool-spotlight
npm run tweet -- --type tip
npm run tweet -- --type announcement
npm run tweet -- --type community
npm run tweet -- --type stats
```

**Post custom text:**
```bash
npm run tweet -- --text "Your custom tweet here"
```

## Content Types

The bot can generate 5 types of tweets:

### 1. Tool Spotlight
Features a random tool from your marketplace:
- Tool name and description
- Price and category
- Link to tool page

**Generate:**
```bash
npm run tweet -- --type tool-spotlight
```

### 2. Tips
Creator tips and advice:
- Micro-SaaS best practices
- Tool selection advice
- Creator insights

**Generate:**
```bash
npm run tweet -- --type tip
```

### 3. Announcements
Platform updates and news:
- New tools added
- Feature announcements
- Growth updates

**Generate:**
```bash
npm run tweet -- --type announcement
```

### 4. Community Engagement
Questions and engagement:
- Asks creators questions
- Encourages interaction
- Builds community

**Generate:**
```bash
npm run tweet -- --type community
```

### 5. Stats
Marketplace statistics:
- Tool count
- Growth metrics
- Platform stats

**Generate:**
```bash
npm run tweet -- --type stats
```

### Random (Default)
Randomly selects from all types above.

**Generate:**
```bash
npm run tweet
```

## API Endpoints

### POST /api/twitter/post

Post a tweet via API.

**Query Parameters:**
- `type`: Content type (`tool-spotlight`, `tip`, `announcement`, `community`, `stats`, `random`)
- `text`: Custom tweet text (overrides type)

**Example:**
```bash
curl -X POST "https://your-domain.com/api/twitter/post?type=tool-spotlight"
```

**With custom text:**
```bash
curl -X POST "https://your-domain.com/api/twitter/post?text=Your%20custom%20tweet"
```

**With authentication (if configured):**
```bash
curl -X POST "https://your-domain.com/api/twitter/post?type=tip" \
  -H "Authorization: Bearer your-api-key"
```

### GET /api/twitter/post

Preview a tweet without posting.

**Example:**
```bash
curl "https://your-domain.com/api/twitter/post?type=tool-spotlight"
```

## Automated Daily Posting

### Option 1: Vercel Cron Jobs (Recommended)

Vercel automatically runs the cron job daily.

**Configuration:**
- Already configured in `vercel.json`
- Runs daily at 9 AM UTC
- Adjust schedule in `vercel.json` if needed

**To change schedule:**
Edit `vercel.json`:
```json
{
  "crons": [{
    "path": "/api/cron/twitter-daily",
    "schedule": "0 9 * * *"  // 9 AM UTC daily
  }]
}
```

**Cron Schedule Format:**
- `0 9 * * *` - 9 AM UTC daily
- `0 12 * * *` - 12 PM UTC daily
- `0 9 * * 1-5` - 9 AM UTC, weekdays only

**Verify it's working:**
- Check Vercel dashboard → Cron Jobs
- Check your Twitter account for daily posts
- Check Vercel function logs

### Option 2: External Cron Service

If not using Vercel, use a service like:
- **Cron-job.org** (free)
- **EasyCron** (free tier)
- **GitHub Actions** (free)

**Set up:**
1. Create a cron job
2. URL: `https://your-domain.com/api/cron/twitter-daily`
3. Schedule: Daily at your preferred time
4. Method: GET

**With authentication:**
Add header:
```
Authorization: Bearer your-cron-secret
```

## Customizing Content

### Edit Tweet Templates

Edit `lib/tweet-content.ts` to customize:

1. **Tool Spotlight Format:**
   - Change how tools are featured
   - Modify tweet structure

2. **Tips:**
   - Add/remove tips
   - Change messaging

3. **Announcements:**
   - Update announcement templates
   - Add new announcement types

4. **Community Posts:**
   - Change engagement questions
   - Add new question types

5. **Stats:**
   - Modify stat display format
   - Add new metrics

### Adding New Content Types

1. Add new method in `TweetContentGenerator` class
2. Add to `generateRandomTweet()` switch statement
3. Add to API route type options

## Troubleshooting

### "Twitter credentials not configured"

**Fix:**
- Check `.env` file has `TWITTER_BEARER_TOKEN`
- Verify token is correct
- Restart dev server after adding env vars

### "Tweet is too long"

**Fix:**
- Twitter limit is 280 characters
- Check generated tweet length
- Edit templates to be shorter
- Use preview mode to check length

### "Twitter API error"

**Common errors:**
- **401 Unauthorized**: Invalid bearer token
- **403 Forbidden**: App doesn't have write permissions
- **429 Too Many Requests**: Rate limit exceeded

**Fixes:**
- Regenerate bearer token
- Check app permissions in Twitter Developer Portal
- Wait if rate limited (Twitter has daily limits)

### Cron Job Not Running

**Check:**
- Vercel cron jobs are enabled (Pro plan required for some features)
- `vercel.json` is committed to repo
- Function logs in Vercel dashboard
- Environment variables are set in Vercel

**Alternative:**
- Use external cron service
- Use GitHub Actions
- Run script manually daily

### Database Connection Errors

**If tool spotlight fails:**
- Check database is accessible
- Verify `DATABASE_URL` is set
- Ensure Prisma client is generated

## Rate Limits

Twitter API has rate limits:
- **Free tier**: 1,500 tweets per month
- **Basic tier**: 3,000 tweets per month

**Daily posting = ~30 tweets/month** ✅ Well within limits!

## Security

### Protect API Endpoints

**Optional but recommended:**

1. **Set `TWITTER_API_KEY_PROTECTION`:**
   - Random secret key
   - Required for `/api/twitter/post`

2. **Set `CRON_SECRET`:**
   - Random secret key
   - Required for `/api/cron/twitter-daily`

**Generate secrets:**
```bash
openssl rand -base64 32
```

## Best Practices

1. **Preview before posting:**
   ```bash
   npm run tweet:preview
   ```

2. **Test with different types:**
   - Try all content types
   - See what works best

3. **Monitor engagement:**
   - Check which tweets perform best
   - Adjust content accordingly

4. **Stay within limits:**
   - Don't post more than once per day
   - Respect Twitter's rate limits

5. **Keep content fresh:**
   - Update templates regularly
   - Add new content types
   - Feature new tools

## Examples

### Post a Tool Spotlight
```bash
npm run tweet -- --type tool-spotlight
```

### Preview a Tip
```bash
npm run tweet:preview -- --type tip
```

### Post Custom Tweet
```bash
npm run tweet -- --text "Check out our new marketplace! micro-saasmarketplace.com"
```

### Test via API
```bash
# Preview
curl "http://localhost:3000/api/twitter/post?type=stats"

# Post (if configured)
curl -X POST "http://localhost:3000/api/twitter/post?type=tool-spotlight"
```

## Next Steps

1. ✅ Set up Twitter API credentials
2. ✅ Add environment variables
3. ✅ Test with preview mode
4. ✅ Post your first tweet
5. ✅ Set up Vercel Cron (or external cron)
6. ✅ Monitor daily posts
7. ✅ Customize content templates

## Support

**Twitter API Docs:**
- [Twitter API v2 Docs](https://developer.twitter.com/en/docs/twitter-api)
- [Post Tweet Endpoint](https://developer.twitter.com/en/docs/twitter-api/tweets/manage-tweets/api-reference/post-tweets)

**Vercel Cron:**
- [Vercel Cron Jobs Docs](https://vercel.com/docs/cron-jobs)

**Need Help?**
- Check function logs in Vercel
- Review Twitter API error messages
- Test with preview mode first

---

**Your Twitter bot is ready! Start posting and growing your marketplace! 🚀**

