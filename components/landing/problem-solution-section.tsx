import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionTitle } from "./section-title";

interface Problem {
  title: string;
  description: string;
  emoji: string;
}

interface ProblemSolutionSectionProps {
  problems: Problem[];
  solutionTitle: string;
  solutionDescription: string;
}

export const ProblemSolutionSection: React.FC<ProblemSolutionSectionProps> = ({
  problems,
  solutionTitle,
  solutionDescription,
}) => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="How can landowners capitalize on the growing demand for superfruits?"
          subtitle=""
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {problems.map((problem, index) => (
            <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-lg font-semibold text-gray-800 leading-tight">
                  {problem.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div 
                  className="text-gray-600 leading-relaxed text-sm"
                  dangerouslySetInnerHTML={{ __html: problem.description }}
                />
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-16 text-center">
          <h3 className="text-3xl font-bold text-green-700">Our Berry Good Solution</h3>
          <p className="mt-4 text-xl text-gray-600 max-w-4xl mx-auto">
            Blueberries deliver a <strong>500% ROI (650% tax adjusted)</strong> over 15 years through a passive, tax-exempt agricultural asset. Our team of expert agronomists have worked on 100+ acres of farms at DS Group, IG International & Farm2Fam.
          </p>
          <div className="mt-6">
            <a 
              href="https://thebetterindia.com/345037/growing-blueberries-raspberries-in-india-lawyer-quits-start-farm2fam-low-cost-tunnel-method/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold text-lg transition-colors duration-300"
            >
              <span className="mr-2">📖</span>
              Read Farm2Fam's Success Story
              <span className="ml-2">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
