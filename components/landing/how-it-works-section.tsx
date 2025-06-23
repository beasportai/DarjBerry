interface Step {
  title: string;
  description: string;
}

interface HowItWorksSectionProps {
  steps: Step[];
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  steps,
}) => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
            Your Journey to Passive Income
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            A simple, transparent, and hands-free process from start to finish.
          </p>
        </div>
        <div className="relative">
          {/* The connecting line */}
          <div className="hidden md:block absolute top-5 left-1/2 w-0.5 h-[calc(100%-2.5rem)] bg-gray-200 -translate-x-1/2" />

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-start gap-6 ${
                  index % 2 !== 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl relative z-10">
                  {index + 1}
                </div>
                <div
                  className={`text-left ${
                    index % 2 !== 0 ? "md:text-right" : ""
                  }`}
                >
                  <h4 className="text-xl font-bold text-gray-800">
                    {step.title}
                  </h4>
                  <p className="mt-1 text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
