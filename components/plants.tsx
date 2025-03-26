"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { tempProducts, tempBestsellers } from '../constants/data'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Plants = () => {
  const router = useRouter()
  const [activeFilter, setActiveFilter] = useState('All')
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 })
  const [filterWork, setFilterWork] = useState(tempProducts)

  const handleWorkFilter = (item: string) => {
    setActiveFilter(item)
    setAnimateCard({ y: 100, opacity: 0 })

    setTimeout(() => {
      setAnimateCard({ y: 0, opacity: 1 })

      if (item === 'All') {
        setFilterWork(tempProducts)
      } else {
        setFilterWork(
          tempProducts.filter((product) => product.variety.tags.includes(item))
        )
      }
    }, 500)
  }

  return (
    <section className="px-4 py-10 md:py-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="mt-8"
      >
        <h3
          id="plants"
          className="text-5xl text-green-800 text-center font-bold mb-16"
        >
          Plantito Plants
        </h3>
        <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
          {['All', 'Indoor', 'Outdoor', 'Indoor/Outdoor'].map((item, index) => (
            <button
              key={index}
              onClick={() => handleWorkFilter(item)}
              className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                activeFilter === item
                  ? 'bg-green-800 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-green-700 hover:text-white'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <motion.div
          animate={animateCard}
          transition={{ duration: 0.4, delayChildren: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:w-[80%] mx-auto gap-8"
        >
          {filterWork?.map((product) => (
            <motion.div
              key={product._id}
              className="bg-white rounded-lg shadow-sm aspect-[3/5] overflow-hidden group cursor-pointer"
              onClick={() => router.push(`/product/${product._id}`)}
            >
              <div className="relative group overflow-hidden h-[70%]">
                <div className="absolute group-hover:hidden top-2 right-2 z-10 gap-2 mt-2">
                  {product.variety.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Image
                  src={product.variety.image}
                  alt={product.variety.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  priority
                />
              </div>
              <div className="p-4 bg-black/80 h-full">
                <div className="flex justify-between items-center">
                  <h4 className="text-xl text-white font-semibold">
                    {product.variety.name}
                  </h4>
                  <p className="text-green-600 font-medium">
                    ${product.variety.price}
                  </p>
                </div>
                <p className="text-gray-300 text-sm">
                  {product.variety.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <h3 className="text-5xl text-green-800 text-center font-bold my-16">
        Best Seller Plants
      </h3>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:w-[80%] mx-auto gap-8"
      >
        {tempBestsellers?.map((bestseller) => (
          <motion.div
            key={bestseller._id}
            className="bg-white rounded-lg shadow-sm aspect-[3/5] overflow-hidden group"
          >
            <div className="relative group overflow-hidden h-[70%]">
              <div className="absolute group-hover:hidden top-2 right-2 z-10 gap-2 mt-2">
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                  Best Seller
                </span>
              </div>
              <Image
                src={bestseller.image}
                alt={bestseller.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                priority
              />
            </div>
            <div className="p-4 bg-black/80 h-full">
              <div className="flex justify-between items-center">
                <h4 className="text-xl text-white font-semibold">
                  {bestseller.name}
                </h4>
                <p className="text-green-600 font-medium">
                  ${bestseller.price}
                </p>
              </div>
              <div className="flex items-center mt-2">
                <span className="text-yellow-400">★</span>
                <span className="ml-1 text-white">{bestseller.rating}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default Plants
