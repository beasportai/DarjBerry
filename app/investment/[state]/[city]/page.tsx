"use client";

import React, { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { LandingNavigation } from "@/components/landing";
import { navigationData } from "@/data/landing-page-data";
import { 
  Calculator, MapPin, Leaf, TrendingUp, Phone, MessageCircle, 
  CheckCircle, Users, Award, Sprout, DollarSign, Clock,
  ChevronRight, Star, Target, Shield, Zap
} from "lucide-react";

interface PageProps {
  params: Promise<{
    state: string;
    city: string;
  }>;
}

interface SEOPageContent {
  introduction: string;
  climateAnalysis: string;
  investmentDetails: string;
  governmentSchemes: string;
  successStories: string;
  callToAction: string;
}

interface SEOPageData {
  id: string;
  slug: string;
  template: string;
  state: string;
  city: string;
  district: string;
  metaTitle: string;
  metaDescription: string;
  h1Title: string;
  content: SEOPageContent;
  keywords: string[];
  createdAt: Date;
  updatedAt: Date;
}

export default function LocationInvestmentPage({ params }: PageProps) {
  const [pageData, setPageData] = useState<SEOPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [landSize, setLandSize] = useState([1]);
  const [investmentType, setInvestmentType] = useState<'sip' | 'lumpsum'>('sip');
  const [dailyAmount, setDailyAmount] = useState([10000]);

  const fetchPageData = React.useCallback(async () => {
    try {
      const resolvedParams = await params;
      const response = await fetch(`/api/seo/page-data?state=${resolvedParams.state}&city=${resolvedParams.city}`);
      if (!response.ok) {
        throw new Error('Page not found');
      }
      
      const data = await response.json();
      setPageData(data.page);
    } catch (error) {
      console.error('Error fetching page data:', error);
      notFound();
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchPageData();
  }, [fetchPageData]);

  const calculateROI = () => {
    const acres = landSize[0];
    const plantsPerAcre = 2200;
    const totalPlants = acres * plantsPerAcre;
    const setupCost = acres * 1000000; // ₹10L per acre
    
    if (investmentType === 'sip') {
      const daily = dailyAmount[0];
      const annual = daily * 365;
      const years = Math.ceil(setupCost / annual);
      
      return {
        setupCost,
        totalPlants,
        investmentYears: years,
        year3Revenue: totalPlants * 800 * 2, // ₹800/kg * 2kg/plant
        year5Revenue: totalPlants * 800 * 3, // ₹800/kg * 3kg/plant
        breakeven: years + 2,
        annualSIP: annual
      };
    } else {
      return {
        setupCost,
        totalPlants,
        investmentYears: 0,
        year3Revenue: totalPlants * 800 * 2,
        year5Revenue: totalPlants * 800 * 3,
        breakeven: 3.5,
        annualSIP: 0
      };
    }
  };

  const handleContactClick = () => {
    const roi = calculateROI();
    const message = `Hi! I'm interested in blueberry farming investment in ${pageData?.city}, ${pageData?.state}. 
    
Investment Details:
- Land Size: ${landSize[0]} acres
- Investment Type: ${investmentType.toUpperCase()}
${investmentType === 'sip' ? `- Daily Amount: ₹${dailyAmount[0].toLocaleString()}` : `- Lump Sum: ₹${roi.setupCost.toLocaleString()}`}
- Expected Plants: ${roi.totalPlants.toLocaleString()}

Please provide detailed proposal and next steps.`;
    
    const whatsappUrl = `https://wa.me/917047474942?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-darj-cream">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-darj-green"></div>
      </div>
    );
  }

  if (!pageData) {
    notFound();
  }

  const roi = calculateROI();

  return (
    <>
      <div className="bg-darj-cream min-h-screen">
        <LandingNavigation
          brandName={navigationData.brandName}
          navigationItems={navigationData.navigationItems}
          ctaText={navigationData.ctaText}
          onCtaClick={handleContactClick}
        />

        {/* Hero Section */}
        <section className="relative w-full h-screen text-white overflow-hidden font-sans">
          <Image
            src="/images/hero-desktop.jpg"
            alt={`Blueberry farming in ${pageData.city}`}
            fill
            priority
            className="object-cover object-center z-0"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40 z-10" />
          
          <div className="relative z-20 flex flex-col justify-center items-center h-full px-4 md:px-6 text-center">
            <div className="py-4 md:py-0">
              <Badge variant="secondary" className="mb-4 text-darj-green bg-white/90">
                <MapPin className="h-4 w-4 mr-2" />
                {pageData.city}, {pageData.state}
              </Badge>
              <h1 className="text-[3rem] md:text-[6rem] leading-[0.85] font-light mb-2 md:mb-0">
                <span className="block font-sans">Blueberry</span>
                <span className="block font-serif italic -mt-2 md:-mt-4">investment</span>
              </h1>
            </div>

            <div className="mt-4 md:mt-12 text-center py-3 md:py-0">
              <p className="text-sm md:text-base leading-relaxed px-2">
                <span className="block mb-2">
                  <strong>Transform {pageData.city} land</strong> into profitable blueberry farms
                </span>
                <span className="block">
                  500% ROI • Tax-free income • Complete managed service
                </span>
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={handleContactClick}
                className="bg-darj-accent hover:bg-darj-accent/90 text-darj-slate font-semibold"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Start Investment in {pageData.city}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-darj-green"
              >
                <Calculator className="h-5 w-5 mr-2" />
                Calculate ROI
              </Button>
            </div>
          </div>
        </section>

        {/* Bento Grid Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-darj-slate mb-4">
                  Why {pageData.city} for Blueberry Investment?
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Strategic location advantages meet agricultural excellence in {pageData.state}'s premium growing region.
                </p>
              </div>

              {/* Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Large Feature Card */}
                <Card className="lg:col-span-2 lg:row-span-2 bg-gradient-to-br from-darj-green to-green-600 text-white">
                  <CardContent className="p-8 h-full flex flex-col justify-between">
                    <div>
                      <Target className="h-12 w-12 mb-4 text-darj-accent" />
                      <h3 className="text-2xl font-bold mb-4">Premium Location Benefits</h3>
                      <p className="text-green-100 mb-6">
                        {pageData.city} offers ideal climate conditions, established infrastructure, and strategic market access for profitable blueberry cultivation.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-darj-accent">500%</div>
                        <div className="text-sm text-green-100">ROI in 15 years</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-darj-accent">₹800</div>
                        <div className="text-sm text-green-100">Per kg premium</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Climate Score */}
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Leaf className="h-8 w-8 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-darj-slate mb-2">Climate Score</h4>
                    <div className="text-3xl font-bold text-blue-600 mb-1">9.2/10</div>
                    <p className="text-sm text-gray-600">Ideal for blueberries</p>
                  </CardContent>
                </Card>

                {/* Government Support */}
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="h-8 w-8 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-darj-slate mb-2">Govt. Support</h4>
                    <div className="text-3xl font-bold text-green-600 mb-1">50%</div>
                    <p className="text-sm text-gray-600">Setup subsidies</p>
                  </CardContent>
                </Card>

                {/* Success Rate */}
                <Card className="bg-purple-50 border-purple-200">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="h-8 w-8 text-purple-600" />
                    </div>
                    <h4 className="font-semibold text-darj-slate mb-2">Success Rate</h4>
                    <div className="text-3xl font-bold text-purple-600 mb-1">97%</div>
                    <p className="text-sm text-gray-600">Profitable farms</p>
                  </CardContent>
                </Card>

                {/* Market Access */}
                <Card className="bg-orange-50 border-orange-200">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="h-8 w-8 text-orange-600" />
                    </div>
                    <h4 className="font-semibold text-darj-slate mb-2">Market Access</h4>
                    <div className="text-3xl font-bold text-orange-600 mb-1">5 hrs</div>
                    <p className="text-sm text-gray-600">To major cities</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* ROI Calculator Section */}
        <section className="py-16 bg-darj-cream">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-darj-slate mb-4">
                  {pageData.city} Investment Calculator
                </h2>
                <p className="text-lg text-gray-600">
                  Customize your investment and see projected returns for {pageData.state}
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Calculator Controls */}
                <Card className="bg-white shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center text-darj-slate">
                      <Calculator className="h-6 w-6 mr-2 text-darj-green" />
                      Investment Parameters
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Investment Type Toggle */}
                    <div>
                      <label className="block text-sm font-medium text-darj-slate mb-3">
                        Investment Type
                      </label>
                      <div className="flex gap-2">
                        <Button
                          variant={investmentType === 'sip' ? 'default' : 'outline'}
                          onClick={() => setInvestmentType('sip')}
                          className={investmentType === 'sip' ? 'bg-darj-green hover:bg-darj-green/90' : ''}
                        >
                          Daily SIP
                        </Button>
                        <Button
                          variant={investmentType === 'lumpsum' ? 'default' : 'outline'}
                          onClick={() => setInvestmentType('lumpsum')}
                          className={investmentType === 'lumpsum' ? 'bg-darj-green hover:bg-darj-green/90' : ''}
                        >
                          Lump Sum
                        </Button>
                      </div>
                    </div>

                    {/* Land Size Slider */}
                    <div>
                      <label className="block text-sm font-medium text-darj-slate mb-3">
                        Land Size: {landSize[0]} acres
                      </label>
                      <Slider
                        value={landSize}
                        onValueChange={setLandSize}
                        min={0.25}
                        max={10}
                        step={0.25}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0.25 acres</span>
                        <span>10 acres</span>
                      </div>
                    </div>

                    {/* Daily Amount Slider (if SIP) */}
                    {investmentType === 'sip' && (
                      <div>
                        <label className="block text-sm font-medium text-darj-slate mb-3">
                          Daily Investment: ₹{dailyAmount[0].toLocaleString()}
                        </label>
                        <Slider
                          value={dailyAmount}
                          onValueChange={setDailyAmount}
                          min={5000}
                          max={50000}
                          step={1000}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>₹5,000</span>
                          <span>₹50,000</span>
                        </div>
                      </div>
                    )}

                    {/* Location Advantages */}
                    <div className="bg-darj-cream p-4 rounded-lg">
                      <h4 className="font-semibold text-darj-slate mb-3">
                        {pageData.city} Specific Advantages:
                      </h4>
                      <div className="space-y-2 text-sm text-darj-slate">
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2 text-darj-green" />
                          Optimal soil pH for blueberry cultivation
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2 text-darj-green" />
                          Established cold chain infrastructure
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2 text-darj-green" />
                          {pageData.state} government scheme benefits
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2 text-darj-green" />
                          Premium market access and pricing
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* ROI Results */}
                <Card className="bg-gradient-to-br from-darj-green to-green-600 text-white shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-6 w-6 mr-2 text-darj-accent" />
                      Projected Returns for {pageData.city}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/10 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-darj-accent">
                          {roi.totalPlants.toLocaleString()}
                        </div>
                        <div className="text-sm text-green-100">Plants Allocated</div>
                      </div>
                      <div className="bg-white/10 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-darj-accent">
                          ₹{(roi.setupCost / 100000).toFixed(1)}L
                        </div>
                        <div className="text-sm text-green-100">Total Investment</div>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="space-y-4">
                      {investmentType === 'sip' && roi.investmentYears > 0 && (
                        <div className="flex justify-between items-center p-3 bg-white/10 rounded">
                          <span className="font-medium">Investment Period:</span>
                          <span className="font-bold text-darj-accent">{roi.investmentYears} years</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center p-3 bg-white/10 rounded">
                        <span className="font-medium">Year 3 Revenue:</span>
                        <span className="font-bold text-darj-accent">₹{(roi.year3Revenue / 100000).toFixed(1)}L</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-white/10 rounded">
                        <span className="font-medium">Year 5+ Revenue:</span>
                        <span className="font-bold text-darj-accent">₹{(roi.year5Revenue / 100000).toFixed(1)}L</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-white/10 rounded">
                        <span className="font-medium">Breakeven:</span>
                        <span className="font-bold text-darj-accent">{roi.breakeven} years</span>
                      </div>
                    </div>

                    {/* Tax Benefits */}
                    <div className="bg-yellow-400/20 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-yellow-100">
                        Tax-Free Income Benefits:
                      </h4>
                      <p className="text-sm text-yellow-100">
                        Save ₹{((roi.year5Revenue * 0.3) / 100000).toFixed(1)}L+ annually in taxes 
                        (30% bracket) with agricultural income exemption.
                      </p>
                    </div>

                    <Button 
                      onClick={handleContactClick}
                      className="w-full bg-darj-accent hover:bg-darj-accent/90 text-darj-slate font-semibold"
                      size="lg"
                    >
                      Get Detailed Proposal for {pageData.city}
                      <ChevronRight className="h-5 w-5 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories Bento */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-darj-slate mb-4">
                  Success Stories from {pageData.state}
                </h2>
                <p className="text-lg text-gray-600">
                  Real results from blueberry investors in {pageData.city} region
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Success Story 1 */}
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-4">
                        <h4 className="font-bold text-darj-slate">Local Farmer</h4>
                        <p className="text-sm text-gray-600">{pageData.city}</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Investment:</span>
                        <span className="font-semibold">₹20L over 2 years</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Current Revenue:</span>
                        <span className="font-semibold text-green-600">₹45L annually</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ROI Achieved:</span>
                        <span className="font-semibold text-blue-600">225% in Year 4</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Success Story 2 */}
                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                        <DollarSign className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-4">
                        <h4 className="font-bold text-darj-slate">Urban Professional</h4>
                        <p className="text-sm text-gray-600">SIP Investor</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Daily SIP:</span>
                        <span className="font-semibold">₹15,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Farm Size:</span>
                        <span className="font-semibold">1.5 acres</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Passive Income:</span>
                        <span className="font-semibold text-green-600">₹28L annually</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Regional Impact */}
                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                        <Award className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-4">
                        <h4 className="font-bold text-darj-slate">{pageData.state} Impact</h4>
                        <p className="text-sm text-gray-600">Regional Development</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Active Farmers:</span>
                        <span className="font-semibold">150+</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Acres:</span>
                        <span className="font-semibold">500+</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Jobs Created:</span>
                        <span className="font-semibold text-purple-600">2,000+</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-darj-green text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">
                Ready to Start Your Blueberry Farm in {pageData.city}?
              </h2>
              
              <p className="text-xl text-green-100 mb-8">
                Join 500+ successful farmers already growing wealth with Darjberry in {pageData.state}
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-darj-accent" />
                  <h4 className="font-semibold mb-1">Quick Setup</h4>
                  <p className="text-sm text-green-100">Farm ready in 90 days</p>
                </div>
                <div className="text-center">
                  <Shield className="h-8 w-8 mx-auto mb-2 text-darj-accent" />
                  <h4 className="font-semibold mb-1">Risk Protected</h4>
                  <p className="text-sm text-green-100">Guaranteed minimum yields</p>
                </div>
                <div className="text-center">
                  <Zap className="h-8 w-8 mx-auto mb-2 text-darj-accent" />
                  <h4 className="font-semibold mb-1">Full Support</h4>
                  <p className="text-sm text-green-100">End-to-end management</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={handleContactClick}
                  className="bg-darj-accent hover:bg-darj-accent/90 text-darj-slate font-semibold"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Start WhatsApp Consultation
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-white border-white hover:bg-white hover:text-darj-green"
                  onClick={() => window.open('tel:+917047474942', '_self')}
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Call +91-7047474942
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}