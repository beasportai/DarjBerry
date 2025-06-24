"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  onCtaClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  ctaText,
  onCtaClick,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const bgImage = isMobile
    ? "/images/hero-mobile.jpg"
    : "/images/hero-desktop.jpg";

  return (
    <>
      <div className="relative w-full h-screen text-white overflow-hidden font-sans">
        {/* Background Image */}
        <Image
          src={bgImage}
          alt="Darjberry blueberry farming landscape"
          fill
          priority
          className="object-cover object-center z-0"
          sizes="100vw"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 z-10" />

        {/* Desktop Captions - Hidden on mobile */}
        <div className="absolute bottom-12 left-6 md:left-12 text-xs md:text-sm max-w-[250px] z-20 hidden md:block">
          <div className="text-base mb-2">★★★★★</div>
          <p className="leading-relaxed text-xs md:text-sm opacity-90">
            Transform your land into a profitable blueberry farm
          </p>
        </div>

        <div className="absolute bottom-12 right-6 md:right-12 text-xs md:text-sm max-w-[250px] text-right z-20 hidden md:block">
          <div className="text-base mb-2">★★★★★</div>
          <p className="leading-relaxed text-xs md:text-sm opacity-90">
            Complete done-for-you service with 500% ROI guarantee
          </p>
        </div>

        {/* Mobile Star Rating - Only visible on mobile, positioned absolutely */}
        <div className="block md:hidden absolute left-4 top-[12%] z-20 py-2">
          <div className="text-base mb-2">★★★★★</div>
          <p className="text-xs opacity-90 max-w-[70%] leading-relaxed">
            Transform your land into a profitable blueberry farm
          </p>
        </div>

        {/* Hero Text */}
        <div className="relative z-20 flex flex-col justify-center items-center h-full px-4 md:px-6 text-center">
          <div className="py-4 md:py-0">
            <h1 className="text-[4rem] md:text-[7rem] leading-[0.85] font-light mb-2 md:mb-0">
              <span className="block font-sans">Blueberry</span>
              <span className="block font-serif italic -mt-2 md:-mt-4">
                wealth
              </span>
            </h1>
          </div>
          
          <div className="mt-4 md:mt-12 text-center py-3 md:py-0">
            <p className="text-sm md:text-base leading-relaxed px-2">
              <span className="block mb-2">
                <strong>Transform your unused land</strong> into a passive income
              </span>
              <span className="block">
                engine with our complete "Done-For-You" blueberry farming service
              </span>
            </p>
          </div>
          
          <div className="mt-4 md:mt-8 text-xs md:text-sm max-w-2xl opacity-80 text-center px-4 md:px-6 py-2 md:py-0">
            <p className="leading-relaxed">
              Supported by expert agronomist with 25+ years of experience working for DS GROUP, IG INTERNATIONAL & FARM2FAM. Growing on over 100 acres.
            </p>
          </div>

          {/* CTA Button */}
          <div className="mt-8 md:mt-8 text-center py-4 md:py-0">
            <Button
              size="lg"
              className="bg-darj-accent hover:bg-darj-accent/90 text-darj-slate font-semibold py-4 px-8 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={onCtaClick}
            >
              Start Your Farm Today
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
