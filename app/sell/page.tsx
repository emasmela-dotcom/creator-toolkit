import Link from "next/link";
import { ArrowRight, Check, DollarSign, Users, TrendingUp } from "lucide-react";

export default function SellPage() {
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
              <Link href="/marketplace" className="text-gray-600 hover:text-gray-900">
                Marketplace
              </Link>
              <Link href="/sell" className="text-gray-900 font-semibold">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Sell Your Micro-Tool
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Build once, sell forever. We handle payments, hosting, and 
            distribution so you can focus on building great tools.
          </p>
          <Link
            href="/signup?type=seller"
            className="bg-gray-900 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 inline-flex items-center gap-2"
          >
            Start Selling
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <DollarSign className="w-6 h-6 text-gray-900" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Keep 70-80%</h3>
            <p className="text-gray-600">
              We take a 20-30% marketplace fee. You keep the rest. 
              No hidden costs.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-gray-900" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Built-in Audience</h3>
            <p className="text-gray-600">
              Get your tool in front of thousands of creators looking 
              for solutions.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-gray-900" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Recurring Revenue</h3>
            <p className="text-gray-600">
              Set up subscriptions and build predictable monthly income 
              from your tools.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Build Your Tool",
                description: "Create a simple, focused tool that solves one problem well.",
              },
              {
                step: "2",
                title: "List on Marketplace",
                description: "Add your tool with description, pricing, and features.",
              },
              {
                step: "3",
                title: "We Handle Payments",
                description: "Stripe Connect handles all payments and subscriptions.",
              },
              {
                step: "4",
                title: "Earn Recurring Revenue",
                description: "Get paid automatically as creators subscribe to your tool.",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-2xl border border-gray-200 p-12 mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Everything You Need
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Stripe Connect integration",
              "Automatic subscription management",
              "Analytics dashboard",
              "Customer support tools",
              "Featured placement options",
              "Marketing resources",
            ].map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Selling?
          </h2>
          <p className="text-gray-600 mb-8">
            Join creators who are building simple tools and earning recurring revenue.
          </p>
          <Link
            href="/signup?type=seller"
            className="bg-gray-900 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 inline-flex items-center gap-2"
          >
            Create Seller Account
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

