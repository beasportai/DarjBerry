"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Calendar, Clock, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
  source: 'static' | 'pseo';
}

// Static articles that exist as files
const staticArticles: Article[] = [
  {
    id: "1",
    slug: "global-blueberry-price-trends",
    title: "Global Blueberry Wholesale Price Trends 2025-2035",
    excerpt: "Market analysis reveals 6-7.2% CAGR growth driven by increasing global demand and health consciousness. Discover the factors shaping blueberry prices over the next decade.",
    date: "December 2024",
    readTime: "8 min read",
    category: "Market Analysis",
    image: "/images/Blueberry Lifecycle.jpg",
    tags: ["Price Trends", "Market Analysis", "Investment"],
    source: 'static' as const,
  },
  {
    id: "6",
    slug: "google-trends-blueberry-demand-india",
    title: "Google Trends Reveal 9% Growth in Blueberry Interest: India's Rising Opportunity",
    excerpt: "Google search data shows 8.5M monthly searches for blueberries with 9% year-over-year growth, highlighting massive untapped potential in the Indian market as global demand soars.",
    date: "December 2024",
    readTime: "6 min read",
    category: "Market Research",
    image: "/images/Blueberry Plant in a Polyhouse.jpg",
    tags: ["Google Trends", "Market Demand", "India Opportunity"],
    source: 'static' as const,
  },
  {
    id: "2",
    slug: "blueberry-farming-india",
    title: "Why Blueberry Farming is the Future of Agriculture in India",
    excerpt: "Explore how blueberry cultivation is transforming Indian agriculture with high returns, sustainable practices, and growing domestic demand.",
    date: "December 2024",
    readTime: "6 min read",
    category: "Farming Guide",
    image: "/images/Blueberry Rows in Polytunnel in Fruiting Phase.jpg",
    tags: ["India", "Farming", "Sustainability"],
    source: 'static' as const,
  },
  // Coming Soon - These articles are planned but pages need to be created
  // {
  //   id: 3,
  //   slug: "health-benefits-blueberries",
  //   title: "The Science Behind Blueberries: Health Benefits That Drive Demand",
  //   excerpt: "From antioxidants to brain health, discover why health-conscious consumers are driving unprecedented demand for blueberries worldwide.",
  //   date: "November 2024",
  //   readTime: "5 min read",
  //   category: "Health & Nutrition",
  //   image: "/images/Blueberry Pudding.jpg",
  //   tags: ["Health", "Nutrition", "Consumer Trends"],
  // },
  // {
  //   id: 4,
  //   slug: "blueberry-varieties-india",
  //   title: "Best Blueberry Varieties for Indian Climate: A Comprehensive Guide",
  //   excerpt: "Learn about the most suitable blueberry cultivars for different Indian regions, their yield potential, and climate requirements.",
  //   date: "November 2024",
  //   readTime: "7 min read",
  //   category: "Technical Guide",
  //   image: "/images/The Life Cycle of a Blueberry.jpeg",
  //   tags: ["Varieties", "Climate", "Technical"],
  // },
  // {
  //   id: 5,
  //   slug: "roi-analysis-blueberry-farming",
  //   title: "ROI Analysis: Blueberry Farming vs Traditional Crops",
  //   excerpt: "A detailed financial comparison showing why blueberry farming offers 5X returns compared to traditional Indian crops.",
  //   date: "October 2024",
  //   readTime: "10 min read",
  //   category: "Financial Analysis",
  //   image: "/images/hero-desktop.jpg",
  //   tags: ["ROI", "Financial", "Comparison"],
  // },
  {
    id: "7",
    slug: "../tea-estate-partnership",
    title: "Tea Estate Partnership: Convert Your Tea Garden to Blueberry Farm",
    excerpt: "Transform your tea estate into a high-yield blueberry farm with 6x higher profits. Explore sub-lease, joint venture, or land sale options with 20-35% ROI.",
    date: "December 2024",
    readTime: "12 min read",
    category: "Partnership Opportunities",
    image: "/images/Blueberry Plant in a Polyhouse.jpg",
    tags: ["Tea Estate", "Partnership", "Land Conversion"],
    source: 'static' as const,
  },
  {
    id: "8",
    slug: "../investment/west-bengal/siliguri",
    title: "Blueberry Farming Investment in Siliguri: Complete Guide",
    excerpt: "Discover why Siliguri offers ideal conditions for blueberry farming with excellent climate, soil pH, and government support. Calculate your ROI for this emerging opportunity.",
    date: "December 2024",
    readTime: "10 min read",
    category: "Location Investment",
    image: "/images/The Life Cycle of a Blueberry.jpeg",
    tags: ["Siliguri", "West Bengal", "Investment Calculator"],
    source: 'static' as const,
  },
  {
    id: "9",
    slug: "../investment/assam/guwahati",
    title: "Guwahati Blueberry Farm Investment: Northeast India Opportunity",
    excerpt: "Explore blueberry farming investment opportunities in Guwahati with detailed climate analysis, soil conditions, and projected returns in Assam's agricultural hub.",
    date: "December 2024",
    readTime: "10 min read",
    category: "Location Investment",
    image: "/images/Blueberry Rows in Polytunnel in Fruiting Phase.jpg",
    tags: ["Guwahati", "Assam", "Northeast India"],
    source: 'static' as const,
  },
  {
    id: "10",
    slug: "../investment/meghalaya/shillong",
    title: "Shillong Blueberry Cultivation: Hill Station Farming Advantage",
    excerpt: "Leverage Shillong's unique hill climate and acidic soil for premium blueberry cultivation. Learn about Meghalaya's agricultural policies and investment incentives.",
    date: "December 2024",
    readTime: "9 min read",
    category: "Location Investment",
    image: "/images/Blueberry Plant in a Polyhouse.jpg",
    tags: ["Shillong", "Meghalaya", "Hill Station Farming"],
    source: 'static' as const,
  },
  {
    id: "11",
    slug: "../investment/sikkim/gangtok",
    title: "Gangtok Blueberry Farming: High-Altitude Organic Advantage",
    excerpt: "Discover why Gangtok's high-altitude climate and organic farming tradition make it perfect for premium blueberry cultivation with excellent export potential.",
    date: "December 2024",
    readTime: "9 min read",
    category: "Location Investment",
    image: "/images/Blueberry Lifecycle.jpg",
    tags: ["Gangtok", "Sikkim", "High Altitude"],
    source: 'static' as const,
  },
];

// Function to convert pSEO database entries to Article format
function convertPSEOToArticle(seoPage: any): Article {
  const stateCity = `${seoPage.city}, ${seoPage.state}`;
  return {
    id: seoPage.id,
    slug: `../investment/${seoPage.state.toLowerCase().replace(/\s+/g, '-')}/${seoPage.city.toLowerCase().replace(/\s+/g, '-')}`,
    title: seoPage.metaTitle,
    excerpt: seoPage.metaDescription,
    date: new Date(seoPage.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    readTime: "10 min read",
    category: "Location Investment",
    image: `/images/${['Blueberry Lifecycle.jpg', 'Blueberry Plant in a Polyhouse.jpg', 'Blueberry Rows in Polytunnel in Fruiting Phase.jpg', 'The Life Cycle of a Blueberry.jpeg'][Math.floor(Math.random() * 4)]}`,
    tags: [seoPage.city, seoPage.state, "Investment Guide"],
    source: 'pseo'
  };
}

export default function InsightsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [pseoPages, setPseoPages] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  
  const itemsPerPage = 12;

  // Fetch pSEO pages from database
  useEffect(() => {
    async function fetchPSEOPages() {
      try {
        const response = await fetch('/api/seo/all-pages');
        if (response.ok) {
          const data = await response.json();
          const convertedPages = data.pages.map(convertPSEOToArticle);
          setPseoPages(convertedPages);
        }
      } catch (error) {
        console.error('Error fetching pSEO pages:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchPSEOPages();
  }, []);

  // Combine static and pSEO articles
  const allArticles = [...staticArticles, ...pseoPages];
  
  // Get unique categories
  const categories = ["All", ...new Set(allArticles.map(article => article.category))];

  // Filter articles based on search and category
  const filteredArticles = allArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalFilteredPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + itemsPerPage);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section className="relative w-full h-screen text-white overflow-hidden font-sans">
        {/* Background Image */}
        <Image
          src="/images/hero-desktop.jpg"
          alt="Darjberry blueberry farming landscape"
          fill
          priority
          className="object-cover object-center z-0"
          sizes="100vw"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10" />

        {/* Hero Text */}
        <div className="relative z-20 flex flex-col justify-center items-center h-full px-4 md:px-6 text-center">
          <div className="py-4 md:py-0">
            <h1 className="text-[4rem] md:text-[7rem] leading-[0.85] font-light mb-2 md:mb-0">
              <span className="block font-sans">Blueberry</span>
              <span className="block font-serif italic -mt-2 md:-mt-4">
                insights
              </span>
            </h1>
          </div>

          <div className="mt-4 md:mt-12 text-center py-3 md:py-0">
            <p className="text-sm md:text-base leading-relaxed px-2">
              <span className="block mb-2">
                <strong>Expert articles on market trends,</strong> farming techniques
              </span>
              <span className="block">
                and investment opportunities in the blueberry industry
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search articles by title, content, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border-gray-300 focus:border-green-500 focus:ring-green-500"
                />
              </div>
              
              {/* Category Filter */}
              <div className="flex gap-2 flex-wrap">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6 flex justify-between items-center">
            <p className="text-gray-600">
              Showing {paginatedArticles.length} of {filteredArticles.length} {filteredArticles.length === 1 ? "article" : "articles"}
              {searchQuery && ` for "${searchQuery}"`}
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
            </p>
            <div className="text-sm text-gray-500">
              {staticArticles.length} editorial articles • {pseoPages.length} location guides
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedArticles.map(article => (
              <article key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                {/* Article Image */}
                <div className="h-48 relative">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                
                {/* Article Content */}
                <div className="p-6">
                  {/* Category Badge */}
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full mb-3">
                    {article.category}
                  </span>
                  
                  {/* Source Badge */}
                  {article.source === 'pseo' && (
                    <span className="inline-block px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full mb-2">
                      Location Guide
                    </span>
                  )}
                  
                  {/* Title */}
                  <h2 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                    {article.title}
                  </h2>
                  
                  {/* Excerpt */}
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  {/* Meta Info */}
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="mr-4">{article.date}</span>
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{article.readTime}</span>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map(tag => (
                      <span key={tag} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Read More Link */}
                  <Link
                    href={`/insights/${article.slug}`}
                    className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
                  >
                    Read More
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          {totalFilteredPages > 1 && (
            <div className="flex justify-center items-center space-x-4 mt-12">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              
              <div className="flex items-center space-x-2">
                {[...Array(Math.min(5, totalFilteredPages))].map((_, i) => {
                  const pageNum = i + 1;
                  const isActive = pageNum === currentPage;
                  return (
                    <Button
                      key={pageNum}
                      variant={isActive ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className={isActive ? "bg-green-600 hover:bg-green-700" : ""}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
                {totalFilteredPages > 5 && (
                  <>
                    <span className="text-gray-400">...</span>
                    <Button
                      variant={currentPage === totalFilteredPages ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(totalFilteredPages)}
                      className={currentPage === totalFilteredPages ? "bg-green-600 hover:bg-green-700" : ""}
                    >
                      {totalFilteredPages}
                    </Button>
                  </>
                )}
              </div>
              
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalFilteredPages))}
                disabled={currentPage === totalFilteredPages}
                className="flex items-center"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}

          {/* No Results Message */}
          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No articles found matching your criteria. Try adjusting your search or filters.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-green-900 text-white py-16 mt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4">
              Stay Updated with Blueberry Farming Insights
            </h3>
            <p className="text-lg mb-8">
              Get the latest articles on market trends, farming techniques, and investment opportunities delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white text-gray-900"
              />
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
}