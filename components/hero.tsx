import React from "react";
import { motion } from "framer-motion";
import { images } from "../constants";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="px-4 py-20 flex max-md:flex-col items-center md:px-28 md:py-32 sm:px-16 ">
      <motion.div className="max-md:text-center">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-5xl md:text-8xl font-bold"
        >
          Grow <span className="text-green-800"> Wealth</span> with Blueberries
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-sm text-gray-700 mt-8 md:text-xl sm:text-lg"
        >
          Daily SIP investments in blueberry farming + fresh berries from Darjeeling
        </motion.p>
        <a href="https://wa.me/your-whatsapp-number" target="_blank" rel="noopener noreferrer">
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
            type="button"
            className="mt-8 bg-green-800 text-white px-6 py-2 md:px-8 md:py-3 rounded-lg hover:bg-green-900 transition-colors"
          >
            Start Investment
          </motion.button>
        </a>
        <div className="mt-8 flex  items-center  max-md:justify-center gap-24">
          <div>
            <p className="text-green-800 text-3xl md:text-4xl">5000+</p>
            <span className="text-gray-700 text-sm">Berry Investors</span>
          </div>
          <div>
              <p className="text-green-800 text-3xl md:text-4xl">₹10Cr+</p>
            <span className="text-gray-700 text-sm">Investments Managed</span>
          </div>
        </div>
      </motion.div>
      <div className=" max-md:mt-4 flex items-center justify-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-[50%] md:w-full"
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
            className="absolute top-1/2 left-0 w-32 sm:w-40 rotate-180"
          >
            <Image src={images.leaf3} alt="leaf" width={400} height={400} className="w-full h-auto" />
          </motion.div>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute top-[5%] left-[60%] w-20 md:w-20"
          >
            <Image src={images.leaf2} alt="leaf" width={400} height={100} className="w-full h-auto" />
          </motion.div>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="absolute top-[60%] left-[70%] w-20 md:w-20"
          >
            <Image src={images.leaf1} alt="leaf" width={400} height={100} className="w-full h-auto" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;