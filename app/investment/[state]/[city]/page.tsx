"use client";

import React, { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calculator, MapPin, Leaf, TrendingUp, Phone, MessageCircle } from "lucide-react";

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
  const [investmentAmount, setInvestmentAmount] = useState(10000);
  const [landSize, setLandSize] = useState(1);

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
    const annualInvestment = investmentAmount * 365;
    const plotsAllocated = Math.floor(annualInvestment / 50000);
    const year3Returns = plotsAllocated * 15000; // Conservative estimate
    const year5Returns = plotsAllocated * 25000;
    
    return {
      annualInvestment,
      plotsAllocated,
      year3Returns,
      year5Returns,
      roiYear3: ((year3Returns / annualInvestment) * 100).toFixed(1),
      roiYear5: ((year5Returns / annualInvestment) * 100).toFixed(1)
    };
  };

  const handleWhatsAppContact = () => {
    const message = `Hi! I'm interested in blueberry farming investment in ${pageData?.city}, ${pageData?.state}. Please provide more details about the ₹${investmentAmount} daily SIP package.`;
    const whatsappUrl = `https://wa.me/917047474942?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!pageData) {
    notFound();
  }

  const roi = calculateROI();

  return (
    <>
      {/* SEO Meta Tags */}
      <head>
        <title>{pageData.metaTitle}</title>
        <meta name="description" content={pageData.metaDescription} />
        <meta name="keywords" content={pageData.keywords.join(', ')} />
        <meta property="og:title" content={pageData.metaTitle} />
        <meta property="og:description" content={pageData.metaDescription} />
        <meta property="og:url" content={`https://darjberry.com/${pageData.slug}`} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`https://darjberry.com/${pageData.slug}`} />
      </head>

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 mr-2" />
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  {pageData.city}, {pageData.state}
                </Badge>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {pageData.h1Title}
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 text-green-100">
                Start with ₹10,000 daily SIP • Tax-free agricultural income • Expert support included
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={handleWhatsAppContact} className="bg-green-500 hover:bg-green-600">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Start WhatsApp Consultation
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-green-600">
                  <Calculator className="h-5 w-5 mr-2" />
                  Calculate ROI
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Investment Calculator */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Investment Calculator for {pageData.city}
                </h2>
                <p className="text-gray-600">
                  Customize your investment and see projected returns
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Calculator Inputs */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calculator className="h-5 w-5 mr-2" />
                      Investment Parameters
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Daily Investment Amount (₹)
                      </label>
                      <input
                        type="number"
                        value={investmentAmount}
                        onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                        min="5000"
                        max="100000"
                        step="1000"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Minimum: ₹5,000 • Recommended: ₹10,000
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Available Land (Acres)
                      </label>
                      <input
                        type="number"
                        value={landSize}
                        onChange={(e) => setLandSize(Number(e.target.value))}
                        min="0.25"
                        max="100"
                        step="0.25"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        We work with any land size from 0.25 acres
                      </p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">
                        {pageData.city} Advantages:
                      </h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Ideal soil pH for blueberry cultivation</li>
                        <li>• Established agricultural infrastructure</li>
                        <li>• Access to {pageData.state} government schemes</li>
                        <li>• Proximity to export markets</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* ROI Projections */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2" />
                      Projected Returns
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">
                            ₹{(roi.annualInvestment / 100000).toFixed(1)}L
                          </div>
                          <div className="text-sm text-blue-600">Annual Investment</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">
                            {roi.plotsAllocated}
                          </div>
                          <div className="text-sm text-green-600">Berry Plots Allocated</div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span className="font-medium">Year 3 Returns:</span>
                          <div className="text-right">
                            <div className="font-bold text-green-600">₹{(roi.year3Returns / 100000).toFixed(1)}L</div>
                            <div className="text-sm text-gray-500">{roi.roiYear3}% ROI</div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span className="font-medium">Year 5 Returns:</span>
                          <div className="text-right">
                            <div className="font-bold text-green-600">₹{(roi.year5Returns / 100000).toFixed(1)}L</div>
                            <div className="text-sm text-gray-500">{roi.roiYear5}% ROI</div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-yellow-800 mb-2">
                          Tax Benefits:
                        </h4>
                        <p className="text-sm text-yellow-700">
                          100% tax-free agricultural income saves you ₹{(roi.year5Returns * 0.3 / 100000).toFixed(1)}L+ 
                          annually in taxes (30% tax bracket)
                        </p>
                      </div>

                      <Button onClick={handleWhatsAppContact} className="w-full bg-green-600 hover:bg-green-700">
                        Get Detailed Proposal for {pageData.city}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Sections */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Introduction */}
              <div className="mb-12">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Leaf className="h-5 w-5 mr-2" />
                      Why Choose Blueberry Farming in {pageData.city}?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      {pageData.content.introduction.split('\n').map((paragraph, index) => (
                        paragraph.trim() && (
                          <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                            {paragraph.trim()}
                          </p>
                        )
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Climate Analysis */}
              <div className="mb-12">
                <Card>
                  <CardHeader>
                    <CardTitle>Climate & Soil Suitability</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      <div dangerouslySetInnerHTML={{ 
                        __html: pageData.content.climateAnalysis.replace(/\n/g, '<br>') 
                      }} />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Investment Details */}
              <div className="mb-12">
                <Card>
                  <CardHeader>
                    <CardTitle>Investment Package Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      <div dangerouslySetInnerHTML={{ 
                        __html: pageData.content.investmentDetails.replace(/\n/g, '<br>') 
                      }} />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Government Schemes */}
              <div className="mb-12">
                <Card>
                  <CardHeader>
                    <CardTitle>Government Schemes & Subsidies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      <div dangerouslySetInnerHTML={{ 
                        __html: pageData.content.governmentSchemes.replace(/\n/g, '<br>') 
                      }} />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Success Stories */}
              <div className="mb-12">
                <Card>
                  <CardHeader>
                    <CardTitle>Success Stories from {pageData.city}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      <div dangerouslySetInnerHTML={{ 
                        __html: pageData.content.successStories.replace(/\n/g, '<br>') 
                      }} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-green-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Start Your Blueberry Farm in {pageData.city}?
              </h2>
              
              <div className="prose max-w-none text-green-100 mb-8">
                <div dangerouslySetInnerHTML={{ 
                  __html: pageData.content.callToAction.replace(/\n/g, '<br>') 
                }} />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={handleWhatsAppContact}
                  className="bg-white text-green-600 hover:bg-gray-100"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Start WhatsApp Consultation
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-white border-white hover:bg-white hover:text-green-600"
                  onClick={() => window.open('tel:+917047474942', '_self')}
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Call +91-7047474942
                </Button>
              </div>

              <p className="mt-6 text-green-200">
                Join 500+ successful farmers already growing wealth with Darjberry in {pageData.state}
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}