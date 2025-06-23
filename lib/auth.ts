import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import { otpService, validatePhoneNumber, normalizePhoneNumber } from '@/lib/services/otpService';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'otp',
      name: 'OTP',
      credentials: {
        phoneNumber: { label: 'Phone Number', type: 'text' },
        otp: { label: 'OTP', type: 'text' }
      },
      async authorize(credentials) {
        if (!credentials?.phoneNumber || !credentials?.otp) {
          throw new Error('Phone number and OTP are required');
        }

        const phoneNumber = normalizePhoneNumber(credentials.phoneNumber);
        
        if (!validatePhoneNumber(phoneNumber)) {
          throw new Error('Invalid phone number format');
        }

        // Verify OTP
        const isValid = await otpService.verify(phoneNumber, credentials.otp);
        
        if (!isValid) {
          throw new Error('Invalid or expired OTP');
        }

        // Find or create user
        let user = await prisma.whatsAppUser.findUnique({
          where: { phoneNumber }
        });

        if (!user) {
          user = await prisma.whatsAppUser.create({
            data: {
              phoneNumber,
              state: 'NEW'
            }
          });
        }

        return {
          id: user.id,
          phoneNumber: user.phoneNumber,
          name: user.name,
          email: user.email,
          state: user.state
        };
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.phoneNumber = (user as any).phoneNumber;
        token.state = (user as any).state;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).phoneNumber = token.phoneNumber;
        (session.user as any).state = token.state;
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error'
  },
  secret: process.env.NEXTAUTH_SECRET
};

// Helper function to get user session
export async function getUserFromToken(token: string) {
  try {
    const session = await prisma.authSession.findUnique({
      where: { token }
    });

    if (!session || new Date() > session.expiresAt) {
      return null;
    }

    const user = await prisma.whatsAppUser.findUnique({
      where: { id: session.userId }
    });

    return user;
  } catch (error) {
    console.error('Get user from token error:', error);
    return null;
  }
}