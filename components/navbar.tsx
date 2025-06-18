'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AiOutlineShopping } from 'react-icons/ai'
import { motion } from 'framer-motion'
import { useStateContext } from '../context/state-context'
import Cart from './cart'

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities, active, setActive } =
    useStateContext()

  const handleClick = () => {
    setActive(!active)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="sticky top-0 left-0 right-0 z-[211] wrapper bg-[var(--primary-bg)] w-full h-[70px] flex justify-between items-center px-8"
    >
        <nav className="hidden md:flex items-center">
          <ul className="flex items-center gap-12">
            <li>
              <Link
                href="/#investment"
                className="text-gray-600 font-medium transition-colors duration-300"
              >
                Investment
              </Link>
            </li>
            <li>
              <Link
                href="/#products"
                className="text-gray-600 font-medium transition-colors duration-300"
              >
                Fresh Berries
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-gray-600 font-medium transition-colors duration-300"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/#contact"
                className="text-gray-600 font-medium transition-colors duration-300"
              >
                Contact us
              </Link>
            </li>
          </ul>
        </nav>

        <div className="md:hidden">
          <div
            className={`cursor-pointer transition-all duration-500 ease-in-out`}
            onClick={handleClick}
          >
            {active ? (
              <div className="z-20 relative w-8 h-8">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-black rotate-45"></div>
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-black -rotate-45"></div>
              </div>
            ) : (
              <>
                <div className="w-8 h-0.5 bg-black mb-1.5 transition-all duration-300"></div>
                <div className="w-8 h-0.5 bg-black mb-1.5 transition-all duration-300"></div>
                <div className="w-8 h-0.5 bg-black transition-all duration-300"></div>
              </>
            )}
          </div>
        </div>

        <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center gap-4 cursor-pointer">
          <Image
            src="/images/plantito-logo.svg"
            alt="Darjberry Logo"
            width={32}
            height={32}
          />
          <span className="text-2xl text-green-800 sm:text-xl">Darjberry</span>
        </Link>

        <button
          type="button"
          className="relative text-3xl text-primary hover:scale-110 transition-transform duration-400 ease-in-out bg-transparent"
          onClick={() => setShowCart(true)}
        >
          <AiOutlineShopping />
          <span className="absolute -right-2 -top-2 text-sm text-green-800 w-[18px] h-[18px] rounded-full flex items-center justify-center font-semibold">
            {totalQuantities}
          </span>
        </button>

        <motion.nav
          className={`md:hidden fixed left-0 h-screen top-0 bg-white w-[80%] flex flex-col items-center justify-center z-10 transition-transform duration-500 ease-in-out ${
            active ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <Link href="/" className="mb-12">
            <div
              className="flex items-center gap-4 cursor-pointer"
              onClick={() => setActive(false)}
            >
              <Image
                src="/images/plantito-logo.svg"
                alt="Darjberry Logo"
                width={32}
                height={32}
              />
              <span className="text-2xl text-green-800">Darjberry</span>
            </div>
          </Link>
          <ul className="flex flex-col items-center gap-12">
            <li onClick={() => setActive(false)}>
              <Link
                href="/#investment"
                className="text-2xl hover:text-green-800 transition-all"
              >
                Investment
              </Link>
            </li>
            <li onClick={() => setActive(false)}>
              <Link
                href="/#products"
                className="text-2xl hover:text-green-800 transition-all"
              >
                Fresh Berries
              </Link>
            </li>
            <li onClick={() => setActive(false)}>
              <Link
                href="/about"
                className="text-2xl hover:text-green-800 transition-all"
              >
                About
              </Link>
            </li>
            <li onClick={() => setActive(false)}>
              <Link
                href="/#contact"
                className="text-2xl hover:text-green-800 transition-all"
              >
                Contact us
              </Link>
            </li>
          </ul>
        </motion.nav>

        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[2] md:hidden"
            onClick={() => setActive(false)}
          />
        )}

      {showCart && <Cart />}
    </motion.div>
  )
}

export default Navbar
