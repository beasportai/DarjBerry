'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';

const ERROR_MESSAGES = {
  missing_token: 'Authentication link is missing required information',
  invalid_or_expired_token: 'Authentication link has expired or is invalid',
  server_error: 'Server error occurred during authentication',
  default: 'Authentication failed due to unknown error'
};

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const errorType = searchParams.get('error') as keyof typeof ERROR_MESSAGES || 'default';
  const errorMessage = ERROR_MESSAGES[errorType] || ERROR_MESSAGES.default;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Authentication Error
        </h1>
        
        <p className="text-gray-600 mb-6">
          {errorMessage}
        </p>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">What can you do?</h3>
          <ul className="text-sm text-gray-700 text-left space-y-2">
            <li>🔄 Try requesting a new authentication link</li>
            <li>📱 Make sure you're using the latest link from WhatsApp</li>
            <li>⏰ Authentication links expire after 15 minutes</li>
            <li>💬 Contact us on WhatsApp if the problem persists</li>
          </ul>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => router.push('/auth/demo')}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          >
            Try Authentication Again
          </button>

          <button
            onClick={() => router.push('/')}
            className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Back to Home
          </button>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Need Help?</strong> Contact us on WhatsApp:{' '}
            <a 
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_BUSINESS_PHONE || '917047474942'}`}
              className="underline hover:no-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              +91 70474 74942
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AuthError() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center"><div>Loading...</div></div>}>
      <AuthErrorContent />
    </Suspense>
  );
}