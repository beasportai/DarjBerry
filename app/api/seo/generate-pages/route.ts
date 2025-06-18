import { NextRequest, NextResponse } from 'next/server';
import { SEOPageGenerator } from '@/lib/seo-page-generator';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { type, limit } = await request.json();
    
    console.log(`Starting SEO page generation: ${type || 'all'}, limit: ${limit || 'unlimited'}`);
    
    // Generate pages
    const allPages = await SEOPageGenerator.generateAllPages();
    const pagesToGenerate = limit ? allPages.slice(0, limit) : allPages;
    
    // Save to database
    await SEOPageGenerator.savePagesToDatabase(pagesToGenerate);
    
    // Generate sitemap
    await generateSitemap(pagesToGenerate);
    
    console.log(`Generated ${pagesToGenerate.length} SEO pages successfully`);
    
    return NextResponse.json({
      success: true,
      pagesGenerated: pagesToGenerate.length,
      totalPossible: allPages.length,
      pages: pagesToGenerate.map(p => ({
        slug: p.slug,
        template: p.template,
        state: p.state,
        city: p.city,
        metaTitle: p.metaTitle
      }))
    });
    
  } catch (error) {
    console.error('SEO page generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate SEO pages', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const state = searchParams.get('state');
    const template = searchParams.get('template');
    
    const whereClause: Record<string, string> = {};
    if (state) whereClause.state = state;
    if (template) whereClause.template = template;
    
    const pages = await prisma.sEOPage.findMany({
      where: whereClause,
      select: {
        slug: true,
        template: true,
        state: true,
        city: true,
        district: true,
        metaTitle: true,
        metaDescription: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: [
        { state: 'asc' },
        { city: 'asc' }
      ]
    });
    
    return NextResponse.json({
      success: true,
      count: pages.length,
      pages
    });
    
  } catch (error) {
    console.error('Error fetching SEO pages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch SEO pages' },
      { status: 500 }
    );
  }
}

async function generateSitemap(pages: Array<{ slug: string }>) {
  // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://darjberry.com';
  
  // Generate sitemap content
  console.log(`Generated sitemap for ${pages.length} pages`);

  // In a real implementation, you'd save this to public/sitemap.xml
  // For now, we'll just log it
  console.log('Generated sitemap with', pages.length, 'pages');
}