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
      <h3 className="text-6xl text-green-800 text-center font-semibold mb-4">About Plantito</h3>
      <p className="text-gray-700 text-xl leading-relaxed">
        Plantito is a fully functioning e-commerce website for plants and is
        only a personal project of{" "}
        <Link
          href="https://www.beasportai.com/"
          target="_blank"
          rel="noreferrer noopener"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          beasportai.com
        </Link>{" "}
        it aims to showcase my skills as a front-end developer that can build
        not only beautiful UI/UX experience, but also highly useful web
        application such as an E-commerce store. This website is built using
        Next.js, Sanity, Scss, and Stripe. Disclaimer the images used in this
        website are not mine, it belongs to{" "}
        <Link
          href="https://www.beasportai.com/"
          target="_blank"
          rel="noreferrer noopener"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          https://www.beasportai.com/
        </Link>
        .
      </p>
    </motion.div>
  );
};

export default About;
