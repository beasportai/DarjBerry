interface LocationData {
  latitude: number;
  longitude: number;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

interface SoilAnalysis {
  pH: number;
  soilType: string;
  suitability: 'EXCELLENT' | 'GOOD' | 'MODERATE' | 'POOR';
  recommendations: string[];
}

interface ClimateData {
  averageTemp: number;
  rainfall: number;
  humidity: number;
  suitability: 'EXCELLENT' | 'GOOD' | 'MODERATE' | 'POOR';
}

interface LocationAnalysis {
  location: LocationData;
  soilAnalysis: SoilAnalysis;
  climateData: ClimateData;
  darjeelingDistance: number;
  overallSuitability: 'EXCELLENT' | 'GOOD' | 'MODERATE' | 'POOR';
  investmentRecommendation: string;
  expectedReturns: {
    year3: string;
    year5: string;
    year10: string;
  };
}

class GeospatialService {
  private rapidApiKey: string;

  constructor(apiKey: string) {
    this.rapidApiKey = apiKey;
  }

  async reverseGeocode(lat: number, lng: number): Promise<LocationData> {
    try {
      // Using OpenCage Geocoding API (free tier available)
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${process.env.OPENCAGE_API_KEY}&language=en&pretty=1`
      );
      
      if (!response.ok) {
        throw new Error('Geocoding failed');
      }

      const data = await response.json();
      const result = data.results[0];
      
      return {
        latitude: lat,
        longitude: lng,
        address: result.formatted,
        city: result.components.city || result.components.town || result.components.village,
        state: result.components.state,
        country: result.components.country,
        postalCode: result.components.postcode
      };
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      return {
        latitude: lat,
        longitude: lng,
        address: 'Location not found',
        city: 'Unknown',
        state: 'Unknown',
        country: 'Unknown'
      };
    }
  }

  analyzeSoilSuitability(location: LocationData): SoilAnalysis {
    const { state, city } = location;
    
    // Simplified soil analysis based on known agricultural regions
    const teaRegions = ['west bengal', 'assam', 'himachal pradesh', 'uttarakhand', 'kerala', 'tamil nadu'];
    const hillStations = ['darjeeling', 'ooty', 'munnar', 'coorg', 'shimla', 'nainital'];
    
    const isTeaRegion = teaRegions.some(region => 
      state?.toLowerCase().includes(region) || city?.toLowerCase().includes(region)
    );
    
    const isHillStation = hillStations.some(station => 
      city?.toLowerCase().includes(station.toLowerCase())
    );

    if (isTeaRegion && isHillStation) {
      return {
        pH: 4.8,
        soilType: 'Acidic loamy soil (perfect for blueberries)',
        suitability: 'EXCELLENT',
        recommendations: [
          'Existing tea estate soil is ideal for blueberry cultivation',
          'pH level 4.5-5.5 matches blueberry requirements perfectly',
          'Minimal soil preparation required',
          'Consider polyhouse setup for optimal yields'
        ]
      };
    } else if (isTeaRegion) {
      return {
        pH: 5.2,
        soilType: 'Loamy soil with good drainage',
        suitability: 'GOOD',
        recommendations: [
          'Soil suitable for blueberry farming with minor adjustments',
          'May need pH reduction using organic matter',
          'Drip irrigation recommended',
          'Consider raised bed cultivation'
        ]
      };
    } else {
      return {
        pH: 6.5,
        soilType: 'Mixed soil type',
        suitability: 'MODERATE',
        recommendations: [
          'Soil modification required for blueberry cultivation',
          'Add organic matter and sulfur to reduce pH',
          'Consider container-based cultivation',
          'Consult local agricultural expert'
        ]
      };
    }
  }

  analyzeClimate(location: LocationData): ClimateData {
    const { state, city } = location;
    
    // Simplified climate analysis
    const coolRegions = ['himachal pradesh', 'uttarakhand', 'west bengal', 'assam'];
    const hillStations = ['darjeeling', 'ooty', 'munnar', 'coorg', 'shimla'];
    
    const isCoolRegion = coolRegions.some(region => 
      state?.toLowerCase().includes(region)
    );
    
    const isHillStation = hillStations.some(station => 
      city?.toLowerCase().includes(station.toLowerCase())
    );

    if (isCoolRegion && isHillStation) {
      return {
        averageTemp: 18,
        rainfall: 2500,
        humidity: 75,
        suitability: 'EXCELLENT'
      };
    } else if (isCoolRegion) {
      return {
        averageTemp: 22,
        rainfall: 1800,
        humidity: 70,
        suitability: 'GOOD'
      };
    } else {
      return {
        averageTemp: 28,
        rainfall: 1200,
        humidity: 65,
        suitability: 'MODERATE'
      };
    }
  }

  calculateDarjeelingDistance(location: LocationData): number {
    const darjeelingLat = 27.0410;
    const darjeelingLng = 88.2663;
    
    const R = 6371; // Earth's radius in km
    const dLat = (darjeelingLat - location.latitude) * Math.PI / 180;
    const dLng = (darjeelingLng - location.longitude) * Math.PI / 180;
    
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(location.latitude * Math.PI / 180) * Math.cos(darjeelingLat * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  async analyzeLocation(lat: number, lng: number): Promise<LocationAnalysis> {
    const location = await this.reverseGeocode(lat, lng);
    const soilAnalysis = this.analyzeSoilSuitability(location);
    const climateData = this.analyzeClimate(location);
    const darjeelingDistance = this.calculateDarjeelingDistance(location);

    // Determine overall suitability
    const suitabilityScores = {
      'EXCELLENT': 4,
      'GOOD': 3,
      'MODERATE': 2,
      'POOR': 1
    };

    const avgScore = (suitabilityScores[soilAnalysis.suitability] + suitabilityScores[climateData.suitability]) / 2;
    const overallSuitability = avgScore >= 3.5 ? 'EXCELLENT' : avgScore >= 2.5 ? 'GOOD' : avgScore >= 1.5 ? 'MODERATE' : 'POOR';

    // Generate investment recommendation
    let investmentRecommendation = '';
    let expectedReturns = { year3: '₹2-4L', year5: '₹4-6L', year10: '₹6-8L' };

    if (overallSuitability === 'EXCELLENT') {
      investmentRecommendation = 'Perfect location for blueberry farming! Your area has ideal soil pH and climate conditions similar to Darjeeling. We recommend starting with our ₹3 lakh lumpsum package for maximum returns.';
      expectedReturns = { year3: '₹6-8L', year5: '₹8-12L', year10: '₹12-15L' };
    } else if (overallSuitability === 'GOOD') {
      investmentRecommendation = 'Good location for blueberry cultivation with minor modifications. Consider our ₹10k daily SIP to build your investment gradually while we optimize the setup.';
      expectedReturns = { year3: '₹4-6L', year5: '₹6-8L', year10: '₹8-10L' };
    } else if (overallSuitability === 'MODERATE') {
      investmentRecommendation = 'Your location requires some modifications for optimal blueberry growth. We recommend partnering with our Darjeeling farms initially, then expanding to your land later.';
      expectedReturns = { year3: '₹2-4L', year5: '₹4-6L', year10: '₹6-8L' };
    } else {
      investmentRecommendation = 'We recommend investing in our established Darjeeling farms rather than local cultivation. This ensures optimal returns while you benefit from our expertise.';
      expectedReturns = { year3: '₹3-5L', year5: '₹5-7L', year10: '₹7-9L' };
    }

    return {
      location,
      soilAnalysis,
      climateData,
      darjeelingDistance,
      overallSuitability,
      investmentRecommendation,
      expectedReturns
    };
  }

  generateWhatsAppMessage(analysis: LocationAnalysis): string {
    const { location, soilAnalysis, climateData, overallSuitability, investmentRecommendation, expectedReturns } = analysis;

    return `🫐 *Darjberry Location Analysis Report* 🫐

📍 *Your Location:* ${location.city}, ${location.state}
🌱 *Blueberry Suitability:* ${overallSuitability}

*🌾 Soil Analysis:*
• pH Level: ${soilAnalysis.pH}
• Soil Type: ${soilAnalysis.soilType}
• Suitability: ${soilAnalysis.suitability}

*🌤️ Climate Conditions:*
• Average Temperature: ${climateData.averageTemp}°C
• Annual Rainfall: ${climateData.rainfall}mm
• Humidity: ${climateData.humidity}%

*💰 Expected Returns (Per ₹3L Investment):*
• Year 3: ${expectedReturns.year3}
• Year 5: ${expectedReturns.year5}
• Year 10: ${expectedReturns.year10}

*🎯 Our Recommendation:*
${investmentRecommendation}

*✅ Next Steps:*
1. Book a FREE consultation call
2. Visit our Darjeeling demo farm
3. Choose your investment plan
4. Start earning tax-free income!

Ready to grow berries and earn passive income? Let's make it happen! 🌱💰`;
  }
}

export { GeospatialService, type LocationAnalysis, type LocationData };