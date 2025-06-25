import { PrismaClient } from '@prisma/client';
import { SEOPageGenerator } from '../lib/seo-page-generator';

const prisma = new PrismaClient();

async function generateLocationGuides() {
  console.log('🚀 Starting direct database location guide generation...');
  
  try {
    // Generate all possible pages
    const allPages = await SEOPageGenerator.generateAllPages();
    console.log(`📊 Generated ${allPages.length} page definitions`);
    
    let saved = 0;
    let errors = 0;
    
    // Save pages to database in batches to avoid timeout
    const batchSize = 50;
    for (let i = 0; i < allPages.length; i += batchSize) {
      const batch = allPages.slice(i, i + batchSize);
      console.log(`📝 Processing batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(allPages.length/batchSize)}...`);
      
      for (const page of batch) {
        try {
          // Check if page already exists
          const existing = await prisma.sEOPage.findUnique({
            where: { slug: page.slug }
          });
          
          if (!existing) {
            await prisma.sEOPage.create({
              data: {
                slug: page.slug,
                template: page.template,
                state: page.state,
                city: page.city || null,
                district: page.district || null,
                metaTitle: page.metaTitle,
                metaDescription: page.metaDescription,
                h1Title: page.h1Title,
                content: page.content as any,
                schemaMarkup: page.schemaMarkup as any,
                keywords: page.keywords,
                longtailKeywords: page.longtailKeywords,
                investmentKeywords: page.investmentKeywords,
                relatedPages: page.relatedPages,
                isPublished: true
              }
            });
            saved++;
          }
        } catch (error) {
          errors++;
          console.error(`❌ Error saving ${page.slug}:`, error);
        }
      }
    }
    
    console.log('✅ Generation completed!');
    console.log(`📊 Results:`);
    console.log(`   • Total pages processed: ${allPages.length}`);
    console.log(`   • New pages saved: ${saved}`);
    console.log(`   • Errors encountered: ${errors}`);
    
    // Get final count
    const totalPages = await prisma.sEOPage.count();
    console.log(`📈 Total location guides in database: ${totalPages}`);
    
    console.log('\n🎉 Location guide generation complete!');
    console.log('💡 Your insights page should now show location guides');
    
  } catch (error) {
    console.error('❌ Error generating location guides:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

generateLocationGuides();