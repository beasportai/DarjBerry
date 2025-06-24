"use client";

import { useState } from "react";

const CustomMenuIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="cursor-pointer"
  >
    <path d="M3 6H21" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <path d="M3 12H21" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <path d="M3 18H21" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "ABOUT us", href: "#about" },
    { label: "HOW it WORKS", href: "#how-it-works" },
    { label: "FAQs", href: "#faq" },
    { label: "CONTACT us", href: "#contact" },
  ];

  const leftItems = navItems.slice(0, 2);
  const rightItems = navItems.slice(2);

  return (
    <nav className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 py-8 text-sm font-light tracking-wider">
      {/* Mobile Nav */}
      <div className="md:hidden flex items-center justify-between w-full">
        <button onClick={() => setIsOpen(!isOpen)}>
          <CustomMenuIcon />
        </button>
        <div className="text-base tracking-[0.15em] font-light text-white uppercase">
          DARJBERRY
        </div>
        <div className="w-6" /> {/* Spacer for centering */}
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex justify-between items-center w-full">
        <div className="flex gap-8 text-white">
          {leftItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="hover:opacity-70 transition-opacity duration-300 uppercase text-xs tracking-[0.1em]"
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="text-xl tracking-[0.2em] font-light text-white uppercase">
          DARJBERRY
        </div>
        <div className="flex gap-8 text-white">
          {rightItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="hover:opacity-70 transition-opacity duration-300 uppercase text-xs tracking-[0.1em]"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black/95 z-40 flex items-center justify-center">
          <div className="absolute top-8 right-6">
            <button onClick={() => setIsOpen(false)} className="text-white">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col items-center space-y-8">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-white text-2xl font-light tracking-[0.1em] uppercase hover:opacity-70 transition-opacity duration-300"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
