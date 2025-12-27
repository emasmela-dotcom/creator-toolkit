import Link from "next/link";
import { ArrowLeft, Star, Check, ArrowRight } from "lucide-react";

export default function ToolDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  // In a real app, this would fetch from the database
  const tool = {
    name: "Link-in-bio but for email",
    description:
      "Collect emails directly in your bio link. No complicated forms, no redirects. Just a simple link that captures emails from your audience.",
    longDescription: `Transform your link-in-bio into an email collection powerhouse. This tool lets you add a simple email capture form to any link, making it easy for your audience to subscribe without leaving their current page.

Perfect for creators who want to grow their email list without the hassle of setting up complex forms or managing multiple platforms.`,
    price: 9,
    priceType: "monthly",
    category: "Marketing",
    rating: 4.8,
    reviews: 124,
    purchases: 1200,
    features: [
      "One-click email capture",
      "Customizable form design",
      "Automatic list management",
      "Analytics dashboard",
      "Integrates with major email providers",
      "Mobile-optimized",
    ],
    seller: {
      name: "Creator Tools Co",
      verified: true,
    },
  };

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/marketplace"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Marketplace
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 p-8 mb-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full inline-block mb-3">
                    {tool.category}
                  </span>
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    {tool.name}
                  </h1>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      <span className="ml-2 font-semibold text-gray-900">
                        {tool.rating}
                      </span>
                      <span className="text-gray-600 ml-1">
                        ({tool.reviews} reviews)
                      </span>
                    </div>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-600">{tool.purchases} users</span>
                  </div>
                </div>
              </div>

              <p className="text-xl text-gray-700 mb-6">{tool.description}</p>
              <p className="text-gray-600 leading-relaxed mb-8">
                {tool.longDescription}
              </p>

              <div className="border-t pt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Features
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {tool.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Reviews ({tool.reviews})
              </h2>
              <div className="space-y-6">
                {/* Sample Review */}
                <div className="border-b pb-6 last:border-0 last:pb-0">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        Sarah M.
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 text-yellow-500 fill-yellow-500"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    This tool has been a game-changer for growing my email list.
                    Super simple to set up and it just works!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Purchase Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
              <div className="mb-6">
                <div className="text-4xl font-bold text-gray-900 mb-1">
                  ${tool.price}
                </div>
                <div className="text-gray-600">
                  /{tool.priceType === "one-time" ? "one-time" : "month"}
                </div>
              </div>

              <button className="w-full bg-gray-900 text-white py-4 rounded-lg font-semibold hover:bg-gray-800 mb-4 flex items-center justify-center gap-2">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="text-center text-sm text-gray-600 mb-6">
                Cancel anytime • Secure payment
              </div>

              <div className="border-t pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {tool.seller.name}
                    </div>
                    {tool.seller.verified && (
                      <div className="text-xs text-green-600">Verified Seller</div>
                    )}
                  </div>
                </div>
                <Link
                  href={`/sellers/${tool.seller.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  View all tools by this seller
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

