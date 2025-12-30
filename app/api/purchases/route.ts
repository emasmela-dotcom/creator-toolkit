import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";

const MARKETPLACE_FEE = 0.15;

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { toolId, priceType } = await request.json();

    if (!toolId) {
      return NextResponse.json({ error: "Tool ID required" }, { status: 400 });
    }

    const tool = await prisma.tool.findUnique({
      where: { id: toolId },
      include: { seller: true },
    });

    if (!tool || !tool.isPublished) {
      return NextResponse.json({ error: "Tool not found" }, { status: 404 });
    }

    // Calculate fees
    const marketplaceFee = tool.price * MARKETPLACE_FEE;
    const sellerPayout = tool.price - marketplaceFee;

    if (tool.priceType === "one-time") {
      // Check for existing purchase
      const existing = await prisma.purchase.findUnique({
        where: {
          userId_toolId: {
            userId: user.id,
            toolId: tool.id,
          },
        },
      });

      if (existing && existing.status === "completed") {
        return NextResponse.json(
          { error: "Already purchased", purchase: existing },
          { status: 400 }
        );
      }

      // Create or update purchase
      const purchase = await prisma.purchase.upsert({
        where: {
          userId_toolId: {
            userId: user.id,
            toolId: tool.id,
          },
        },
        update: {
          status: "completed",
          amount: tool.price,
          marketplaceFee,
          sellerPayout,
          updatedAt: new Date(),
        },
        create: {
          userId: user.id,
          toolId: tool.id,
          status: "completed",
          amount: tool.price,
          marketplaceFee,
          sellerPayout,
        },
      });

      // Update tool purchase count
      await prisma.tool.update({
        where: { id: tool.id },
        data: {
          purchaseCount: {
            increment: 1,
          },
        },
      });

      return NextResponse.json({ purchase, type: "one-time" });
    } else {
      // Create subscription
      const subscription = await prisma.subscription.upsert({
        where: {
          userId_toolId: {
            userId: user.id,
            toolId: tool.id,
          },
        },
        update: {
          status: "active",
          cancelAtPeriodEnd: false,
        },
        create: {
          userId: user.id,
          toolId: tool.id,
          status: "active",
          stripeCustomerId: `cus_${user.id}`, // Placeholder
          currentPeriodStart: new Date(),
          currentPeriodEnd: new Date(
            Date.now() + (tool.priceType === "monthly" ? 30 : 365) * 24 * 60 * 60 * 1000
          ),
        },
      });

      // Update tool purchase count
      await prisma.tool.update({
        where: { id: tool.id },
        data: {
          purchaseCount: {
            increment: 1,
          },
        },
      });

      return NextResponse.json({ subscription, type: "subscription" });
    }
  } catch (error: any) {
    console.error("Purchase error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process purchase" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const toolId = searchParams.get("toolId");

    if (toolId) {
      // Check if user has access to specific tool
      const purchase = await prisma.purchase.findUnique({
        where: {
          userId_toolId: {
            userId: user.id,
            toolId,
          },
        },
        include: { tool: true },
      });

      const subscription = await prisma.subscription.findUnique({
        where: {
          userId_toolId: {
            userId: user.id,
            toolId,
          },
        },
        include: { tool: true },
      });

      return NextResponse.json({
        hasAccess: (purchase?.status === "completed") || (subscription?.status === "active"),
        purchase,
        subscription,
      });
    }

    // Get all purchases
    const purchases = await prisma.purchase.findMany({
      where: { userId: user.id },
      include: { tool: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ purchases });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch purchases" },
      { status: 500 }
    );
  }
}

