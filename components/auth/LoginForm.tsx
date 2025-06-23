'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/contexts/AuthContext';

export default function LoginForm() {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const { sendOTP, login } = useAuth();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic phone number validation
    const cleaned = phoneNumber.replace(/\D/g, '');
    if (cleaned.length !== 10 || !cleaned.match(/^[6-9]/)) {
      setError('Please enter a valid 10-digit Indian mobile number');
      setLoading(false);
      return;
    }

    const success = await sendOTP(phoneNumber);
    
    if (success) {
      setStep('otp');
      setOtpSent(true);
    } else {
      setError('Failed to send OTP. Please try again.');
    }
    
    setLoading(false);
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      setLoading(false);
      return;
    }

    const success = await login(phoneNumber, otp);
    
    if (success) {
      // Login successful - the AuthContext will handle state updates
    } else {
      setError('Invalid or expired OTP. Please try again.');
    }
    
    setLoading(false);
  };

  const handleResendOTP = async () => {
    setLoading(true);
    setError('');
    
    const success = await sendOTP(phoneNumber);
    
    if (success) {
      setError('');
      // Show success message briefly
      setOtpSent(true);
    } else {
      setError('Failed to resend OTP. Please try again.');
    }
    
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {step === 'phone' ? 'Sign In' : 'Verify OTP'}
        </h2>
        <p className="text-gray-600 mt-2">
          {step === 'phone' 
            ? 'Enter your phone number to get started'
            : `Enter the OTP sent to ${phoneNumber}`
          }
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {step === 'phone' ? (
        <form onSubmit={handleSendOTP}>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">+91</span>
              <input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                className="w-full pl-12 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="9876543210"
                required
                disabled={loading}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || phoneNumber.length !== 10}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOTP}>
          <div className="mb-4">
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
              6-Digit OTP
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-center text-lg tracking-widest"
              placeholder="123456"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={loading}
              className="text-green-600 hover:text-green-700 text-sm font-medium"
            >
              Resend OTP
            </button>
            <span className="mx-2 text-gray-400">•</span>
            <button
              type="button"
              onClick={() => {
                setStep('phone');
                setOtp('');
                setError('');
              }}
              disabled={loading}
              className="text-gray-600 hover:text-gray-700 text-sm font-medium"
            >
              Change Number
            </button>
          </div>
        </form>
      )}

      {otpSent && step === 'otp' && (
        <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded text-sm">
          OTP sent successfully! Please check your messages.
        </div>
      )}

      <div className="mt-6 text-xs text-gray-500 text-center">
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </div>
    </div>
  );
}