"use client";

import Link from "next/link";
import { ArrowLeft, Star, Check, X, Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface Tool {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  category: string;
  price: number;
  priceType: string;
  rating: number | null;
  reviewCount: number;
  purchaseCount: number;
  imageUrl: string | null;
  demoUrl: string | null;
  seller: {
    user: {
      name: string | null;
    };
    isVerified: boolean;
  };
  reviews: { rating: number }[];
}

export function CompareToolsClient({ tools }: { tools: any[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedTools, setSelectedTools] = useState(tools.map((t) => t.id));

  function addTool(toolId: string) {
    if (selectedTools.length >= 4) return;
    const newTools = [...selectedTools, toolId];
    updateUrl(newTools);
  }

  function removeTool(toolId: string) {
    const newTools = selectedTools.filter((id) => id !== toolId);
    updateUrl(newTools);
  }

  function updateUrl(toolIds: string[]) {
    const params = new URLSearchParams();
    if (toolIds.length > 0) {
      params.set("tools", toolIds.join(","));
    }
    router.push(`/compare?${params.toString()}`);
  }

  const displayedTools = tools.filter((t) => selectedTools.includes(t.id));

  // Calculate average rating from reviews
  const toolsWithStats = displayedTools.map((tool) => {
    const avgRating =
      tool.reviews.length > 0
        ? tool.reviews.reduce((sum: number, r: any) => sum + r.rating, 0) /
          tool.reviews.length
        : tool.rating || 0;
    return { ...tool, avgRating };
  });

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
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              href="/marketplace"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Marketplace
            </Link>
            <h1 className="text-4xl font-bold text-gray-900">Compare Tools</h1>
            <p className="text-gray-600 mt-2">
              Side-by-side comparison of {displayedTools.length} tool
              {displayedTools.length !== 1 ? "s" : ""}
            </p>
          </div>
          {selectedTools.length < 4 && (
            <Link
              href="/marketplace"
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-semibold"
            >
              <Plus className="w-4 h-4" />
              Add Tool
            </Link>
          )}
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 sticky left-0 bg-gray-50 z-10 min-w-[200px]">
                    Feature
                  </th>
                  {toolsWithStats.map((tool) => (
                    <th
                      key={tool.id}
                      className="px-6 py-4 text-left text-sm font-semibold text-gray-900 min-w-[250px] relative"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <Link
                            href={`/tools/${tool.slug}`}
                            className="text-lg font-bold text-gray-900 hover:text-gray-700 block mb-1"
                          >
                            {tool.name}
                          </Link>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {tool.category}
                          </span>
                        </div>
                        <button
                          onClick={() => removeTool(tool.id)}
                          className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                          title="Remove from comparison"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {/* Price */}
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900 sticky left-0 bg-white z-10">
                    Price
                  </td>
                  {toolsWithStats.map((tool) => (
                    <td key={tool.id} className="px-6 py-4">
                      <div className="text-2xl font-bold text-gray-900">
                        ${tool.price}
                      </div>
                      <div className="text-sm text-gray-600">
                        /{tool.priceType === "one-time" ? "once" : tool.priceType}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Rating */}
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900 sticky left-0 bg-white z-10">
                    Rating
                  </td>
                  {toolsWithStats.map((tool) => (
                    <td key={tool.id} className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold text-gray-900">
                          {tool.avgRating > 0
                            ? tool.avgRating.toFixed(1)
                            : "N/A"}
                        </span>
                        <span className="text-sm text-gray-600">
                          ({tool.reviewCount} reviews)
                        </span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Users */}
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900 sticky left-0 bg-white z-10">
                    Users
                  </td>
                  {toolsWithStats.map((tool) => (
                    <td key={tool.id} className="px-6 py-4">
                      <span className="text-gray-900">{tool.purchaseCount}</span>
                    </td>
                  ))}
                </tr>

                {/* Seller */}
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900 sticky left-0 bg-white z-10">
                    Seller
                  </td>
                  {toolsWithStats.map((tool) => (
                    <td key={tool.id} className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-900">
                          {tool.seller.user.name || "Unknown"}
                        </span>
                        {tool.seller.isVerified && (
                          <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                            Verified
                          </span>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Description */}
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900 sticky left-0 bg-white z-10">
                    Description
                  </td>
                  {toolsWithStats.map((tool) => (
                    <td key={tool.id} className="px-6 py-4">
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {tool.shortDescription}
                      </p>
                    </td>
                  ))}
                </tr>

                {/* Action */}
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900 sticky left-0 bg-white z-10">
                    Action
                  </td>
                  {toolsWithStats.map((tool) => (
                    <td key={tool.id} className="px-6 py-4">
                      <Link
                        href={`/tools/${tool.slug}`}
                        className="inline-block bg-gray-900 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 text-sm"
                      >
                        View Details
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {displayedTools.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-600 mb-4">No tools selected for comparison</p>
            <Link
              href="/marketplace"
              className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 inline-block"
            >
              Browse Marketplace
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}


