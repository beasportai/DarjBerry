export interface LocationAnalysis {
  location: string;
  district: string;
  soilPh: number;
  climateScore: number;
  suitability: 'EXCELLENT' | 'GOOD' | 'MODERATE' | 'POOR';
  elevation: number;
  rainfall: number;
  temperature: {
    min: number;
    max: number;
  };
}

export class LocationAnalyzer {
  // North Bengal districts and their characteristics
  private static readonly NORTH_BENGAL_DATA = {
    'darjeeling': {
      climateScore: 95,
      soilPh: 4.8,
      elevation: 2100,
      rainfall: 2500,
      temperature: { min: 5, max: 25 },
      suitability: 'EXCELLENT' as const,
    },
    'kurseong': {
      climateScore: 92,
      soilPh: 5.0,
      elevation: 1500,
      rainfall: 2200,
      temperature: { min: 8, max: 28 },
      suitability: 'EXCELLENT' as const,
    },
    'siliguri': {
      climateScore: 85,
      soilPh: 5.2,
      elevation: 120,
      rainfall: 2800,
      temperature: { min: 12, max: 32 },
      suitability: 'GOOD' as const,
    },
    'jalpaiguri': {
      climateScore: 88,
      soilPh: 4.9,
      elevation: 75,
      rainfall: 3000,
      temperature: { min: 10, max: 30 },
      suitability: 'EXCELLENT' as const,
    },
    'cooch behar': {
      climateScore: 82,
      soilPh: 5.3,
      elevation: 45,
      rainfall: 2600,
      temperature: { min: 8, max: 30 },
      suitability: 'GOOD' as const,
    },
    'alipurduar': {
      climateScore: 87,
      soilPh: 5.1,
      elevation: 90,
      rainfall: 2700,
      temperature: { min: 9, max: 31 },
      suitability: 'GOOD' as const,
    },
    'north dinajpur': {
      climateScore: 78,
      soilPh: 5.4,
      elevation: 35,
      rainfall: 1800,
      temperature: { min: 12, max: 35 },
      suitability: 'MODERATE' as const,
    },
  };

  static async analyze(latitude: number, longitude: number): Promise<LocationAnalysis> {
    try {
      // For now, we'll use coordinate ranges to determine North Bengal districts
      // In production, you'd integrate with Google Maps Geocoding API
      const district = this.getDistrictFromCoordinates(latitude, longitude);
      const location = await this.getLocationName(latitude, longitude, district);
      
      const data = this.NORTH_BENGAL_DATA[district as keyof typeof this.NORTH_BENGAL_DATA] || this.getDefaultAnalysis(latitude, longitude);
      
      return {
        location,
        district: district.charAt(0).toUpperCase() + district.slice(1),
        ...data,
      };
    } catch (error) {
      console.error('Location analysis error:', error);
      return this.getDefaultAnalysis(latitude, longitude);
    }
  }

  private static getDistrictFromCoordinates(lat: number, lng: number): string {
    // Approximate coordinate ranges for North Bengal districts
    // Darjeeling: 26.7-27.2, 87.9-88.5
    if (lat >= 26.7 && lat <= 27.2 && lng >= 87.9 && lng <= 88.5) {
      return 'darjeeling';
    }
    
    // Kurseong is part of Darjeeling district
    if (lat >= 26.8 && lat <= 26.9 && lng >= 88.2 && lng <= 88.3) {
      return 'kurseong';
    }
    
    // Siliguri: 26.6-26.8, 88.3-88.5
    if (lat >= 26.6 && lat <= 26.8 && lng >= 88.3 && lng <= 88.5) {
      return 'siliguri';
    }
    
    // Jalpaiguri: 26.3-27.0, 88.4-89.8
    if (lat >= 26.3 && lat <= 27.0 && lng >= 88.4 && lng <= 89.8) {
      return 'jalpaiguri';
    }
    
    // Cooch Behar: 25.8-26.7, 89.2-89.9
    if (lat >= 25.8 && lat <= 26.7 && lng >= 89.2 && lng <= 89.9) {
      return 'cooch behar';
    }
    
    // Alipurduar: 26.3-26.8, 89.3-89.8
    if (lat >= 26.3 && lat <= 26.8 && lng >= 89.3 && lng <= 89.8) {
      return 'alipurduar';
    }
    
    // North Dinajpur: 25.2-26.3, 88.0-88.9
    if (lat >= 25.2 && lat <= 26.3 && lng >= 88.0 && lng <= 88.9) {
      return 'north dinajpur';
    }
    
    // Default to closest North Bengal district
    return 'jalpaiguri';
  }

  private static async getLocationName(lat: number, lng: number, district: string): Promise<string> {
    // In production, integrate with Google Maps Geocoding API
    // For now, return district name with approximate location
    const locations: Record<string, string[]> = {
      'darjeeling': ['Darjeeling', 'Tiger Hill', 'Ghoom', 'Batasia Loop'],
      'kurseong': ['Kurseong', 'Dow Hill', 'Eagle\'s Crag'],
      'siliguri': ['Siliguri', 'New Jalpaiguri', 'Matigara'],
      'jalpaiguri': ['Jalpaiguri', 'Rajganj', 'Mal', 'Nagrakata'],
      'cooch behar': ['Cooch Behar', 'Mathabhanga', 'Dinhata'],
      'alipurduar': ['Alipurduar', 'Birpara', 'Falakata'],
      'north dinajpur': ['Raiganj', 'Islampur', 'Kaliyaganj'],
    };
    
    const areaNames = locations[district] || [district];
    return areaNames[0]; // Return the main city/area
  }

  private static getDefaultAnalysis(lat: number, lng: number): LocationAnalysis {
    // Check if coordinates are within North Bengal region
    const isNorthBengal = lat >= 25.0 && lat <= 27.5 && lng >= 87.5 && lng <= 90.0;
    
    if (isNorthBengal) {
      return {
        location: 'North Bengal Region',
        district: 'Unknown',
        climateScore: 80,
        soilPh: 5.2,
        elevation: 100,
        rainfall: 2400,
        temperature: { min: 10, max: 30 },
        suitability: 'GOOD',
      };
    } else {
      return {
        location: 'Outside North Bengal',
        district: 'Other',
        climateScore: 40,
        soilPh: 6.5,
        elevation: 50,
        rainfall: 1200,
        temperature: { min: 15, max: 40 },
        suitability: 'POOR',
      };
    }
  }

  static async analyzeBatch(coordinates: Array<{lat: number, lng: number}>): Promise<LocationAnalysis[]> {
    const analyses = await Promise.all(
      coordinates.map(coord => this.analyze(coord.lat, coord.lng))
    );
    return analyses;
  }

  static getSuitabilityScore(analysis: LocationAnalysis): number {
    let score = 0;
    
    // Climate score (40% weight)
    score += analysis.climateScore * 0.4;
    
    // Soil pH score (30% weight)
    const phScore = analysis.soilPh >= 4.0 && analysis.soilPh <= 5.5 ? 100 : 
                   analysis.soilPh >= 3.5 && analysis.soilPh <= 6.0 ? 80 : 50;
    score += phScore * 0.3;
    
    // Elevation score (20% weight)
    const elevationScore = analysis.elevation > 500 ? 100 : 
                          analysis.elevation > 100 ? 80 : 60;
    score += elevationScore * 0.2;
    
    // Temperature score (10% weight)
    const tempScore = analysis.temperature.max <= 30 && analysis.temperature.min >= 5 ? 100 : 70;
    score += tempScore * 0.1;
    
    return Math.round(score);
  }

  static getRecommendations(analysis: LocationAnalysis): string[] {
    const recommendations: string[] = [];
    
    if (analysis.suitability === 'EXCELLENT') {
      recommendations.push('Perfect location for blueberry cultivation');
      recommendations.push('Consider premium varieties for export market');
    } else if (analysis.suitability === 'GOOD') {
      recommendations.push('Good location with minor climate adjustments needed');
      recommendations.push('Focus on domestic market varieties');
    } else if (analysis.suitability === 'MODERATE') {
      recommendations.push('Requires significant soil and climate management');
      recommendations.push('Consider other crops or different location');
    } else {
      recommendations.push('Not suitable for blueberry cultivation');
      recommendations.push('Explore other investment opportunities');
    }
    
    if (analysis.soilPh > 5.5) {
      recommendations.push('Soil acidification required (add sulfur/organic matter)');
    }
    
    if (analysis.elevation < 200) {
      recommendations.push('Consider raised bed cultivation for better drainage');
    }
    
    if (analysis.rainfall > 3000) {
      recommendations.push('Ensure proper drainage and fungal disease management');
    }
    
    return recommendations;
  }
}