import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ClientContextWrapper from "@/context/client-context-wrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Darjberry - ₹37.5L Annual Returns | Blueberry Farming Investment",
  description: "Join India's premium blueberry farming revolution. ₹6L investment → ₹3.75L annual returns from Year 3. 250 bushes, complete setup, tax-free income.",
  keywords: "darjberry, blueberry farming investment, ₹37.5L returns, agricultural investment, tax free income, northeast india farming",
  icons: {
    icon: [
      { url: '/images/plantito-logo.svg', sizes: '32x32', type: 'image/svg+xml' },
      { url: '/images/plantito-logo.svg', sizes: '16x16', type: 'image/svg+xml' }
    ],
    apple: '/images/plantito-logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} bg-[var(--primary-bg)] ${geistMono.variable} antialiased`}
      >
        <ClientContextWrapper>
          <Navbar />
          <div className="flex flex-col gap-2 wrapper">{children}</div>
          <Footer />
        </ClientContextWrapper>
      </body>
    </html>
  );
}
