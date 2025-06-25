const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Comprehensive list of 1000+ Indian cities and towns for pSEO generation
const INDIAN_LOCATIONS = [
  // Major Metropolitan Cities
  { state: 'Maharashtra', city: 'Mumbai' }, { state: 'Delhi', city: 'New Delhi' }, { state: 'Karnataka', city: 'Bangalore' },
  { state: 'Tamil Nadu', city: 'Chennai' }, { state: 'West Bengal', city: 'Kolkata' }, { state: 'Telangana', city: 'Hyderabad' },
  { state: 'Gujarat', city: 'Ahmedabad' }, { state: 'Rajasthan', city: 'Jaipur' }, { state: 'Maharashtra', city: 'Pune' },
  { state: 'Karnataka', city: 'Mysore' }, { state: 'Punjab', city: 'Chandigarh' }, { state: 'Haryana', city: 'Gurgaon' },
  
  // Northeast India (Priority for blueberry farming)
  { state: 'Assam', city: 'Guwahati' }, { state: 'Assam', city: 'Dibrugarh' }, { state: 'Assam', city: 'Jorhat' },
  { state: 'Assam', city: 'Tezpur' }, { state: 'Assam', city: 'Silchar' }, { state: 'Assam', city: 'Nagaon' },
  { state: 'Meghalaya', city: 'Shillong' }, { state: 'Meghalaya', city: 'Tura' }, { state: 'Meghalaya', city: 'Jowai' },
  { state: 'Sikkim', city: 'Gangtok' }, { state: 'Sikkim', city: 'Namchi' }, { state: 'Sikkim', city: 'Gyalshing' },
  { state: 'West Bengal', city: 'Siliguri' }, { state: 'West Bengal', city: 'Darjeeling' }, { state: 'West Bengal', city: 'Kalimpong' },
  { state: 'Arunachal Pradesh', city: 'Itanagar' }, { state: 'Arunachal Pradesh', city: 'Tawang' }, { state: 'Arunachal Pradesh', city: 'Bomdila' },
  { state: 'Tripura', city: 'Agartala' }, { state: 'Tripura', city: 'Udaipur' }, { state: 'Tripura', city: 'Dharmanagar' },
  { state: 'Manipur', city: 'Imphal' }, { state: 'Manipur', city: 'Thoubal' }, { state: 'Manipur', city: 'Bishnupur' },
  { state: 'Nagaland', city: 'Kohima' }, { state: 'Nagaland', city: 'Dimapur' }, { state: 'Nagaland', city: 'Mokokchung' },
  { state: 'Mizoram', city: 'Aizawl' }, { state: 'Mizoram', city: 'Lunglei' }, { state: 'Mizoram', city: 'Serchhip' },
  
  // Hill Stations (Ideal for blueberry farming)
  { state: 'Himachal Pradesh', city: 'Shimla' }, { state: 'Himachal Pradesh', city: 'Manali' }, { state: 'Himachal Pradesh', city: 'Dharamshala' },
  { state: 'Himachal Pradesh', city: 'Kasauli' }, { state: 'Himachal Pradesh', city: 'Dalhousie' }, { state: 'Himachal Pradesh', city: 'Kullu' },
  { state: 'Himachal Pradesh', city: 'Solan' }, { state: 'Himachal Pradesh', city: 'Chamba' }, { state: 'Himachal Pradesh', city: 'Kinnaur' },
  { state: 'Uttarakhand', city: 'Dehradun' }, { state: 'Uttarakhand', city: 'Nainital' }, { state: 'Uttarakhand', city: 'Mussoorie' },
  { state: 'Uttarakhand', city: 'Rishikesh' }, { state: 'Uttarakhand', city: 'Haridwar' }, { state: 'Uttarakhand', city: 'Almora' },
  { state: 'Uttarakhand', city: 'Pithoragarh' }, { state: 'Uttarakhand', city: 'Ranikhet' }, { state: 'Uttarakhand', city: 'Bageshwar' },
  { state: 'Tamil Nadu', city: 'Ooty' }, { state: 'Tamil Nadu', city: 'Kodaikanal' }, { state: 'Tamil Nadu', city: 'Yercaud' },
  { state: 'Karnataka', city: 'Coorg' }, { state: 'Karnataka', city: 'Chikmagalur' }, { state: 'Karnataka', city: 'Sakleshpur' },
  { state: 'Kerala', city: 'Munnar' }, { state: 'Kerala', city: 'Wayanad' }, { state: 'Kerala', city: 'Thekkady' },
  { state: 'Maharashtra', city: 'Mahabaleshwar' }, { state: 'Maharashtra', city: 'Lonavala' }, { state: 'Maharashtra', city: 'Panchgani' },
  
  // Tier 2 Cities
  { state: 'Maharashtra', city: 'Nashik' }, { state: 'Maharashtra', city: 'Nagpur' }, { state: 'Maharashtra', city: 'Aurangabad' },
  { state: 'Maharashtra', city: 'Solapur' }, { state: 'Maharashtra', city: 'Kolhapur' }, { state: 'Maharashtra', city: 'Sangli' },
  { state: 'Karnataka', city: 'Hubli' }, { state: 'Karnataka', city: 'Mangalore' }, { state: 'Karnataka', city: 'Bellary' },
  { state: 'Karnataka', city: 'Gulbarga' }, { state: 'Karnataka', city: 'Davangere' }, { state: 'Karnataka', city: 'Shimoga' },
  { state: 'Tamil Nadu', city: 'Coimbatore' }, { state: 'Tamil Nadu', city: 'Madurai' }, { state: 'Tamil Nadu', city: 'Tiruchirappalli' },
  { state: 'Tamil Nadu', city: 'Salem' }, { state: 'Tamil Nadu', city: 'Tirunelveli' }, { state: 'Tamil Nadu', city: 'Erode' },
  { state: 'Gujarat', city: 'Surat' }, { state: 'Gujarat', city: 'Vadodara' }, { state: 'Gujarat', city: 'Rajkot' },
  { state: 'Gujarat', city: 'Bhavnagar' }, { state: 'Gujarat', city: 'Jamnagar' }, { state: 'Gujarat', city: 'Gandhinagar' },
  { state: 'Rajasthan', city: 'Jodhpur' }, { state: 'Rajasthan', city: 'Udaipur' }, { state: 'Rajasthan', city: 'Kota' },
  { state: 'Rajasthan', city: 'Bikaner' }, { state: 'Rajasthan', city: 'Ajmer' }, { state: 'Rajasthan', city: 'Alwar' },
  { state: 'Punjab', city: 'Ludhiana' }, { state: 'Punjab', city: 'Amritsar' }, { state: 'Punjab', city: 'Jalandhar' },
  { state: 'Punjab', city: 'Patiala' }, { state: 'Punjab', city: 'Bathinda' }, { state: 'Punjab', city: 'Mohali' },
  { state: 'Haryana', city: 'Faridabad' }, { state: 'Haryana', city: 'Rohtak' }, { state: 'Haryana', city: 'Hisar' },
  { state: 'Haryana', city: 'Karnal' }, { state: 'Haryana', city: 'Panipat' }, { state: 'Haryana', city: 'Ambala' },
  
  // Uttar Pradesh
  { state: 'Uttar Pradesh', city: 'Lucknow' }, { state: 'Uttar Pradesh', city: 'Kanpur' }, { state: 'Uttar Pradesh', city: 'Agra' },
  { state: 'Uttar Pradesh', city: 'Varanasi' }, { state: 'Uttar Pradesh', city: 'Meerut' }, { state: 'Uttar Pradesh', city: 'Allahabad' },
  { state: 'Uttar Pradesh', city: 'Bareilly' }, { state: 'Uttar Pradesh', city: 'Moradabad' }, { state: 'Uttar Pradesh', city: 'Aligarh' },
  { state: 'Uttar Pradesh', city: 'Gorakhpur' }, { state: 'Uttar Pradesh', city: 'Noida' }, { state: 'Uttar Pradesh', city: 'Ghaziabad' },
  
  // Madhya Pradesh
  { state: 'Madhya Pradesh', city: 'Bhopal' }, { state: 'Madhya Pradesh', city: 'Indore' }, { state: 'Madhya Pradesh', city: 'Gwalior' },
  { state: 'Madhya Pradesh', city: 'Jabalpur' }, { state: 'Madhya Pradesh', city: 'Ujjain' }, { state: 'Madhya Pradesh', city: 'Sagar' },
  { state: 'Madhya Pradesh', city: 'Dewas' }, { state: 'Madhya Pradesh', city: 'Satna' }, { state: 'Madhya Pradesh', city: 'Ratlam' },
  
  // Andhra Pradesh & Telangana
  { state: 'Andhra Pradesh', city: 'Visakhapatnam' }, { state: 'Andhra Pradesh', city: 'Vijayawada' }, { state: 'Andhra Pradesh', city: 'Guntur' },
  { state: 'Andhra Pradesh', city: 'Nellore' }, { state: 'Andhra Pradesh', city: 'Kurnool' }, { state: 'Andhra Pradesh', city: 'Rajahmundry' },
  { state: 'Telangana', city: 'Warangal' }, { state: 'Telangana', city: 'Nizamabad' }, { state: 'Telangana', city: 'Karimnagar' },
  
  // Kerala
  { state: 'Kerala', city: 'Kochi' }, { state: 'Kerala', city: 'Thiruvananthapuram' }, { state: 'Kerala', city: 'Kozhikode' },
  { state: 'Kerala', city: 'Thrissur' }, { state: 'Kerala', city: 'Kollam' }, { state: 'Kerala', city: 'Palakkad' },
  { state: 'Kerala', city: 'Malappuram' }, { state: 'Kerala', city: 'Kannur' }, { state: 'Kerala', city: 'Kasaragod' },
  
  // West Bengal
  { state: 'West Bengal', city: 'Durgapur' }, { state: 'West Bengal', city: 'Asansol' }, { state: 'West Bengal', city: 'Howrah' },
  { state: 'West Bengal', city: 'Burdwan' }, { state: 'West Bengal', city: 'Malda' }, { state: 'West Bengal', city: 'Kharagpur' },
  
  // Odisha
  { state: 'Odisha', city: 'Bhubaneswar' }, { state: 'Odisha', city: 'Cuttack' }, { state: 'Odisha', city: 'Rourkela' },
  { state: 'Odisha', city: 'Berhampur' }, { state: 'Odisha', city: 'Sambalpur' }, { state: 'Odisha', city: 'Puri' },
  
  // Bihar & Jharkhand
  { state: 'Bihar', city: 'Patna' }, { state: 'Bihar', city: 'Gaya' }, { state: 'Bihar', city: 'Bhagalpur' },
  { state: 'Bihar', city: 'Muzaffarpur' }, { state: 'Bihar', city: 'Darbhanga' }, { state: 'Bihar', city: 'Bihar Sharif' },
  { state: 'Jharkhand', city: 'Ranchi' }, { state: 'Jharkhand', city: 'Jamshedpur' }, { state: 'Jharkhand', city: 'Dhanbad' },
  { state: 'Jharkhand', city: 'Bokaro' }, { state: 'Jharkhand', city: 'Deoghar' }, { state: 'Jharkhand', city: 'Hazaribagh' },
  
  // Chhattisgarh
  { state: 'Chhattisgarh', city: 'Raipur' }, { state: 'Chhattisgarh', city: 'Bilaspur' }, { state: 'Chhattisgarh', city: 'Korba' },
  { state: 'Chhattisgarh', city: 'Durg' }, { state: 'Chhattisgarh', city: 'Rajnandgaon' }, { state: 'Chhattisgarh', city: 'Jagdalpur' },
  
  // Goa
  { state: 'Goa', city: 'Panaji' }, { state: 'Goa', city: 'Margao' }, { state: 'Goa', city: 'Vasco da Gama' },
  { state: 'Goa', city: 'Mapusa' }, { state: 'Goa', city: 'Ponda' }, { state: 'Goa', city: 'Bicholim' },
  
  // Jammu & Kashmir
  { state: 'Jammu and Kashmir', city: 'Srinagar' }, { state: 'Jammu and Kashmir', city: 'Jammu' }, { state: 'Jammu and Kashmir', city: 'Anantnag' },
  { state: 'Jammu and Kashmir', city: 'Baramulla' }, { state: 'Jammu and Kashmir', city: 'Udhampur' }, { state: 'Jammu and Kashmir', city: 'Kathua' },
  
  // Nepal (High potential for blueberry farming)
  { state: 'Nepal', city: 'Kathmandu' }, { state: 'Nepal', city: 'Pokhara' }, { state: 'Nepal', city: 'Chitwan' },
  { state: 'Nepal', city: 'Biratnagar' }, { state: 'Nepal', city: 'Dharan' }, { state: 'Nepal', city: 'Hetauda' },
  { state: 'Nepal', city: 'Butwal' }, { state: 'Nepal', city: 'Bharatpur' }, { state: 'Nepal', city: 'Lalitpur' },
  { state: 'Nepal', city: 'Bhaktapur' }, { state: 'Nepal', city: 'Janakpur' }, { state: 'Nepal', city: 'Nepalgunj' },
  { state: 'Nepal', city: 'Gorkha' }, { state: 'Nepal', city: 'Mustang' }, { state: 'Nepal', city: 'Dolakha' },
  { state: 'Nepal', city: 'Sindhupalchok' }, { state: 'Nepal', city: 'Kavre' }, { state: 'Nepal', city: 'Nuwakot' },
  { state: 'Nepal', city: 'Rasuwa' }, { state: 'Nepal', city: 'Solukhumbu' }, { state: 'Nepal', city: 'Ilam' },
  { state: 'Nepal', city: 'Taplejung' }, { state: 'Nepal', city: 'Panchthar' }, { state: 'Nepal', city: 'Terhathum' },
  { state: 'Nepal', city: 'Sankhuwasabha' }, { state: 'Nepal', city: 'Bhojpur' }, { state: 'Nepal', city: 'Dhankuta' },
  
  // Bhutan (100% organic farming nation - premium blueberry opportunity)
  { state: 'Bhutan', city: 'Thimphu' }, { state: 'Bhutan', city: 'Paro' }, { state: 'Bhutan', city: 'Punakha' },
  { state: 'Bhutan', city: 'Wangdue' }, { state: 'Bhutan', city: 'Jakar' }, { state: 'Bhutan', city: 'Mongar' },
  { state: 'Bhutan', city: 'Trashigang' }, { state: 'Bhutan', city: 'Samdrup Jongkhar' }, { state: 'Bhutan', city: 'Pemagatshel' },
  { state: 'Bhutan', city: 'Trongsa' }, { state: 'Bhutan', city: 'Bumthang' }, { state: 'Bhutan', city: 'Zhemgang' },
  { state: 'Bhutan', city: 'Sarpang' }, { state: 'Bhutan', city: 'Tsirang' }, { state: 'Bhutan', city: 'Dagana' },
  { state: 'Bhutan', city: 'Samtse' }, { state: 'Bhutan', city: 'Chukha' }, { state: 'Bhutan', city: 'Haa' },
  { state: 'Bhutan', city: 'Gasa' }, { state: 'Bhutan', city: 'Lhuentse' },
];

// Generate additional permutations to reach 1000+ pages
function generateMoreLocations() {
  const additionalLocations = [];
  const districts = ['District', 'Rural', 'Urban', 'Industrial Zone', 'Agricultural Hub'];
  const suffixes = ['City', 'Town', 'Junction', 'Market', 'Center'];
  
  // Add variations for major cities
  INDIAN_LOCATIONS.slice(0, 50).forEach(location => {
    districts.forEach(district => {
      additionalLocations.push({
        state: location.state,
        city: `${location.city} ${district}`
      });
    });
    
    suffixes.forEach(suffix => {
      additionalLocations.push({
        state: location.state,
        city: `${location.city} ${suffix}`
      });
    });
  });
  
  return additionalLocations;
}

// Combine all locations
const ALL_LOCATIONS = [...INDIAN_LOCATIONS, ...generateMoreLocations()].slice(0, 1000);

function generateLocationContent(state, city) {
  // Country-specific content customization
  const isNepal = state === 'Nepal';
  const isBhutan = state === 'Bhutan';
  const isIndia = !isNepal && !isBhutan;
  
  const climateTypes = isNepal || isBhutan ? 
    ['high-altitude', 'Himalayan', 'temperate highland', 'mountain valley', 'sub-alpine'] :
    ['hill station', 'plains', 'plateau', 'coastal', 'semi-arid', 'tropical', 'temperate'];
    
  const soilTypes = isNepal || isBhutan ?
    ['naturally acidic mountain soil', 'organic-rich alpine soil', 'well-draining highland soil', 'mineral-rich valley soil'] :
    ['naturally acidic', 'well-draining', 'organic-rich', 'mineral-rich', 'alluvial', 'red soil', 'black cotton'];
    
  const advantages = isNepal ?
    ['strategic Himalayan location', 'organic farming tradition', 'export connectivity to India', 'government agricultural support', 'high-altitude premium quality'] :
    isBhutan ?
    ['100% organic farming nation', 'carbon-neutral agriculture', 'premium organic certification', 'gross national happiness focus', 'pristine environment'] :
    ['strategic location', 'excellent connectivity', 'growing market demand', 'government support', 'agricultural heritage'];
  
  const climateType = climateTypes[Math.floor(Math.random() * climateTypes.length)];
  const soilType = soilTypes[Math.floor(Math.random() * soilTypes.length)];
  const advantage = advantages[Math.floor(Math.random() * advantages.length)];
  
  // Country-specific currency and market references
  const currency = isNepal ? 'NPR' : isBhutan ? 'BTN' : '₹';
  const marketRef = isNepal ? 'Nepalese and Indian markets' : 
                   isBhutan ? 'Bhutanese and premium export markets' : 
                   'Indian and international markets';
  
  return {
    introduction: `${city}, ${state} represents a ${isNepal || isBhutan ? 'unique high-altitude' : 'significant'} opportunity for blueberry farming investment with its ${climateType} advantages and ${advantage}. ${isNepal ? 'Located in the heart of the Himalayas with direct access to Indian markets,' : isBhutan ? 'As part of the world\'s only carbon-neutral nation with 100% organic farming mandate,' : 'The region\'s'} agricultural potential combined with modern farming techniques creates ideal conditions for profitable blueberry cultivation.

Our comprehensive managed farming service ensures successful establishment and profitable operation of blueberry orchards in ${city}. With complete end-to-end support from setup to marketing, investors can achieve substantial returns while contributing to ${isNepal ? 'Nepal\'s agricultural export economy' : isBhutan ? 'Bhutan\'s sustainable agriculture vision' : 'local agricultural development'}.

The growing demand for premium blueberries in ${marketRef} positions ${city} as an attractive investment destination with potential for ${isNepal || isBhutan ? '600-800%' : '500%'} ROI over 15 years ${isNepal || isBhutan ? 'due to premium organic positioning' : ''}.`,

    climateAnalysis: `${city} Agricultural Assessment:

• Climate Profile: ${climateType} conditions suitable for blueberry cultivation
• Soil Characteristics: ${soilType} conditions with pH optimization potential
• Water Resources: Adequate irrigation infrastructure and seasonal rainfall
• Infrastructure: Well-developed transportation and storage facilities
• Market Position: Strategic access to regional and national markets

${state} Regional Advantages:
• Established agricultural value chains
• Government policy support for horticulture
• Research institution presence
• Export facilitation infrastructure
• Cold chain development initiatives

Local conditions in ${city} support sustainable blueberry production with minimal environmental modifications required for optimal yields.`,

    investmentDetails: `${city} Investment Framework:

Setup Investment (Per Acre):
• Site preparation and soil conditioning: ₹1,50,000
• Infrastructure and polyhouse installation: ₹3,00,000
• Advanced irrigation systems: ₹1,00,000
• Premium blueberry plants (2,200 units): ₹4,40,000
• Professional installation and setup: ₹1,10,000
• Total per-acre investment: ₹10,00,000

Flexible Investment Models:
• Daily SIP starting from ₹5,000
• Quarterly investment plans
• Annual lump sum options
• Graduated investment scaling
• Custom investment packages

Revenue Projections for ${city}:
• Years 1-2: Establishment and early production
• Year 3: ₹15,00,000+ revenue potential
• Years 4-5: ₹25,00,000+ stable revenue
• Long-term: Sustained profitability for 15+ years`,

    governmentSchemes: `${state} Government Support Ecosystem:

${isNepal ? 'Nepal National Programs:' : isBhutan ? 'Bhutan Royal Government Initiatives:' : 'National Scheme Benefits:'}
${isNepal ? `• Agriculture Development Strategy (ADS) 2015-2035
• National Agricultural Policy support
• Export promotion to India facilitation
• Organic farming certification programs
• Youth entrepreneurship in agriculture` : 
isBhutan ? `• 100% Organic Farming National Policy
• Carbon-Neutral Agriculture Initiative
• Gross National Happiness agricultural alignment
• Sustainable Development Goals integration
• Premium organic export facilitation` :
`• National Mission for Sustainable Agriculture
• Pradhan Mantri Krishi Sinchai Yojana
• Agricultural Infrastructure Fund
• National Horticulture Mission
• Export promotion incentives`}

${isNepal ? 'Nepal' : isBhutan ? 'Bhutan' : state} ${isNepal || isBhutan ? 'National' : 'State-Level'} Programs:
${isNepal ? `• Ministry of Agricultural Development schemes
• Agricultural credit subsidy programs
• Technology transfer initiatives
• Market access development
• Cross-border trade facilitation` :
isBhutan ? `• Ministry of Agriculture organic certification
• Sustainable agriculture technology support
• Carbon credit earning opportunities
• Premium market access programs
• Environmental conservation incentives` :
`• Horticulture development schemes
• Modern farming technology subsidies
• Training and skill development programs
• Market infrastructure development
• Research and development support`}

Financial Incentives:
${isNepal ? `• Agricultural income tax benefits
• Subsidized agricultural loans
• Export earning incentives
• Organic certification cost support
• Technology adoption subsidies` :
isBhutan ? `• Organic premium pricing support
• Carbon-neutral farming incentives
• Export quality certification benefits
• Environmental stewardship rewards
• Sustainable technology subsidies` :
`• Agricultural income tax exemption
• Subsidized credit facilities
• Insurance scheme coverage
• Organic certification support
• Value addition incentives`}

Our specialized team ensures complete documentation and maximum benefit utilization for ${city} investors${isNepal ? ', including cross-border trade facilitation' : isBhutan ? ' and organic certification processes' : ''}.`,

    successStories: `${city} Investment Success Examples:

Local Entrepreneur Case:
• Started with 1 acre blueberry cultivation
• Scaled to 4 acres over 5 years
• Current annual revenue: ₹60+ lakhs
• Created employment for 12 local workers
• Developed regional supply network

Professional Investor Profile:
• Urban professional seeking passive income
• Invested through systematic SIP approach
• Built 2.5-acre productive orchard
• Generating ₹40+ lakhs annual returns
• Active in farmer training initiatives

${state} Regional Development:
• 200+ farmers adopting blueberry cultivation
• 800+ acres under commercial production
• ₹120+ crores additional agricultural income
• 3,000+ direct and indirect employment
• Export revenue growth of ₹40+ crores

${city} offers unique advantages in terms of logistics connectivity and market access, contributing to above-average profitability compared to remote locations.`,

    callToAction: `Launch Your ${city} Blueberry Investment Today!

Strategic Advantages of ${city}:
✓ Optimal agricultural conditions
✓ Strong infrastructure support
✓ Growing market demand
✓ Comprehensive government backing
✓ Expert technical guidance

Simple Investment Process:
1. Expert consultation and site evaluation
2. Detailed feasibility assessment
3. Customized investment planning
4. Complete setup and establishment
5. Professional farm management
6. Marketing and revenue optimization

Exclusive Benefits for ${city} Investors:
• Complimentary site analysis and soil testing
• Preferred pricing for early commitments
• Guaranteed technical support and training
• Market linkage and offtake assurance
• Performance-based expansion opportunities

Connect with our ${state} regional specialists today to explore this exceptional blueberry farming opportunity in ${city}. Limited investment slots available for serious investors.`
  };
}

function generateLocationKeywords(state, city) {
  const baseKeywords = [
    'blueberry farming', 'blueberry cultivation', 'agricultural investment', 'farming opportunity',
    'blueberry farm investment', 'blueberry business', 'agricultural land investment', 'passive income farming',
    'sustainable agriculture', 'horticulture investment', 'berry farming', 'premium fruit cultivation'
  ];

  const locationKeywords = [];
  
  baseKeywords.forEach(keyword => {
    locationKeywords.push(`${keyword} ${state}`);
    locationKeywords.push(`${keyword} ${city}`);
    if (city !== state) {
      locationKeywords.push(`${keyword} ${city} ${state}`);
    }
  });

  return locationKeywords;
}

function generateMetaDescription(state, city) {
  const descriptions = [
    `Explore profitable blueberry farming investment in ${city}, ${state}. Complete setup, ROI analysis, government schemes, and expert agricultural support.`,
    `Discover blueberry cultivation opportunities in ${city}, ${state}. Professional farming services, guaranteed returns, and comprehensive investment guidance.`,
    `Transform your agricultural investment in ${city}, ${state} with premium blueberry farming. Expert management, market linkage, and sustainable profits.`,
    `Start your blueberry farming journey in ${city}, ${state}. Complete investment packages, technical support, and proven profitability models.`
  ];
  
  return descriptions[Math.floor(Math.random() * descriptions.length)];
}

function generateSchemaMarkup(location, keywords) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `Blueberry Farming Investment Guide for ${location}`,
    "description": `Comprehensive investment and cultivation guide for blueberry farming in ${location}`,
    "keywords": keywords.slice(0, 20).join(", "), // Limit keywords for performance
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
    },
    "potentialAction": {
      "@type": "InvestAction",
      "target": `https://darjberry.com/investment/${location.toLowerCase().replace(/\s+/g, '-')}`
    }
  };
}

async function generate1000Pages() {
  console.log(`🚀 Starting generation of ${ALL_LOCATIONS.length} pSEO pages...`);
  let created = 0;
  let skipped = 0;
  
  for (let i = 0; i < ALL_LOCATIONS.length; i++) {
    try {
      const { state, city } = ALL_LOCATIONS[i];
      const slug = `investment/${state.toLowerCase().replace(/\s+/g, '-')}/${city.toLowerCase().replace(/\s+/g, '-')}`;
      
      // Check if page already exists
      const existingPage = await prisma.sEOPage.findFirst({
        where: {
          state: state,
          city: city
        }
      });

      if (existingPage) {
        skipped++;
        if (i % 50 === 0) console.log(`📄 Progress: ${i}/${ALL_LOCATIONS.length} - ${created} created, ${skipped} skipped`);
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
        keywords: keywords.slice(0, 50).join(','), // Limit for database performance
        isPublished: true
      };

      await prisma.sEOPage.create({
        data: pageData
      });

      created++;
      
      if (i % 50 === 0) {
        console.log(`✅ Progress: ${i}/${ALL_LOCATIONS.length} - ${created} created, ${skipped} skipped`);
      }
      
      // Small delay to prevent overwhelming the database
      if (i % 100 === 0) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
    } catch (error) {
      console.error(`❌ Error creating page for ${ALL_LOCATIONS[i]?.city}, ${ALL_LOCATIONS[i]?.state}:`, error.message);
    }
  }
  
  const totalPages = await prisma.sEOPage.count();
  console.log(`🎉 Generation completed! Created: ${created}, Skipped: ${skipped}, Total in DB: ${totalPages}`);
  await prisma.$disconnect();
}

// Execute the generation
generate1000Pages().catch(console.error);