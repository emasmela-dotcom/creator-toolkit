import Link from "next/link";
import { ArrowLeft, Star, Check, ArrowRight, Sparkles, Zap, Users, TrendingUp } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function CreatorFlowPage() {
  // Check if CreatorFlow tool exists, if not create a placeholder or fetch from a special route
  let tool = await prisma.tool.findUnique({
    where: { slug: "creatorflow" },
    include: {
      seller: {
        include: {
          user: true,
        },
      },
      reviews: {
        include: {
          user: true,
        },
        orderBy: { createdAt: "desc" },
        take: 10,
      },
    },
  });

  // If CreatorFlow doesn't exist yet, show a special showcase page
  if (!tool) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="border-b bg-white sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                Micro-SaaS Marketplace
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
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 rounded-3xl p-12 border border-purple-200">
            <div className="text-center mb-12">
              <Sparkles className="w-16 h-16 text-purple-600 mx-auto mb-4" />
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                CreatorFlow
              </h1>
              <p className="text-2xl text-gray-700 mb-8">
                The Complete Micro-SaaS Marketplace
              </p>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                CreatorFlow is our flagship tool - a comprehensive platform that demonstrates
                the power of integrated creator tools. From content planning to analytics,
                CreatorFlow brings everything together in one place.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <Users className="w-8 h-8 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">10,000+ Creators</h3>
                <p className="text-gray-600">Trust CreatorFlow for their daily workflow</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <Zap className="w-8 h-8 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">50+ Tools</h3>
                <p className="text-gray-600">Integrated into one powerful platform</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <TrendingUp className="w-8 h-8 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">20hrs/week</h3>
                <p className="text-gray-600">Average time saved per creator</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What CreatorFlow Includes</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Content planning and scheduling",
                  "Multi-platform publishing",
                  "Advanced analytics dashboard",
                  "AI-powered content suggestions",
                  "Team collaboration tools",
                  "Email marketing integration",
                  "Social media management",
                  "Revenue tracking",
                  "Audience insights",
                  "Automated workflows",
                  "Custom integrations",
                  "24/7 support",
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-6">
                CreatorFlow is coming soon to the marketplace. This is what's possible
                when creators build comprehensive tools on our platform.
              </p>
              <Link
                href="/marketplace"
                className="bg-gray-900 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 inline-flex items-center gap-2"
              >
                Browse Other Tools
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If tool exists, show normal tool page
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Regular tool page would go here */}
      <p>CreatorFlow tool page</p>
    </div>
  );
}


