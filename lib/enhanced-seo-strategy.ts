import { SEOPageGenerator } from './seo-page-generator';

/**
 * Enhanced SEO Strategy incorporating longtail keywords from blueberry-longtail.csv
 * Focuses on high-value agricultural investment and farming keywords
 */

export interface EnhancedKeywordStrategy {
  // Primary high-volume keywords
  primary: string[];
  
  // Longtail keywords from CSV analysis
  longtail: string[];
  
  // Investment-focused keywords for business audience
  investment: string[];
  
  // Location-specific modifiers
  location: string[];
  
  // Seasonal and timing keywords
  seasonal: string[];
  
  // Question-based keywords (high conversion)
  questions: string[];
}

export class EnhancedSEOStrategy {
  static readonly KEYWORD_STRATEGY: EnhancedKeywordStrategy = {
    primary: [
      'blueberry farm',
      'blueberry farming',
      'blueberry investment',
      'agricultural investment',
      'passive income farming'
    ],
    
    longtail: [
      // High-value farming keywords from CSV
      'blueberry farm near me',
      'blueberry bushes for sale',
      'blueberry picking near me',
      'which blueberry variety is the sweetest',
      'when to plant blueberry',
      'how to plant blueberry',
      'blueberry bush care',
      'blueberry fertilizer',
      'blueberry season',
      'northern highbush blueberry',
      'duke blueberry variety',
      'emerald blueberry variety',
      'jersey blueberry variety',
      'pink lemonade blueberry',
      'japanese blueberry tree',
      'benefits of blueberry farming',
      'blueberry nutrition facts',
      'blueberry calories per cup',
      'are blueberry bushes hard to grow',
      'blueberry u pick farms'
    ],
    
    investment: [
      'blueberry farming investment returns',
      'agricultural investment opportunities',
      'passive income through farming',
      'blueberry farm ROI calculator',
      'sustainable farming investment',
      'agricultural asset investment',
      'farming business opportunity',
      'blueberry cultivation profit',
      'agricultural land investment',
      'farming investment India'
    ],
    
    location: [
      // Northeast India focus
      'blueberry farming Assam',
      'blueberry cultivation Meghalaya',
      'blueberry farming West Bengal',
      'blueberry farming Sikkim',
      'agricultural investment Northeast India',
      'blueberry farming Guwahati',
      'blueberry cultivation Siliguri',
      'blueberry farming Shillong',
      'blueberry farming Darjeeling',
      'tea estate conversion blueberry',
      // Tier 1 cities
      'blueberry farming Mumbai',
      'blueberry cultivation Bangalore',
      'agricultural investment Delhi',
      'blueberry farming Chennai',
      'blueberry cultivation Pune'
    ],
    
    seasonal: [
      'blueberry planting season India',
      'best time plant blueberry',
      'blueberry harvest season',
      'blueberry flowering time',
      'blueberry growing season',
      'when do blueberries fruit',
      'blueberry pruning season',
      'blueberry plantation timing'
    ],
    
    questions: [
      // High-conversion question keywords from CSV
      'are blueberry bushes hard to grow',
      'which blueberry bush is best',
      'which blueberry variety is the sweetest',
      'when to plant blueberry bushes',
      'how much do blueberry farms make',
      'is blueberry farming profitable',
      'what soil do blueberries need',
      'how long do blueberry bushes live',
      'can you grow blueberries in India',
      'what climate do blueberries need'
    ]
  };

  /**
   * Generate keyword combinations for specific locations
   */
  static generateLocationKeywords(state: string, city?: string): string[] {
    const baseKeywords = [
      'blueberry farming',
      'blueberry cultivation',
      'agricultural investment',
      'farming opportunity',
      'blueberry farm investment'
    ];

    const locationKeywords: string[] = [];
    
    baseKeywords.forEach(keyword => {
      locationKeywords.push(`${keyword} ${state}`);
      if (city) {
        locationKeywords.push(`${keyword} ${city}`);
        locationKeywords.push(`${keyword} ${city} ${state}`);
      }
    });

    return locationKeywords;
  }

  /**
   * Generate investment-focused content titles incorporating longtail keywords
   */
  static generateInvestmentTitles(location: string): string[] {
    return [
      `Blueberry Farming Investment in ${location}: Complete ROI Guide`,
      `Why ${location} is Perfect for Blueberry Cultivation: Climate & Soil Analysis`,
      `${location} Blueberry Farm Setup: From Planning to Harvest`,
      `Agricultural Investment Opportunities in ${location}: Blueberry Focus`,
      `Passive Income Through Blueberry Farming in ${location}`,
      `${location} Blueberry Varieties: Which Bush is Best for Local Climate`,
      `Government Schemes for Blueberry Farming in ${location}`,
      `Tea Estate to Blueberry Farm Conversion in ${location}`,
      `Sustainable Blueberry Farming in ${location}: Environmental Benefits`,
      `${location} Blueberry Market Analysis: Demand & Pricing Trends`
    ];
  }

  /**
   * Generate question-based content for FAQ sections
   */
  static generateQuestionContent(): Array<{question: string, answer: string}> {
    return [
      {
        question: "Are blueberry bushes hard to grow in India?",
        answer: "Blueberry bushes are moderately challenging but very manageable with proper soil pH (4.5-5.5), adequate water, and climate control. Our managed farming service handles all technical aspects."
      },
      {
        question: "Which blueberry variety is best for Indian climate?",
        answer: "Northern Highbush varieties like Duke, Jersey, and Emerald perform well in Indian hill stations. We select varieties based on your specific location's climate data."
      },
      {
        question: "When is the best time to plant blueberry bushes?",
        answer: "In India, the ideal planting time is October-November for hill regions and December-January for plains, allowing establishment before the growing season."
      },
      {
        question: "How profitable is blueberry farming in India?",
        answer: "Blueberry farming offers 500% ROI over 15 years with ₹20,000 return per plant. Premium pricing of ₹800/kg makes it highly profitable compared to traditional crops."
      },
      {
        question: "What soil conditions do blueberries need?",
        answer: "Blueberries require acidic soil (pH 4.5-5.5), well-draining, organic-rich conditions. We conduct soil testing and amendments as part of our setup service."
      }
    ];
  }

  /**
   * Generate meta descriptions incorporating longtail keywords
   */
  static generateMetaDescription(state: string, city: string): string {
    const keywords = this.KEYWORD_STRATEGY;
    const locationKeyword = `${city}, ${state}`;
    
    return `Discover profitable blueberry farming opportunities in ${locationKeyword}. Expert guidance on varieties, ROI calculator, soil analysis, and government schemes for agricultural investment success.`;
  }

  /**
   * Generate schema markup for enhanced SEO
   */
  static generateSchemaMarkup(location: string, keywords: string[]) {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": `Blueberry Farming Investment Guide for ${location}`,
      "description": `Comprehensive guide to blueberry cultivation and investment opportunities in ${location}`,
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
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://darjberry.com/investment/${location.toLowerCase().replace(' ', '-')}`
      }
    };
  }
}

/**
 * Priority locations for enhanced SEO content generation
 */
export const PRIORITY_LOCATIONS = [
  // Northeast India (Primary focus)
  { state: 'West Bengal', city: 'Siliguri', priority: 1 },
  { state: 'Assam', city: 'Guwahati', priority: 1 },
  { state: 'Meghalaya', city: 'Shillong', priority: 1 },
  { state: 'Sikkim', city: 'Gangtok', priority: 1 },
  { state: 'West Bengal', city: 'Darjeeling', priority: 1 },
  
  // Tea estate regions
  { state: 'Assam', city: 'Dibrugarh', priority: 2 },
  { state: 'West Bengal', city: 'Kalimpong', priority: 2 },
  { state: 'Assam', city: 'Jorhat', priority: 2 },
  
  // Tier 1 cities (High search volume)
  { state: 'Maharashtra', city: 'Mumbai', priority: 2 },
  { state: 'Karnataka', city: 'Bangalore', priority: 2 },
  { state: 'Tamil Nadu', city: 'Chennai', priority: 2 },
  { state: 'Delhi', city: 'New Delhi', priority: 2 },
  { state: 'Maharashtra', city: 'Pune', priority: 2 }
];