import Link from "next/link";
import { ArrowRight, Search, Filter } from "lucide-react";

export default function MarketplacePage() {
  const categories = [
    "All",
    "Marketing",
    "Content",
    "Productivity",
    "Community",
    "Sales",
    "Analytics",
  ];

  const tools = [
    {
      name: "Link-in-bio but for email",
      description: "Collect emails directly in your bio link",
      price: 9,
      priceType: "monthly",
      category: "Marketing",
      rating: 4.8,
      reviews: 124,
      purchases: 1200,
    },
    {
      name: "Course outline generator",
      description: "AI-powered course structure creator",
      price: 19,
      priceType: "monthly",
      category: "Content",
      rating: 4.9,
      reviews: 89,
      purchases: 890,
    },
    {
      name: "Digital product launch checklist",
      description: "Never miss a step in your launch",
      price: 5,
      priceType: "one-time",
      category: "Productivity",
      rating: 4.7,
      reviews: 256,
      purchases: 2100,
    },
    {
      name: "Comment moderation tool",
      description: "Auto-moderate comments across platforms",
      price: 12,
      priceType: "monthly",
      category: "Community",
      rating: 4.6,
      reviews: 67,
      purchases: 450,
    },
    {
      name: "Simple CRM for solo creators",
      description: "Track your audience and deals",
      price: 15,
      priceType: "monthly",
      category: "Sales",
      rating: 4.8,
      reviews: 145,
      purchases: 980,
    },
    {
      name: "Social media scheduler",
      description: "Schedule posts across all platforms",
      price: 8,
      priceType: "monthly",
      category: "Marketing",
      rating: 4.5,
      reviews: 203,
      purchases: 1500,
    },
  ];

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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Marketplace
          </h1>
          <p className="text-xl text-gray-600">
            Discover simple, focused tools built for creators
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search tools..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                  category === "All"
                    ? "bg-gray-900 text-white"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <Link
              key={index}
              href={`/tools/${tool.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                  <ArrowRight className="w-6 h-6 text-gray-700" />
                </div>
                <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {tool.category}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {tool.name}
              </h3>
              <p className="text-gray-600 mb-4 text-sm">{tool.description}</p>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  <span className="text-yellow-500">★</span>
                  <span className="text-sm font-semibold text-gray-900 ml-1">
                    {tool.rating}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  ({tool.reviews} reviews)
                </span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">
                  {tool.purchases} users
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
          ))}
        </div>
      </div>
    </div>
  );
}

