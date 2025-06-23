import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionTitle } from "./section-title";

interface Problem {
  title: string;
  description: string;
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
          title="The Landowner's Dilemma"
          subtitle="Traditional farming is complex and risky. We eliminate every barrier between you and profitable agriculture."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {problems.map((problem, index) => (
            <Card
              key={index}
              className="text-center bg-white shadow-lg border-l-4 border-red-500"
            >
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-700">
                  {problem.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{problem.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-16 text-center">
          <h3 className="text-3xl font-bold text-green-700">{solutionTitle}</h3>
          <p className="mt-4 text-xl text-gray-600 max-w-4xl mx-auto">
            {solutionDescription}
          </p>
        </div>
      </div>
    </section>
  );
};
