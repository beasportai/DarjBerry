'use client'
import { tempBestsellers, tempProducts } from '@/constants/data'
import { useStateContext } from '@/context/state-context'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import {
  AiFillStar,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineStar,
} from 'react-icons/ai'

interface Product {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  weight: string
  description?: string
  tags?: string[]
  variety?: {
    id: string
    name: string
    price: number
    image: string
    quantity: number
    weight: string
    description?: string
    tags?: string[]
  }
}

const weights = [
  { label: '125gm', price: 249 },
  { label: '250gm', price: 499 },
  { label: '500gm', price: 999 },
  { label: '1kg', price: 1999 },
  { label: '5kg', price: 9999 },
  { label: '10kg', price: 19999 },
  { label: '100kg', price: 199990 },
]

const product: Product = {
  id: tempBestsellers[0]._id,
  name: tempBestsellers[0].name,
  price: tempBestsellers[0].price,
  image: tempBestsellers[0].image,
  description: tempBestsellers[0].description,
  quantity: 1,
  weight: '125gm',
  tags: ['Fresh', 'Premium Quality'],
  variety: {
    id: tempProducts[0]._id,
    name: tempProducts[0].variety.name,
    price: tempProducts[0].variety.price,
    image: tempProducts[0].variety.image,
    description: tempProducts[0].variety.description,
    quantity: 1,
    weight: '125gm',
    tags: tempProducts[0].variety.tags,
  },
}

const products = tempProducts

const ProductDetails = () => {
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext()
  const [selectedWeight, setSelectedWeight] = useState('125gm')
  const [currentPrice, setCurrentPrice] = useState(249)

  const handleWeightChange = (weight: string) => {
    setSelectedWeight(weight)
    const selectedWeightData = weights.find((w) => w.label === weight)
    if (selectedWeightData) {
      setCurrentPrice(selectedWeightData.price)
    }
  }

  const handleClick = () => {
    const productToAdd = {
      ...product,
      price: currentPrice,
      weight: selectedWeight,
      quantity: qty,
    }
    onAdd(productToAdd, qty)
  }

  const handleBuy = () => {
    const productToAdd = {
      ...product,
      price: currentPrice,
      weight: selectedWeight,
      quantity: qty,
    }
    onAdd(productToAdd, qty)
    setShowCart(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="flex flex-col md:flex-row gap-20 py-10 md:py-20">
        <div className='px-6'>
          <div className="relative h-[33.5rem] w-[20.8rem]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="rounded-lg object-cover transition-all duration-300"
            />
          </div>
          <div className="flex gap-2.5 mt-5">
            {product.variety && (
              <div className="relative h-24 w-24 md:h-28 md:w-36 outline-2 outline-green-800 cursor-pointer transition-all duration-300 rounded">
                <Image
                  src={product.variety.image}
                  alt={product.variety.name}
                  fill
                  className="rounded object-cover"
                />
              </div>
            )}
            <div className="relative h-24 w-24 md:h-28 md:w-36 cursor-pointer transition-all duration-300 rounded">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="rounded object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex px-6 flex-col gap-2.5">
          <h4 className="text-3xl md:text-4xl font-bold uppercase">{product.name}</h4>
          <p className="text-base md:text-xl text-gray-600">
            Premium quality fresh blueberries
          </p>
          <div className="flex items-center gap-2.5 text-xl">
            <p className="max-md:text-base text-gray-600">Good for {product.tags?.[0]}</p>
            <div className="flex items-center justify-center">
              <AiFillStar className="text-green-700 size-4" />
              <AiFillStar className="text-green-700 size-4" />
              <AiFillStar className="text-green-700 size-4" />
              <AiFillStar className="text-green-700 size-4" />
              <AiOutlineStar className="text-green-700 size-4" />
            </div>
            <p className="text-gray-600">(20)</p>
          </div>

          <span className="md:text-xl text-base font-bold text-gray-600">Details:</span>
          <p className="md:text-xl text-base text-gray-600">{product.description}</p>

          <div className="mt-4">
            <label className="block md:text-xl text-base font-medium text-gray-700 mb-2">
              Select Weight
            </label>
            <select
              value={selectedWeight}
              onChange={(e) => handleWeightChange(e.target.value)}
              className="w-full max-w-[200px] p-3 border border-gray-300 rounded-md focus:ring-green-800 focus:border-green-800 text-base md:text-xl"
            >
              {weights.map((weight) => (
                <option key={weight.label} value={weight.label}>
                  {weight.label} - ₹{weight.price}
                </option>
              ))}
            </select>
          </div>

          <p className="text-xl font-extrabold text-green-800 mt-12">
            ₹{currentPrice}
          </p>
          <div className="flex items-center gap-5 mt-2.5">
            <p className="text-base md:text-xl text-gray-600 font-bold">Quantity</p>
            <div className="flex items-center border border-gray-300 rounded">
              <span
                className="p-1 px-2 md:p-2 md:px-3 cursor-pointer text-red-500 border-r border-gray-300"
                onClick={decQty}
              >
                <AiOutlineMinus />
              </span>
              <span className="p-1 px-2 md:p-2 md:px-3 border-r border-gray-300 text-xl">
                {qty}
              </span>
              <span
                className="p-1 px-2 md:p-2 md:px-3 cursor-pointer text-green-500"
                onClick={incQty}
              >
                <AiOutlinePlus />
              </span>
            </div>
          </div>

          <div className="flex gap-4 mt-12">
            <button
              type="button"
              className="px-4 md:px-6 py-2 md:py-3 text-gray-600 border-gray-300 bg-[var(--primary-bg)] hover:bg-white transition-all hover:scale-105 border rounded-md text-base md:text-xl font-semibold"
              onClick={handleClick}
            >
              Add to Cart
            </button>
            <button
              type="button"
              className="px-4 md:px-6 py-2 md:py-3 bg-green-800 text-white rounded-md hover:bg-green-900 hover:scale-105 transition-all text-base md:text-xl font-semibold"
              onClick={handleBuy}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="mt-32">
        <h3 className="text-3xl font-bold text-green-800 text-center mb-12">
          You may also like
        </h3>
        <div className="relative h-[27rem] w-full overflow-hidden">
          <motion.div
            className="absolute flex gap-4 whitespace-nowrap"
            animate={{
              x: [0, -1000],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'linear',
            }}
          >
            <div className="flex gap-4">
              {products.map((item) => (
                <motion.div
                  key={item._id}
                  className="flex-shrink-0 w-48 cursor-pointer"
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
                  onHoverStart={() => {
                    const parent = document.querySelector(
                      '.animate-marquee'
                    ) as HTMLElement
                    if (parent) {
                      parent.style.animationPlayState = 'paused'
                    }
                  }}
                  onHoverEnd={() => {
                    const parent = document.querySelector(
                      '.animate-marquee'
                    ) as HTMLElement
                    if (parent) {
                      parent.style.animationPlayState = 'running'
                    }
                  }}
                >
                  <div className="relative h-48 w-48 rounded-lg overflow-hidden">
                    <Image
                      src={item.variety.image}
                      alt={item.variety.name}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-lg font-medium text-gray-800 break-words">
                      {item.variety.name}
                    </p>
                    <p className="text-lg font-semibold text-green-800">
                      ₹{item.variety.price}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex gap-4">
              {products.map((item) => (
                <motion.div
                  key={`duplicate-${item._id}`}
                  className="flex-shrink-0 w-48 cursor-pointer"
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
                  onHoverStart={() => {
                    const parent = document.querySelector(
                      '.animate-marquee'
                    ) as HTMLElement
                    if (parent) {
                      parent.style.animationPlayState = 'paused'
                    }
                  }}
                  onHoverEnd={() => {
                    const parent = document.querySelector(
                      '.animate-marquee'
                    ) as HTMLElement
                    if (parent) {
                      parent.style.animationPlayState = 'running'
                    }
                  }}
                >
                  <div className="relative h-48 w-48 rounded-lg overflow-hidden">
                    <Image
                      src={item.variety.image}
                      alt={item.variety.name}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-lg font-medium text-gray-800 break-words">
                      {item.variety.name}
                    </p>
                    <p className="text-lg font-semibold text-green-800">
                      ₹{item.variety.price}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductDetails
