# Location Guides Setup Instructions

## Problem
Your insights page shows "8 editorial articles • 0 location guides" instead of the expected 700+ location guides.

## Solution
The location guides are generated programmatically and saved to your database. Here's how to activate them:

## Option 1: Production Deployment (Recommended)

### Step 1: Deploy Your Latest Code
```bash
git push origin main
```
This will deploy the updated generation API to Vercel.

### Step 2: Trigger Generation via Production API
Once deployed, visit this URL in your browser or use curl:

```
https://your-domain.vercel.app/api/seo/generate-india-pages
```

Or use curl:
```bash
curl -X POST https://your-domain.vercel.app/api/seo/generate-india-pages \
  -H "Content-Type: application/json" \
  -d '{"type": "all"}'
```

### Step 3: Verify Results
Check your insights page - it should now show:
"13 editorial articles • 700+ location guides"

## Option 2: Local Development

### Step 1: Start Development Server
```bash
npm run dev
```

### Step 2: Generate Pages Locally
```bash
node scripts/generate-location-guides.js
```

### Step 3: Check Results
Visit http://localhost:3000/insights to see the updated article count.

## What Gets Generated

The system generates location-based investment pages for:

1. **Investment Pages**: `/{state}/{city}` - 400+ pages
   - Example: `/west-bengal/siliguri`
   - Example: `/assam/guwahati` 

2. **State Overview Pages**: `/{state}` - 22+ pages
   - Example: `/west-bengal`
   - Example: `/assam`

3. **Comparison Pages**: `/{state}/compare/{city1}-vs-{city2}` - 200+ pages
   - Example: `/west-bengal/compare/siliguri-vs-darjeeling`

4. **Calculator Pages**: `/{state}/{city}/calculator` - 100+ pages
   - Example: `/west-bengal/siliguri/calculator`

## Database Schema

Each location guide is stored in the `SEOPage` table with:
- Unique slug and SEO metadata
- Location-specific content (climate, soil, investment data)
- Structured data markup
- Related pages and keywords

## Troubleshooting

### If generation fails:
1. Check database connection
2. Verify Prisma schema is up to date
3. Ensure all migrations are applied
4. Check API logs for specific errors

### If pages don't appear on insights:
1. Verify `isPublished: true` in database
2. Check API endpoint `/api/seo/all-pages` returns data
3. Clear any caches and refresh

## Performance Notes

- Generation processes 700+ pages in batches
- Each page includes location-specific SEO optimization
- Pages are cached and served statically
- Database queries are optimized with proper indexing

## Expected Results

After successful generation, your insights page will show:
- 13 editorial articles (farming guides, market analysis, etc.)
- 700+ location guides (city-specific investment pages)
- Proper category filtering and search functionality
- Location-based SEO optimization for each region

This dramatically improves your site's SEO coverage across Indian cities and states for blueberry farming investment keywords.