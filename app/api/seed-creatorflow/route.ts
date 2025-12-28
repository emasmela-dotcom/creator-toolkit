import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const tools = [
  { name: "Documents Feature", description: "Save and organize all your content drafts, ideas, and notes. Create unlimited documents, organize by category, platform, or project, and search across all documents for quick access to saved content.", shortDescription: "Save and organize content drafts, ideas, and notes", category: "Productivity", price: 7.5, priceType: "monthly" as const },
  { name: "Hashtag Research Tool", description: "Find the best hashtags for your content across Instagram, Twitter, TikTok, LinkedIn, and YouTube. Get personalized recommendations, view trending hashtags with reach data, and save hashtag sets for quick reuse.", shortDescription: "Find best hashtags for your content across platforms", category: "Marketing", price: 12, priceType: "monthly" as const },
  { name: "Content Templates Tool", description: "Create reusable post templates with variable placeholders. Organize by category and platform, quick copy/paste when creating posts, and maintain consistent messaging.", shortDescription: "Create reusable post templates with variables", category: "Content", price: 9.5, priceType: "monthly" as const },
  { name: "Content Calendar/Scheduler", description: "Visual calendar for planning and scheduling posts. Visual calendar view, schedule posts across platforms, see your content plan at a glance, and drag-and-drop scheduling.", shortDescription: "Visual calendar for planning and scheduling posts", category: "Productivity", price: 15.5, priceType: "monthly" as const },
  { name: "Content Library Search", description: "Unified search across all your content. Search documents, templates, hashtag sets, filter by content type, platform, date, and find anything instantly.", shortDescription: "Unified search across all your content", category: "Productivity", price: 7.5, priceType: "monthly" as const },
  { name: "Performance Analytics Dashboard", description: "Track your content performance and engagement metrics. View engagement metrics, track growth over time, see top-performing posts, platform-specific analytics, and performance insights.", shortDescription: "Track content performance and engagement metrics", category: "Analytics", price: 20, priceType: "monthly" as const },
  { name: "Engagement Inbox", description: "Manage all your social media interactions in one place. View all comments, messages, mentions, filter by platform, type, or status, mark items as read, replied, or archived.", shortDescription: "Manage all social media interactions in one place", category: "Community", price: 14, priceType: "monthly" as const },
  { name: "Content Assistant Bot", description: "Real-time content analysis and optimization as you type. Analyzes content as you type, provides content score (0-100), checks word count, hashtag count, emoji usage, platform-specific recommendations.", shortDescription: "Real-time content analysis and optimization as you type", category: "Content", price: 24, priceType: "monthly" as const },
  { name: "Content Writer Bot", description: "AI-powered content generation for blogs and social media. Generates blog posts, articles, social media content, customizable tone, length, platform, keyword optimization.", shortDescription: "AI-powered content generation for blogs and social media", category: "Content", price: 31.5, priceType: "monthly" as const },
  { name: "Content Repurposing Bot", description: "Transform one piece of content into multiple platform formats. Takes blog post/article/video script, creates platform-optimized versions for Instagram, Twitter, LinkedIn, TikTok, YouTube.", shortDescription: "Transform one piece of content into multiple platform formats", category: "Content", price: 24, priceType: "monthly" as const },
  { name: "Content Gap Analyzer Bot", description: "Identify content opportunities competitors are missing. Analyzes competitor content strategies, finds gaps in your content, suggests topics, formats, and angles.", shortDescription: "Identify content opportunities competitors are missing", category: "Analytics", price: 39, priceType: "monthly" as const },
  { name: "Content Curation Bot", description: "Suggests content ideas and identifies content gaps. Generates content ideas based on your niche, finds trending topics in your industry, suggests content formats.", shortDescription: "Suggests content ideas and identifies content gaps", category: "Content", price: 20, priceType: "monthly" as const },
  { name: "SEO Optimizer Bot", description: "AI-powered SEO content optimization. Analyzes content for SEO best practices, provides SEO score (0-100), keyword research and density analysis, meta title and description optimization.", shortDescription: "AI-powered SEO content optimization", category: "Marketing", price: 39, priceType: "monthly" as const },
  { name: "Scheduling Assistant Bot", description: "AI-powered suggestions for optimal posting times. Analyzes your audience engagement patterns, suggests optimal posting times by day and time slot, platform-specific recommendations.", shortDescription: "AI-powered suggestions for optimal posting times", category: "Productivity", price: 15.5, priceType: "monthly" as const },
  { name: "Engagement Analyzer Bot", description: "Analyzes engagement patterns and provides insights. Analyzes comments, likes, shares, saves, identifies what content gets most engagement, suggests content types that perform well.", shortDescription: "Analyzes engagement patterns and provides insights", category: "Analytics", price: 24, priceType: "monthly" as const },
  { name: "Analytics Coach Bot", description: "Provides analytics insights and recommendations. Explains your analytics data, identifies trends and patterns, suggests optimization strategies, and provides actionable insights.", shortDescription: "Provides analytics insights and recommendations", category: "Analytics", price: 20, priceType: "monthly" as const },
  { name: "Trend Scout Bot", description: "Identifies trending topics and hashtags. Finds trending topics in your niche, identifies trending hashtags, suggests content ideas based on trends, and real-time trend alerts.", shortDescription: "Identifies trending topics and hashtags", category: "Marketing", price: 24, priceType: "monthly" as const },
  { name: "Social Media Manager Bot", description: "Creates and manages social media posts. Creates posts for multiple platforms, suggests content based on your brand, manages posting schedule, and optimizes content for each platform.", shortDescription: "Creates and manages social media posts", category: "Marketing", price: 31.5, priceType: "monthly" as const },
  { name: "Expense Tracker Bot", description: "Tracks business expenses and receipts. Log expenses by category, track receipts and invoices, generate expense reports, and tax preparation support.", shortDescription: "Tracks business expenses and receipts", category: "Sales", price: 12, priceType: "monthly" as const },
  { name: "Invoice Generator Bot", description: "Creates professional invoices for brand collaborations. Generate invoices for brand collaborations, customize invoice templates, track payments, and send invoices automatically.", shortDescription: "Creates professional invoices for brand collaborations", category: "Sales", price: 15.5, priceType: "monthly" as const },
  { name: "Email Sorter Bot", description: "Organizes and prioritizes emails. Sorts emails by importance, categorizes emails (collaborations, inquiries, etc.), prioritizes urgent emails, and suggests responses.", shortDescription: "Organizes and prioritizes emails", category: "Productivity", price: 12, priceType: "monthly" as const },
  { name: "Customer Service Bot", description: "Handles customer service inquiries. Responds to common questions, routes complex inquiries, provides 24/7 support, and tracks customer interactions.", shortDescription: "Handles customer service inquiries", category: "Community", price: 24, priceType: "monthly" as const },
  { name: "Product Recommendation Bot", description: "Recommends products to your audience. Analyzes your audience's interests, suggests relevant products, creates product recommendation posts, and tracks affiliate performance.", shortDescription: "Recommends products to your audience", category: "Sales", price: 20, priceType: "monthly" as const },
  { name: "Sales Lead Qualifier Bot", description: "Qualifies sales leads and prioritizes high-value leads. Analyzes lead information, scores leads by quality, prioritizes high-value leads, and suggests follow-up actions.", shortDescription: "Qualifies sales leads and prioritizes high-value leads", category: "Sales", price: 31.5, priceType: "monthly" as const },
  { name: "Website Chat Bot", description: "Handles website chat inquiries. Responds to website visitors, answers common questions, qualifies leads, and routes to appropriate team member.", shortDescription: "Handles website chat inquiries", category: "Community", price: 24, priceType: "monthly" as const },
  { name: "Meeting Scheduler Bot", description: "Schedules meetings and appointments. Finds available time slots, sends meeting invitations, manages calendar, and sends reminders.", shortDescription: "Schedules meetings and appointments", category: "Productivity", price: 15.5, priceType: "monthly" as const },
  { name: "Brand Deal Negotiation Assistant", description: "Analyzes brand deals and suggests negotiations. Analyzes brand deal offers, suggests counter-offers based on your metrics, provides industry rate benchmarks, generates professional negotiation emails.", shortDescription: "Analyzes brand deals and suggests negotiations", category: "Sales", price: 39, priceType: "monthly" as const },
  { name: "Content Performance Attribution", description: "Tracks which content drives revenue. Tracks which content generates revenue, shows ROI of each post (revenue vs time spent), identifies content that converts to sales.", shortDescription: "Tracks which content drives revenue", category: "Analytics", price: 31.5, priceType: "monthly" as const },
  { name: "Creator Tax Assistant", description: "Helps creators with taxes and deductions. Automatically categorizes creator income (sponsorships, affiliate, products), tracks deductible expenses (equipment, software, home office, travel).", shortDescription: "Helps creators with taxes and deductions", category: "Sales", price: 24, priceType: "monthly" as const },
  { name: "AI Content Performance Predictor", description: "Predicts how well your content will perform before posting. Analyzes content before publishing, predicts engagement, reach, and performance, suggests improvements to increase performance.", shortDescription: "Predicts how well your content will perform before posting", category: "Analytics", price: 31.5, priceType: "monthly" as const },
  { name: "Brand Voice Analyzer & Maintainer", description: "Analyzes and maintains your brand voice across all content. Analyzes your existing content to identify brand voice, ensures all new content matches your brand voice.", shortDescription: "Analyzes and maintains your brand voice across all content", category: "Content", price: 24, priceType: "monthly" as const },
  { name: "Cross-Platform Content Sync", description: "Syncs content across all your platforms. Automatically adapts content for each platform, maintains consistency across platforms, syncs updates across all platforms.", shortDescription: "Syncs content across all your platforms", category: "Marketing", price: 20, priceType: "monthly" as const },
  { name: "Content Recycling System", description: "Automatically recycles and repurposes old content. Identifies high-performing old content, suggests when to repost or repurpose, automatically adapts for current trends.", shortDescription: "Automatically recycles and repurposes old content", category: "Content", price: 15.5, priceType: "monthly" as const },
  { name: "Revenue Tracker & Income Dashboard", description: "Tracks all your creator income in one place. Tracks income from all sources (sponsorships, affiliates, products, etc.), visualizes income over time, categorizes income by source.", shortDescription: "Tracks all your creator income in one place", category: "Analytics", price: 20, priceType: "monthly" as const },
  { name: "Real-Time Trend Alerts", description: "Alerts you to trending topics in real-time. Monitors trends in your niche, sends instant alerts when trends emerge, suggests content ideas based on trends.", shortDescription: "Alerts you to trending topics in real-time", category: "Marketing", price: 24, priceType: "monthly" as const },
  { name: "Content A/B Testing System", description: "Tests different versions of content to find what works best. Creates multiple versions of content, tests different headlines, images, captions, tracks performance of each version.", shortDescription: "Tests different versions of content to find what works best", category: "Analytics", price: 31.5, priceType: "monthly" as const },
  { name: "Automated Content Series Generator", description: "Automatically generates content series. Creates multi-part content series, maintains consistency across series, suggests series topics, and schedules series posts.", shortDescription: "Automatically generates content series", category: "Content", price: 24, priceType: "monthly" as const },
  { name: "Automated Hashtag Optimization", description: "Automatically optimizes hashtags for maximum reach. Analyzes hashtag performance, suggests optimal hashtag combinations, tests different hashtag sets.", shortDescription: "Automatically optimizes hashtags for maximum reach", category: "Marketing", price: 20, priceType: "monthly" as const },
  { name: "Creator Collaboration Marketplace", description: "Connects creators for collaborations. Find collaboration partners, discover brand partnership opportunities, connect with other creators, and manage collaborations.", shortDescription: "Connects creators for collaborations", category: "Community", price: 15.5, priceType: "monthly" as const }
];

const creatorFlowBundle = {
  name: "CreatorFlow - Complete Creator Toolkit",
  description: "The ultimate all-in-one platform for content creators. CreatorFlow includes 44 powerful tools and features to help you create, manage, optimize, and monetize your content across all platforms.",
  shortDescription: "All-in-one platform with 44 tools for content creators",
  category: "Productivity",
  price: 99,
  priceType: "monthly" as const,
  isFeatured: true,
};

export async function GET() {
  try {
    console.log("🌱 Seeding CreatorFlow tools...");

    // Find or create CreatorFlow user
    let creatorFlowUser = await prisma.user.findUnique({
      where: { email: "creatorflow@creatorflow.ai" },
    });

    if (!creatorFlowUser) {
      creatorFlowUser = await prisma.user.create({
        data: {
          email: "creatorflow@creatorflow.ai",
          name: "CreatorFlow",
        },
      });
    }

    // Find or create seller profile
    let sellerProfile = await prisma.sellerProfile.findUnique({
      where: { userId: creatorFlowUser.id },
    });

    if (!sellerProfile) {
      sellerProfile = await prisma.sellerProfile.create({
        data: {
          userId: creatorFlowUser.id,
          isVerified: true,
        },
      });
    }

    const results = {
      created: [] as string[],
      skipped: [] as string[],
    };

    // Create individual tools
    for (const toolData of tools) {
      const slug = generateSlug(toolData.name);
      const existing = await prisma.tool.findUnique({
        where: { slug },
      });

      if (existing) {
        results.skipped.push(toolData.name);
        continue;
      }

      await prisma.tool.create({
        data: {
          ...toolData,
          slug,
          sellerId: sellerProfile.id,
          isPublished: true,
          toolUrl: `https://creatorflow.ai/tools/${slug}`,
          toolType: "redirect",
        },
      });
      results.created.push(toolData.name);
    }

    // Create CreatorFlow bundle
    const bundleSlug = generateSlug(creatorFlowBundle.name);
    const existingBundle = await prisma.tool.findUnique({
      where: { slug: bundleSlug },
    });

    if (!existingBundle) {
      await prisma.tool.create({
        data: {
          ...creatorFlowBundle,
          slug: bundleSlug,
          sellerId: sellerProfile.id,
          isPublished: true,
          isFeatured: true,
          toolUrl: "https://creatorflow.ai",
          toolType: "redirect",
        },
      });
      results.created.push(creatorFlowBundle.name);
    } else {
      results.skipped.push(creatorFlowBundle.name);
    }

    return NextResponse.json({
      success: true,
      message: "Seeding complete!",
      created: results.created.length,
      skipped: results.skipped.length,
      total: results.created.length + results.skipped.length,
      details: results,
    });
  } catch (error: any) {
    console.error("Error seeding:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to seed database",
      },
      { status: 500 }
    );
  }
}


