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
    <div className="container mx-auto grid grid-cols-5 gap-8 py-32 border-t border-gray-200" id="contact">
      <motion.div
        className="flex flex-col"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <Link href="/">
          <div className="flex items-center gap-2.5 mb-16 cursor-pointer">
            <Image
              className=''
              src="/images/plantito-logo.svg"
              alt="Plantito Logo"
              width={40}
              height={40}
            />
            <span className="text-4xl text-secondary">Plantito</span>
          </div>
        </Link>

        <ul className="flex gap-12 mb-8">
          <li>
            <Link className="text-gray-500 hover:text-gray-700 transition-colors duration-300" href="#">
              <BsInstagram className="w-6 h-6" />
            </Link>
          </li>
          <li>
            <Link className="text-gray-500 hover:text-gray-700 transition-colors duration-300" href="#">
              <BsFacebook className="w-6 h-6" />
            </Link>
          </li>
          <li>
            <Link className="text-gray-500 hover:text-gray-700 transition-colors duration-300" href="#">
              <BsTwitter className="w-6 h-6" />
            </Link>
          </li>
        </ul>
        <p className="text-sm text-gray-500 leading-relaxed mt-auto">
          Copyright &copy; 2022 by Plantito, Inc,
          <br /> All rights reserved.
        </p>
      </motion.div>

      <motion.div
        className="flex flex-col"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <p className="text-lg font-medium mb-16">Contact us</p>
        <address className="not-italic text-base leading-relaxed">
          <p className="mb-6">
            957 Roberts Dr Elgin, South Carolina(SC), 29045
          </p>
          <p>
            <Link className="text-gray-500 hover:text-gray-700 transition-colors duration-300" href="tel:401-102-7063">
              401-102-7063
            </Link>
            <br />
            <Link
              className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
              href="mailto:plantito@gmail.com"
            >
              plantito@gmail.com
            </Link>
          </p>
        </address>
      </motion.div>

      <motion.nav
        className="flex flex-col"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <p className="text-lg font-medium mb-16">Account</p>
        <ul className="flex flex-col gap-6">
          <li>
            <Link className="text-gray-500 hover:text-gray-700 transition-colors duration-300" href="#">
              Create account
            </Link>
          </li>
          <li>
            <Link className="text-gray-500 hover:text-gray-700 transition-colors duration-300" href="#">
              Sign in
            </Link>
          </li>
          <li>
            <Link className="text-gray-500 hover:text-gray-700 transition-colors duration-300" href="#">
              iOs app
            </Link>
          </li>
          <li>
            <Link className="text-gray-500 hover:text-gray-700 transition-colors duration-300" href="#">
              Android app
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
        <p className="text-lg font-medium mb-16">Company</p>
        <ul className="flex flex-col gap-6">
          <li>
            <Link className="text-gray-500 hover:text-gray-700 transition-colors duration-300" href="#">
              About Plantito
            </Link>
          </li>
          <li>
            <Link className="text-gray-500 hover:text-gray-700 transition-colors duration-300" href="#">
              Careers
            </Link>
          </li>
          <li>
            <Link className="text-gray-500 hover:text-gray-700 transition-colors duration-300" href="#">
              For business
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
        <p className="text-lg font-medium mb-16">Resources</p>
        <ul className="flex flex-col gap-6">
          <li>
            <Link className="text-gray-500 hover:text-gray-700 transition-colors duration-300" href="#">
              Help center
            </Link>
          </li>
          <li>
            <Link className="text-gray-500 hover:text-gray-700 transition-colors duration-300" href="#">
              Privacy and terms
            </Link>
          </li>
          <li>
            <Link className="text-gray-500 hover:text-gray-700 transition-colors duration-300" href="#">
              Plantito directory
            </Link>
          </li>
        </ul>
      </motion.nav>
    </div>
  );
};

export default Footer;