# Environment Variables Reference

## Required Variables

### Database
```env
DATABASE_URL="file:./dev.db"
```
- **Development**: Use SQLite (`file:./dev.db`)
- **Production**: Use PostgreSQL connection string
  - Example: `postgresql://user:password@host:5432/database?schema=public`

### NextAuth Configuration
```env
NEXTAUTH_URL=http://localhost:3000
```
- **Development**: `http://localhost:3000`
- **Production**: `https://micro-saasmarketplace.com`
  - ⚠️ **Note**: Use the exact domain format you purchased
  - If your domain is `micro-saas-marketplace.com` (with hyphen), use that
  - Always use `https://` for production

```env
NEXTAUTH_SECRET=your-secret-key-here
```
- Generate with: `openssl rand -base64 32`
- **Important**: Use a different secret for production than development
- Keep this secret secure and never commit it to git

## Optional Variables

### Stripe (for payment processing)
```env
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```
- Use `pk_test_` and `sk_test_` for development/testing
- Use `pk_live_` and `sk_live_` for production
- Get these from your Stripe dashboard

### Twitter/X Bot (for automated posting)
```env
TWITTER_BEARER_TOKEN=your-bearer-token-here
TWITTER_API_KEY_PROTECTION=your-secret-key-here
CRON_SECRET=your-cron-secret-here
```
- `TWITTER_BEARER_TOKEN`: Required - Get from Twitter Developer Portal
- `TWITTER_API_KEY_PROTECTION`: Optional - For API route protection
- `CRON_SECRET`: Optional - For cron job protection
- See [TWITTER_BOT_SETUP.md](./TWITTER_BOT_SETUP.md) for setup instructions

### Vercel (if deploying to Vercel)
```env
VERCEL_URL=your-app.vercel.app
```
- Automatically set by Vercel
- Don't manually set this

## Domain Format Note

Your domain: **micro-saasmarketplace.com**

If your actual domain is different (e.g., `micro-saas-marketplace.com` with a hyphen), update `NEXTAUTH_URL` accordingly:

- `micro-saasmarketplace.com` → `https://micro-saasmarketplace.com`
- `micro-saas-marketplace.com` → `https://micro-saas-marketplace.com`

## Example .env Files

### Development (.env.local)
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=dev-secret-here
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

### Production
```env
DATABASE_URL="postgresql://user:password@host:5432/dbname"
NEXTAUTH_URL=https://micro-saasmarketplace.com
NEXTAUTH_SECRET=production-secret-here
STRIPE_PUBLIC_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
TWITTER_BEARER_TOKEN=your-bearer-token-here
TWITTER_API_KEY_PROTECTION=your-secret-key-here
CRON_SECRET=your-cron-secret-here
```

## Security Best Practices

1. ✅ Never commit `.env` files to git
2. ✅ Use different secrets for dev and production
3. ✅ Rotate secrets periodically
4. ✅ Use environment variable management in your hosting provider
5. ✅ Limit access to production environment variables
6. ✅ Use strong, randomly generated secrets

## Generating Secrets

### NEXTAUTH_SECRET
```bash
openssl rand -base64 32
```

### General Random String
```bash
openssl rand -hex 32
```

## Verifying Environment Variables

After setting up, verify they're loaded correctly:

```bash
# Check if variables are set (won't show values)
node -e "console.log(process.env.NEXTAUTH_URL)"
```

Or create a test API route to verify (remove after testing):
```typescript
// app/api/test-env/route.ts
export async function GET() {
  return Response.json({
    hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
    hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
    // Don't expose actual values
  });
}
```

