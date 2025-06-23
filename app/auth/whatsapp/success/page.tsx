'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { AuthProvider, useAuth } from '@/lib/contexts/AuthContext';

function WhatsAppSuccessContent() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    const userData = searchParams.get('user');

    if (!token || !userData) {
      setError('Invalid authentication data');
      setLoading(false);
      return;
    }

    try {
      // Store the authentication token
      localStorage.setItem('auth_token', token);
      
      // Parse user data
      const parsedUser = JSON.parse(decodeURIComponent(userData));
      
      // Auto-login success
      setLoading(false);
      
      // Redirect to dashboard after a brief success message
      setTimeout(() => {
        router.push('/dashboard');
      }, 3000);

    } catch (err) {
      console.error('Auth success error:', err);
      setError('Failed to process authentication');
      setLoading(false);
    }
  }, [searchParams, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Completing Authentication...</h2>
          <p className="text-gray-600">Please wait while we set up your account.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Failed</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push('/auth/demo')}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Success Animation */}
        <div className="relative mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto animate-pulse">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="absolute inset-0 w-20 h-20 mx-auto rounded-full border-4 border-green-200 animate-ping"></div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          🎉 Welcome to Darjberry!
        </h1>
        
        <p className="text-gray-600 mb-6">
          Your WhatsApp authentication was successful! We've logged you in automatically.
        </p>

        {user && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-3">Account Details:</h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium text-gray-700">Phone:</span>
                <span className="ml-2 text-gray-900">+91 {user.phoneNumber}</span>
              </div>
              {user.name && (
                <div>
                  <span className="font-medium text-gray-700">Name:</span>
                  <span className="ml-2 text-gray-900">{user.name}</span>
                </div>
              )}
              <div>
                <span className="font-medium text-gray-700">Status:</span>
                <span className="ml-2 text-green-600 font-medium">✅ Authenticated</span>
              </div>
            </div>
          </div>
        )}

        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-blue-900 mb-2">What's Next?</h4>
          <ul className="text-sm text-blue-800 text-left space-y-1">
            <li>✨ Access your personalized dashboard</li>
            <li>🌱 Start your blueberry farming journey</li>
            <li>📊 Track your investments and returns</li>
            <li>💬 Continue chatting with us on WhatsApp</li>
          </ul>
        </div>

        <div className="text-sm text-gray-500 mb-4">
          Redirecting to your dashboard in <span className="font-medium">3 seconds</span>...
        </div>

        <button
          onClick={() => router.push('/dashboard')}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
        >
          Go to Dashboard Now
        </button>

        <div className="mt-6 text-xs text-gray-500">
          🔒 Your account is secured with WhatsApp verification
        </div>
      </div>
    </div>
  );
}

export default function WhatsAppAuthSuccess() {
  return (
    <AuthProvider>
      <WhatsAppSuccessContent />
    </AuthProvider>
  );
}