"use client";
import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="max-w-6xl mx-auto px-4 py-8 min-h-[450px] flex flex-col justify-center items-center"
    >
      <h3 className="text-6xl text-green-800 text-center font-semibold mb-4">About Darjberry</h3>
      <p className="text-gray-700 text-xl leading-relaxed mb-6">
        Darjberry (Fursat Farms Private Limited) is revolutionizing agricultural investment through premium blueberry farming. 
        Operating as a Multi-State Cooperative Society, we transform traditional tea estates in Darjeeling and Northeast India 
        into profitable blueberry farms while providing investors with 100% tax-free agricultural returns.
      </p>
      <div className="grid md:grid-cols-2 gap-8 mt-8 text-left">
        <div>
          <h4 className="text-2xl font-semibold text-green-700 mb-3">Our Mission</h4>
          <p className="text-gray-600 leading-relaxed">
            To create India's largest blueberry cooperative - the "Amul for Berries" - where investors earn passive income 
            while we handle complete farm management from setup to selling.
          </p>
        </div>
        <div>
          <h4 className="text-2xl font-semibold text-green-700 mb-3">Our Advantage</h4>
          <p className="text-gray-600 leading-relaxed">
            Perfect soil synergy with tea estates (pH 4.5-5.5), Himalayan climate, government subsidies, 
            and tax-free agricultural income under Section 10(1) and Section 80P.
          </p>
        </div>
      </div>
      <div className="mt-8 p-6 bg-green-50 rounded-lg">
        <p className="text-green-800 font-semibold text-center">
          🫐 ₹37.5L Annual Returns from ₹6L Investment • 3-4 Year Payback • 100% Tax-Free Income 🫐
        </p>
      </div>
    </motion.div>
  );
};

export default About;
