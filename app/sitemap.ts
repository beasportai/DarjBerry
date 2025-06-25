import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
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

  // Investment pages for major cities
  const investmentPages = [
    '/investment/west-bengal/siliguri',
    '/investment/west-bengal/darjeeling',
    '/investment/karnataka/bangalore',
    '/investment/tamil-nadu/chennai',
    '/investment/maharashtra/mumbai',
    '/investment/delhi/new-delhi',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  return [...staticPages, ...investmentPages]
}