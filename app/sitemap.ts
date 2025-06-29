import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://darjberry.com'
  
  // Static pages
  const staticPages = [
    '',
    '/about',
    '/privacy-and-terms',
    '/insights',
    '/insights/blueberry-farming-india',
    '/insights/global-blueberry-price-trends',
    '/insights/google-trends-blueberry-demand-india',
    '/tea-estate-partnership',
    '/fresh-berries',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Dynamically generated SEO pages from the database
  const seoPages = await prisma.sEOPage.findMany({
    select: {
      slug: true,
      updatedAt: true, // Assuming you have an updatedAt field in your model
    },
    where: {
      isPublished: true, // Only include published pages
    },
  });

  const dynamicSeoPages = seoPages.map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: page.updatedAt || new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [...staticPages, ...dynamicSeoPages]
}