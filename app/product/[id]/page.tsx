"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useStateContext } from '@/context/state-context';
import { tempProducts, tempBestsellers } from '@/constants/data';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  potColor: string;
  description?: string;
  tags?: string[];
  variety?: {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    potColor: string;
    description?: string;
    tags?: string[];
  };
}

const product: Product = {
  id: tempBestsellers[0]._id,
  name: tempBestsellers[0].name,
  price: tempBestsellers[0].price,
  image: tempBestsellers[0].image,
  description: tempBestsellers[0].description,
  quantity: 1,
  potColor: 'White',
  tags: ['Indoor', 'Low Maintenance'],
  variety: {
    id: tempProducts[0]._id,
    name: tempProducts[0].variety.name,
    price: tempProducts[0].variety.price,
    image: tempProducts[0].variety.image,
    description: tempProducts[0].variety.description,
    quantity: 1,
    potColor: 'Black',
    tags: tempProducts[0].variety.tags
  }
};

const products = tempProducts;

const ProductDetails = () => {
  const { decQty, incQty, qty, indexColor, setIndexColor, onAdd, setShowCart, setQty } = useStateContext();

  const handleVariant1 = () => {
    setIndexColor(1);
    setQty(1);
  };

  const handleVariant2 = () => {
    setIndexColor(0);
    setQty(1);
  };

  const handleClick = () => {
    if (indexColor === 0) {
      return onAdd(product, qty);
    } else {
      return onAdd(product.variety!, qty);
    }
  };

  const handleBuy = () => {
    if (indexColor === 0) {
      onAdd(product, qty);
      setShowCart(true);
    } else if (indexColor === 1) {
      onAdd(product.variety!, qty);
      setShowCart(true);
    }
  };

  return (
    <motion.div
      className="md:max-w-[80%] mx-auto"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <div className="flex flex-col gap-10 py-20 text-primary-color md:flex-row md:items-start md:justify-center">
        <div>
          <div className="mb-4">
            {indexColor === 0 && (
              <Image
                src={product.image}
                alt={product.name}
                width={500}
                height={700}
                className="h-[33.5rem] w-[20.8rem] rounded-lg transition-all duration-300 object-cover"
              />
            )}
            {indexColor === 1 && (
              <Image
                src={product.variety!.image}
                alt={product.variety!.name}
                width={500}
                height={700}
                className="h-[33.5rem] w-[30.8rem] rounded-lg transition-all duration-300 object-cover"
              />
            )}
          </div>
          <div className="flex gap-2.5 mt-5">
            <Image
              src={product.variety!.image}
              alt={product.variety!.name}
              width={200}
              height={200}
              className={`w-16 h-20 rounded cursor-pointer transition-all duration-300 md:w-20 md:h-28 object-cover ${
                indexColor === 1 ? 'outline-2 outline-green-800' : ''
              }`}
              onClick={handleVariant1}
            />
            <Image
              src={product.image}
              alt={product.name}
              width={200}
              height={200}
              className={`w-16 h-20 rounded cursor-pointer transition-all duration-300 md:w-20 md:h-28 object-cover ${
                indexColor === 0 ? 'outline-2 outline-green-800' : ''
              }`}
              onClick={handleVariant2}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 p-4 md:items-start md:justify-center">
          <h4 className="text-5xl font-semibold uppercase">{product.name}</h4>
          <p className="text-xl text-gray-600">
            {indexColor === 0 ? `${product.name} ceramic pot` : `${product.variety!.name} ceramic pot`}
          </p>
          <div className="flex items-center gap-2.5 text-2xl">
            <p className="text-gray-600">Good for {product.tags![0]}</p>
            <div className="flex items-center justify-center">
              <AiFillStar className="text-green-700 size-4" />
              <AiFillStar className="text-green-700 size-4" />
              <AiFillStar className="text-green-700 size-4" />
              <AiFillStar className="text-green-700 size-4" />
              <AiOutlineStar className="text-green-700 size-4" />
            </div>
            <p className="text-gray-600">(20)</p>
          </div>

          <span className="text-3xl text-gray-600 font-semibold">Details:</span>
          <p className="text-xl text-gray-600">{product.description}</p>
          <p className="text-xl font-extrabold text-gray-500 mt-12">$ {product.price}</p>
          <div className="flex items-center gap-5 mt-2.5">
            <p className="text-xl text-gray-600 font-bold">Quantity</p>
            <div className="flex items-center border border-gray-300 rounded">
              <span className="p-2 px-3 cursor-pointer text-red-500 border-r border-gray-300" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="p-2 px-3 border-r border-gray-300 text-xl">{qty}</span>
              <span className="p-2 px-3 cursor-pointer text-green-500" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </div>
          </div>
          <div className="flex gap-4 mt-12">
            <button
              type="button"
              className="px-8 py-2 text-xl font-semibold text-gray-600 border border-gray-300 rounded"
              onClick={handleClick}
            >
              Add to Cart
            </button>
            <button
              type="button"
              className="px-8 py-2 text-xl rounded font-semibold bg-green-800 text-white"
              onClick={handleBuy}
            >
              Buy now
            </button>
          </div>
        </div>
      </div>

      <div className="mt-30">
        <h2 className="text-center text-4xl font-bold text-secondary-color my-12">You may also like</h2>
        <div className="relative h-[47rem] w-full overflow-x-hidden">
          <div className="absolute whitespace-nowrap will-change-transform animate-marquee w-[180%] hover:animate-pause">
            <div className="flex justify-center gap-4">
              {products.map((item) => (
                <div key={item._id} className="flex-shrink-0">
                  <Image
                    src={item.variety.image}
                    alt={item.variety.name}
                    width={200}
                    height={200}
                    className="w-48 h-48 rounded object-cover"
                  />
                  <p className="text-center">{item.variety.name}</p>
                  <p className="text-center">$ {item.variety.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;