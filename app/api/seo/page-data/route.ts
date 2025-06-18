import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const state = searchParams.get('state');
    const city = searchParams.get('city');
    const slug = searchParams.get('slug');

    if (!state && !city && !slug) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const whereClause: Record<string, unknown> = {};
    
    if (slug) {
      whereClause.slug = slug;
    } else if (state && city) {
      whereClause.state = {
        equals: state,
        mode: 'insensitive'
      };
      whereClause.city = {
        equals: city,
        mode: 'insensitive'
      };
    }

    const page = await prisma.sEOPage.findFirst({
      where: whereClause,
    });

    if (!page) {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      );
    }

    // Parse JSON content
    const content = typeof page.content === 'string' 
      ? JSON.parse(page.content) 
      : page.content;
    
    const schemaMarkup = typeof page.schemaMarkup === 'string'
      ? JSON.parse(page.schemaMarkup)
      : page.schemaMarkup;

    const keywords = page.keywords ? page.keywords.split(',') : [];

    return NextResponse.json({
      success: true,
      page: {
        ...page,
        content,
        schemaMarkup,
        keywords
      }
    });

  } catch (error) {
    console.error('Error fetching page data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}