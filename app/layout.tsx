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
  title: "Darjberry - ₹37.5L Annual Returns | Blueberry Farming Investment",
  description:
    "Join India's premium blueberry farming revolution. ₹6L investment → ₹3.75L annual returns from Year 3. 250 bushes, complete setup, tax-free income.",
  keywords:
    "darjberry, blueberry farming investment, ₹37.5L returns, agricultural investment, tax free income, northeast india farming",
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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-darj-cream text-darj-slate antialiased">
        <ClientContextWrapper>
          <Navbar />
          <div className="flex flex-col gap-2 wrapper">{children}</div>
          <Footer />
        </ClientContextWrapper>
      </body>
    </html>
  );
}
