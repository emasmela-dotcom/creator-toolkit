import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Shield, TrendingUp } from "lucide-react";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { CreatorFlowShowcase } from "@/components/CreatorFlowShowcase";

export default function Home() {
  const featuredTools = [
    {
      name: "Link-in-bio but for email",
      description: "Collect emails directly in your bio link",
      price: 9,
      priceType: "monthly",
      category: "Marketing",
    },
    {
      name: "Course outline generator",
      description: "AI-powered course structure creator",
      price: 19,
      priceType: "monthly",
      category: "Content",
    },
    {
      name: "Digital product launch checklist",
      description: "Never miss a step in your launch",
      price: 5,
      priceType: "one-time",
      category: "Productivity",
    },
    {
      name: "Comment moderation tool",
      description: "Auto-moderate comments across platforms",
      price: 12,
      priceType: "monthly",
      category: "Community",
    },
    {
      name: "Simple CRM for solo creators",
      description: "Track your audience and deals",
      price: 15,
      priceType: "monthly",
      category: "Sales",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Creator Toolkit
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/marketplace" className="text-gray-600 hover:text-gray-900">
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

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Tools for Creators,
            <br />
            <span className="text-gray-600">Not Platforms</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A marketplace where creators buy small, focused tools. 
            No learning curve. No complexity. Just tools that work.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/marketplace"
              className="bg-gray-900 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 flex items-center gap-2"
            >
              Browse Tools
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/sell"
              className="border border-gray-300 text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50"
            >
              Sell Your Tool
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-gray-900" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Simple & Focused</h3>
            <p className="text-gray-600">
              Each tool does one thing well. No bloat, no complexity.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-gray-900" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Built for Creators</h3>
            <p className="text-gray-600">
              Tools designed by creators, for creators. No tech skills needed.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-gray-900" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure & Reliable</h3>
            <p className="text-gray-600">
              All payments handled securely. Your data is safe.
            </p>
          </div>
        </div>
      </section>

      {/* CreatorFlow Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-6 h-6" />
            <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">
              Featured Showcase
            </span>
          </div>
          <h2 className="text-3xl font-bold mb-3">
            Meet CreatorFlow - Our Flagship Tool
          </h2>
          <p className="text-lg text-purple-100 mb-6 max-w-2xl">
            See how CreatorFlow demonstrates the power of integrated creator tools.
            A complete platform that shows what's possible on our marketplace.
          </p>
          <Link
            href="/tools/creatorflow"
            className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 inline-flex items-center gap-2"
          >
            Explore CreatorFlow
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Featured Tools */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Featured Tools
            </h2>
            <p className="text-gray-600">
              Hand-picked tools that creators love
            </p>
          </div>
          <Link
            href="/marketplace"
            className="text-gray-900 font-semibold hover:underline flex items-center gap-2"
          >
            View All
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTools.map((tool, index) => (
            <Link
              key={index}
              href={`/tools/${tool.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-gray-700" />
                </div>
                <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {tool.category}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {tool.name}
              </h3>
              <p className="text-gray-600 mb-4">{tool.description}</p>
              <div className="flex items-center justify-between">
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
      </section>

      {/* CreatorFlow Showcase */}
      <CreatorFlowShowcase />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-12 text-center text-white">
          <TrendingUp className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">
            Ready to build your micro-tool?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join creators who are building simple, focused tools and earning 
            recurring revenue. We handle payments, hosting, and distribution.
          </p>
          <Link
            href="/sell"
            className="bg-white text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 inline-block"
          >
            Start Selling
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Creator Toolkit
              </h3>
              <p className="text-gray-600 text-sm">
                Tools for creators, not platforms.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/marketplace" className="hover:text-gray-900">Marketplace</Link></li>
                <li><Link href="/sell" className="hover:text-gray-900">Sell Tools</Link></li>
                <li><Link href="/pricing" className="hover:text-gray-900">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/about" className="hover:text-gray-900">About</Link></li>
                <li><Link href="/blog" className="hover:text-gray-900">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-gray-900">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/terms" className="hover:text-gray-900">Terms</Link></li>
                <li><Link href="/privacy" className="hover:text-gray-900">Privacy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
            <p>© 2024 Creator Toolkit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

