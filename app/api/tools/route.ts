import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const toolSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  shortDescription: z.string().min(10),
  description: z.string().min(50),
  category: z.string().min(1),
  price: z.number().min(0.01),
  priceType: z.enum(["one-time", "monthly", "yearly"]),
  imageUrl: z.string().url().nullable().optional(),
  demoUrl: z.string().url().nullable().optional(),
  toolUrl: z.string().url().nullable().optional(),
  toolType: z.enum(["embed", "redirect", "api"]).nullable().optional(),
  sellerId: z.string(),
});

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const data = toolSchema.parse(body);

    // Verify seller owns this seller profile
    const sellerProfile = await prisma.sellerProfile.findUnique({
      where: { id: data.sellerId },
    });

    if (!sellerProfile || sellerProfile.userId !== user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Check if slug already exists
    const existingTool = await prisma.tool.findUnique({
      where: { slug: data.slug },
    });

    if (existingTool) {
      return NextResponse.json(
        { error: "A tool with this name already exists" },
        { status: 400 }
      );
    }

    // Create tool
    const tool = await prisma.tool.create({
      data: {
        ...data,
        isPublished: false, // Start as draft
      },
    });

    return NextResponse.json({ tool }, { status: 201 });
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


