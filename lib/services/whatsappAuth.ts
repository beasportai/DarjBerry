import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export interface WhatsAppAuthToken {
  id: string;
  phoneNumber: string;
  token: string;
  expiresAt: Date;
  used: boolean;
  createdAt: Date;
}

export interface WhatsAppUserInfo {
  phoneNumber: string;
  name?: string;
  profilePicture?: string;
  whatsappId: string;
}

class WhatsAppAuthService {
  private readonly tokenExpiryMinutes = 15;
  private readonly baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  /**
   * Generate a secure authentication token and create WhatsApp message link
   */
  async generateAuthFlow(phoneNumber: string): Promise<{
    whatsappUrl: string;
    token: string;
    expiresAt: Date;
  }> {
    // Generate secure token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + this.tokenExpiryMinutes * 60 * 1000);

    // Store token in database
    await prisma.whatsAppAuthToken.create({
      data: {
        phoneNumber,
        token,
        expiresAt,
        used: false
      }
    });

    // Create authentication URL that user will receive
    const authUrl = `${this.baseUrl}/auth/whatsapp/callback?token=${token}`;

    // Create pre-filled WhatsApp message
    const message = `🫐 *Darjberry Authentication*\n\nHi! I want to access my Darjberry account.\n\nAuth Code: ${token.substring(0, 8).toUpperCase()}\n\n_This is an automated authentication request._`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappBusinessNumber = process.env.WHATSAPP_BUSINESS_PHONE || '+917047474942';
    const cleanBusinessNumber = whatsappBusinessNumber.replace(/[^\d]/g, '');
    
    const whatsappUrl = `https://wa.me/${cleanBusinessNumber}?text=${encodedMessage}`;

    return {
      whatsappUrl,
      token,
      expiresAt
    };
  }

  /**
   * Verify authentication token and return user info
   */
  async verifyAuthToken(token: string): Promise<WhatsAppUserInfo | null> {
    const authToken = await prisma.whatsAppAuthToken.findUnique({
      where: { token }
    });

    if (!authToken || authToken.used || new Date() > authToken.expiresAt) {
      return null;
    }

    // Mark token as used
    await prisma.whatsAppAuthToken.update({
      where: { id: authToken.id },
      data: { used: true }
    });

    // Get user info from WhatsApp messages or create basic user
    const userInfo = await this.getUserInfoFromWhatsApp(authToken.phoneNumber);
    
    return userInfo;
  }

  /**
   * Handle incoming WhatsApp message and respond with auth link
   */
  async handleWhatsAppMessage(
    phoneNumber: string, 
    message: string, 
    senderInfo: any
  ): Promise<string | null> {
    // Extract auth code from message
    const authCodeMatch = message.match(/Auth Code:\s*([A-F0-9]{8})/i);
    
    if (!authCodeMatch) {
      return "❌ Invalid authentication message format. Please use the link provided on our website.";
    }

    const authCodePrefix = authCodeMatch[1].toLowerCase();
    
    // Find matching token
    const authToken = await prisma.whatsAppAuthToken.findFirst({
      where: {
        phoneNumber,
        used: false,
        expiresAt: {
          gte: new Date()
        },
        token: {
          startsWith: authCodePrefix.toLowerCase()
        }
      }
    });

    if (!authToken) {
      return "❌ Authentication code expired or invalid. Please request a new one from our website.";
    }

    // Store user info from WhatsApp
    await this.storeWhatsAppUserInfo(phoneNumber, senderInfo);

    // Create auth link
    const authUrl = `${this.baseUrl}/auth/whatsapp/callback?token=${authToken.token}`;

    return `✅ *Authentication Confirmed!*\n\nClick the link below to complete your login:\n\n🔗 ${authUrl}\n\n_This link expires in 15 minutes for security._`;
  }

  /**
   * Get user information from WhatsApp interactions
   */
  private async getUserInfoFromWhatsApp(phoneNumber: string): Promise<WhatsAppUserInfo> {
    // Try to get existing user info
    const existingUser = await prisma.whatsAppUser.findUnique({
      where: { phoneNumber }
    });

    return {
      phoneNumber,
      name: existingUser?.name || undefined,
      whatsappId: existingUser?.id || phoneNumber
    };
  }

  /**
   * Store WhatsApp user information from webhook
   */
  private async storeWhatsAppUserInfo(phoneNumber: string, senderInfo: any): Promise<void> {
    const name = senderInfo?.profile?.name || senderInfo?.name;
    const profilePicture = senderInfo?.profile?.picture;

    await prisma.whatsAppUser.upsert({
      where: { phoneNumber },
      update: {
        ...(name && { name }),
        lastInteraction: new Date()
      },
      create: {
        phoneNumber,
        name: name || null,
        state: 'AUTHENTICATING'
      }
    });
  }

  /**
   * Create authenticated session for user
   */
  async createAuthenticatedSession(userInfo: WhatsAppUserInfo): Promise<{
    user: any;
    token: string;
  }> {
    // Find or create user
    let user = await prisma.whatsAppUser.findUnique({
      where: { phoneNumber: userInfo.phoneNumber }
    });

    if (!user) {
      user = await prisma.whatsAppUser.create({
        data: {
          phoneNumber: userInfo.phoneNumber,
          name: userInfo.name,
          state: 'NEW'
        }
      });
    } else if (userInfo.name && !user.name) {
      // Update name if we got it from WhatsApp
      user = await prisma.whatsAppUser.update({
        where: { id: user.id },
        data: { name: userInfo.name }
      });
    }

    // Generate JWT token
    const jwtToken = jwt.sign(
      { 
        userId: user.id, 
        phoneNumber: user.phoneNumber 
      },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    );

    // Create auth session
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    await prisma.authSession.create({
      data: {
        userId: user.id,
        phoneNumber: user.phoneNumber,
        token: jwtToken,
        expiresAt
      }
    });

    return {
      user: {
        id: user.id,
        phoneNumber: user.phoneNumber,
        name: user.name,
        email: user.email,
        state: user.state
      },
      token: jwtToken
    };
  }

  /**
   * Clean up expired tokens
   */
  async cleanupExpiredTokens(): Promise<void> {
    await prisma.whatsAppAuthToken.deleteMany({
      where: {
        expiresAt: {
          lt: new Date()
        }
      }
    });
  }
}

export const whatsappAuthService = new WhatsAppAuthService();

// Helper function to validate phone numbers for WhatsApp
export function validateWhatsAppPhoneNumber(phoneNumber: string): boolean {
  const cleaned = phoneNumber.replace(/[^\d]/g, '');
  
  // Check if it's a valid Indian mobile number
  if (cleaned.length === 10 && /^[6-9]/.test(cleaned)) {
    return true;
  }
  
  // Check if it includes country code
  if (cleaned.length === 12 && cleaned.startsWith('91') && /^91[6-9]/.test(cleaned)) {
    return true;
  }
  
  return false;
}

export function normalizeWhatsAppPhoneNumber(phoneNumber: string): string {
  const cleaned = phoneNumber.replace(/[^\d]/g, '');
  
  if (cleaned.length === 12 && cleaned.startsWith('91')) {
    return cleaned.substring(2); // Remove country code
  }
  
  return cleaned;
}