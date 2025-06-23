import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionTitle } from "./section-title";

interface OfferItem {
  title: string;
  description: string;
  value: string;
}

interface OfferSectionProps {
  offerItems: OfferItem[];
  bonusItems: OfferItem[];
  totalValue: string;
  investmentAmount: string;
  investmentNote: string;
  availabilityText: string;
  availabilityCount: string;
}

export const OfferSection: React.FC<OfferSectionProps> = ({
  offerItems,
  bonusItems,
  totalValue,
  investmentAmount,
  investmentNote,
  availabilityText,
  availabilityCount,
}) => {
  return (
    <section className="py-20 bg-darj-cream">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="The Grand Slam Offer"
          subtitle="An unbeatable, all-inclusive package designed for your total success and peace of mind."
        />
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-2xl border-darj-green-light bg-white">
            <CardHeader className="bg-darj-green-dark text-white p-6 rounded-t-lg">
              <CardTitle className="text-3xl text-center font-serif">
                The Blueberry Wealth Project
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8 text-darj-slate">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Core Deliverables
                </h3>
                <div className="space-y-4">
                  {offerItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-start"
                    >
                      <div>
                        <p className="font-semibold text-gray-700">
                          {item.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          {item.description}
                        </p>
                      </div>
                      <p className="font-bold text-green-700 text-right ml-4">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t pt-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Exclusive Bonuses
                </h3>
                <div className="space-y-4">
                  {bonusItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-start"
                    >
                      <div>
                        <p className="font-semibold text-gray-700">
                          {item.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          {item.description}
                        </p>
                      </div>
                      <p className="font-bold text-blue-600 text-right ml-4">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t pt-8 text-center">
                <p className="text-gray-600 text-xl">
                  Total Upfront Value:{" "}
                  <span className="font-bold text-2xl text-gray-800 line-through">
                    {totalValue}
                  </span>
                </p>
                <p className="mt-4 text-2xl text-gray-800">
                  Your Investment Today:
                </p>
                <p className="text-5xl font-extrabold text-green-600 mt-2">
                  {investmentAmount}
                </p>
                <p className="text-gray-500 mt-2">{investmentNote}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="text-center mt-12 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 max-w-4xl mx-auto rounded-r-lg">
          <p className="font-bold">{availabilityText}</p>
          <p>
            To ensure our agronomy team provides dedicated, hands-on focus, we
            are only accepting{" "}
            <span className="font-extrabold text-xl">{availabilityCount}</span>{" "}
            for 2025.
          </p>
        </div>
      </div>
    </section>
  );
};
