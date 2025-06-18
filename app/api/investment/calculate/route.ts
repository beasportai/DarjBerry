import { NextRequest, NextResponse } from 'next/server';
import { InvestmentCalculator } from '@/lib/investment-calculator';

export async function POST(request: NextRequest) {
  try {
    const { acres, location, includeSubsidies = false, compareWithTea = false } = await request.json();

    if (!acres || acres <= 0) {
      return NextResponse.json(
        { error: 'Valid acres value is required' },
        { status: 400 }
      );
    }

    if (acres > 100) {
      return NextResponse.json(
        { error: 'Maximum 100 acres supported' },
        { status: 400 }
      );
    }

    const calculation = InvestmentCalculator.calculate(acres);
    const scaleRecommendation = InvestmentCalculator.getScaleRecommendation(acres);
    
    let subsidyBenefit = null;
    if (includeSubsidies) {
      subsidyBenefit = InvestmentCalculator.calculateSubsidyBenefit(calculation);
    }

    let teaComparison = null;
    if (compareWithTea) {
      teaComparison = InvestmentCalculator.compareWithTeaEstate(acres);
    }

    return NextResponse.json({
      calculation,
      scaleRecommendation,
      subsidyBenefit,
      teaComparison,
      location,
    });
  } catch (error) {
    console.error('Investment calculation error:', error);
    return NextResponse.json(
      { error: 'Failed to calculate investment' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Investment calculation endpoint',
    usage: 'POST with acres, optional location, includeSubsidies, compareWithTea',
    example: {
      acres: 1.5,
      location: 'Darjeeling',
      includeSubsidies: true,
      compareWithTea: true,
    },
  });
}