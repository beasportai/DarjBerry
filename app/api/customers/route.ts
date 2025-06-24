import { NextRequest, NextResponse } from 'next/server';
import { customerService } from '@/lib/services/customerService';
import { authenticateRequest } from '@/lib/middleware/auth';
import { checkRateLimit } from '@/lib/middleware/auth';

export async function GET(request: NextRequest) {
  try {
    // Check rate limit
    const clientIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const withinLimit = await checkRateLimit(clientIP, 100, 15);
    
    if (!withinLimit) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      );
    }

    // Authentication required for listing customers
    const user = await authenticateRequest(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    
    // Pagination parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);

    // Filter parameters
    const state = searchParams.get('state') || undefined;
    const landType = searchParams.get('landType') || undefined;
    const leadScoreMin = searchParams.get('leadScoreMin') 
      ? parseInt(searchParams.get('leadScoreMin')!) 
      : undefined;
    const leadScoreMax = searchParams.get('leadScoreMax') 
      ? parseInt(searchParams.get('leadScoreMax')!) 
      : undefined;

    const result = await customerService.getAll(page, limit, {
      state,
      landType,
      leadScoreMin,
      leadScoreMax
    });

    return NextResponse.json({
      success: true,
      data: result.customers,
      pagination: {
        page,
        limit,
        total: result.total,
        totalPages: result.totalPages
      }
    });

  } catch (error) {
    console.error('Get customers error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check rate limit
    const clientIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const withinLimit = await checkRateLimit(clientIP, 10, 15);
    
    if (!withinLimit) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      );
    }

    const { phoneNumber, name, email, location, landSize, landType, referredBy } = await request.json();

    // Validation
    if (!phoneNumber) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      );
    }

    const customer = await customerService.create({
      phoneNumber,
      name,
      email,
      location,
      landSize: landSize ? parseFloat(landSize) : undefined,
      landType,
      referredBy
    });

    return NextResponse.json({
      success: true,
      message: 'Customer created successfully',
      data: customer
    }, { status: 201 });

  } catch (error) {
    console.error('Create customer error:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('already exists')) {
        return NextResponse.json(
          { error: 'Customer with this phone number already exists' },
          { status: 409 }
        );
      }
      if (error.message.includes('Invalid')) {
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}