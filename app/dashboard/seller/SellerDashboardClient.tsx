"use client";

import Link from "next/link";
import { Plus, Edit, Eye, Trash2, TrendingUp, DollarSign, Package } from "lucide-react";
import { useRouter } from "next/navigation";

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
  isPublished: boolean;
  isFeatured: boolean;
}

interface SellerDashboardClientProps {
  tools: Tool[];
  totalRevenue: number;
  totalSubscriptions: number;
}

export function SellerDashboardClient({
  tools,
  totalRevenue,
  totalSubscriptions,
}: SellerDashboardClientProps) {
  const router = useRouter();

  async function handleDelete(toolId: string, toolName: string) {
    if (!confirm(`Are you sure you want to delete "${toolName}"? This cannot be undone.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/tools/${toolId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.refresh();
      } else {
        alert("Failed to delete tool");
      }
    } catch (error) {
      alert("Something went wrong");
    }
  }

  return (
    <>
      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Total Tools</h3>
            <Package className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{tools.length}</div>
          <p className="text-sm text-gray-600">
            {tools.filter((t) => t.isPublished).length} published
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Subscriptions</h3>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{totalSubscriptions}</div>
          <p className="text-sm text-gray-600">Active subscriptions</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Revenue</h3>
            <DollarSign className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            ${totalRevenue.toFixed(2)}
          </div>
          <p className="text-sm text-gray-600">All time</p>
        </div>
      </div>

      {/* Tools List */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Your Tools</h2>
        </div>
        {tools.length === 0 ? (
          <div className="p-12 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No tools yet
            </h3>
            <p className="text-gray-600 mb-6">
              Create your first tool to start selling on the marketplace.
            </p>
            <Link
              href="/dashboard/seller/tools/new"
              className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Your First Tool
            </Link>
          </div>
        ) : (
          <div className="divide-y">
            {tools.map((tool) => (
              <div key={tool.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {tool.name}
                      </h3>
                      {tool.isPublished ? (
                        <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded">
                          Published
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-semibold text-gray-700 bg-gray-100 rounded">
                          Draft
                        </span>
                      )}
                      {tool.isFeatured && (
                        <span className="px-2 py-1 text-xs font-semibold text-yellow-700 bg-yellow-100 rounded">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{tool.shortDescription}</p>
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <span>${tool.price}/{tool.priceType}</span>
                      <span>•</span>
                      <span>{tool.purchaseCount} purchases</span>
                      <span>•</span>
                      <span>{tool.rating ? `${tool.rating.toFixed(1)}★` : "No ratings"}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-6">
                    <Link
                      href={`/tools/${tool.slug}`}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                      title="View"
                    >
                      <Eye className="w-5 h-5" />
                    </Link>
                    <Link
                      href={`/dashboard/seller/tools/${tool.id}/edit`}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                      title="Edit"
                    >
                      <Edit className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(tool.id, tool.name)}
                      className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

