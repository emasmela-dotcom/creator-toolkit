import Link from "next/link";
import { Package, CreditCard, Settings, Plus } from "lucide-react";

export default function DashboardPage() {
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
              <Link href="/sell" className="text-gray-600 hover:text-gray-900">
                Sell Tools
              </Link>
              <Link href="/dashboard" className="text-gray-900 font-semibold">
                Dashboard
              </Link>
            </nav>
            <div className="flex gap-4">
              <Link
                href="/profile"
                className="text-gray-600 hover:text-gray-900 px-4 py-2"
              >
                Profile
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Dashboard</h1>

        {/* Tabs */}
        <div className="border-b mb-8">
          <div className="flex gap-6">
            <button className="border-b-2 border-gray-900 pb-4 font-semibold text-gray-900">
              My Tools
            </button>
            <button className="pb-4 text-gray-600 hover:text-gray-900">
              Subscriptions
            </button>
            <button className="pb-4 text-gray-600 hover:text-gray-900">
              Sales
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Active Tools</h3>
              <Package className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">0</div>
            <p className="text-sm text-gray-600">Tools you're selling</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Subscriptions</h3>
              <CreditCard className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">0</div>
            <p className="text-sm text-gray-600">Active subscriptions</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Revenue</h3>
              <Settings className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">$0</div>
            <p className="text-sm text-gray-600">This month</p>
          </div>
        </div>

        {/* Empty State */}
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No tools yet
          </h3>
          <p className="text-gray-600 mb-6">
            Start selling your first tool or subscribe to tools from the marketplace.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/sell"
              className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Tool
            </Link>
            <Link
              href="/marketplace"
              className="border border-gray-300 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50"
            >
              Browse Marketplace
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

