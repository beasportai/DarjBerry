"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BsInstagram, BsFacebook, BsTwitter } from "react-icons/bs";
import { motion } from "framer-motion";

const Footer = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="bg-gradient-to-br from-green-800 via-green-700 to-emerald-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSI0Ii8+PC9nPjwvZz48L3N2Zz4=')] repeat"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-12 md:py-20"
          id="contact"
        >
        <motion.div
          className="md:col-span-2 lg:col-span-2 flex flex-col justify-between"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <Link href="/">
            <div className="flex items-start gap-2.5 mb-6 md:mb-8 cursor-pointer">
              <Image
                src="/images/plantito-logo.svg"
                alt="Darjberry Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span className="text-2xl sm:text-3xl text-white font-bold">
                Darjberry
              </span>
            </div>
          </Link>

          <div className="mb-6">
            <p className="text-green-100 text-sm md:text-base mb-4 leading-relaxed">
              Transform your land into a profitable, tax-free agricultural asset through turnkey blueberry farming services.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white">
                ✅ Tax-Free Income
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white">
                ✅ 500% ROI
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white">
                ✅ 15-20 Year Partnership
              </span>
            </div>
          </div>

          <div>
            <ul className="flex gap-4 md:gap-6 mb-6">
              <li>
                <Link
                  className="text-white hover:text-green-200 transition-colors duration-300"
                  href="https://instagram.com/darjberry"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BsInstagram className="size-5 md:size-6" />
                </Link>
              </li>
              <li>
                <Link
                  className="text-white hover:text-green-200 transition-colors duration-300"
                  href="https://facebook.com/darjberry"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BsFacebook className="size-5 md:size-6" />
                </Link>
              </li>
              <li>
                <Link
                  className="text-white hover:text-green-200 transition-colors duration-300"
                  href="https://twitter.com/darjberry"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BsTwitter className="size-5 md:size-6" />
                </Link>
              </li>
            </ul>
            <p className="text-xs md:text-sm text-green-200 leading-relaxed opacity-90">
              Copyright &copy; 2024 by Fursat Farms Private Limited. All rights reserved.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <p className="text-sm md:text-lg font-semibold mb-6 text-white">Contact Us</p>
          <address className="not-italic text-xs md:text-sm leading-relaxed">
            <p className="mb-4 text-green-100 opacity-90">
              Fursat Farms Private Limited<br />
              3rd Floor, Dwarika Heights<br />
              Near Vega Circle Sevoke Road<br />
              Siliguri - 734005, West Bengal
            </p>
            <div className="space-y-2">
              <p>
                <Link
                  className="text-white hover:text-green-200 transition-colors duration-300 flex items-center gap-2"
                  href="tel:+917047474942"
                >
                  📞 +91 7047 474 942
                </Link>
              </p>
              <p>
                <Link
                  className="text-white hover:text-green-200 transition-colors duration-300 flex items-center gap-2"
                  href="mailto:darjberry@gmail.com"
                >
                  ✉️ darjberry@gmail.com
                </Link>
              </p>
              <p>
                <Link
                  className="text-white hover:text-green-200 transition-colors duration-300 flex items-center gap-2"
                  href="https://wa.me/917047474942"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  💬 WhatsApp Support
                </Link>
              </p>
            </div>
          </address>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:col-span-3">
          <motion.nav
            className="flex flex-col"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <p className="text-sm md:text-lg font-semibold mb-6 text-white">Account</p>
            <ul className="flex flex-col gap-3 text-xs md:text-sm">
              <li>
                <Link
                  className="text-green-100 hover:text-white transition-colors duration-300"
                  href="/register"
                >
                  Create Account
                </Link>
              </li>
              <li>
                <Link
                  className="text-green-100 hover:text-white transition-colors duration-300"
                  href="/login"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  className="text-green-100 hover:text-white transition-colors duration-300"
                  href="/report"
                >
                  Investment Report
                </Link>
              </li>
            </ul>
          </motion.nav>

          <motion.nav
            className="flex flex-col"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <p className="text-sm md:text-lg font-semibold mb-6 text-white">Company</p>
            <ul className="flex flex-col gap-3 text-xs md:text-sm">
              <li>
                <Link
                  className="text-green-100 hover:text-white transition-colors duration-300"
                  href="/about"
                >
                  About Darjberry
                </Link>
              </li>
              <li>
                <Link
                  className="text-green-100 hover:text-white transition-colors duration-300"
                  href="/insights"
                >
                  Insights
                </Link>
              </li>
              <li>
                <Link
                  className="text-green-100 hover:text-white transition-colors duration-300"
                  href="/fresh-berries"
                >
                  Fresh Berries Store
                </Link>
              </li>
              <li>
                <Link
                  className="text-green-100 hover:text-white transition-colors duration-300"
                  href="https://wa.me/917047474942"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </motion.nav>

          <motion.nav
            className="flex flex-col"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <p className="text-sm md:text-lg font-semibold mb-6 text-white">Legal</p>
            <ul className="flex flex-col gap-3 text-xs md:text-sm">
              <li>
                <Link
                  className="text-green-100 hover:text-white transition-colors duration-300"
                  href="/privacy"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  className="text-green-100 hover:text-white transition-colors duration-300"
                  href="/terms"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  className="text-green-100 hover:text-white transition-colors duration-300"
                  href="/refunds"
                >
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link
                  className="text-green-100 hover:text-white transition-colors duration-300"
                  href="https://wa.me/917047474942"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Help Center
                </Link>
              </li>
            </ul>
          </motion.nav>
        </div>
        </div>
      </div>
    </div>
  )
};

export default Footer;
