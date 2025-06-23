import { Card, CardContent } from "@/components/ui/card";
import { SectionTitle } from "./section-title";
import { LucideIcon } from "lucide-react";

interface TechFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface TechnologySectionProps {
  features: TechFeature[];
}

export const TechnologySection: React.FC<TechnologySectionProps> = ({
  features,
}) => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Smarter Farming Through Technology"
          subtitle="We replace guesswork with data, ensuring higher yields and lower risks for your investment."
        />
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="flex items-start p-6 space-x-6 bg-white shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="bg-green-100 p-4 rounded-full">
                <feature.icon className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-800">
                  {feature.title}
                </h4>
                <p className="mt-1 text-gray-600">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
