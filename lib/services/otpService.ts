import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface OTPService {
  generate(): string;
  create(phoneNumber: string): Promise<string>;
  verify(phoneNumber: string, otp: string): Promise<boolean>;
  isExpired(phoneNumber: string, otp: string): Promise<boolean>;
  getAttemptsCount(phoneNumber: string): Promise<number>;
  incrementAttempts(phoneNumber: string): Promise<void>;
  resetAttempts(phoneNumber: string): Promise<void>;
}

export interface RateLimiter {
  checkLimit(phoneNumber: string): Promise<boolean>;
  incrementCounter(phoneNumber: string): Promise<void>;
  resetCounter(phoneNumber: string): Promise<void>;
}

class PrismaOTPService implements OTPService {
  generate(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async create(phoneNumber: string): Promise<string> {
    const otp = this.generate();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Delete any existing OTPs for this phone number
    await prisma.oTP.deleteMany({
      where: { phoneNumber }
    });

    // Create new OTP
    await prisma.oTP.create({
      data: {
        phoneNumber,
        otp,
        expiresAt,
        attempts: 0
      }
    });

    return otp;
  }

  async verify(phoneNumber: string, otp: string): Promise<boolean> {
    const otpRecord = await prisma.oTP.findFirst({
      where: { phoneNumber, otp }
    });

    if (!otpRecord) return false;

    const isExpired = await this.isExpired(phoneNumber, otp);
    if (isExpired) return false;

    // Clear OTP after successful verification
    await prisma.oTP.deleteMany({
      where: { phoneNumber }
    });

    return true;
  }

  async isExpired(phoneNumber: string, otp: string): Promise<boolean> {
    const otpRecord = await prisma.oTP.findFirst({
      where: { phoneNumber, otp }
    });

    if (!otpRecord) return true;

    return new Date() > otpRecord.expiresAt;
  }

  async getAttemptsCount(phoneNumber: string): Promise<number> {
    const otpRecord = await prisma.oTP.findFirst({
      where: { phoneNumber }
    });

    return otpRecord?.attempts || 0;
  }

  async incrementAttempts(phoneNumber: string): Promise<void> {
    await prisma.oTP.updateMany({
      where: { phoneNumber },
      data: {
        attempts: {
          increment: 1
        }
      }
    });
  }

  async resetAttempts(phoneNumber: string): Promise<void> {
    await prisma.oTP.updateMany({
      where: { phoneNumber },
      data: {
        attempts: 0
      }
    });
  }
}

class PrismaRateLimiter implements RateLimiter {
  private readonly maxAttempts = 5;
  private readonly windowMinutes = 15;

  async checkLimit(phoneNumber: string): Promise<boolean> {
    const record = await prisma.rateLimitRecord.findFirst({
      where: { phoneNumber }
    });

    if (!record) return true;

    const now = new Date();
    if (now > record.resetTime) {
      // Window expired, delete the record
      await prisma.rateLimitRecord.delete({
        where: { id: record.id }
      });
      return true;
    }

    return record.count < this.maxAttempts;
  }

  async incrementCounter(phoneNumber: string): Promise<void> {
    const now = new Date();
    const resetTime = new Date(now.getTime() + this.windowMinutes * 60 * 1000);

    const existingRecord = await prisma.rateLimitRecord.findFirst({
      where: { phoneNumber }
    });

    if (!existingRecord || now > existingRecord.resetTime) {
      // Create new record or reset expired one
      await prisma.rateLimitRecord.deleteMany({
        where: { phoneNumber }
      });
      
      await prisma.rateLimitRecord.create({
        data: {
          phoneNumber,
          count: 1,
          resetTime
        }
      });
    } else {
      // Increment existing record
      await prisma.rateLimitRecord.update({
        where: { id: existingRecord.id },
        data: {
          count: {
            increment: 1
          }
        }
      });
    }
  }

  async resetCounter(phoneNumber: string): Promise<void> {
    await prisma.rateLimitRecord.deleteMany({
      where: { phoneNumber }
    });
  }
}

// Singleton instances
export const otpService = new PrismaOTPService();
export const rateLimiter = new PrismaRateLimiter();

// Phone number validation
export function validatePhoneNumber(phoneNumber: string): boolean {
  // Clean the phone number
  const cleaned = phoneNumber.replace(/^\+91/, '').replace(/^91/, '');
  
  // Check if it matches Indian mobile number pattern
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(cleaned);
}

export function normalizePhoneNumber(phoneNumber: string): string {
  // Remove country code and return 10-digit number
  return phoneNumber.replace(/^\+91/, '').replace(/^91/, '');
}

// SMS service integration (placeholder - implement with your SMS provider)
export async function sendOTP(phoneNumber: string, otp: string): Promise<boolean> {
  try {
    // TODO: Integrate with SMS provider (Twilio, TextLocal, etc.)
    console.log(`SMS: Sending OTP ${otp} to ${phoneNumber}`);
    
    // For development, just log the OTP
    if (process.env.NODE_ENV === 'development') {
      console.log(`Development Mode - OTP for ${phoneNumber}: ${otp}`);
      return true;
    }

    // In production, integrate with actual SMS service
    // Example with fetch to SMS provider API:
    // const response = await fetch('https://api.sms-provider.com/send', {
    //   method: 'POST',
    //   headers: { 'Authorization': `Bearer ${process.env.SMS_API_KEY}` },
    //   body: JSON.stringify({
    //     to: phoneNumber,
    //     message: `Your Darjberry verification code is: ${otp}. Valid for 10 minutes.`
    //   })
    // });
    // 
    // return response.ok;

    return true;
  } catch (error) {
    console.error('Failed to send OTP:', error);
    return false;
  }
}

// WhatsApp integration for OTP (optional)
export async function sendOTPViaWhatsApp(phoneNumber: string, otp: string): Promise<boolean> {
  try {
    // TODO: Integrate with WhatsApp Business API
    console.log(`WhatsApp: Sending OTP ${otp} to ${phoneNumber}`);
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`Development Mode - WhatsApp OTP for ${phoneNumber}: ${otp}`);
      return true;
    }

    // In production, integrate with WhatsApp Business API
    return true;
  } catch (error) {
    console.error('Failed to send WhatsApp OTP:', error);
    return false;
  }
}