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
      className="sticky top-0 left-0 right-0 z-[211] bg-[var(--primary-bg)] h-[70px] flex justify-between items-center max-md:px-8"
    >
        <nav className="hidden lg:flex items-center">
          <ul className="flex items-center gap-12">
            <li>
              <Link
                href="/#plants"
                className="text-gray-600 font-medium transition-colors duration-300"
              >
                Plants
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

        <div className="lg:hidden">
          <div
            className={`cursor-pointer transition-all duration-500 ease-in-out ${
              active ? 'rotate-90' : ''
            }`}
            onClick={handleClick}
          >
            <div className="w-8 h-0.5 bg-primary mb-1.5 transition-all duration-300"></div>
            <div className="w-8 h-0.5 bg-primary mb-1.5 transition-all duration-300"></div>
            <div className="w-8 h-0.5 bg-primary transition-all duration-300"></div>
          </div>
        </div>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-4 cursor-pointer">
          <Image
            src="/images/plantito-logo.svg"
            alt="Plantito Logo"
            width={32}
            height={32}
          />
          <span className="text-2xl text-green-800 sm:text-xl">Plantito</span>
        </Link>

        <button
          type="button"
          className="relative text-3xl text-primary hover:scale-110 transition-transform duration-400 ease-in-out bg-transparent"
          onClick={() => setShowCart(true)}
        >
          <AiOutlineShopping />
          <span className="absolute -right-2 -top-2 text-sm text-white bg-secondary w-[18px] h-[18px] rounded-full flex items-center justify-center font-semibold">
            {totalQuantities}
          </span>
        </button>

        <motion.nav
          className={`lg:hidden fixed left-0 h-screen top-0 bg-[var(--primary-bg)] w-[70%] flex flex-col items-center justify-start pt-20 z-10 transition-transform duration-500 ease-in-out ${
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
                alt="Plantito Logo"
                width={32}
                height={32}
              />
              <span className="text-2xl text-secondary">Plantito</span>
            </div>
          </Link>
          <ul className="flex flex-col items-center gap-24">
            <li onClick={() => setActive(false)}>
              <Link
                href="/#plants"
                className="text-4xl font-medium text-primary hover:text-secondary transition-colors duration-300"
              >
                Plants
              </Link>
            </li>
            <li onClick={() => setActive(false)}>
              <Link
                href="/about"
                className="text-4xl font-medium text-primary hover:text-secondary transition-colors duration-300"
              >
                About
              </Link>
            </li>
            <li onClick={() => setActive(false)}>
              <Link
                href="/#contact"
                className="text-4xl font-medium text-primary hover:text-secondary transition-colors duration-300"
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[2] lg:hidden"
            onClick={() => setActive(false)}
          />
        )}

      {showCart && <Cart />}
    </motion.div>
  )
}

export default Navbar
