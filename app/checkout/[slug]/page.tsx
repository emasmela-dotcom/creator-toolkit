import { getCurrentUser } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, CreditCard, Shield } from "lucide-react";
import { CheckoutClient } from "./CheckoutClient";

export default async function CheckoutPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { toolId?: string };
}) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login?redirect=/checkout");
  }

  const tool = await prisma.tool.findUnique({
    where: { id: searchParams.toolId || { slug: params.slug } },
    include: {
      seller: {
        include: {
          user: true,
        },
      },
      reviews: {
        select: {
          rating: true,
        },
      },
    },
  });

  if (!tool || !tool.isPublished) {
    redirect("/marketplace");
  }

  // Check if already purchased
  if (tool.priceType === "one-time") {
    const purchase = await prisma.purchase.findUnique({
      where: {
        userId_toolId: {
          userId: user.id,
          toolId: tool.id,
        },
      },
    });

    if (purchase && purchase.status === "completed") {
      redirect(`/tools/${tool.slug}`);
    }
  } else {
    const subscription = await prisma.subscription.findUnique({
      where: {
        userId_toolId: {
          userId: user.id,
          toolId: tool.id,
        },
      },
    });

    if (subscription && subscription.status === "active") {
      redirect(`/tools/${tool.slug}`);
    }
  }

  const rating =
    tool.reviews.length > 0
      ? tool.reviews.reduce((sum, r) => sum + r.rating, 0) / tool.reviews.length
      : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Micro-SaaS Marketplace
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href={`/tools/${tool.slug}`}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to tool
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <CheckoutClient tool={tool} user={user} />
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-4">
                  {tool.imageUrl ? (
                    <img
                      src={tool.imageUrl}
                      alt={tool.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{tool.name}</h3>
                    <p className="text-sm text-gray-600">{tool.category}</p>
                    {rating && (
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm text-gray-600">
                          {rating.toFixed(1)} ({tool.reviewCount} reviews)
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">${tool.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Marketplace fee (15%)</span>
                  <span className="text-gray-900">${(tool.price * 0.15).toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${tool.price.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <div className="flex items-start gap-3 text-sm text-gray-600">
                  <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Secure checkout</p>
                    <p>Your payment is processed securely. We never store your card details.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-2 text-xs text-gray-500">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Instant access after payment</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>
                    {tool.priceType === "one-time"
                      ? "One-time purchase, lifetime access"
                      : "Cancel anytime"}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>30-day money-back guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

