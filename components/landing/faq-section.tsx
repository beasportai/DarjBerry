import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionTitle } from "./section-title";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "What is the minimum investment?",
    answer:
      "The minimum investment is for 100 plants, which costs ₹4,00,000. We have different tiers for growers: Hobby (100+ plants), Enthusiast (1000+ plants), Grower (10,000+ plants), and Commercial Grower (100,000+ plants).",
  },
  {
    question: "Are there any government subsidies or loans available?",
    answer:
      "Yes, the government offers subsidies for blueberry farming under the National Horticulture Mission. Additionally, you can avail loans through the Agriculture Infrastructure Fund (AIF). We can help you with the application process for both.",
  },
  {
    question: "What is the expected return on investment?",
    answer:
      "The expected ROI is over 500% over a 15-year period. The payback period is approximately 4.1 years. Your agricultural income is also tax-free under Section 10(1) of the Income Tax Act, 1961.",
  },
  {
    question: "What does the service package include?",
    answer:
      "Our comprehensive service package includes a climate-controlled polyhouse, drip irrigation, a fogger system, 15 years of expert agronomy services, and complete B2B/D2C sales and marketing support. We charge 20% of the gross revenue for sales and marketing.",
  },
  {
    question: "What if the plants don't produce the guaranteed yield?",
    answer:
      "We guarantee a minimum yield of 2kg per plant by Year 4. If this is not met, we will provide our management services for Year 5 completely free of charge.",
  },
];

export const FaqSection: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Frequently Asked Questions"
          subtitle="Your questions, answered. Complete transparency is a core part of our promise."
        />
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-700">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
