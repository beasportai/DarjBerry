import { Button } from "@/components/ui/button";

interface CtaSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  note?: string;
  onCtaClick?: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({
  title,
  subtitle,
  ctaText,
  note,
  onCtaClick,
}) => (
  <section className="bg-gray-800">
    <div className="container mx-auto px-4 py-20 text-center">
      <h2 className="text-4xl font-bold text-white">{title}</h2>
      <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">{subtitle}</p>
      <div className="mt-8">
        <Button
          size="lg"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 text-lg"
          onClick={onCtaClick}
        >
          {ctaText}
        </Button>
      </div>
      {note && <p className="mt-4 text-sm text-gray-400">{note}</p>}
    </div>
  </section>
);
