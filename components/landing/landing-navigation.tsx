import { Button } from "@/components/ui/button";
import Link from "next/link";

interface NavigationItem {
  label: string;
  href: string;
}

interface LandingNavigationProps {
  brandName: string;
  navigationItems: NavigationItem[];
  ctaText: string;
  onCtaClick?: () => void;
}

const CustomMenuIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="cursor-pointer"
  >
    <path d="M3 6H21" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <path d="M3 12H21" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <path d="M3 18H21" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const LandingNavigation: React.FC<LandingNavigationProps> = ({
  brandName,
}) => {
  return (
    <nav className="absolute top-0 left-0 w-full z-30 flex items-center justify-between px-6 md:px-12 py-8 text-sm font-light tracking-wider">
      {/* Mobile Nav */}
      <div className="md:hidden flex items-center justify-between w-full">
        <CustomMenuIcon />
        <Link 
          href="/"
          className="text-base tracking-[0.15em] font-light text-white uppercase hover:opacity-80 transition-opacity cursor-pointer"
        >
          {brandName}
        </Link>
        <div className="w-6" /> {/* Spacer for centering */}
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex justify-center items-center w-full">
        <Link 
          href="/"
          className="text-xl tracking-[0.2em] font-light text-white uppercase hover:opacity-80 transition-opacity cursor-pointer"
        >
          {brandName}
        </Link>
      </div>
    </nav>
  );
};
