import { Button } from "@/components/ui/button";

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
  >
    <path
      d="M5 8C5.524 8 8.164 7.4 10.5 8"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path d="M3 12H21" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <path
      d="M5 16C5.524 16 8.164 16.6 10.5 16"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const LandingNavigation: React.FC<LandingNavigationProps> = ({
  brandName,
  navigationItems,
}) => {
  const leftItems = navigationItems.slice(0, 2);
  const rightItems = navigationItems.slice(2);

  return (
    <nav className="absolute top-0 left-0 w-full z-20 flex items-center justify-between px-6 py-4 text-sm uppercase font-medium tracking-wide">
      {/* Mobile Nav */}
      <div className="md:hidden flex items-center gap-4">
        <CustomMenuIcon />
        <div className="text-base tracking-widest font-semibold text-white font-serif">
          {brandName}
        </div>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex justify-between items-center w-full">
        <div className="flex gap-8 text-white">
          {leftItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="hover:text-darj-accent transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="text-xl tracking-widest font-semibold text-white font-serif">
          {brandName}
        </div>
        <div className="flex gap-8 text-white">
          {rightItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="hover:text-darj-accent transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};
