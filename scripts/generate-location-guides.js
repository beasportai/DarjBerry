#!/usr/bin/env node

/**
 * Script to generate location guides for production
 * Run this to add 700+ location-based articles to your insights page
 */

async function generateLocationGuides() {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://darjberry.com' 
    : 'http://localhost:3000';
    
  console.log('🚀 Starting location guide generation...');
  console.log(`📍 Target URL: ${baseUrl}`);
  
  try {
    // Generate all location pages
    const response = await fetch(`${baseUrl}/api/seo/generate-india-pages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'all', // Generate all types of pages
        // Remove limit to generate all 700+ pages
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    
    console.log('✅ Generation completed!');
    console.log(`📊 Results:`);
    console.log(`   • Total pages processed: ${result.total || 0}`);
    console.log(`   • New pages saved: ${result.saved || 0}`);
    console.log(`   • Pages skipped (already exist): ${result.skipped || 0}`);
    console.log(`   • Errors encountered: ${result.errors || 0}`);
    
    if (result.errorDetails && result.errorDetails.length > 0) {
      console.log('\n⚠️  Error details:');
      result.errorDetails.forEach((error, i) => {
        console.log(`   ${i + 1}. ${error.slug}: ${error.error}`);
      });
    }
    
    if (result.pages && result.pages.length > 0) {
      console.log('\n📝 Sample generated pages:');
      result.pages.forEach((page, i) => {
        console.log(`   ${i + 1}. ${page.state}/${page.city} (${page.template})`);
      });
    }
    
    // Check final count
    const statsResponse = await fetch(`${baseUrl}/api/seo/generate-india-pages`);
    if (statsResponse.ok) {
      const stats = await statsResponse.json();
      console.log(`\n📈 Total location guides now available: ${stats.totalPages || 0}`);
      
      if (stats.pagesByState) {
        console.log('\n🗺️  Pages by state:');
        stats.pagesByState.slice(0, 10).forEach((state) => {
          console.log(`   • ${state.state}: ${state.count} pages`);
        });
      }
    }
    
    console.log('\n🎉 Location guide generation complete!');
    console.log('💡 Your insights page should now show: "13 editorial articles • 700+ location guides"');
    
  } catch (error) {
    console.error('❌ Error generating location guides:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('   1. Make sure your development server is running (npm run dev)');
    console.log('   2. Check that your database is connected and accessible');
    console.log('   3. Verify the Prisma schema and database migrations are up to date');
    console.log('   4. For production, make sure the API endpoint is deployed and accessible');
    process.exit(1);
  }
}

// Run the generation
generateLocationGuides();