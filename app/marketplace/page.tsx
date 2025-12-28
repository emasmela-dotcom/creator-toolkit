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
  const tools = await prisma.tool.findMany({
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

  return <MarketplaceClient tools={tools} categories={categories} />;
}
