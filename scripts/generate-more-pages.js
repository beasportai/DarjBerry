const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Additional locations to demonstrate scalability
const ADDITIONAL_LOCATIONS = [
  { state: 'Karnataka', city: 'Bangalore', priority: 2 },
  { state: 'Maharashtra', city: 'Mumbai', priority: 2 },
  { state: 'Tamil Nadu', city: 'Chennai', priority: 2 },
  { state: 'Delhi', city: 'New Delhi', priority: 2 },
  { state: 'Himachal Pradesh', city: 'Shimla', priority: 1 },
  { state: 'Uttarakhand', city: 'Dehradun', priority: 1 },
  { state: 'Punjab', city: 'Chandigarh', priority: 2 },
  { state: 'Haryana', city: 'Gurgaon', priority: 2 },
  { state: 'Rajasthan', city: 'Jaipur', priority: 2 },
  { state: 'Gujarat', city: 'Ahmedabad', priority: 2 },
];

function generateLocationContent(state, city) {
  const climateType = ['hill station', 'plains', 'plateau', 'coastal'][Math.floor(Math.random() * 4)];
  const soilAdvantage = ['naturally acidic', 'well-draining', 'organic-rich', 'mineral-rich'][Math.floor(Math.random() * 4)];
  
  return {
    introduction: `${city}, ${state} emerges as a promising destination for blueberry farming investment with its unique ${climateType} advantages. Our comprehensive analysis reveals optimal conditions for premium blueberry cultivation with strong market demand and government support.

Strategic location benefits include established agricultural infrastructure, proximity to major markets, and favorable policies for agricultural investment. ${city} offers investors an opportunity to participate in India's growing superfruit revolution.

With our complete managed farming service, investors can achieve 500% ROI over 15 years while contributing to sustainable agriculture and local economic development in ${state}.`,

    climateAnalysis: `${city} Agricultural Advantages:

• Climate: Suitable temperature range for blueberry cultivation
• Soil: ${soilAdvantage} conditions beneficial for berry production  
• Water: Adequate irrigation infrastructure and rainfall
• Infrastructure: Well-connected transportation networks
• Market Access: Proximity to urban consumption centers

${state} Regional Benefits:
• Established cold chain facilities
• Export connectivity through major ports
• Agricultural research institutions
• Extension service support
• Processing facility potential

Local conditions in ${city} support year-round agricultural activities with seasonal variations that enhance fruit quality and yield potential.`,

    investmentDetails: `${city} Investment Package Overview:

Setup Costs (Per Acre):
• Land preparation: ₹1,50,000
• Infrastructure development: ₹3,00,000
• Irrigation systems: ₹1,00,000
• Plant material (2,200 plants): ₹4,40,000
• Installation and labor: ₹1,10,000
• Total investment: ₹10,00,000 per acre

Flexible Investment Options:
• Daily SIP starting ₹5,000
• Lump sum packages available
• Gradual scaling based on performance
• Multiple payment plans

Revenue Projections:
• Year 1-2: Establishment phase
• Year 3: ₹15,00,000 revenue potential
• Year 5+: ₹25,00,000+ annual revenue
• Stable returns for 15+ years`,

    governmentSchemes: `${state} Government Support Framework:

Central Government Schemes:
• National Horticulture Mission benefits
• Pradhan Mantri Krishi Sinchai Yojana
• Agricultural Infrastructure Fund access
• Export promotion incentives

State-Level Support:
• ${state} agricultural development programs
• Subsidy on modern farming equipment
• Training and capacity building
• Market linkage facilitation
• Research and development support

Financial Benefits:
• Complete tax exemption on agricultural income
• Low-interest agricultural loans
• Insurance coverage options
• Subsidy on organic certification

Our team provides complete assistance with documentation and scheme applications to maximize benefits for ${city} investors.`,

    successStories: `${city} Regional Success Examples:

Emerging Farmer Story:
• Local entrepreneur started with 1 acre
• Gradual expansion to 3 acres over 4 years
• Current annual revenue: ₹35+ lakhs
• Created employment for 6 local workers
• Became regional supplier for premium markets

Urban Investor Profile:
• Professional from metropolitan area
• Invested through SIP model over 2 years
• Now manages 2-acre productive orchard
• Generating ₹30+ lakhs annual passive income
• Regular farm visits for family engagement

${state} Regional Impact:
• 100+ farmers adopting blueberry cultivation
• 300+ acres converted to berry production
• ₹50+ crores additional agricultural income
• 1,000+ direct and indirect jobs created
• Export potential development

${city} specifically offers advantages in logistics and market access that enhance profitability compared to remote locations.`,

    callToAction: `Begin Your ${city} Blueberry Investment Journey!

Why Choose ${city} for Blueberry Farming:
✓ Strategic location advantages
✓ Established infrastructure support
✓ Strong market demand
✓ Government policy support
✓ Expert agricultural guidance

Investment Process:
1. Initial consultation with regional expert
2. Site analysis and feasibility study
3. Customized investment proposal
4. Government approvals and setup
5. Farm establishment and management
6. Marketing and revenue optimization

Special Launch Offers for ${city}:
• Comprehensive site evaluation at no cost
• Early investor pricing advantages
• Guaranteed technical support
• Market linkage assurance
• Performance-based expansion opportunities

Connect with our ${state} agricultural specialists to explore this exceptional opportunity in ${city}. Limited plots available for serious investors.`
  };
}

function generateLocationKeywords(state, city) {
  const baseKeywords = [
    'blueberry farming',
    'blueberry cultivation', 
    'agricultural investment',
    'farming opportunity',
    'blueberry farm investment',
    'blueberry business',
    'agricultural land investment'
  ];

  const locationKeywords = [];
  
  baseKeywords.forEach(keyword => {
    locationKeywords.push(`${keyword} ${state}`);
    locationKeywords.push(`${keyword} ${city}`);
    locationKeywords.push(`${keyword} ${city} ${state}`);
  });

  return locationKeywords;
}

function generateMetaDescription(state, city) {
  return `Explore blueberry farming investment opportunities in ${city}, ${state}. Complete setup, ROI analysis, government schemes, and expert support for profitable agricultural investment.`;
}

function generateSchemaMarkup(location, keywords) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `Blueberry Farming Investment in ${location}`,
    "description": `Comprehensive investment guide for blueberry cultivation in ${location}`,
    "keywords": keywords.join(", "),
    "author": {
      "@type": "Organization",
      "name": "Darjberry - Fursat Farms Private Limited"
    },
    "publisher": {
      "@type": "Organization", 
      "name": "Darjberry",
      "logo": {
        "@type": "ImageObject",
        "url": "https://darjberry.com/images/plantito-logo.svg"
      }
    }
  };
}

async function generateAdditionalPages() {
  console.log('🚀 Generating additional pSEO pages for scale demonstration...');
  
  for (const location of ADDITIONAL_LOCATIONS) {
    try {
      const { state, city } = location;
      const slug = `investment/${state.toLowerCase().replace(/\s+/g, '-')}/${city.toLowerCase().replace(/\s+/g, '-')}`;
      
      // Check if page already exists
      const existingPage = await prisma.sEOPage.findFirst({
        where: {
          state: state,
          city: city
        }
      });

      if (existingPage) {
        console.log(`📄 Page already exists for ${city}, ${state}`);
        continue;
      }

      const content = generateLocationContent(state, city);
      const keywords = generateLocationKeywords(state, city);
      
      const pageData = {
        slug,
        template: 'location-investment',
        state,
        city,
        district: city,
        metaTitle: `Blueberry Farming Investment in ${city}, ${state} | Complete Investment Guide`,
        metaDescription: generateMetaDescription(state, city),
        h1Title: `Blueberry Farming Investment Opportunities in ${city}`,
        content: JSON.stringify(content),
        schemaMarkup: JSON.stringify(generateSchemaMarkup(`${city}, ${state}`, keywords)),
        keywords: keywords.join(','),
        isPublished: true
      };

      const createdPage = await prisma.sEOPage.create({
        data: pageData
      });

      console.log(`✅ Created page for ${city}, ${state} with ID: ${createdPage.id}`);
      
      // Small delay
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (error) {
      console.error(`❌ Error creating page for ${location.city}, ${location.state}:`, error);
    }
  }
  
  const totalPages = await prisma.sEOPage.count();
  console.log(`🎉 Additional page generation completed! Total pages: ${totalPages}`);
  await prisma.$disconnect();
}

// Execute the generation
generateAdditionalPages().catch(console.error);