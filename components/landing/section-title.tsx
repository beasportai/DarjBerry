interface SectionTitleProps {
  title: string;
  subtitle: string;
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  className = "",
}) => (
  <div className={`text-center mb-12 ${className}`}>
    <h2 className="text-4xl md:text-5xl font-bold text-gray-800">{title}</h2>
    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
  </div>
);
