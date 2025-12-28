import { getCurrentUser } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus } from "lucide-react";
import { SellerDashboardClient } from "./SellerDashboardClient";

export default async function SellerDashboardPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect("/login");
  }

  // Get or create seller profile
  let sellerProfile = await prisma.sellerProfile.findUnique({
    where: { userId: user.id },
  });

  if (!sellerProfile) {
    sellerProfile = await prisma.sellerProfile.create({
      data: {
        userId: user.id,
      },
    });
  }

  // Get seller's tools
  const tools = await prisma.tool.findMany({
    where: { sellerId: sellerProfile.id },
    orderBy: { createdAt: "desc" },
  });

  // Calculate stats
  const totalRevenue = tools.reduce((sum, tool) => {
    return sum + (tool.price * tool.purchaseCount);
  }, 0);

  const totalSubscriptions = await prisma.subscription.count({
    where: {
      tool: {
        sellerId: sellerProfile.id,
      },
      status: "active",
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Seller Dashboard</h1>
            <p className="text-gray-600">Manage your tools and track your sales</p>
          </div>
          <Link
            href="/dashboard/seller/tools/new"
            className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 inline-flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create New Tool
          </Link>
        </div>

        <SellerDashboardClient
          tools={tools}
          totalRevenue={totalRevenue}
          totalSubscriptions={totalSubscriptions}
        />
      </div>
    </div>
  );
}
