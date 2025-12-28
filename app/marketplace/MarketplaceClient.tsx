"use client";

import Link from "next/link";
import { ArrowRight, Search, GitCompare } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

interface Tool {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  category: string;
  price: number;
  priceType: string;
  rating: number | null;
  reviewCount: number;
  purchaseCount: number;
  isFeatured: boolean;
  seller?: any;
  reviews?: any[];
}

export function MarketplaceClient({
  tools,
  categories,
}: {
  tools: any[];
  categories: string[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "All"
  );
  const [compareTools, setCompareTools] = useState<string[]>([]);

  function updateSearchParams(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "All") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    startTransition(() => {
      router.push(`/marketplace?${params.toString()}`);
    });
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    updateSearchParams("search", searchQuery);
  }

  function handleCategoryChange(category: string) {
    setSelectedCategory(category);
    updateSearchParams("category", category);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Creator Toolkit
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/marketplace" className="text-gray-900 font-semibold">
                Marketplace
              </Link>
              <Link href="/sell" className="text-gray-600 hover:text-gray-900">
                Sell Tools
              </Link>
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
            </nav>
            <div className="flex gap-4">
              <Link
                href="/login"
                className="text-gray-600 hover:text-gray-900 px-4 py-2"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Marketplace</h1>
          <p className="text-xl text-gray-600">
            Discover simple, focused tools built for creators
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <form onSubmit={handleSearch} className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </form>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? "bg-gray-900 text-white"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count and Compare */}
        <div className="mb-6 flex items-center justify-between">
          <div className="text-gray-600">
            {isPending ? (
              "Loading..."
            ) : (
              <>
                Found {tools.length} {tools.length === 1 ? "tool" : "tools"}
                {searchParams.get("search") && (
                  <span> for "{searchParams.get("search")}"</span>
                )}
              </>
            )}
          </div>
          {compareTools.length > 0 && (
            <Link
              href={`/compare?tools=${compareTools.join(",")}`}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 text-sm font-semibold"
            >
              <GitCompare className="w-4 h-4" />
              Compare ({compareTools.length})
            </Link>
          )}
        </div>

        {/* Tools Grid */}
        {tools.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-600 text-lg mb-4">No tools found</p>
            <p className="text-gray-500">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <div
                key={tool.id}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all relative"
              >
                <div className="absolute top-4 right-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={compareTools.includes(tool.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          if (compareTools.length < 4) {
                            setCompareTools([...compareTools, tool.id]);
                          }
                        } else {
                          setCompareTools(
                            compareTools.filter((id) => id !== tool.id)
                          );
                        }
                      }}
                      className="rounded"
                    />
                    <span className="text-xs text-gray-600">Compare</span>
                  </label>
                </div>
                <Link href={`/tools/${tool.slug}`} className="block">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                    <ArrowRight className="w-6 h-6 text-gray-700" />
                  </div>
                  <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {tool.category}
                  </span>
                </div>
                {tool.isFeatured && (
                  <div className="mb-2">
                    <span className="text-xs font-semibold text-yellow-700 bg-yellow-100 px-2 py-1 rounded">
                      Featured
                    </span>
                  </div>
                )}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {tool.name}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">{tool.shortDescription}</p>
                <div className="flex items-center gap-2 mb-4">
                  {tool.rating && (
                    <>
                      <div className="flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm font-semibold text-gray-900 ml-1">
                          {tool.rating.toFixed(1)}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        ({tool.reviewCount} reviews)
                      </span>
                      <span className="text-sm text-gray-500">•</span>
                    </>
                  )}
                  <span className="text-sm text-gray-500">
                    {tool.purchaseCount} users
                  </span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">
                      ${tool.price}
                    </span>
                    <span className="text-gray-600 text-sm ml-1">
                      /{tool.priceType === "one-time" ? "once" : tool.priceType}
                    </span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

