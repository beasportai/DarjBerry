"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Menu,
  X,
  Phone,
  MessageCircle,
  ChevronDown,
  Leaf,
  Users,
  BarChart3,
  Shield,
  MapPin,
  Sparkles,
  TrendingUp,
  Award,
} from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState("");

  const handleWhatsApp = () => {
    window.open("https://wa.me/917047474942", "_blank");
  };

  const navItems = [
    { name: "Home", href: "/", current: true },
    { 
      name: "About", 
      href: "/about",
      dropdown: [
        { name: "Our Story", href: "/about/story", icon: Users },
        { name: "Farm Locations", href: "/about/locations", icon: MapPin },
        { name: "Success Stories", href: "/about/success", icon: BarChart3 },
      ]
    },
    { name: "Investment Plans", href: "/plans" },
    { name: "Farm Progress", href: "/progress" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50 shadow-xl">
      {/* Floating background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/30 via-transparent to-blue-50/30"></div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-2 left-1/4 w-32 h-8 bg-emerald-200/20 rounded-full blur-xl"></div>
        <div className="absolute -top-2 right-1/4 w-40 h-8 bg-blue-200/20 rounded-full blur-xl"></div>
      </div>
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between h-20">
          {/* Enhanced Logo with Glass Morphism */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 via-green-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-all duration-300">
                  <div className="absolute inset-0 bg-white/20 rounded-2xl"></div>
                  <Leaf className="h-7 w-7 text-white relative z-10" />
                  <Sparkles className="h-3 w-3 text-yellow-300 absolute top-1 right-1" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black bg-gradient-to-r from-slate-800 via-emerald-700 to-blue-700 bg-clip-text text-transparent tracking-tight">
                  Darjberry
                </span>
                <span className="text-xs text-emerald-600 font-bold -mt-1 tracking-wide">
                  🏔️ Himalayan Blueberry Wealth
                </span>
              </div>
            </div>
          </div>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setDropdownOpen(item.name)}
                    onMouseLeave={() => setDropdownOpen("")}
                  >
                    <button className="flex items-center space-x-1 text-slate-700 hover:text-emerald-600 font-medium transition-colors py-2">
                      <span>{item.name}</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    
                    {dropdownOpen === item.name && (
                      <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-emerald-100 py-2 z-50">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="flex items-center space-x-3 px-4 py-3 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                          >
                            <subItem.icon className="h-4 w-4" />
                            <span className="font-medium">{subItem.name}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`font-medium transition-colors py-2 ${
                      item.current
                        ? "text-emerald-600 border-b-2 border-emerald-600"
                        : "text-slate-700 hover:text-emerald-600"
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Enhanced Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-sm rounded-full px-4 py-2 border border-red-200/50 shadow-lg">
              <Badge className="bg-red-500/20 text-red-700 border-0 px-3 py-1 font-bold">
                ⚡ 9 Spots Left
              </Badge>
            </div>
            
            <Button
              onClick={handleWhatsApp}
              variant="outline"
              size="sm"
              className="border-white/50 bg-white/60 backdrop-blur-sm text-emerald-700 hover:bg-emerald-50/80 hover:shadow-lg font-semibold transition-all duration-300"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
            
            <Button
              size="sm"
              className="bg-gradient-to-r from-emerald-600 via-green-600 to-blue-600 hover:from-emerald-700 hover:via-green-700 hover:to-blue-700 text-white font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Phone className="h-4 w-4 mr-2" />
              Call Now
            </Button>
          </div>

          {/* Enhanced Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-3">
            <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-sm rounded-full px-3 py-1 border border-red-200/50">
              <Badge className="bg-transparent text-red-700 border-0 text-xs px-1 py-0 font-bold">
                9 Left
              </Badge>
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 bg-white/60 backdrop-blur-sm rounded-xl text-slate-700 hover:text-emerald-600 hover:bg-white/80 transition-all duration-300 shadow-lg"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden border-t border-white/30 bg-white/90 backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/20 to-blue-50/20"></div>
            <div className="relative">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => setDropdownOpen(dropdownOpen === item.name ? "" : item.name)}
                        className="flex items-center justify-between w-full px-3 py-2 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg font-medium transition-colors"
                      >
                        <span>{item.name}</span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${dropdownOpen === item.name ? 'rotate-180' : ''}`} />
                      </button>
                      {dropdownOpen === item.name && (
                        <div className="ml-4 mt-1 space-y-1">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="flex items-center space-x-3 px-3 py-2 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors"
                              onClick={() => setIsOpen(false)}
                            >
                              <subItem.icon className="h-4 w-4" />
                              <span>{subItem.name}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`block px-3 py-2 rounded-lg font-medium transition-colors ${
                        item.current
                          ? "bg-emerald-50 text-emerald-700"
                          : "text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              
              {/* Mobile CTA Buttons */}
              <div className="pt-4 space-y-2 border-t border-emerald-100 mt-4">
                <Button
                  onClick={handleWhatsApp}
                  variant="outline"
                  className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp Consultation
                </Button>
                
                <Button
                  className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-semibold"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call +91 70474 74942
                </Button>
              </div>
            </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
