import { BarChart, Bot, BrainCircuit, Map } from "lucide-react";
import { DARJBERRY_CONSTANTS, formatCurrency } from "@/lib/shared-constants";

// Hero Section Data
export const heroData = {
  title: "Simple things",
  subtitle:
    'Transform your unused land into a passive income engine with our complete "Done-For-You" blueberry farming service',
  ctaText: "Get Your Free Feasibility Report",
};

// Problem Solution Section Data
export const problemSolutionData = {
  problems: [
    {
      title: "🧠 Specific Knowledge",
      description:
        "25+ year experienced team provides complete agronomy service from soil prep to harvest. Alongwith, proven low cost polytunnel technology from Farm2Fam in Indian climate.",
      emoji: "🧠",
    },
    {
      title: "⏰ Daily Nutrients & Maintenance",
      description:
        "Zero Time Commitment. Share WhatsApp location & PIN code, receive custom proposal with complete climatic profile, sign papers, pay & with each harvest collect profits.",
      emoji: "⏰",
    },
    {
      title: "🛡️ Capital Protected Investment",
      description:
        "Protected Investment with 135MT production track record by team of agronomists. Climate-controlled polyhouses + optional <a href='https://pmfby.gov.in/faq' target='_blank' rel='noopener noreferrer' class='text-purple-600 hover:text-purple-700 underline'>PMFBY crop insurance</a> at 5% premium. India imports 1900 tonnes of Blueberries annually.",
      emoji: "🛡️",
    },
    {
      title: "💰 Sell Harvested Produce",
      description:
        "We partner with Zepto, Blinkit, BigBasket + Hyperpure (B2B hotels & restaurants). Instituitional buyers for icecream brands, jams, spreads, museli and skincare. Mandi Contacts. Exports to markets like Singapore, Middle East. 20% commission on sales.",
      emoji: "💰",
    },
  ],
  solutionTitle: "Our Berry Good Solution",
  solutionDescription:
    "Blueberries deliver a 500% ROI (650% tax adjusted) over 15 years through a passive, tax-exempt agricultural asset. Our team of expert agronomists have worked on 100+ acres of farms at DS Group, IG International & Farm2Fam.",
};

// How It Works Section Data
export const howItWorksData = {
  steps: [
    {
      title: "Initial Contact",
      description: "You share your land's map location with us.",
    },
    {
      title: "Feasibility & Proposal",
      description: "We conduct a free satellite survey and present a proposal.",
    },
    {
      title: "Agreement & Payment",
      description: "We sign a comprehensive Managed Farming Agreement.",
    },
    {
      title: "Setup & Planting",
      description:
        "Our team builds the infrastructure and plants the high-yield saplings.",
    },
    {
      title: "Grow & Maintain",
      description:
        "We manage 100% of farm operations with regular updates to you.",
    },
    {
      title: "Harvest & Sell",
      description:
        "We harvest, package, and sell the produce through our network.",
    },
    {
      title: "Get Paid",
      description:
        "Profits are transferred to you annually, completely tax-free.",
    },
    {
      title: "Build a Legacy",
      description:
        "Enjoy a long-term, profitable, and sustainable asset. Future option to build a retirement/vacation home from yields.",
    },
  ],
};

// Offer Section Data
export const offerData = {
  offerItems: [
    {
      title: "🏭 Complete Turnkey Farm Setup",
      description: `${DARJBERRY_CONSTANTS.PLANTS_PER_ACRE.toLocaleString()} premium blueberry plants + climate-controlled polyhouse + drip irrigation + fogger systems. Everything ready for ${
        DARJBERRY_CONSTANTS.PLANT_LIFESPAN
      }-year production.`,
      value: "₹1,43,00,000",
      included: "Infrastructure + Plants + Setup",
    },
    {
      title: "🧑‍🌾 15-Year Expert Management",
      description: `Our 25+ year experienced agronomists handle 100% of operations: soil prep, planting, maintenance, harvest, pest control. Monthly maintenance: ${formatCurrency(
        DARJBERRY_CONSTANTS.MONTHLY_MAINTENANCE_COST
      )}.`,
      value: "₹45,00,000",
      included: "Complete Done-For-You Service",
    },
    {
      title: "🚚 Sales & Distribution Network",
      description: `Direct access to Zepto, Blinkit, BigBasket, hotels & restaurants. 20% commission on sales. Your produce is sold at the best market rates.`,
      value: "₹36,00,000",
      included: "15-Year Marketing & Sales",
    },
    {
      title: "🛡️ Performance Guarantee & Monitoring",
      description:
        "Comprehensive <a href='#faq' class='text-blue-600 hover:text-blue-700 underline font-medium'>performance guarantee</a> + 24/7 farm monitoring + technical support. <strong>Optional:</strong> <a href='https://pmfby.gov.in/' target='_blank' rel='noopener noreferrer' class='text-blue-600 hover:text-blue-700 underline font-medium'>PMFBY crop insurance</a> available at 5% premium for additional protection.",
      value: "₹18,00,000",
      included: "Guarantee + 24/7 Monitoring + Support",
    },
  ],
  bonusItems: [
    {
      title: "🎁 BONUS #1: Land Optimization Report",
      description:
        "AI-powered satellite analysis + soil testing + climate viability report for your specific location.",
      value: "₹35,000",
      urgency: "Free for next 9 farms only",
    },
    {
      title: "🎁 BONUS #2: Future Equity Opportunity",
      description:
        "First right to invest in our value-added brands (jams, skincare, supplements) as they scale.",
      value: "Unlimited Potential",
      urgency: "Exclusive to founding farmers",
    },
    {
      title: "🎁 BONUS #3: The Darjberry Promise",
      description: `If you don't hit ${DARJBERRY_CONSTANTS.MINIMUM_YIELD_GUARANTEE}kg/plant by Year 4, we manage your farm FREE until you do. Your success is guaranteed.`,
      value: "₹15,00,000+",
      urgency: "Lifetime guarantee",
    },
    {
      title: "🎁 BONUS #4: Tax-Free Legacy Builder",
      description: `Complete documentation for 100% tax-free agricultural income. Build generational wealth without tax burden over ${DARJBERRY_CONSTANTS.PLANT_LIFESPAN} years.`,
      value: "₹20,00,000+",
      urgency: `Tax savings over ${DARJBERRY_CONSTANTS.PLANT_LIFESPAN} years`,
    },
    {
      title: "🎁 BONUS #5: Optional Crop Insurance",
      description: `<a href='https://pmfby.gov.in/' target='_blank' rel='noopener noreferrer' class='text-blue-600 hover:text-blue-700 underline font-medium'>PMFBY crop insurance</a> available at subsidized 5% premium. Protects against natural calamities, pests, and diseases. <a href='https://pmfby.gov.in/faq' target='_blank' rel='noopener noreferrer' class='text-blue-600 hover:text-blue-700 underline font-medium'>Learn more about coverage</a>.`,
      value: "Optional Add-on",
      urgency: "Government subsidized rates",
    },
  ],
  totalValue: "₹2,62,00,000+",
  investmentAmount: formatCurrency(
    DARJBERRY_CONSTANTS.SERVICE_PACKAGE_COST_PER_ACRE
  ),
  savings: "₹1,74,00,000",
  investmentNote: `One-time investment for 1-acre unit (${DARJBERRY_CONSTANTS.PLANTS_PER_ACRE.toLocaleString()} plants). Flexible payment plans: Lump sum, installments, or daily SIP available. Monthly maintenance: ${formatCurrency(
    DARJBERRY_CONSTANTS.MONTHLY_MAINTENANCE_COST
  )}.`,
  urgencyText: "⚠️ URGENT: Only 9 Spots Remaining for 2025",
  availabilityReason:
    "Our expert agronomy team can only handle limited projects to ensure 100% success rate.",
  scarcityFactors: [
    "25+ year expert agronomists (limited availability)",
    "Premium plant sourcing (seasonal constraints)",
    "Dedicated farm management (quality over quantity)",
    "Established buyer network (limited new partnerships)",
  ],
};

// FAQ Section Data
export const faqData = {
  faqs: [
    {
      question: "Is income from agriculture really 100% tax-free in India?",
      answer:
        "Yes. As per Section 10(1) of the Income Tax Act, 1961, income earned from agricultural operations in India is exempt from Central Government income tax. We provide all necessary documentation for your records.",
    },
    {
      question: "What documents do I need to provide?",
      answer:
        "To finalize the Managed Farming Agreement, we require standard land ownership documents for verification: the Title Deed, latest Property Tax Receipts, and an Encumbrance Certificate (EC) to ensure the title is clear.",
    },
    {
      question: "What is your 'guarantee' and how does it work?",
      answer:
        "Our guarantee ensures your investment is protected. If your farm does not produce a minimum of 2 kgs per plant by the end of Year 4, we will manage your farm completely FREE of charge in Year 5 and beyond, until it hits that benchmark. Your success is our success.",
    },
    {
      question: "How much of my time and effort is required?",
      answer:
        "Virtually zero. Our model is 'Done-For-You'. You provide the land and capital; we handle 100% of the work, from initial setup to harvesting and sales. You'll receive regular updates via WhatsApp and our portal, so you're always in the loop without being on the ground.",
    },
    {
      question: "How do you achieve smarter farming through technology?",
      answer:
        "We use satellite land analysis, AI-powered soil data from global databases, historical climate viability analysis, and automated farm management with IoT sensors. Our systems monitor soil moisture, control drip irrigation, and provide 24/7 optimization to ensure maximum yields with minimal waste.",
    },
    {
      question: "What are the biggest risks and how do you mitigate them?",
      answer:
        "The main risks are climate events and pests. We mitigate these with climate-controlled polyhouses, advanced pest management protocols, and comprehensive crop insurance. Our tech-driven approach also allows for early detection and prevention of potential issues.",
    },
    {
      question: "Are there any ongoing costs after the initial investment?",
      answer:
        "Yes, there is a monthly maintenance fee of ₹15,000 to cover ongoing farm operations including plant care, irrigation management, pest control, fertilization, and regular monitoring. This operational cost is separate from your initial ₹4,000 per plant setup investment and ensures professional maintenance throughout the 15-year management period.",
    },
  ],
};

// CTA Section Data
export const ctaData = {
  title: "Ready to Unlock Your Land's Potential?",
  subtitle:
    "Don't let your valuable land sit idle. Partner with Darjberry and start your journey towards a passive, profitable, and sustainable future.",
  ctaText: "Claim Your Free, No-Obligation Proposal",
  note: "Limited to 9 projects for 2025. Act now!",
};

// Navigation Data
export const navigationData = {
  brandName: "",
  navigationItems: [
    { label: "ABOUT us", href: "#about" },
    { label: "HOW it WORKS", href: "#how-it-works" },
    { label: "our RESOURCE", href: "#technology" },
  ],
  ctaText: "Contact Us",
};
