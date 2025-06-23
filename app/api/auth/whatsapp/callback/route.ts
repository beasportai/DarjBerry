import { NextRequest, NextResponse } from 'next/server';
import { whatsappAuthService } from '@/lib/services/whatsappAuth';
import { redirect } from 'next/navigation';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.redirect(
        new URL('/auth/error?error=missing_token', request.url)
      );
    }

    // Verify the authentication token
    const userInfo = await whatsappAuthService.verifyAuthToken(token);

    if (!userInfo) {
      return NextResponse.redirect(
        new URL('/auth/error?error=invalid_or_expired_token', request.url)
      );
    }

    // Create authenticated session
    const { user, token: jwtToken } = await whatsappAuthService.createAuthenticatedSession(userInfo);

    // Create a success page with auto-login
    const successUrl = new URL('/auth/whatsapp/success', request.url);
    successUrl.searchParams.set('token', jwtToken);
    successUrl.searchParams.set('user', encodeURIComponent(JSON.stringify(user)));

    return NextResponse.redirect(successUrl);

  } catch (error) {
    console.error('WhatsApp auth callback error:', error);
    return NextResponse.redirect(
      new URL('/auth/error?error=server_error', request.url)
    );
  }
}