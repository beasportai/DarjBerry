import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Why Blueberry Farming is the Future of Agriculture in India | Darjberry",
  description: "Explore how blueberry cultivation is transforming Indian agriculture with high returns, sustainable practices, and growing domestic demand.",
};

export default function BlueberryFarmingIndiaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navbar />
      
      <section className="relative bg-gradient-to-r from-green-700 to-green-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Why Blueberry Farming is the Future of Agriculture in India
            </h1>
            <p className="text-xl text-green-100">
              Coming Soon - This article is under development
            </p>
          </div>
        </div>
      </section>

      <article className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-8">
            We're currently working on this comprehensive guide about blueberry farming opportunities in India.
          </p>
          <Link href="/insights" className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
            Back to All Articles
          </Link>
        </div>
      </article>
    </div>
  );
}