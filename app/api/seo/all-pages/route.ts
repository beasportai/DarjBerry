import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const pages = await prisma.sEOPage.findMany({
      where: {
        isPublished: true
      },
      select: {
        id: true,
        slug: true,
        state: true,
        city: true,
        metaTitle: true,
        metaDescription: true,
        createdAt: true,
        template: true
      },
      orderBy: [
        { state: 'asc' },
        { city: 'asc' }
      ]
    });

    return NextResponse.json({
      success: true,
      pages,
      total: pages.length
    });

  } catch (error) {
    console.error('Error fetching all SEO pages:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}