// Shared constants to ensure ROI calculator and offer section are in sync
export const DARJBERRY_CONSTANTS = {
  // Core Business Model
  COST_PER_PLANT: 4000, // ₹4,000 per plant initial cost
  PLANTS_PER_ACRE: 2200, // 2,200 plants per acre (1.8 sq mt per plant)
  SERVICE_PACKAGE_COST_PER_ACRE: 8800000, // ₹88,00,000 per acre (from CLAUDE.md)
  MONTHLY_MAINTENANCE_COST: 15000, // ₹15,000 per month ongoing operational cost
  FURSAT_COMMISSION: 0.20, // 20% of gross revenue
  DEFAULT_PRICE_PER_KG: 800, // ₹800/kg market price
  
  // Production Schedule (kg per plant per year)
  PRODUCTION_PATTERN: [0, 0.5, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3], // 20 years
  
  // Business Metrics
  PAYBACK_PERIOD: 4.1, // years (actual calculation based on yield schedule)
  PROJECTED_ROI: 500, // % over 15 years
  MANAGEMENT_PERIOD: 15, // years
  PLANT_LIFESPAN: 20, // years
  MINIMUM_YIELD_GUARANTEE: 2, // kg per plant by Year 4
  
  // Contact Information
  WHATSAPP_NUMBER: "917047474942",
  COMPANY_NAME: "Fursat Farms Private Limited",
  COMPANY_ADDRESS: "3rd Floor, Dwarika Heights, Near Vega Circle Sevoke Road, Siliguri - 734005",
} as const;

// Utility function to format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

// Generate WhatsApp message with ROI data
export const generateWhatsAppMessage = (calculationData: {
  acres: number;
  plants: number;
  totalCost: number;
  expectedRevenue: number;
  netProfit: number;
  paybackPeriod: number;
  pricePerKg: number;
}) => {
  const message = `Hi! I'm interested in the Darjberry managed farming partnership.

*My Farm Details:*
📍 Land Size: ${calculationData.acres} acres
🌱 Plants: ${calculationData.plants.toLocaleString()} plants
💰 Investment: ${formatCurrency(calculationData.totalCost)}

*Projected Returns:*
📈 Annual Revenue: ${formatCurrency(calculationData.expectedRevenue)}
💵 Net Profit: ${formatCurrency(calculationData.netProfit)}
⏱️ Payback Period: ${calculationData.paybackPeriod.toFixed(1)} years
💎 Price/kg: ${formatCurrency(calculationData.pricePerKg)}

*Next Steps:*
Please share the feasibility report and MFA details for my location.

Looking forward to partnering with you! 🌱`;

  return encodeURIComponent(message);
};

// Generate WhatsApp URL with prefilled message
export const generateWhatsAppURL = (calculationData: {
  acres: number;
  plants: number;
  totalCost: number;
  expectedRevenue: number;
  netProfit: number;
  paybackPeriod: number;
  pricePerKg: number;
}): string => {
  const message = generateWhatsAppMessage(calculationData);
  return `https://wa.me/${DARJBERRY_CONSTANTS.WHATSAPP_NUMBER}?text=${message}`;
};