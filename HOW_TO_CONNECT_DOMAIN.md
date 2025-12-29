# How to Connect Your Domain: Step-by-Step Guide

This guide walks you through exactly what happens after you purchase `micro-saasmarketplace.com`.

## Overview: The Big Picture

1. **You buy the domain** → Domain registrar (GoDaddy, Namecheap, etc.)
2. **You deploy your app** → Hosting provider (Vercel recommended)
3. **You connect them** → Point domain to your app
4. **SSL is automatic** → HTTPS works automatically
5. **You're live!** → Your site is accessible at your domain

---

## Option 1: Using Vercel (Recommended - Easiest)

Vercel is the easiest option for Next.js apps. Here's the exact process:

### Step 1: Deploy Your App to Vercel

1. **Push your code to GitHub** (if not already)
   ```bash
   git push origin main
   ```

2. **Go to [vercel.com](https://vercel.com)** and sign up/login

3. **Click "Add New Project"**

4. **Import your GitHub repository**
   - Select your `micro-saas-marketplace` repo
   - Click "Import"

5. **Configure the project:**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

6. **Add Environment Variables** (click "Environment Variables"):
   ```
   DATABASE_URL=your-postgresql-url
   NEXTAUTH_URL=https://micro-saasmarketplace.com
   NEXTAUTH_SECRET=your-generated-secret
   ```
   ⚠️ **Note**: Use `https://micro-saasmarketplace.com` even before connecting the domain - Vercel will handle it.

7. **Click "Deploy"**
   - Vercel builds your app
   - You get a temporary URL like: `your-app-abc123.vercel.app`
   - **This works immediately!** You can test your app here.

### Step 2: Connect Your Domain

1. **In Vercel dashboard**, go to your project
2. **Click "Settings"** → **"Domains"**
3. **Enter your domain**: `micro-saasmarketplace.com`
4. **Click "Add"**

### Step 3: Configure DNS at Your Domain Registrar

Vercel will show you **exactly what to do**. Here's what it typically looks like:

#### If Vercel gives you a CNAME record:
1. **Go to your domain registrar** (where you bought the domain)
2. **Find DNS settings** (usually under "DNS Management" or "Domain Settings")
3. **Add a CNAME record:**
   - **Name/Host**: `@` or leave blank (for root domain)
   - **Value/Target**: `cname.vercel-dns.com` (Vercel will show you the exact value)
   - **TTL**: 3600 (or default)

#### If Vercel gives you A records:
1. **Add A records** pointing to Vercel's IP addresses:
   - **Name**: `@` or leave blank
   - **Value**: Vercel's IP (they'll show you, usually 76.76.21.21)
   - **TTL**: 3600

#### For www subdomain (optional):
- **Name**: `www`
- **Type**: CNAME
- **Value**: `cname.vercel-dns.com`

### Step 4: Wait for DNS Propagation

- **Usually takes 5 minutes to 24 hours**
- Vercel will show status: "Valid Configuration" when ready
- You can check status in Vercel dashboard

### Step 5: SSL Certificate (Automatic!)

- **Vercel automatically gets SSL certificate from Let's Encrypt**
- **No action needed from you!**
- HTTPS will work automatically once DNS propagates

### Step 6: Verify It Works

1. Visit `https://micro-saasmarketplace.com`
2. Check that it loads your app
3. Test login/signup (authentication should work)
4. Verify all pages work

---

## Option 2: Using Other Hosting Providers

If you're using a different hosting provider (Railway, Render, DigitalOcean, etc.):

### General Process:

1. **Deploy your app** to the hosting provider
2. **Get your app's URL** (e.g., `your-app.railway.app`)
3. **In your domain registrar's DNS settings:**
   - Add a **CNAME record** pointing to your app's URL
   - Or add **A records** pointing to your server's IP
4. **Configure SSL:**
   - Many providers auto-configure SSL
   - Or use Cloudflare (free SSL)
   - Or use Let's Encrypt manually

### Specific Instructions:

Your hosting provider will have **exact DNS instructions** in their documentation. Look for:
- "Custom Domain Setup"
- "DNS Configuration"
- "Domain Management"

---

## What Happens Behind the Scenes

### DNS (Domain Name System) Flow:

```
User types: micro-saasmarketplace.com
    ↓
DNS lookup: "Where is this domain?"
    ↓
DNS returns: "Point to Vercel's servers (IP: 76.76.21.21)"
    ↓
Browser connects to Vercel
    ↓
Vercel serves your Next.js app
    ↓
User sees your marketplace! 🎉
```

### SSL/HTTPS Flow:

```
Browser requests: https://micro-saasmarketplace.com
    ↓
Vercel's servers have SSL certificate
    ↓
Encrypted connection established
    ↓
Secure connection (🔒 in browser)
```

---

## Common Scenarios

### Scenario 1: Domain at GoDaddy, App on Vercel

1. Buy domain at GoDaddy
2. Deploy to Vercel
3. In GoDaddy DNS settings:
   - Add A record: `@` → `76.76.21.21`
   - Or CNAME: `@` → `cname.vercel-dns.com`
4. Wait 5-60 minutes
5. Done!

### Scenario 2: Domain at Namecheap, App on Railway

1. Buy domain at Namecheap
2. Deploy to Railway
3. Railway gives you a domain: `your-app.railway.app`
4. In Namecheap DNS:
   - Add CNAME: `@` → `your-app.railway.app`
5. Railway auto-configures SSL
6. Done!

### Scenario 3: Using Cloudflare (Free SSL + CDN)

1. Buy domain anywhere
2. Point nameservers to Cloudflare
3. In Cloudflare:
   - Add CNAME: `@` → `your-app.vercel.app`
   - SSL: Automatic (Full mode)
4. Get free CDN + SSL
5. Done!

---

## Troubleshooting

### "Domain not connecting"

**Check:**
- DNS records are correct (wait up to 24 hours for propagation)
- Domain is spelled correctly
- CNAME/A records point to correct values
- Use DNS checker: [whatsmydns.net](https://www.whatsmydns.net)

### "SSL certificate error"

**Check:**
- DNS is fully propagated
- Domain is correctly configured in hosting provider
- Wait a few minutes (SSL generation takes time)

### "NextAuth redirect errors"

**Fix:**
- Update `NEXTAUTH_URL` to exactly: `https://micro-saasmarketplace.com`
- Clear browser cookies
- Wait for DNS to fully propagate

---

## Timeline

**Typical timeline after purchasing domain:**

- **0-5 minutes**: Deploy app to Vercel
- **5-10 minutes**: Configure DNS records
- **5-60 minutes**: DNS propagation (usually fast)
- **5-10 minutes**: SSL certificate generation (automatic on Vercel)
- **Total: ~15-90 minutes** until your site is live!

---

## Cost Breakdown

- **Domain**: ~$10-15/year (one-time purchase)
- **Vercel Hosting**: **Free** for hobby projects
- **SSL Certificate**: **Free** (automatic)
- **Total**: ~$10-15/year

---

## Quick Checklist

- [ ] Domain purchased: `micro-saasmarketplace.com`
- [ ] App deployed to hosting provider (Vercel, etc.)
- [ ] Environment variables set (especially `NEXTAUTH_URL`)
- [ ] DNS records configured at domain registrar
- [ ] Wait for DNS propagation (5-60 minutes)
- [ ] SSL certificate active (automatic on Vercel)
- [ ] Test domain: `https://micro-saasmarketplace.com`
- [ ] Verify authentication works
- [ ] Celebrate! 🎉

---

## Need Help?

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **DNS Checker**: [whatsmydns.net](https://www.whatsmydns.net)
- **Your hosting provider's docs**: Check their "Custom Domain" section

---

**Remember**: The hardest part is waiting for DNS to propagate. Everything else is usually automatic! 🚀

