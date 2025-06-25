import React from "react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string | React.ReactNode;
  emoji?: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  variant?: "default" | "gradient";
  gradientFrom?: string;
  gradientTo?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  emoji,
  className,
  titleClassName,
  descriptionClassName,
  variant = "default",
  gradientFrom = "purple-600",
  gradientTo = "blue-600",
}) => {
  const baseClasses = "rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full";
  
  const variantClasses = {
    default: "bg-white border border-gray-100",
    gradient: `bg-gradient-to-br from-${gradientFrom} to-${gradientTo} text-white`,
  };

  return (
    <div className={cn(baseClasses, variantClasses[variant], className)}>
      <h3 className={cn(
        "text-xl font-bold mb-3 flex items-center",
        variant === "default" ? "text-gray-900" : "text-white",
        titleClassName
      )}>
        {emoji && <span className="text-2xl mr-3">{emoji}</span>}
        {title}
      </h3>
      {typeof description === "string" ? (
        <p 
          className={cn(
            "leading-relaxed",
            variant === "default" ? "text-gray-700" : "text-white/90",
            descriptionClassName
          )}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      ) : (
        <div className={cn(
          "leading-relaxed",
          variant === "default" ? "text-gray-700" : "text-white/90",
          descriptionClassName
        )}>
          {description}
        </div>
      )}
    </div>
  );
};