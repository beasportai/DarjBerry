"use client";

import type { NextPage } from "next";
import Head from "next/head";
import {
  HeroSection,
  ProblemSolutionSection,
  HowItWorksSection,
  OfferSection,
  TechnologySection,
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
  technologyData,
  faqData,
  ctaData,
  navigationData,
} from "@/data/landing-page-data";

const DarjberryLandingPage: NextPage = () => {
  const handleCtaClick = () => {
    // Handle CTA button click - could open a form, scroll to contact, etc.
    console.log("CTA clicked");
  };

  const handleContactClick = () => {
    // Handle contact button click
    console.log("Contact clicked");
  };

  return (
    <div className="bg-white">
      <Head>
        <title>
          Darjberry - Turn Your Land into a High-Yield Blueberry Farm
        </title>
        <meta
          name="description"
          content="Darjberry offers a complete 'Done-For-You' managed farming service to transform your unused land into a passive, tax-free income source with a 5X ROI."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
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

        <ProblemSolutionSection
          problems={problemSolutionData.problems}
          solutionTitle={problemSolutionData.solutionTitle}
          solutionDescription={problemSolutionData.solutionDescription}
        />

        <div id="how-it-works">
          <HowItWorksSection steps={howItWorksData.steps} />
        </div>

        <div id="offer">
          <OfferSection
            offerItems={offerData.offerItems}
            bonusItems={offerData.bonusItems}
            totalValue={offerData.totalValue}
            investmentAmount={offerData.investmentAmount}
            investmentNote={offerData.investmentNote}
            availabilityText={offerData.availabilityText}
            availabilityCount={offerData.availabilityCount}
          />
        </div>

        <div id="technology">
          <TechnologySection features={technologyData.features} />
        </div>

        <RoiCalculatorSection />

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
      </main>
    </div>
  );
};

export default DarjberryLandingPage;
