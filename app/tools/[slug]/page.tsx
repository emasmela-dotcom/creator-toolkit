import Link from "next/link";
import { ArrowLeft, Star, Check, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth-helpers";
import { notFound } from "next/navigation";
import { ReviewsSection } from "./ReviewsSection";

export default async function ToolDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const tool = await prisma.tool.findUnique({
    where: { slug: params.slug },
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

  if (!tool || !tool.isPublished) {
    notFound();
  }

  const user = await getCurrentUser();
  const hasSubscription = user
    ? await prisma.subscription.findUnique({
        where: {
          userId_toolId: {
            userId: user.id,
            toolId: tool.id,
          },
        },
      })
    : null;

  const features = tool.description.split("\n").filter((f) => f.trim());

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
                    {tool.rating && (
                      <div className="flex items-center">
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        <span className="ml-2 font-semibold text-gray-900">
                          {tool.rating.toFixed(1)}
                        </span>
                        <span className="text-gray-600 ml-1">
                          ({tool.reviewCount} reviews)
                        </span>
                      </div>
                    )}
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-600">{tool.purchaseCount} users</span>
                  </div>
                </div>
              </div>

              <p className="text-xl text-gray-700 mb-6">{tool.shortDescription}</p>
              <p className="text-gray-600 leading-relaxed mb-8 whitespace-pre-line">
                {tool.description}
              </p>

              {features.length > 0 && (
                <div className="border-t pt-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Features
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Reviews Section */}
            <ReviewsSection
              toolId={tool.id}
              reviews={tool.reviews}
              hasSubscription={!!hasSubscription}
            />
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
                      {tool.seller.user.name || "Unknown Seller"}
                    </div>
                    {tool.seller.isVerified && (
                      <div className="text-xs text-green-600">Verified Seller</div>
                    )}
                  </div>
                </div>
                <Link
                  href={`/sellers/${tool.seller.user.name?.toLowerCase().replace(/\s+/g, "-")}`}
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
