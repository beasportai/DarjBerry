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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-x-8 gap-y-12 py-16 md:py-24 lg:py-32"
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
            <div className="flex items-start gap-3 mb-8 md:mb-10 cursor-pointer">
              <Image
                src="/images/plantito-logo.svg"
                alt="Darjberry Logo"
                width={48}
                height={48}
                className="w-12 h-12"
              />
              <span className="text-3xl sm:text-4xl text-white font-bold">
                Darjberry
              </span>
            </div>
          </Link>

          <div className="mb-8">
            <p className="text-green-100 text-base leading-relaxed mb-6">
              Transform your land into a profitable, tax-free agricultural asset through turnkey blueberry farming services.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm text-white font-medium">
                ✅ Tax-Free Income
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm text-white font-medium">
                ✅ 500% ROI
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm text-white font-medium">
                ✅ 15-20 Year Partnership
              </span>
            </div>
          </div>

          <div>
            <ul className="flex gap-5 md:gap-6 mb-6">
              <li>
                <Link
                  className="text-white hover:text-green-200 transition-colors duration-300"
                  href="https://instagram.com/darjberry"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BsInstagram className="size-6 md:size-7" />
                </Link>
              </li>
              <li>
                <Link
                  className="text-white hover:text-green-200 transition-colors duration-300"
                  href="https://facebook.com/darjberry"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BsFacebook className="size-6 md:size-7" />
                </Link>
              </li>
              <li>
                <Link
                  className="text-white hover:text-green-200 transition-colors duration-300"
                  href="https://twitter.com/darjberry"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BsTwitter className="size-6 md:size-7" />
                </Link>
              </li>
            </ul>
            <p className="text-sm text-green-200 leading-relaxed opacity-90">
              Copyright &copy; 2024 by Fursat Farms Private Limited. All rights reserved.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col lg:col-span-2"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <p className="text-lg md:text-xl font-semibold mb-6 text-white">Contact Us</p>
          <address className="not-italic text-sm leading-relaxed">
            <p className="mb-4 text-green-100 opacity-90">
              Fursat Farms Private Limited<br />
              3rd Floor, Dwarika Heights<br />
              Near Vega Circle Sevoke Road<br />
              Siliguri - 734005, West Bengal
            </p>
            <div className="space-y-3">
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

        <motion.nav
            className="flex flex-col lg:col-span-1"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <p className="text-lg md:text-xl font-semibold mb-6 text-white">Account</p>
            <ul className="flex flex-col gap-3 text-sm">
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
            className="flex flex-col lg:col-span-1"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <p className="text-lg md:text-xl font-semibold mb-6 text-white">Company</p>
            <ul className="flex flex-col gap-3 text-sm">
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
            className="flex flex-col lg:col-span-1"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <p className="text-lg md:text-xl font-semibold mb-6 text-white">Legal</p>
            <ul className="flex flex-col gap-3 text-sm">
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
