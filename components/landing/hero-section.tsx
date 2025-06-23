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
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 z-10" />

        {/* Captions - Left */}
        <div className="absolute top-6 left-6 md:top-auto md:left-12 md:bottom-12 text-xs md:text-sm max-w-[180px] z-20">
          <div className="text-lg">★★★★★</div>
          <p className="mt-2 leading-snug">
            Transform your land into a profitable blueberry farm
          </p>
        </div>

        {/* Captions - Right */}
        <div className="absolute top-6 right-6 md:top-auto md:right-12 md:bottom-12 text-xs md:text-sm max-w-[180px] text-right z-20">
          <div className="text-lg">★★★★★</div>
          <p className="mt-2 leading-snug">
            Complete done-for-you service with 500% ROI guarantee
          </p>
        </div>

        {/* Hero Text */}
        <div className="relative z-20 flex flex-col justify-center items-center h-full px-6 text-center">
          <h1 className="text-[3.5rem] md:text-[6rem] leading-[1] font-light">
            <span className="block font-sans">Simple</span>
            <span className="block font-serif italic -mt-4">things</span>
          </h1>
          <p className="mt-6 text-sm md:text-base max-w-xl">
            <strong>Transform your unused land</strong> into a passive income
            engine with our complete "Done-For-You" blueberry farming service
          </p>
          <p className="mt-2 text-sm md:text-base max-w-xl">
            Supported by expert agronomy and guaranteed sales, Darjberry works
            to restore nature, create wealth, and promote sustainable farming
            for a greener future.
          </p>

          {/* CTA Button */}
          <div className="mt-8">
            <Button
              size="lg"
              className="bg-darj-accent hover:bg-darj-accent/90 text-darj-slate font-semibold py-4 px-8 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={onCtaClick}
            >
              {ctaText}
            </Button>
          </div>
        </div>
      </div>

      {/* Image Grid Section */}
      <section className="grid grid-cols-2 md:grid-cols-6 gap-1 md:gap-2 px-2 py-4 bg-white">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="aspect-square relative">
            <Image
              src={`/images/leaf${n}.png`}
              alt={`Blueberry farming ${n}`}
              fill
              className="object-cover rounded"
            />
          </div>
        ))}
      </section>
    </>
  );
};
