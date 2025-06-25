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
    "Turn your idle land into a cash flow asset. Professional managed blueberry farming with 500% ROI, tax-free income, and complete Done-For-You service. Transform unused land into passive agricultural wealth.",
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
    description: "Turn your idle land into a cash flow asset. Professional managed blueberry farming with 500% ROI, tax-free income, and complete Done-For-You service. Transform unused land into passive agricultural wealth.",
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
    description: "Turn your idle land into a cash flow asset. Professional managed blueberry farming with 500% ROI and tax-free income.",
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
        url: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
    apple: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  manifest: "/manifest.json",
  category: "Agriculture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Darjberry",
    "legalName": "Fursat Farms Private Limited",
    "url": "https://darjberry.com",
    "logo": "https://darjberry.com/images/plantito-logo.svg",
    "description": "Turn your idle land into a cash flow asset. Professional managed blueberry farming with 500% ROI, tax-free income, and complete Done-For-You service. Transform unused land into passive agricultural wealth.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "3rd Floor, Dwarika Heights, Near Vega Circle Sevoke Road",
      "addressLocality": "Siliguri",
      "addressRegion": "West Bengal",
      "postalCode": "734005",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-7047-474-942",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["English", "Hindi", "Bengali"]
    },
    "sameAs": [
      "https://www.facebook.com/darjberry",
      "https://www.instagram.com/darjberry",
      "https://www.linkedin.com/company/darjberry"
    ]
  };

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#134e4a" />
        <link rel="canonical" href="https://darjberry.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
