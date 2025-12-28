import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
});

export async function GET(
  request: Request,
  { params }: { params: { toolId: string } }
) {
  try {
    const reviews = await prisma.review.findMany({
      where: { toolId: params.toolId },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { toolId: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { rating, comment } = reviewSchema.parse(body);

    // Check if user has subscription to this tool
    const subscription = await prisma.subscription.findUnique({
      where: {
        userId_toolId: {
          userId: user.id,
          toolId: params.toolId,
        },
      },
    });

    if (!subscription) {
      return NextResponse.json(
        { error: "You must subscribe to this tool to leave a review" },
        { status: 403 }
      );
    }

    // Check if review already exists
    const existingReview = await prisma.review.findUnique({
      where: {
        userId_toolId: {
          userId: user.id,
          toolId: params.toolId,
        },
      },
    });

    let review;
    if (existingReview) {
      // Update existing review
      review = await prisma.review.update({
        where: { id: existingReview.id },
        data: { rating, comment: comment || null },
      });
    } else {
      // Create new review
      review = await prisma.review.create({
        data: {
          userId: user.id,
          toolId: params.toolId,
          rating,
          comment: comment || null,
        },
      });
    }

    // Update tool rating
    const reviews = await prisma.review.findMany({
      where: { toolId: params.toolId },
    });
    const avgRating =
      reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await prisma.tool.update({
      where: { id: params.toolId },
      data: {
        rating: avgRating,
        reviewCount: reviews.length,
      },
    });

    return NextResponse.json(review, { status: existingReview ? 200 : 201 });
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

