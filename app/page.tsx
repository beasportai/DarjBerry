"use client";

import {
  HeroSection,
  ProblemSolutionSection,
  HowItWorksSection,
  OfferSection,
  WhyBlueberrySection,
  RoiCalculatorSection,
  FaqSection,
  CtaSection,
  LandingNavigation,
} from "@/components/landing";
import {
  heroData,
  problemSolutionData,
  howItWorksData,
  offerData,
  faqData,
  ctaData,
  navigationData,
} from "@/data/landing-page-data";


export default function DarjberryLandingPage() {
  const handleCtaClick = () => {
    // Redirect to WhatsApp with pre-filled message for farming inquiry
    const whatsappUrl = `https://wa.me/917047474942?text=${encodeURIComponent(
      "Hi! I'm interested in starting a blueberry farm. Can you help me with more details?"
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleContactClick = () => {
    // Redirect to WhatsApp for general contact
    const whatsappUrl = `https://wa.me/917047474942?text=${encodeURIComponent(
      "Hi! I'd like to know more about Darjberry."
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="bg-white w-full overflow-x-hidden">

      <main className="w-full">
        <LandingNavigation
          brandName={navigationData.brandName}
          navigationItems={navigationData.navigationItems}
          ctaText={navigationData.ctaText}
          onCtaClick={handleContactClick}
        />

        <HeroSection
          title={heroData.title}
          subtitle={heroData.subtitle}
          ctaText={heroData.ctaText}
          onCtaClick={handleCtaClick}
        />

        <WhyBlueberrySection />

        <div className="wrapper">
          <ProblemSolutionSection
            problems={problemSolutionData.problems}
            solutionTitle={problemSolutionData.solutionTitle}
            solutionDescription={problemSolutionData.solutionDescription}
          />

          <div id="how-it-works">
            <HowItWorksSection steps={howItWorksData.steps} />
          </div>

          <RoiCalculatorSection />

          <div id="offer">
            <OfferSection
              offerItems={offerData.offerItems}
              bonusItems={offerData.bonusItems}
              totalValue={offerData.totalValue}
              investmentAmount={offerData.investmentAmount}
              savings={offerData.savings}
              investmentNote={offerData.investmentNote}
              urgencyText={offerData.urgencyText}
              availabilityReason={offerData.availabilityReason}
              scarcityFactors={offerData.scarcityFactors}
            />
          </div>

          <div id="faq">
            <FaqSection faqs={faqData.faqs} />
          </div>

          <CtaSection
            title={ctaData.title}
            subtitle={ctaData.subtitle}
            ctaText={ctaData.ctaText}
            note={ctaData.note}
            onCtaClick={handleCtaClick}
          />
        </div>
      </main>
    </div>
  );
}
