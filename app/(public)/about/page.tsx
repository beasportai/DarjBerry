"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Target, Users, TrendingUp, Shield, Leaf, Star } from "lucide-react";
import Link from "next/link";

const About = () => {
  const handleContactUs = () => {
    const whatsappNumber = "917047474942";
    const message = "Hi, I'd like to learn more about Darjberry farming opportunities.";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const achievements = [
    {
      icon: <TrendingUp className="w-8 h-8 text-green-600" />,
      title: "500% ROI",
      description: "Projected returns over 15 years",
      highlight: "₹20,000 return per ₹4,000 plant"
    },
    {
      icon: <Leaf className="w-8 h-8 text-blue-600" />,
      title: "135MT Production",
      description: "Track record by our agronomists",
      highlight: "25+ years of expertise"
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-600" />,
      title: "Tax-Free Income",
      description: "100% agricultural income exemption",
      highlight: "Section 10(1) & 80P benefits"
    },
    {
      icon: <Users className="w-8 h-8 text-orange-600" />,
      title: "Complete Service",
      description: "Zero effort from landowners",
      highlight: "Setup to sales handled"
    }
  ];

  const milestones = [
    { year: "2019", title: "Foundation", description: "Fursat Farms Private Limited established with vision for India's largest blueberry cooperative" },
    { year: "2020-2022", title: "Research & Development", description: "Leveraged 25+ years agronomist experience from DS GROUP, IG INTERNATIONAL & FARM2FAM to perfect low-cost polytunnel technology for Indian climate" },
    { year: "2023", title: "Scale Operations", description: "Expanded to 100+ acres across Darjeeling and Northeast India with proven success" },
    { year: "2024", title: "Multi-State Cooperative", description: "Transformed into cooperative society - 'The Amul for Berries' model launched" },
    { year: "2025", title: "Pan-India Expansion", description: "Opening partnerships across suitable regions with 700+ location guides" }
  ];

  return (
    <>
      {/* Hero Section - Same as Landing Page */}
      <div className="relative w-full h-screen text-white overflow-hidden font-sans">
        {/* Mobile Background Image (Default - loads first) */}
        <Image
          src="/images/hero-mobile.jpg"
          alt="Darjberry blueberry farming landscape"
          fill
          priority
          className="object-cover object-center z-0 md:hidden"
          sizes="100vw"
        />
        
        {/* Desktop Background Image (Hidden on mobile) */}
        <Image
          src="/images/hero-desktop.jpg"
          alt="Darjberry blueberry farming landscape"
          fill
          className="object-cover object-center z-0 hidden md:block"
          sizes="100vw"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 z-10" />

        {/* Desktop Captions - Hidden on mobile */}
        <div className="absolute bottom-12 left-6 md:left-12 text-xs md:text-sm max-w-[250px] z-20 hidden md:block">
          <div className="text-base mb-2">★★★★★</div>
          <p className="leading-relaxed text-xs md:text-sm opacity-90">
            Transform your land into a profitable blueberry farm
          </p>
        </div>

        <div className="absolute bottom-12 right-6 md:right-12 text-xs md:text-sm max-w-[250px] text-right z-20 hidden md:block">
          <div className="text-base mb-2">★★★★★</div>
          <p className="leading-relaxed text-xs md:text-sm opacity-90">
            Complete done-for-you service with 500% ROI
          </p>
        </div>

        {/* Mobile Star Rating - Only visible on mobile, positioned absolutely */}
        <div className="block md:hidden absolute left-4 top-[12%] z-20 py-2">
          <div className="text-base mb-2">★★★★★</div>
          <p className="text-xs opacity-90 max-w-[70%] leading-relaxed">
            Transform your land into a profitable blueberry farm
          </p>
        </div>

        {/* Hero Text */}
        <div className="relative z-20 flex flex-col justify-center items-center h-full px-4 md:px-6 text-center">
          <div className="py-4 md:py-0">
            <h1 className="text-[4rem] md:text-[7rem] leading-[0.85] font-light mb-2 md:mb-0">
              <span className="block font-sans">About</span>
              <span className="block font-serif italic -mt-2 md:-mt-4">
                Darjberry
              </span>
            </h1>
          </div>

          <div className="mt-4 md:mt-12 text-center py-3 md:py-0">
            <p className="text-sm md:text-base leading-relaxed px-2">
              <span className="block mb-2">
                <strong>Revolutionizing agricultural investment</strong> through premium
                blueberry farming
              </span>
              <span className="block">
                India's first managed farming platform with complete "Done-For-You" service
              </span>
            </p>
          </div>

          <div className="mt-4 md:mt-8 text-xs md:text-sm max-w-2xl opacity-80 text-center px-4 md:px-6 py-2 md:py-0">
            <p className="leading-relaxed">
              Operating as Multi-State Cooperative Society, transforming tea estates into profitable 
              blueberry farms with 100% tax-free agricultural returns.
            </p>
          </div>

          {/* CTA Button */}
          <div className="mt-8 md:mt-8 text-center py-4 md:py-0">
            <Button
              size="lg"
              className="bg-darj-accent hover:bg-darj-accent/90 text-darj-slate font-semibold py-4 px-8 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={handleContactUs}
            >
              Start Your Farm Today
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Company Overview */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Transforming Agriculture, Creating Wealth
              </h2>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  <strong>Darjberry (Fursat Farms Private Limited)</strong> is revolutionizing agricultural investment through premium blueberry farming. Operating as a Multi-State Cooperative Society, we transform traditional tea estates in Darjeeling and Northeast India into profitable blueberry farms.
                </p>
                <p>
                  We provide investors with <strong className="text-green-600">100% tax-free agricultural returns</strong> while handling every aspect of farm management from setup to sales - creating true passive income streams from unused land.
                </p>
                <p>
                  Our mission is to create <strong>India's largest blueberry cooperative - the "Amul for Berries"</strong> - where investors earn substantial returns while we manage the complete agricultural process.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <Card className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
                <CardContent className="space-y-4">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-green-600">₹88,00,000</div>
                    <div className="text-sm text-gray-600">Complete Package (1 Acre)</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="font-bold text-green-600">4.1 years</div>
                      <div className="text-gray-600">Payback Period</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="font-bold text-blue-600">500%</div>
                      <div className="text-gray-600">ROI Projection</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="font-bold text-purple-600">15-20</div>
                      <div className="text-gray-600">Years Partnership</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="font-bold text-orange-600">0%</div>
                      <div className="text-gray-600">Tax Rate</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.section>

        {/* Key Achievements Grid */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Darjberry?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our proven track record and comprehensive approach make us India's leading managed farming platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 flex justify-center">
                      {achievement.icon}
                    </div>
                    <h3 className="font-bold text-xl mb-2">{achievement.title}</h3>
                    <p className="text-gray-600 mb-3">{achievement.description}</p>
                    <Badge variant="outline" className="text-xs">
                      {achievement.highlight}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Our Advantages */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Competitive Advantages</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Perfect Soil Synergy</h4>
                    <p className="text-gray-600">Tea estates naturally provide ideal pH 4.5-5.5 conditions that blueberries thrive in, eliminating soil preparation costs.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Himalayan Climate Advantage</h4>
                    <p className="text-gray-600">Cool temperatures and high altitude create perfect growing conditions for premium blueberry production.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Government Support</h4>
                    <p className="text-gray-600">Agricultural subsidies, PMFBY crop insurance, and complete tax exemption under Section 10(1) and 80P.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Proven Technology</h4>
                    <p className="text-gray-600">Low-cost polytunnel technology from Farm2Fam, adapted specifically for Indian climate conditions.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Company Milestones</h2>
              <div className="space-y-4">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex gap-4 pb-4 border-b border-gray-200 last:border-b-0"
                  >
                    <div className="w-16 flex-shrink-0">
                      <Badge variant="outline" className="text-xs font-bold">
                        {milestone.year}
                      </Badge>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{milestone.title}</h4>
                      <p className="text-sm text-gray-600">{milestone.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Financial Highlights */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <Card className="bg-gradient-to-br from-green-600 to-emerald-700 text-white overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Investment Highlights</h2>
                <p className="text-green-100 text-lg">
                  Transform your capital into a passive income generating agricultural asset
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold mb-2">₹4,000</div>
                  <div className="text-green-200 mb-2">Investment per plant</div>
                  <div className="text-sm text-green-100">Complete setup included</div>
                </div>
                
                <div>
                  <div className="text-4xl font-bold mb-2">₹20,000</div>
                  <div className="text-green-200 mb-2">Return per plant</div>
                  <div className="text-sm text-green-100">Over 15-year period</div>
                </div>
                
                <div>
                  <div className="text-4xl font-bold mb-2">100%</div>
                  <div className="text-green-200 mb-2">Tax-free income</div>
                  <div className="text-sm text-green-100">Section 10(1) benefits</div>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <p className="text-xl font-semibold text-green-100">
                  🫐 ₹20L+ Annual Returns from ₹88L Investment • 4.1 Year Payback • 500% ROI 🫐
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Contact & Next Steps */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Your Farming Journey?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join India's most successful managed blueberry farming platform. Our team of experts will guide you through every step of the process.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={handleContactUs}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
              >
                Start Your Farm Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                asChild
                className="px-8 py-3"
              >
                <Link href="/insights">
                  Learn More
                  <Target className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
            
          </div>
        </motion.section>
      </div>
    </>
  );
};

export default About;