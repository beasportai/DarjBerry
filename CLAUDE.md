# Darjberry - Managed Blueberry Farming Platform

## Project Overview

Darjberry is a comprehensive managed blueberry farming platform that connects landowners with professional agricultural services to create passive income streams through premium blueberry cultivation.

## Business Model

**Core Proposition**: Transform unused land into profitable, tax-free agricultural assets through turnkey blueberry farming services.

### Target Problems Solved

- Knowledge gap in specialty crop cultivation
- Time and effort demands of farming operations
- High financial risk and infrastructure investment
- Market access and sales challenges
- Scalability limitations for individual farmers

## Value Proposition

### Financial Returns

- **Investment**: ₹4,000 per plant initial cost
- **Payback Period**: 3.5 years
- **ROI**: 500% over 15 years (₹20,000 return per plant)
- **Tax Benefits**: Agricultural income exempt under Section 10(1) of Income Tax Act, 1961

### Service Package (₹88,00,000 for 1 acre / 2,200 plants)

- **Infrastructure**: Climate-controlled polyhouse, drip irrigation, fogger system
- **Management**: 15 years of expert agronomy services
- **Sales & Marketing**: Complete B2B/D2C sales handling (10% of gross revenue)
- **Guarantee**: Minimum 2kg per plant by Year 4, or free Year 5 management

## Technical Implementation

### Tech Stack

- **Frontend**: Next.js application
- **Feasibility Analysis**: Automated via API integration
  - Google Earth Engine API (land analysis)
  - ISRIC World Soil Information Service API (soil data)
  - OpenWeatherMap API (climate data)

### Crop Specifications

- **Plant Lifespan**: 15-20 years
- **Spacing**: 1.8 sq. mt per plant
- **Density**: 2,200 plants per acre
- **Market Price**: ₹800 per kg
- **Yield Schedule**:
  - Year 1: 0.5kg per plant
  - Year 2: 1kg per plant
  - Year 3: 2kg per plant
  - Year 4-20: 3kg per plant (stable)

## Legal Framework

- **Managed Farming Agreement (MFA)**: 15-20 year contracts
- **Revenue Share**: 10% of gross revenue
- **Required Documentation**: Title deed, property tax receipts, encumbrance certificate

## Development Guidelines

### Code Standards

- Follow existing project conventions
- Verify library availability before use
- Implement security best practices
- No hardcoded secrets or keys

### Key Features Implemented

- ✅ **Dynamic ROI Calculator**: Real-time calculations based on land size with 1-acre minimum
  - Uses actual CLAUDE.md specifications (2,200 plants/acre, ₹800/kg pricing)
  - Shows detailed production schedule, investment breakdown, and payback period
  - Enforces commercial viability minimum of 1 acre
  - Located in `components/landing/roi-calculator-section.tsx`
  - Uses `lib/investment-calculator.ts` for calculations

### Key Features to Implement

- Automated feasibility reporting
- WhatsApp integration for updates
- Customer onboarding flow
- Payment plan options (lump sum, installments, daily SIP)

## Contact Information

**Fursat Farms Private Limited**
3rd Floor, Dwarika Heights, Near Vega Circle Sevoke Road, Siliguri - 734005
Phone: +91 7047 474 942
Email: darjberry@gmail.com

## References

- Farm2Fam case study: https://thebetterindia.com/345037/growing-blueberries-raspberries-in-india-lawyer-quits-start-farm2fam-low-cost-tunnel-method/
- Bryan Johnson world's leading longetivity practioner recommends 70gm of blueberries daily in his bluebprint diet blueberry content: https://www.youtube.com/watch?v=8eb_41ZpyOQ

---

_This document serves as the single source of truth for development team, partners, and AI agents working on the Darjberry platform._
