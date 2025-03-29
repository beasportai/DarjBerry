"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="max-w-4xl mx-auto px-4 py-8 min-h-[450px] flex flex-col justify-center items-center"
    >
      <h3 className="text-6xl text-green-800 text-center font-semibold mb-4">About Moberry</h3>
      <p className="text-gray-700 text-xl leading-relaxed">
        Moberry brings you the freshest, juiciest blueberries packed with flavor and nutrition.
        Grown with care and harvested at peak ripeness, our berries deliver the perfect balance
        of sweetness and tartness. Whether for snacking, smoothies, or baking, Moberry ensures
        every bite is a taste of pure, natural goodness.
      </p>
    </motion.div>
  );
};

export default About;
