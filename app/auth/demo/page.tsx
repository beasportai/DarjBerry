'use client';

import { useState } from 'react';
import { AuthProvider, useAuth } from '@/lib/contexts/AuthContext';
import LoginForm from '@/components/auth/LoginForm';
import WhatsAppLoginForm from '@/components/auth/WhatsAppLoginForm';

function AuthDemoContent() {
  const { user, logout, loading } = useAuth();
  const [authMethod, setAuthMethod] = useState<'whatsapp' | 'otp'>('whatsapp');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Darjberry Authentication Demo
            </h1>
            <p className="text-gray-600 mb-6">
              Choose your preferred authentication method
            </p>
            
            {/* Method Selection */}
            <div className="flex justify-center mb-8">
              <div className="bg-white rounded-lg p-2 shadow-md">
                <button
                  onClick={() => setAuthMethod('whatsapp')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    authMethod === 'whatsapp'
                      ? 'bg-green-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  WhatsApp Login
                </button>
                <button
                  onClick={() => setAuthMethod('otp')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    authMethod === 'otp'
                      ? 'bg-green-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  SMS OTP
                </button>
              </div>
            </div>
          </div>
          
          {authMethod === 'whatsapp' ? <WhatsAppLoginForm /> : <LoginForm />}
          
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              {authMethod === 'whatsapp' ? 'WhatsApp Authentication:' : 'SMS OTP Authentication:'}
            </h3>
            {authMethod === 'whatsapp' ? (
              <div className="text-blue-800 text-sm space-y-1">
                <p>• More secure and user-friendly than traditional OTP</p>
                <p>• No need to remember passwords or wait for SMS</p>
                <p>• Direct communication channel for farm updates</p>
                <p>• Works with your existing WhatsApp account</p>
              </div>
            ) : (
              <div className="text-blue-800 text-sm space-y-1">
                <p>• Traditional SMS-based OTP authentication</p>
                <p>• In development mode, OTP codes are logged to the console</p>
                <p>• Check the browser console after requesting an OTP</p>
                <p>• Good fallback for users without WhatsApp</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome to Darjberry!
            </h1>
            <button
              onClick={logout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              User Profile
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  User ID
                </label>
                <p className="text-gray-900 font-mono text-sm">{user.id}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <p className="text-gray-900">+91 {user.phoneNumber}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <p className="text-gray-900">{user.name || 'Not provided'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <p className="text-gray-900">{user.email || 'Not provided'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <p className="text-gray-900">{user.state}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Authentication Status
            </h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="text-gray-900">Authenticated</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="text-gray-900">Session Active</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="text-gray-900">OTP Verified</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <h3 className="text-sm font-semibold text-green-900 mb-2">
                Authentication Features Implemented:
              </h3>
              <ul className="text-sm text-green-800 space-y-1">
                <li>✅ WhatsApp-based authentication with secure links</li>
                <li>✅ SMS OTP fallback system</li>
                <li>✅ Secure token generation (15 min expiry)</li>
                <li>✅ WhatsApp Business API integration</li>
                <li>✅ Automatic user info collection from WhatsApp</li>
                <li>✅ JWT token-based sessions (24 hours)</li>
                <li>✅ Rate limiting (5 attempts per 15 min)</li>
                <li>✅ Phone number validation</li>
                <li>✅ Session management & protected routes</li>
                <li>✅ Multiple authentication methods</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Available API Endpoints
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">WhatsApp Authentication:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li><code className="bg-gray-100 px-2 py-1 rounded">POST /api/auth/whatsapp/initiate</code></li>
                <li><code className="bg-gray-100 px-2 py-1 rounded">GET /api/auth/whatsapp/callback</code></li>
                <li><code className="bg-gray-100 px-2 py-1 rounded">POST /api/whatsapp/webhook</code></li>
              </ul>
              
              <h3 className="font-semibold text-gray-900 mb-2 mt-4">SMS OTP Authentication:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li><code className="bg-gray-100 px-2 py-1 rounded">POST /api/auth/send-otp</code></li>
                <li><code className="bg-gray-100 px-2 py-1 rounded">POST /api/auth/verify-otp</code></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">User Management:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li><code className="bg-gray-100 px-2 py-1 rounded">POST /api/auth/logout</code></li>
                <li><code className="bg-gray-100 px-2 py-1 rounded">GET /api/auth/profile</code></li>
                <li><code className="bg-gray-100 px-2 py-1 rounded">PUT /api/auth/profile</code></li>
              </ul>
              
              <h3 className="font-semibold text-gray-900 mb-2 mt-4">NextAuth.js:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li><code className="bg-gray-100 px-2 py-1 rounded">GET /api/auth/[...nextauth]</code></li>
                <li><code className="bg-gray-100 px-2 py-1 rounded">POST /api/auth/[...nextauth]</code></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthDemo() {
  return (
    <AuthProvider>
      <AuthDemoContent />
    </AuthProvider>
  );
}