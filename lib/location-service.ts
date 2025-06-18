import axios from 'axios';

export interface LocationDetails {
  address: string;
  city: string;
  state: string;
  district: string;
  pincode: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  distanceFromDarjeeling: number;
  suitabilityScore: number;
  recommendations: string[];
  landOption: 'own_land' | 'darjeeling_lease_soon';
}

export class LocationService {
  private static readonly GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY!;
  private static readonly DARJEELING_COORDS = { lat: 27.0360, lng: 88.2627 };
  
  static async analyzeWhatsAppLocation(
    latitude: number, 
    longitude: number
  ): Promise<LocationDetails> {
    try {
      // Use Google Maps Reverse Geocoding API
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${this.GOOGLE_MAPS_API_KEY}`
      );
      
      if (response.data.status !== 'OK' || !response.data.results.length) {
        throw new Error('Unable to fetch location details');
      }
      
      const result = response.data.results[0];
      const addressComponents = result.address_components;
      
      // Extract location details
      const locationDetails = this.parseAddressComponents(addressComponents);
      const distanceFromDarjeeling = this.calculateDistance(
        latitude, 
        longitude, 
        this.DARJEELING_COORDS.lat, 
        this.DARJEELING_COORDS.lng
      );
      
      // Calculate suitability and recommendations
      const analysis = this.analyzeSuitability(
        locationDetails.state,
        locationDetails.district,
        distanceFromDarjeeling
      );
      
      return {
        address: result.formatted_address,
        city: locationDetails.city,
        state: locationDetails.state,
        district: locationDetails.district,
        pincode: locationDetails.pincode,
        coordinates: { latitude, longitude },
        distanceFromDarjeeling,
        suitabilityScore: analysis.score,
        recommendations: analysis.recommendations,
        landOption: analysis.landOption
      };
      
    } catch (error) {
      console.error('Location analysis error:', error);
      throw new Error('Failed to analyze location');
    }
  }
  
  private static parseAddressComponents(components: Array<{ types: string[]; long_name: string }>): {
    city: string;
    state: string;
    district: string;
    pincode: string;
  } {
    let city = '';
    let state = '';
    let district = '';
    let pincode = '';
    
    components.forEach(component => {
      const types = component.types;
      
      if (types.includes('locality') || types.includes('administrative_area_level_2')) {
        city = component.long_name;
      }
      if (types.includes('administrative_area_level_1')) {
        state = component.long_name;
      }
      if (types.includes('administrative_area_level_3')) {
        district = component.long_name;
      }
      if (types.includes('postal_code')) {
        pincode = component.long_name;
      }
    });
    
    return { city, state, district, pincode };
  }
  
  private static calculateDistance(
    lat1: number, lng1: number, 
    lat2: number, lng2: number
  ): number {
    const R = 6371; // Radius of Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }
  
  private static analyzeSuitability(
    state: string,
    district: string,
    distanceFromDarjeeling: number
  ): { score: number; recommendations: string[]; landOption: 'own_land' | 'darjeeling_lease_soon' } {
    const recommendations: string[] = [];
    let score = 50; // Base score
    let landOption: 'own_land' | 'darjeeling_lease_soon' = 'own_land';
    
    // State-based scoring
    if (state.toLowerCase().includes('west bengal')) {
      score += 30;
      recommendations.push('✅ Perfect! You\'re in West Bengal - ideal for blueberry cultivation');
      
      if (district.toLowerCase().includes('darjeeling')) {
        score += 20;
        landOption = 'darjeeling_lease_soon';
        recommendations.push('🏔️ Darjeeling district - Premium tea estate partnerships available soon!');
        recommendations.push('🔔 Register interest for Darjeeling tea estate leasing (coming Q2 2025)');
      }
    } else if (['assam', 'sikkim', 'bihar', 'jharkhand'].some(s => 
      state.toLowerCase().includes(s.toLowerCase())
    )) {
      score += 15;
      recommendations.push('🌱 Great location for blueberry farming in Eastern India');
      recommendations.push('💡 Your own land + our expertise = perfect combination');
    } else if (['himachal pradesh', 'uttarakhand', 'kashmir'].some(s => 
      state.toLowerCase().includes(s.toLowerCase())
    )) {
      score += 10;
      recommendations.push('🏔️ Mountain region - excellent climate for premium berries');
    }
    
    // Distance-based scoring
    if (distanceFromDarjeeling < 50) {
      score += 20;
      recommendations.push('📍 Very close to our Darjeeling operations - perfect for farm visits!');
    } else if (distanceFromDarjeeling < 200) {
      score += 10;
      recommendations.push('📍 Reasonable distance from our Darjeeling expertise hub');
    } else if (distanceFromDarjeeling > 1000) {
      score -= 5;
      recommendations.push('✈️ Far from Darjeeling, but we provide remote support & updates');
    }
    
    // Add land-specific recommendations
    if (landOption === 'own_land') {
      recommendations.push('🏡 Perfect for your own land cultivation model');
      recommendations.push('📐 Need: 0.25+ acres per 100 plants');
    } else {
      recommendations.push('🍃 Tea estate leasing option available in your area soon');
      recommendations.push('⏰ Get notified when Darjeeling partnerships open');
    }
    
    // Add final recommendation based on score
    if (score >= 80) {
      recommendations.push('🎯 EXCELLENT location for Darjberry daily SIP!');
    } else if (score >= 60) {
      recommendations.push('👍 GOOD location for blueberry cultivation');
    } else if (score >= 40) {
      recommendations.push('⚠️ MODERATE suitability - we\'ll help optimize for your region');
    } else {
      recommendations.push('💡 Consider this as portfolio diversification investment');
    }
    
    return { score: Math.min(100, Math.max(0, score)), recommendations, landOption };
  }
  
  // Generate WhatsApp response based on location analysis
  static generateLocationResponse(analysis: LocationDetails): string {
    const emoji = analysis.suitabilityScore >= 80 ? '🎯' : 
                  analysis.suitabilityScore >= 60 ? '👍' : 
                  analysis.suitabilityScore >= 40 ? '⚠️' : '💡';
    
    const landOptionText = analysis.landOption === 'darjeeling_lease_soon' 
      ? '🔔 **Darjeeling Tea Estate Leasing Coming Soon!**'
      : '🏡 **Your Own Land Cultivation Available**';
    
    return `📍 Location Analysis Complete!
    
${emoji} **${analysis.city}, ${analysis.state}**
📊 Suitability Score: ${analysis.suitabilityScore}/100
📏 Distance from Darjeeling: ${analysis.distanceFromDarjeeling.toFixed(0)} km

${landOptionText}

${analysis.recommendations.join('\n')}

Ready for your **₹10k daily SIP**?
💰 Investment: ₹10,000/day (₹3L/month)
🌱 Plants: 100 plants per month including setup
📈 Returns: Start Year 3

What's next?
A) Show me the calculation
B) I want to start now!
C) Register for Darjeeling leasing updates

Reply A, B, or C`;
  }
  
  // For users in Darjeeling district - special response
  static generateDarjeelingResponse(analysis: LocationDetails): string {
    return `🏔️ **DARJEELING DETECTED!** You're in our prime zone!

📍 **${analysis.city}, ${analysis.district}**
⭐ Suitability Score: ${analysis.suitabilityScore}/100 (Premium location!)

🔔 **SPECIAL OPPORTUNITY:**
You're eligible for our exclusive **Darjeeling Tea Estate Partnership Program** (launching Q2 2025)

**What's Coming:**
🍃 Lease premium tea estate land for blueberry cultivation
🏔️ High-altitude, organic-certified plots
🤝 Partnership with heritage tea estates
💎 Premium export-quality berries

**Current Option:**
💰 ₹10k daily SIP on your own land
🌱 100 plants/month including complete setup

Want to be first in line?
A) Register for tea estate program
B) Start with own land now
C) Get detailed proposal

Reply A, B, or C

*Darjeeling residents get priority access! 🫐*`;
  }
}