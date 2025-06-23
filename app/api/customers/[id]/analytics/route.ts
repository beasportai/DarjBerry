import { NextRequest, NextResponse } from 'next/server';
import { customerService } from '@/lib/services/customerService';
import { authenticateRequest } from '@/lib/middleware/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: 'Customer ID is required' },
        { status: 400 }
      );
    }

    // Authentication required
    const user = await authenticateRequest(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Authorization: users can access their own analytics
    // TODO: Add admin role check
    if (user.id !== id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    const analytics = await customerService.getCustomerAnalytics(id);
    const healthScore = await customerService.calculateCustomerHealth(id);

    return NextResponse.json({
      success: true,
      data: {
        ...analytics,
        healthScore
      }
    });

  } catch (error) {
    console.error('Get customer analytics error:', error);
    
    if (error instanceof Error && error.message.includes('not found')) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}