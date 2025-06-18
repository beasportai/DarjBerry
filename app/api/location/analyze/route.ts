import { NextResponse } from 'next/server';
import { GeospatialService } from '@/lib/geospatial';

const geospatialService = new GeospatialService(process.env.RAPIDAPI_KEY || '');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { latitude, longitude, source } = body;

    if (!latitude || !longitude) {
      return NextResponse.json({ 
        error: 'Latitude and longitude are required' 
      }, { status: 400 });
    }

    // Validate coordinates
    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
      return NextResponse.json({ 
        error: 'Invalid coordinates' 
      }, { status: 400 });
    }

    const analysis = await geospatialService.analyzeLocation(latitude, longitude);
    const whatsappMessage = geospatialService.generateWhatsAppMessage(analysis);

    // Log the analysis for tracking
    console.log('Location Analysis:', {
      location: analysis.location,
      suitability: analysis.overallSuitability,
      source: source || 'unknown',
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      analysis,
      whatsappMessage,
      recommendations: {
        primaryAction: analysis.overallSuitability === 'EXCELLENT' || analysis.overallSuitability === 'GOOD' 
          ? 'START_INVESTMENT' 
          : 'CONSULT_EXPERT',
        suggestedPlan: analysis.overallSuitability === 'EXCELLENT' 
          ? 'lumpsum3L' 
          : 'dailySIP',
        urgency: analysis.overallSuitability === 'EXCELLENT' ? 'HIGH' : 'MEDIUM'
      }
    });

  } catch (error) {
    console.error('Location analysis error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to analyze location', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = parseFloat(searchParams.get('lat') || '0');
    const lng = parseFloat(searchParams.get('lng') || '0');

    if (!lat || !lng) {
      return NextResponse.json({ 
        error: 'Latitude and longitude parameters are required' 
      }, { status: 400 });
    }

    const analysis = await geospatialService.analyzeLocation(lat, lng);

    return NextResponse.json({
      success: true,
      analysis
    });

  } catch (error) {
    console.error('Location analysis error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to analyze location', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}