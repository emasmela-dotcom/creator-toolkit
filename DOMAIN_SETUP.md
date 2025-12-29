# Domain Setup Guide: micro-saasmarketplace.com

This guide will help you configure your Micro-SaaS Marketplace for your new domain.

## Domain Configuration

Your domain: **micro-saasmarketplace.com**

## Step 1: Environment Variables

Once you have the domain, update your `.env` file (or production environment variables):

```env
NEXTAUTH_URL=https://micro-saasmarketplace.com
```

**Important:** Make sure to use `https://` (not `http://`) for production.

## Step 2: DNS Configuration

Configure your DNS records based on your hosting provider:

### Option A: Vercel (Recommended for Next.js)

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add `micro-saasmarketplace.com`
4. Add `www.micro-saasmarketplace.com` (optional, for www redirect)
5. Follow Vercel's DNS instructions:
   - Add an A record pointing to Vercel's IP
   - Or add a CNAME record pointing to your Vercel deployment

### Option B: Other Hosting Providers

Configure DNS records according to your provider's instructions:
- **A Record**: Point to your server's IP address
- **CNAME Record**: Point to your hosting provider's domain
- **TXT Record**: May be needed for SSL verification

## Step 3: SSL Certificate

Ensure SSL/HTTPS is enabled:

- **Vercel**: Automatically provides SSL certificates via Let's Encrypt
- **Other providers**: Use Let's Encrypt, Cloudflare, or your provider's SSL service

## Step 4: Update Application Metadata

The application metadata is configured in `app/layout.tsx`. You may want to update:

- Site title
- Description
- Open Graph tags (for social sharing)
- Favicon

## Step 5: Production Environment Variables

Set these in your hosting provider's environment variable settings:

```env
# Required
DATABASE_URL=your-production-database-url
NEXTAUTH_URL=https://micro-saasmarketplace.com
NEXTAUTH_SECRET=your-production-secret

# Optional (for payments)
STRIPE_PUBLIC_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## Step 6: Database Setup

For production, switch from SQLite to PostgreSQL:

1. Set up a PostgreSQL database (Vercel Postgres, Supabase, Railway, etc.)
2. Update `DATABASE_URL` in your environment variables
3. Run migrations:
   ```bash
   npx prisma migrate deploy
   ```

## Step 7: Test Your Domain

1. Visit `https://micro-saasmarketplace.com`
2. Test authentication (login/signup)
3. Verify all routes work correctly
4. Check that NextAuth redirects work properly

## Step 8: Update Documentation

Update any documentation or marketing materials with your new domain:
- README.md
- Social media profiles
- Email templates
- Marketing pages

## Troubleshooting

### NextAuth Redirect Issues

If you see redirect errors after deploying:
- Verify `NEXTAUTH_URL` matches your exact domain (including `https://`)
- Check that your domain has SSL enabled
- Clear browser cookies and try again

### CORS Issues

If you encounter CORS errors:
- Ensure your domain is properly configured in NextAuth
- Check that API routes are accessible
- Verify environment variables are set correctly

### Database Connection

If database connection fails:
- Verify `DATABASE_URL` is correct
- Check that your database allows connections from your hosting provider
- Ensure database migrations have been run

## Next Steps

1. ✅ Domain purchased
2. ⏳ DNS configured
3. ⏳ SSL certificate installed
4. ⏳ Environment variables set
5. ⏳ Database migrated to production
6. ⏳ Application deployed
7. ⏳ Domain tested and verified

## Support

For domain-specific issues:
- Check your hosting provider's documentation
- Review Next.js deployment guides
- Consult NextAuth.js deployment documentation

