import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { MarketplaceClient } from "./MarketplaceClient";

export default async function MarketplacePage({
  searchParams,
}: {
  searchParams: { category?: string; search?: string };
}) {
  const categories = [
    "All",
    "Marketing",
    "Content",
    "Productivity",
    "Community",
    "Sales",
    "Analytics",
  ];

  // Build where clause for filtering
  const where: any = {
    isPublished: true,
  };

  if (searchParams.category && searchParams.category !== "All") {
    where.category = searchParams.category;
  }

  if (searchParams.search) {
    // SQLite search - convert to lowercase for case-insensitive matching
    const searchLower = searchParams.search.toLowerCase();
    where.OR = [
      { name: { contains: searchParams.search } },
      { description: { contains: searchParams.search } },
      { shortDescription: { contains: searchParams.search } },
    ];
    // Note: SQLite contains is case-sensitive, but we'll filter client-side for better UX
  }

  // Fetch tools from database
  let tools: any[] = [];
  try {
    tools = await prisma.tool.findMany({
      where,
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
      orderBy: [
        { isFeatured: "desc" },
        { purchaseCount: "desc" },
        { createdAt: "desc" },
      ],
      take: 50,
    });
    
    // Calculate ratings for each tool
    tools = tools.map(tool => ({
      ...tool,
      rating: tool.reviews.length > 0
        ? tool.reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / tool.reviews.length
        : null,
      reviewCount: tool.reviews.length,
    }));
  } catch (error: any) {
    console.error("Error fetching tools:", error);
    // Return empty array if database error - page will still load
    tools = [];
  }

  return <MarketplaceClient tools={tools} categories={categories} />;
}
