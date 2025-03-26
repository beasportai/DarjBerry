import React from "react";
import { motion } from "framer-motion";
import { images } from "../constants";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="max-w-[140rem] mx-auto px-12 py-20 flex items-center md:px-28 md:py-32 sm:px-16 ">
      <motion.div className="">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-8xl font-bold"
        >
          Spread <span className="text-green-800">green</span> in your life.
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-2xl mt-8 md:text-xl sm:text-lg"
        >
          Beautiful plants for homes and offices
        </motion.p>
        <Link href="/#plants">
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
            type="button"
            className="mt-8 bg-green-800 text-white px-8 py-3 rounded-lg hover:bg-green-900 transition-colors"
          >
            Shop now
          </motion.button>
        </Link>
        <div className="mt-8 flex gap-24">
          <div>
            <p className="text-green-800 text-4xl">3202+</p>
            <span className="text-gray-700 text-sm">Customers</span>
          </div>
          <div>
              <p className="text-green-800 text-4xl">5230+</p>
            <span className="text-gray-700 text-sm">Delivered</span>
          </div>
        </div>
      </motion.div>
      <div className="md:flex md:items-center md:justify-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-full"
        >
          <Image
            src={images.heroImage}
            alt="Plants example"
            height={515}
            width={500}
            className="w-full h-auto"
          />
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="absolute top-1/2 left-0 w-52 sm:w-40 rotate-180"
          >
            <Image src={images.leaf3} alt="leaf" width={400} height={400} className="w-full h-auto" />
          </motion.div>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute top-[5%] left-[60%] w-40 sm:w-20"
          >
            <Image src={images.leaf2} alt="leaf" width={400} height={100} className="w-full h-auto" />
          </motion.div>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="absolute top-[60%] left-[70%] w-60 sm:w-32"
          >
            <Image src={images.leaf1} alt="leaf" width={400} height={100} className="w-full h-auto" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;