import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const FeaturedBrands = () => {
  const brands = [
    { src: "/images/forbes.png", alt: "Forbes" },
    { src: "/images/businessinsider.png", alt: "Business Insider" },
    { src: "/images/losangeles.png", alt: "Los Angeles" },
    { src: "/images/realsimple.png", alt: "Real Simple" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <motion.div
      className="py-20 flex flex-col items-center px-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.p
        className="text-sm md:text-3xl font-semibold text-[#a4a4a4] uppercase"
        variants={itemVariants}
      >
        as Featured in
      </motion.p>
      <motion.div
        className="mt-12 flex flex-wrap justify-center items-center gap-6 md:gap-16 sm:gap-12 xs:gap-8"
        variants={containerVariants}
      >
        {brands.map((brand, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            transition={{ duration: 0.2 }}
            className="relative w-18 md:w-60 sm:w-48 xs:w-40 h-12"
          >
            <Image
              src={brand.src}
              alt={brand.alt}
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default FeaturedBrands;