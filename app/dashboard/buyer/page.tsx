import { getCurrentUser } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CreditCard, Calendar, X } from "lucide-react";

export default async function BuyerDashboardPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect("/login");
  }

  // Get user's subscriptions
  const subscriptions = await prisma.subscription.findMany({
    where: { userId: user.id },
    include: {
      tool: {
        include: {
          seller: {
            include: {
              user: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  // Get user's one-time purchases
  const purchases = await prisma.purchase.findMany({
    where: { 
      userId: user.id,
      status: "completed",
    },
    include: {
      tool: {
        include: {
          seller: {
            include: {
              user: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const activeSubscriptions = subscriptions.filter((s) => s.status === "active");
  const totalMonthlyCost = activeSubscriptions.reduce((sum, sub) => {
    if (sub.tool.priceType === "monthly") {
      return sum + sub.tool.price;
    }
    return sum;
  }, 0);

  const totalTools = subscriptions.length + purchases.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Tools</h1>
          <p className="text-gray-600">Manage your subscriptions and purchased tools</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Active Subscriptions</h3>
              <CreditCard className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {activeSubscriptions.length}
            </div>
            <p className="text-sm text-gray-600">Currently active</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Monthly Cost</h3>
              <CreditCard className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              ${totalMonthlyCost.toFixed(2)}
            </div>
            <p className="text-sm text-gray-600">Per month</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Total Tools</h3>
              <CreditCard className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {totalTools}
            </div>
            <p className="text-sm text-gray-600">Total tools owned</p>
          </div>
        </div>

        {/* Subscriptions List */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Your Tools</h2>
          </div>
          {totalTools === 0 ? (
            <div className="p-12 text-center">
              <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No subscriptions yet
              </h3>
              <p className="text-gray-600 mb-6">
                Browse the marketplace to find tools that can help you.
              </p>
              <Link
                href="/marketplace"
                className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 inline-block"
              >
                Browse Marketplace
              </Link>
            </div>
          ) : (
            <div className="divide-y">
              {/* Subscriptions */}
              {subscriptions.map((subscription) => (
                <div key={subscription.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {subscription.tool.name}
                        </h3>
                        {subscription.status === "active" ? (
                          <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded">
                            Active
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs font-semibold text-gray-700 bg-gray-100 rounded">
                            {subscription.status}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-3">
                        {subscription.tool.shortDescription}
                      </p>
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <CreditCard className="w-4 h-4" />
                          ${subscription.tool.price}/{subscription.tool.priceType}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Renews {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                        </span>
                        <span>•</span>
                        <span>By {subscription.tool.seller.user.name || "Unknown"}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-6">
                      <Link
                        href={`/tools/${subscription.tool.slug}`}
                        className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold"
                      >
                        View Tool
                      </Link>
                      {subscription.status === "active" && (
                        <button className="px-4 py-2 text-red-700 bg-red-50 hover:bg-red-100 rounded-lg text-sm font-semibold flex items-center gap-2">
                          <X className="w-4 h-4" />
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {/* One-time Purchases */}
              {purchases.map((purchase) => (
                <div key={purchase.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {purchase.tool.name}
                        </h3>
                        <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded">
                          Owned
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">
                        {purchase.tool.shortDescription}
                      </p>
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <CreditCard className="w-4 h-4" />
                          One-time purchase • ${purchase.amount.toFixed(2)}
                        </span>
                        <span>•</span>
                        <span>Purchased {new Date(purchase.createdAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>By {purchase.tool.seller.user.name || "Unknown"}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-6">
                      <Link
                        href={`/tools/${purchase.tool.slug}/access`}
                        className="px-4 py-2 text-white bg-gray-900 hover:bg-gray-800 rounded-lg text-sm font-semibold"
                      >
                        Access Tool
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


