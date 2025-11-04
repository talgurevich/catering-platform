# Vercel Deployment Guide for Bread Station Akko

## Performance Improvements

This migration to Vercel will provide:
- ✅ **No cold starts** (instant page loads)
- ✅ **Global CDN** (faster image delivery)
- ✅ **Edge runtime** (minimal latency)
- ✅ **ISR caching** (1-hour cache for all pages)
- ✅ **React Query** (5-minute client-side cache)
- ✅ **Expected performance**: 2-3x faster than Heroku

## Deployment Steps

### 1. Create Vercel Account
1. Go to https://vercel.com
2. Sign up with your GitHub account
3. Import your repository: https://github.com/talgurevich/catering-platform

### 2. Configure Environment Variables

In Vercel dashboard, add these environment variables:

```
DATABASE_URL=postgresql://postgres.hfbxlrlbqdigpszxqsee:%5EuS2%26LK2CT%5Emmbgv@aws-1-ap-northeast-2.pooler.supabase.com:5432/postgres

NEXTAUTH_URL=https://www.breadstationakko.co.il

NEXTAUTH_SECRET=(generate a new secret with: openssl rand -base64 32)
```

### 3. Deploy

1. Click "Deploy" in Vercel
2. Wait for build to complete (~2 minutes)
3. You'll get a URL like: `https://catering-platform-xxx.vercel.app`

### 4. Test the Deployment

Visit your Vercel URL and test:
- Homepage loads quickly
- Category pages work
- Product pages work
- Cart functionality works
- Admin login works

### 5. Update DNS

Once tested, update your domain DNS:

**For www.breadstationakko.co.il:**
1. Go to your DNS provider
2. Update the CNAME record:
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com`
   - TTL: `3600`

**For breadstationakko.co.il (root domain):**
1. Add these A records:
   - `76.76.19.19`
   - `76.76.21.21`

### 6. Configure Custom Domain in Vercel

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add domain: `www.breadstationakko.co.il`
3. Add domain: `breadstationakko.co.il`
4. Wait for DNS propagation (5-30 minutes)

### 7. Update Admin Authentication

Once DNS is live, update admin to use the new domain in all auth redirects.

## What Changed

### Files Modified:
- `next.config.js` - Removed standalone mode, added optimizations
- `app/layout.tsx` - Added QueryProvider for client-side caching
- `components/QueryProvider.tsx` - New React Query configuration
- `vercel.json` - Vercel configuration (Frankfurt region)
- `package.json` - Updated Node version requirement

### ISR Configuration:
All pages already configured with 1-hour revalidation:
- `app/page.tsx` - Homepage
- `app/categories/[slug]/page.tsx` - Category pages
- `app/products/[slug]/page.tsx` - Product pages

## Troubleshooting

### Build fails on Vercel
- Check environment variables are set correctly
- Ensure DATABASE_URL is accessible from Vercel IPs

### Images not loading
- Make sure Supabase storage is publicly accessible
- Check `next.config.js` image domains

### Admin login not working
- Verify NEXTAUTH_URL matches your domain
- Check NEXTAUTH_SECRET is set

## Rollback Plan

If something goes wrong:
1. Update DNS back to Heroku
2. Your Heroku deployment is still running
3. No data is lost (database unchanged)

## Cost Comparison

**Heroku:**
- Hobby dyno: $7/month
- No automatic HTTPS/CDN
- Cold starts on free tier

**Vercel:**
- Free for hobby projects (100GB bandwidth)
- Pro plan: $20/month (unlimited bandwidth)
- No cold starts
- Global CDN included
- Better performance

## Next Steps After Deployment

Once Vercel is live and working well:
1. Remove Heroku deployment (save $7/month)
2. Consider moving Supabase to a closer region if still slow
3. Monitor performance in Vercel Analytics
