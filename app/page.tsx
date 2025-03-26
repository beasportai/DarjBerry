"use client"
import FeaturedBrands from '@/components/featured-brands';
import Hero from '@/components/hero';
import Plants from '@/components/plants';
import { motion } from 'framer-motion'

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero />
      <FeaturedBrands />
      <Plants />
    </motion.div>
  )
}

export default Home;
