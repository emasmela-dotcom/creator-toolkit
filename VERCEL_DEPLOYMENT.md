# Deploying to Vercel: Complete Guide

This is the easiest way to get your Micro-SaaS Marketplace live with your domain.

## Prerequisites

- ✅ Your code is in a GitHub repository
- ✅ You have a Vercel account (free tier works!)
- ✅ You have your domain ready

## Step-by-Step Deployment

### 1. Prepare Your Repository

Make sure your code is pushed to GitHub:

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Sign Up / Login to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" (or "Log In" if you have an account)
3. **Connect your GitHub account** (recommended)
   - This allows automatic deployments on git push

### 3. Create New Project

1. Click **"Add New Project"** (or "New Project")
2. **Import your repository:**
   - Select your `micro-saas-marketplace` repository
   - Click **"Import"**

### 4. Configure Project Settings

Vercel will auto-detect Next.js, but verify:

- **Framework Preset**: Next.js ✅
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install` (default)

**Don't click Deploy yet!** We need to set environment variables first.

### 5. Set Environment Variables

Before deploying, click **"Environment Variables"** and add:

#### Required Variables:

```env
DATABASE_URL=your-postgresql-connection-string
NEXTAUTH_URL=https://micro-saasmarketplace.com
NEXTAUTH_SECRET=your-generated-secret-here
```

#### How to get these:

**DATABASE_URL:**
- Option 1: Use Vercel Postgres (easiest)
  - In Vercel dashboard → Storage → Create Database → Postgres
  - Copy the connection string
- Option 2: Use external service
  - Supabase (free tier available)
  - Railway (free tier available)
  - Neon (free tier available)

**NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```
Copy the output and paste it as the value.

**NEXTAUTH_URL:**
- Use: `https://micro-saasmarketplace.com`
- Even if domain isn't connected yet, Vercel will handle it

#### Optional (for Stripe payments later):

```env
STRIPE_PUBLIC_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 6. Deploy!

1. Click **"Deploy"**
2. Wait 2-5 minutes for build
3. You'll get a URL like: `your-app-abc123.vercel.app`
4. **Your app is live!** Test it at this URL

### 7. Set Up Production Database

If you haven't already:

1. **In Vercel dashboard** → **Storage** → **Create Database**
2. Select **Postgres**
3. Copy the `DATABASE_URL` connection string
4. **Update environment variable:**
   - Go to Settings → Environment Variables
   - Update `DATABASE_URL` with the new value
   - Redeploy (or it will auto-redeploy)

5. **Run database migrations:**
   ```bash
   # In Vercel dashboard, go to your project
   # Or use Vercel CLI locally:
   npx vercel env pull .env.local
   npx prisma migrate deploy
   ```

### 8. Connect Your Domain

1. In Vercel project → **Settings** → **Domains**
2. Enter: `micro-saasmarketplace.com`
3. Click **"Add"**
4. Vercel will show you DNS instructions

### 9. Configure DNS

Vercel will show you exactly what to add. Typically:

**Option A: CNAME (Recommended)**
- Go to your domain registrar
- Add CNAME record:
  - **Name**: `@` (or leave blank for root)
  - **Value**: `cname.vercel-dns.com` (Vercel shows exact value)
  - **TTL**: 3600

**Option B: A Records**
- Add A record:
  - **Name**: `@`
  - **Value**: `76.76.21.21` (Vercel shows exact IPs)
  - **TTL**: 3600

### 10. Wait for DNS Propagation

- Usually 5-60 minutes
- Check status in Vercel dashboard
- Status will show "Valid Configuration" when ready
- Use [whatsmydns.net](https://www.whatsmydns.net) to check propagation

### 11. SSL Certificate (Automatic!)

- Vercel automatically provisions SSL via Let's Encrypt
- No action needed!
- HTTPS will work once DNS propagates

### 12. Verify Everything Works

1. Visit `https://micro-saasmarketplace.com`
2. Test homepage loads
3. Test signup/login
4. Test marketplace
5. Check all routes work

---

## Vercel Features You Get

### Automatic Deployments
- Every `git push` to main = automatic deployment
- Preview deployments for pull requests
- Rollback to previous versions

### Environment Variables
- Set per environment (Production, Preview, Development)
- Secure storage
- Easy updates

### Analytics (Optional)
- Vercel Analytics (paid)
- Or use Google Analytics

### Edge Functions
- API routes run on edge
- Fast global performance

---

## Database Setup on Vercel

### Using Vercel Postgres (Easiest)

1. **In Vercel dashboard** → **Storage** → **Create Database**
2. Select **Postgres**
3. Choose region closest to you
4. **Copy connection string**
5. **Add to environment variables:**
   - Variable: `DATABASE_URL`
   - Value: (paste connection string)
6. **Run migrations:**
   ```bash
   # Using Vercel CLI
   npx vercel env pull .env.local
   npx prisma migrate deploy
   ```

### Using External Database

1. Set up PostgreSQL on:
   - Supabase (free tier: 500MB)
   - Railway (free tier available)
   - Neon (free tier: 0.5GB)
   - Render (free tier available)

2. Get connection string

3. Add to Vercel environment variables:
   ```
   DATABASE_URL=postgresql://user:pass@host:5432/dbname
   ```

4. Run migrations (same as above)

---

## Updating Your App

### Automatic (Recommended)

1. Make changes locally
2. Commit and push:
   ```bash
   git add .
   git commit -m "Update feature"
   git push origin main
   ```
3. Vercel automatically deploys!

### Manual Deploy

1. Use Vercel CLI:
   ```bash
   npm i -g vercel
   vercel
   ```

---

## Environment Variables Management

### Adding New Variables

1. Vercel dashboard → Project → Settings → Environment Variables
2. Add variable
3. Select environments (Production, Preview, Development)
4. Redeploy (or auto-redeploys on next push)

### Updating Existing Variables

1. Edit variable value
2. Save
3. Redeploy affected deployments

---

## Troubleshooting

### Build Fails

**Check:**
- Build logs in Vercel dashboard
- Environment variables are set
- Dependencies in `package.json` are correct
- TypeScript errors (if any)

### Domain Not Working

**Check:**
- DNS records are correct
- DNS has propagated (use whatsmydns.net)
- Domain is added in Vercel dashboard
- SSL certificate is active (check in Vercel)

### Database Connection Errors

**Check:**
- `DATABASE_URL` is correct
- Database allows connections from Vercel IPs
- Migrations have been run
- Database is not paused (some free tiers pause)

### NextAuth Errors

**Check:**
- `NEXTAUTH_URL` matches your domain exactly
- `NEXTAUTH_SECRET` is set
- Domain has SSL (HTTPS)
- Clear browser cookies

---

## Cost

**Vercel Hobby Plan (Free):**
- ✅ Unlimited deployments
- ✅ Custom domains
- ✅ SSL certificates
- ✅ Edge network
- ✅ 100GB bandwidth/month
- ✅ Perfect for your marketplace!

**Paid Plans:**
- Only needed if you exceed free tier limits
- Pro: $20/month (more bandwidth, team features)

---

## Quick Reference

**Vercel Dashboard**: [vercel.com/dashboard](https://vercel.com/dashboard)  
**Documentation**: [vercel.com/docs](https://vercel.com/docs)  
**Support**: [vercel.com/support](https://vercel.com/support)

---

## Next Steps After Deployment

1. ✅ Test all features
2. ✅ Set up monitoring (optional)
3. ✅ Configure analytics (optional)
4. ✅ Set up Stripe for payments
5. ✅ Add email notifications
6. ✅ Market your marketplace!

---

**You're all set!** Your marketplace will be live at `https://micro-saasmarketplace.com` 🚀

