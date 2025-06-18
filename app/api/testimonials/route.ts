import { NextResponse } from 'next/server';

// In a real implementation, this would connect to a database
// For now, we'll use a simple in-memory store
let testimonials: any[] = [
  {
    id: 1,
    name: "Gourish Shetty",
    location: "Mahabaleshwar, Maharashtra",
    phone: "+91XXXXXXXXXX",
    rating: 5,
    review: "Started blueberry farming in 2019 with 2 acres. Now earning ₹40+ lakhs annually. The health benefits trend drove demand beyond our expectations!",
    verified: true,
    source: "Economic Times, 2023",
    dateSubmitted: "2023-12-01",
    approved: true
  }
];

export async function GET() {
  // Return only approved testimonials for public display
  const approvedTestimonials = testimonials.filter(t => t.approved);
  
  return NextResponse.json({
    success: true,
    testimonials: approvedTestimonials,
    count: approvedTestimonials.length
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, location, phone, rating, review, investment_amount, investment_type } = body;

    // Validate required fields
    if (!name || !location || !phone || !rating || !review) {
      return NextResponse.json(
        { error: 'Missing required fields: name, location, phone, rating, review' },
        { status: 400 }
      );
    }

    // Validate rating
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    // Create new testimonial
    const newTestimonial = {
      id: Date.now(),
      name,
      location,
      phone,
      rating,
      review,
      investment_amount,
      investment_type,
      verified: false,
      approved: false, // Requires admin approval
      dateSubmitted: new Date().toISOString(),
      source: "Darjberry Platform"
    };

    // Add to testimonials array (in real app, save to database)
    testimonials.push(newTestimonial);

    // Send notification to admin (in real app, use email/SMS service)
    console.log('New testimonial submitted:', {
      name,
      location,
      rating,
      phone: phone.substring(0, 6) + '****' // Mask phone for logging
    });

    return NextResponse.json({
      success: true,
      message: 'Testimonial submitted successfully. It will be reviewed before publication.',
      testimonialId: newTestimonial.id
    });

  } catch (error) {
    console.error('Testimonial submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit testimonial' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { testimonialId, action, adminKey } = body;

    // Simple admin authentication (in real app, use proper auth)
    if (adminKey !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const testimonialIndex = testimonials.findIndex(t => t.id === testimonialId);
    
    if (testimonialIndex === -1) {
      return NextResponse.json(
        { error: 'Testimonial not found' },
        { status: 404 }
      );
    }

    switch (action) {
      case 'approve':
        testimonials[testimonialIndex].approved = true;
        break;
      case 'reject':
        testimonials[testimonialIndex].approved = false;
        break;
      case 'verify':
        testimonials[testimonialIndex].verified = true;
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid action. Use approve, reject, or verify' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      message: `Testimonial ${action}ed successfully`,
      testimonial: testimonials[testimonialIndex]
    });

  } catch (error) {
    console.error('Testimonial update error:', error);
    return NextResponse.json(
      { error: 'Failed to update testimonial' },
      { status: 500 }
    );
  }
}