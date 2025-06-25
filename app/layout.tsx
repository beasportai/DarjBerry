import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ClientContextWrapper from "@/context/client-context-wrapper";

// Setup the sans-serif font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // Create CSS variable
});

// Setup the serif font
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair", // Create CSS variable
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Darjberry - ₹88L Investment → ₹44L+ Annual Tax-Free Returns | Managed Blueberry Farming",
    template: "%s | Darjberry",
  },
  description:
    "Transform your land into a profitable blueberry farm with our complete Done-For-You service. ₹88,00,000 investment for 1 acre → ₹44+ lakhs annual tax-free income from Year 4. 500% ROI over 15 years with expert management included.",
  keywords: [
    "darjberry",
    "managed blueberry farming",
    "agricultural investment India",
    "tax-free farming income",
    "passive income agriculture",
    "polyhouse farming",
    "climate controlled farming",
    "done for you farming",
    "premium blueberry cultivation",
    "northeast india farming"
  ],
  authors: [{ name: "Fursat Farms Private Limited" }],
  creator: "Darjberry",
  publisher: "Fursat Farms Private Limited",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://darjberry.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://darjberry.com",
    title: "Darjberry - Premium Managed Blueberry Farming Investment",
    description: "Join India's leading managed blueberry farming program. Complete Done-For-You service with ₹88L investment generating ₹44L+ annual tax-free returns. Expert management, guaranteed yields, 15-year partnership.",
    siteName: "Darjberry",
    images: [
      {
        url: "/images/hero-desktop.jpg",
        width: 1200,
        height: 630,
        alt: "Darjberry Premium Blueberry Farm - Managed Agricultural Investment",
      },
      {
        url: "/images/Blueberry Plant in a Polyhouse.jpg",
        width: 800,
        height: 600,
        alt: "Climate-Controlled Blueberry Cultivation in Polyhouse",
      },
      {
        url: "/images/Blueberry Rows in Polytunnel in Fruiting Phase.jpg",
        width: 800,
        height: 600,
        alt: "Premium Blueberry Plants in Production Phase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Darjberry - ₹88L → ₹44L+ Annual Tax-Free Returns",
    description: "Transform your land into a profitable blueberry farm with our complete Done-For-You managed farming service.",
    creator: "@darjberry",
    images: ["/images/hero-desktop.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/images/plantito-logo.svg",
        sizes: "32x32",
        type: "image/svg+xml",
      },
      {
        url: "/images/plantito-logo.svg",
        sizes: "16x16",
        type: "image/svg+xml",
      },
    ],
    apple: "/images/plantito-logo.svg",
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
  category: "Agriculture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-darj-cream text-darj-slate antialiased overflow-x-hidden">
        <ClientContextWrapper>
          <Navbar />
          <div className="flex flex-col gap-2 w-full">{children}</div>
          <Footer />
        </ClientContextWrapper>
      </body>
    </html>
  );
}
