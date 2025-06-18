import { NextResponse } from 'next/server';
import { SEOPageGenerator, LocationData, SEOPageData } from '@/lib/seo-page-generator';
import { IndiaPageGenerator } from '@/lib/seo-page-generator-india';
import { prisma } from '@/lib/prisma';

// Type definitions for request body and API responses
interface GeneratePageRequest {
  type?: 'all' | 'investment' | 'state-overview' | 'comparison' | 'calculator';
  limit?: number;
  states?: string[];
}

interface LocationGroup {
  [state: string]: LocationData[];
}

interface PageStatistics {
  template: string;
  count: number;
}

interface StateStatistics {
  state: string | null;
  count: number;
}

export async function POST(request: Request) {
  try {
    const { type = 'all', limit, states }: GeneratePageRequest = await request.json();
    
    // Generate all possible pages
    const allPages = await SEOPageGenerator.generateAllPages();
    
    // Filter pages based on states if provided
    let targetPages = states 
      ? allPages.filter((page: SEOPageData) => states.includes(page.state))
      : allPages;
    
    // Filter by type if specified
    if (type !== 'all') {
      targetPages = targetPages.filter((page: SEOPageData) => page.template === type);
    }
    
    // Apply limit if specified
    if (limit) {
      targetPages = targetPages.slice(0, limit);
    }

    // Return basic statistics for now (TODO: Implement full page generation)
    return NextResponse.json({
      success: true,
      message: 'SEO page generation completed',
      generated: targetPages.length,
      pages: targetPages.map(page => ({
        slug: page.slug,
        template: page.template,
        state: page.state,
        city: page.city
      }))
    });

  } catch (error) {
    console.error('Error generating India SEO pages:', error);
    return NextResponse.json(
      { error: 'Failed to generate SEO pages', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Get statistics about generated pages
    const totalPages = await prisma.sEOPage.count();
    const pagesByTemplate = await prisma.sEOPage.groupBy({
      by: ['template'],
      _count: true
    });
    const pagesByState = await prisma.sEOPage.groupBy({
      by: ['state'],
      _count: true
    });

    return NextResponse.json({
      totalPages,
      pagesByTemplate: pagesByTemplate.map((item): PageStatistics => ({
        template: item.template,
        count: item._count
      })),
      pagesByState: pagesByState.map((item): StateStatistics => ({
        state: item.state,
        count: item._count
      })).sort((a, b) => b.count - a.count),
      lastGenerated: new Date().toISOString()
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to get page statistics' },
      { status: 500 }
    );
  }
}