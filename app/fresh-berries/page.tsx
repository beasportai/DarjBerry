'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star, Truck } from 'lucide-react';

const FreshBerries = () => {
  const products = [
    {
      id: 1,
      name: "Premium Darjeeling Blueberries",
      description: "Hand-picked fresh blueberries from our Himalayan farms",
      price: "₹500",
      originalPrice: "₹650",
      weight: "250g",
      rating: 4.8,
      reviews: 156,
      image: "/images/blueberries-pack.jpg",
      soldOut: true
    },
    {
      id: 2,
      name: "Organic Blueberry Jam",
      description: "Sugar-free artisanal jam made from our farm-fresh berries",
      price: "₹450",
      originalPrice: "₹550",
      weight: "300g",
      rating: 4.9,
      reviews: 89,
      image: "/images/blueberry-jam.jpg",
      soldOut: true
    },
    {
      id: 3,
      name: "Frozen Blueberry Pack",
      description: "Flash-frozen berries retaining all nutrients and flavor",
      price: "₹400",
      originalPrice: "₹500",
      weight: "500g",
      rating: 4.7,
      reviews: 203,
      image: "/images/frozen-blueberries.jpg",
      soldOut: true
    },
    {
      id: 4,
      name: "Blueberry Gift Hamper",
      description: "Perfect gift with fresh berries, jam, and dried berries",
      price: "₹1,200",
      originalPrice: "₹1,500",
      weight: "1kg combo",
      rating: 5.0,
      reviews: 45,
      image: "/images/gift-hamper.jpg",
      soldOut: true
    },
    {
      id: 5,
      name: "Dried Blueberries",
      description: "Naturally dried berries perfect for snacking and baking",
      price: "₹350",
      originalPrice: "₹450",
      weight: "200g",
      rating: 4.6,
      reviews: 178,
      image: "/images/dried-blueberries.jpg",
      soldOut: true
    },
    {
      id: 6,
      name: "Blueberry Juice Concentrate",
      description: "100% pure berry juice with no added sugars or preservatives",
      price: "₹800",
      originalPrice: "₹950",
      weight: "500ml",
      rating: 4.8,
      reviews: 67,
      image: "/images/berry-juice.jpg",
      soldOut: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100">
      {/* Header Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <Badge className="mb-4 bg-purple-100 text-purple-800 px-4 py-2 text-sm">
            🫐 Premium Darjeeling Blueberries • Farm to Table • Coming Soon
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight">
            Fresh Berries Store
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed px-4">
            <strong>Premium Himalayan Blueberries</strong><br />
            From our Darjeeling farms to your doorstep 🚚<br />
            <span className="text-base sm:text-lg text-blue-600 font-semibold">Hand-picked • Flash-frozen • Nutrient-rich • Bryan Johnson approved</span>
          </p>

          <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
            <p className="text-yellow-800 font-semibold">
              🚧 Store launching soon! All items currently sold out due to overwhelming pre-orders.
            </p>
            <p className="text-yellow-700 text-sm mt-2">
              Be the first to know when fresh stock arrives - join our WhatsApp updates!
            </p>
          </div>
        </motion.div>
      </section>

      {/* Product Grid */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="border-2 hover:border-purple-300 transition-colors relative overflow-hidden">
                {product.soldOut && (
                  <div className="absolute inset-0 bg-gray-900 bg-opacity-75 z-10 flex items-center justify-center">
                    <Badge className="bg-red-500 text-white px-4 py-2 text-lg font-bold">
                      SOLD OUT
                    </Badge>
                  </div>
                )}
                
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-1">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-green-600">{product.price}</span>
                        <span className="text-sm text-gray-500 line-through ml-2">{product.originalPrice}</span>
                        <div className="text-sm text-gray-600">{product.weight}</div>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full bg-purple-500 hover:bg-purple-600 text-white"
                      disabled={product.soldOut}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      {product.soldOut ? 'Notify When Available' : 'Add to Cart'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Coming Soon Notice */}
      <section className="container mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-lg border-2 border-purple-200"
        >
          <h2 className="text-3xl font-bold mb-4 text-purple-600">Fresh Stock Coming Soon!</h2>
          <p className="text-gray-700 mb-6 text-lg">
            Our first harvest is in progress! Get notified when premium Darjeeling blueberries 
            become available. Limited quantities, unlimited freshness.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">₹500/kg</div>
              <div className="text-sm text-gray-600">Farm-fresh pricing</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">48hrs</div>
              <div className="text-sm text-gray-600">Farm to doorstep</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">100%</div>
              <div className="text-sm text-gray-600">Organic & natural</div>
            </div>
          </div>

          <Button 
            onClick={() => {
              const message = `Hi Darjberry! 🫐

I'm interested in getting notified when fresh blueberries are available in your store.

Please add me to your fresh berries notification list for:
- Premium Darjeeling Blueberries
- Organic Blueberry products  
- Special offers and new arrivals

Looking forward to tasting the freshest Himalayan blueberries! 🌱`;
              
              const encodedMessage = encodeURIComponent(message);
              window.open(`https://wa.me/917047474942?text=${encodedMessage}`, '_blank');
            }}
            size="lg" 
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg font-semibold rounded-full"
          >
            <Truck className="mr-2 h-5 w-5" />
            Get Notified on WhatsApp
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

export default FreshBerries;