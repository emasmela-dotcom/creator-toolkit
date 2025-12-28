import { prisma } from "@/lib/prisma";
import { CompareToolsClient } from "./CompareToolsClient";
import { notFound } from "next/navigation";

export default async function ComparePage({
  searchParams,
}: {
  searchParams: { tools?: string };
}) {
  const toolIds = searchParams.tools?.split(",").filter(Boolean) || [];

  if (toolIds.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Compare Tools
          </h1>
          <p className="text-gray-600 mb-6">
            Select tools from the marketplace to compare them side-by-side
          </p>
          <a
            href="/marketplace"
            className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 inline-block"
          >
            Browse Marketplace
          </a>
        </div>
      </div>
    );
  }

  // Fetch tools (limit to 4 for comparison)
  const tools = await prisma.tool.findMany({
    where: {
      id: { in: toolIds.slice(0, 4) },
      isPublished: true,
    },
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

  if (tools.length === 0) {
    notFound();
  }

  return <CompareToolsClient tools={tools} />;
}


