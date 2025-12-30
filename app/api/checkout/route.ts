import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";

const MARKETPLACE_FEE = 0.15; // 15%

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { toolId } = await request.json();

    if (!toolId) {
      return NextResponse.json({ error: "Tool ID required" }, { status: 400 });
    }

    // Get tool
    const tool = await prisma.tool.findUnique({
      where: { id: toolId },
      include: { seller: true },
    });

    if (!tool) {
      return NextResponse.json({ error: "Tool not found" }, { status: 404 });
    }

    if (!tool.isPublished) {
      return NextResponse.json({ error: "Tool not available" }, { status: 400 });
    }

    // Check if user already owns this tool
    if (tool.priceType === "one-time") {
      const existingPurchase = await prisma.purchase.findUnique({
        where: {
          userId_toolId: {
            userId: user.id,
            toolId: tool.id,
          },
        },
      });

      if (existingPurchase && existingPurchase.status === "completed") {
        return NextResponse.json(
          { error: "You already own this tool", redirect: `/tools/${tool.slug}` },
          { status: 400 }
        );
      }
    } else {
      // Check for active subscription
      const existingSubscription = await prisma.subscription.findUnique({
        where: {
          userId_toolId: {
            userId: user.id,
            toolId: tool.id,
          },
        },
      });

      if (existingSubscription && existingSubscription.status === "active") {
        return NextResponse.json(
          { error: "You already have an active subscription", redirect: `/tools/${tool.slug}` },
          { status: 400 }
        );
      }
    }

    // Calculate fees
    const marketplaceFee = tool.price * MARKETPLACE_FEE;
    const sellerPayout = tool.price - marketplaceFee;

    // For now, return checkout data (Stripe integration will be added)
    return NextResponse.json({
      tool: {
        id: tool.id,
        name: tool.name,
        slug: tool.slug,
        price: tool.price,
        priceType: tool.priceType,
        imageUrl: tool.imageUrl,
      },
      fees: {
        total: tool.price,
        marketplaceFee,
        sellerPayout,
      },
      // TODO: Create Stripe Checkout Session
      checkoutUrl: `/checkout/${tool.slug}?toolId=${tool.id}`,
    });
  } catch (error: any) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create checkout" },
      { status: 500 }
    );
  }
}

