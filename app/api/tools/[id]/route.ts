import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const toolUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  shortDescription: z.string().min(10).optional(),
  description: z.string().min(50).optional(),
  category: z.string().min(1).optional(),
  price: z.number().min(0.01).optional(),
  priceType: z.enum(["one-time", "monthly", "yearly"]).optional(),
  imageUrl: z.string().url().nullable().optional(),
  demoUrl: z.string().url().nullable().optional(),
  toolUrl: z.string().url().nullable().optional(),
  toolType: z.enum(["embed", "redirect", "api"]).nullable().optional(),
  isPublished: z.boolean().optional(),
});

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const data = toolUpdateSchema.parse(body);

    // Get tool and verify ownership
    const tool = await prisma.tool.findUnique({
      where: { id: params.id },
      include: {
        seller: true,
      },
    });

    if (!tool) {
      return NextResponse.json({ error: "Tool not found" }, { status: 404 });
    }

    // Verify seller owns this tool
    const sellerProfile = await prisma.sellerProfile.findUnique({
      where: { userId: user.id },
    });

    if (!sellerProfile || tool.sellerId !== sellerProfile.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Update tool
    const updatedTool = await prisma.tool.update({
      where: { id: params.id },
      data,
    });

    return NextResponse.json({ tool: updatedTool });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get tool and verify ownership
    const tool = await prisma.tool.findUnique({
      where: { id: params.id },
      include: {
        seller: true,
      },
    });

    if (!tool) {
      return NextResponse.json({ error: "Tool not found" }, { status: 404 });
    }

    // Verify seller owns this tool
    const sellerProfile = await prisma.sellerProfile.findUnique({
      where: { userId: user.id },
    });

    if (!sellerProfile || tool.sellerId !== sellerProfile.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Delete tool
    await prisma.tool.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Tool deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


