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
    <div className="border-t border-gray-100 px-4 sm:px-6 lg:px-8 bg-darj-cream">
      <div
        className="wrapper grid grid-cols-2 lg:grid-cols-5 gap-8 py-10 md:py-24"
        id="contact"
      >
        <motion.div
          className="flex flex-col justify-between"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <Link href="/">
            <div className="flex items-start gap-2.5 mb-6 md:mb-16 cursor-pointer">
              <Image
                src="/images/plantito-logo.svg"
                alt="Darjberry Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span className="text-2xl sm:text-4xl text-darj-green font-medium">
                Darjberry
              </span>
            </div>
          </Link>

          <ul className="flex gap-6 md:gap-12 mb-4 md:mb-8">
            <li>
              <Link
                className="max-md:text-sm text-darj-green hover:text-darj-green-dark transition-colors duration-300"
                href="https://instagram.com/darjberry"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsInstagram className="size-5 md:size-6" />
              </Link>
            </li>
            <li>
              <Link
                className="max-md:text-sm text-darj-green hover:text-darj-green-dark transition-colors duration-300"
                href="https://facebook.com/darjberry"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsFacebook className="size-5 md:size-6" />
              </Link>
            </li>
            <li>
              <Link
                className="max-md:text-sm text-darj-green hover:text-darj-green-dark transition-colors duration-300"
                href="https://twitter.com/darjberry"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsTwitter className="size-5 md:size-6" />
              </Link>
            </li>
          </ul>
          <p className="text-xs md:text-base text-darj-slate leading-relaxed md:mt-auto opacity-80">
            Copyright &copy; 2024 by Fursat Farms Private Limited All rights
            reserved.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col "
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <p className="text-sm md:text-xl md:font-medium mb-8 md:mb-10 text-darj-slate">Contact us</p>
          <address className="not-italic text-xs md:text-base leading-relaxed">
            <p className="mb-6 text-darj-slate opacity-90">
              Fursat Farms Private Limited, 3rd Floor, Dwarika Heights, Near Vega Circle Sevoke Road, Siliguri
              - 734005
            </p>
            <p>
              <Link
                className="max-md:text-sm text-darj-green hover:text-darj-green-dark transition-colors duration-300"
                href="tel:+917047474942"
              >
                +91 7047 474 942
              </Link>
              <br />
              <Link
                className="max-md:text-sm text-darj-green hover:text-darj-green-dark transition-colors duration-300"
                href="mailto:info@darjberry.com"
              >
                info@darjberry.com
              </Link>
            </p>
          </address>
        </motion.div>

        <div className="grid grid-cols-3 max-md:pt-4 w-full md:col-span-3 col-span-2 gap-2 md:gap-8">
          <motion.nav
            className="flex flex-col"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <p className="text-sm md:text-xl md:font-medium mb-8 md:mb-10 text-darj-slate">Account</p>
            <ul className="flex max-md:text-sm flex-col gap-4 sm:gap-6">
              <li>
                <Link
                  className="max-md:text-sm text-darj-slate hover:text-darj-green transition-colors duration-300 opacity-90 hover:opacity-100"
                  href="/register"
                >
                  Create account
                </Link>
              </li>
              <li>
                <Link
                  className="max-md:text-sm text-darj-slate hover:text-darj-green transition-colors duration-300 opacity-90 hover:opacity-100"
                  href="/login"
                >
                  Sign in
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
            <p className="text-sm md:text-xl md:font-medium mb-8 md:mb-10 text-darj-slate">Company</p>
            <ul className="flex max-md:text-sm flex-col gap-4 sm:gap-6">
              <li>
                <Link
                  className="max-md:text-sm text-darj-slate hover:text-darj-green transition-colors duration-300 opacity-90 hover:opacity-100"
                  href="/about"
                >
                  About Darjberry
                </Link>
              </li>
              <li>
                <Link
                  className="max-md:text-sm text-darj-slate hover:text-darj-green transition-colors duration-300 opacity-90 hover:opacity-100"
                  href="https://wa.me/917047474942"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  className="max-md:text-sm text-darj-slate hover:text-darj-green transition-colors duration-300 opacity-90 hover:opacity-100"
                  href="/fresh-berries"
                >
                  Fresh Berries - Premium Blueberry Store
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
            <p className="text-sm md:text-xl md:font-medium mb-8 md:mb-10 text-darj-slate">Resources</p>
            <ul className="flex max-md:text-sm flex-col gap-4 sm:gap-6">
              <li>
                <Link
                  className="max-md:text-sm text-darj-slate hover:text-darj-green transition-colors duration-300 opacity-90 hover:opacity-100"
                  href="https://wa.me/917047474942"
                >
                  Help center
                </Link>
              </li>
              <li>
                <Link
                  className="max-md:text-sm text-darj-slate hover:text-darj-green transition-colors duration-300 opacity-90 hover:opacity-100"
                  href="/privacy-and-terms"
                >
                  Privacy and terms
                </Link>
              </li>
            </ul>
          </motion.nav>
        </div>
      </div>
    </div>
  )
};

export default Footer;
