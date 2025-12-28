import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Helper to generate slug from name
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Helper to get price from range (use lower end)
function getPrice(priceRange: string): number {
  const match = priceRange.match(/\$(\d+)/);
  return match ? parseFloat(match[1]) : 10;
}

// Tool data from CREATORFLOW_TOOLS_BREAKDOWN.md
const tools = [
  // Core Tools (7)
  {
    name: "Documents Feature",
    description: "Save and organize all your content drafts, ideas, and notes. Create unlimited documents, organize by category, platform, or project, and search across all documents for quick access to saved content. Never lose content ideas and organize everything in one place.",
    shortDescription: "Save and organize content drafts, ideas, and notes",
    category: "Productivity",
    price: 7.5,
    priceType: "monthly" as const,
  },
  {
    name: "Hashtag Research Tool",
    description: "Find the best hashtags for your content across Instagram, Twitter, TikTok, LinkedIn, and YouTube. Get personalized recommendations, view trending hashtags with reach data, and save hashtag sets for quick reuse. Increase reach by using optimal hashtags and save hours of research.",
    shortDescription: "Find best hashtags for your content across platforms",
    category: "Marketing",
    price: 12,
    priceType: "monthly" as const,
  },
  {
    name: "Content Templates Tool",
    description: "Create reusable post templates with variable placeholders. Organize by category and platform, quick copy/paste when creating posts, and maintain consistent messaging. Save time, maintain brand consistency, and speed up content creation.",
    shortDescription: "Create reusable post templates with variables",
    category: "Content",
    price: 9.5,
    priceType: "monthly" as const,
  },
  {
    name: "Content Calendar/Scheduler",
    description: "Visual calendar for planning and scheduling posts. Visual calendar view, schedule posts across platforms, see your content plan at a glance, and drag-and-drop scheduling. Plan ahead, never miss posting, and see your content strategy visually.",
    shortDescription: "Visual calendar for planning and scheduling posts",
    category: "Productivity",
    price: 15.5,
    priceType: "monthly" as const,
  },
  {
    name: "Content Library Search",
    description: "Unified search across all your content. Search documents, templates, hashtag sets, filter by content type, platform, date, and find anything instantly. Never lose content, find anything quickly, and organize everything.",
    shortDescription: "Unified search across all your content",
    category: "Productivity",
    price: 7.5,
    priceType: "monthly" as const,
  },
  {
    name: "Performance Analytics Dashboard",
    description: "Track your content performance and engagement metrics. View engagement metrics, track growth over time, see top-performing posts, platform-specific analytics, and performance insights. Understand what works, optimize your strategy, and track growth.",
    shortDescription: "Track content performance and engagement metrics",
    category: "Analytics",
    price: 20,
    priceType: "monthly" as const,
  },
  {
    name: "Engagement Inbox",
    description: "Manage all your social media interactions in one place. View all comments, messages, mentions, filter by platform, type, or status, mark items as read, replied, or archived, and track unread count. Never miss important engagement, respond faster, and build relationships.",
    shortDescription: "Manage all social media interactions in one place",
    category: "Community",
    price: 14,
    priceType: "monthly" as const,
  },
  // AI-Powered Bots - Content Creation (6)
  {
    name: "Content Assistant Bot",
    description: "Real-time content analysis and optimization as you type. Analyzes content as you type, provides content score (0-100), checks word count, hashtag count, emoji usage, platform-specific recommendations, and suggests improvements for engagement. Improve every post before publishing and increase engagement rates.",
    shortDescription: "Real-time content analysis and optimization as you type",
    category: "Content",
    price: 24,
    priceType: "monthly" as const,
  },
  {
    name: "Content Writer Bot",
    description: "AI-powered content generation for blogs and social media. Generates blog posts, articles, social media content, customizable tone, length, platform, keyword optimization, and multiple content types supported. Overcome writer's block, generate content ideas, and maintain consistent posting.",
    shortDescription: "AI-powered content generation for blogs and social media",
    category: "Content",
    price: 31.5,
    priceType: "monthly" as const,
  },
  {
    name: "Content Repurposing Bot",
    description: "Transform one piece of content into multiple platform formats. Takes blog post/article/video script, creates platform-optimized versions for Instagram, Twitter, LinkedIn, TikTok, YouTube, maintains brand voice across platforms, and adds appropriate hooks, CTAs, hashtags. Maximize content ROI, save hours of manual reformatting, and reach more audiences.",
    shortDescription: "Transform one piece of content into multiple platform formats",
    category: "Content",
    price: 24,
    priceType: "monthly" as const,
  },
  {
    name: "Content Gap Analyzer Bot",
    description: "Identify content opportunities competitors are missing. Analyzes competitor content strategies, finds gaps in your content, suggests topics, formats, and angles, and prioritizes opportunities. Stay ahead of competition, discover untapped content opportunities, and stand out.",
    shortDescription: "Identify content opportunities competitors are missing",
    category: "Analytics",
    price: 39,
    priceType: "monthly" as const,
  },
  {
    name: "Content Curation Bot",
    description: "Suggests content ideas and identifies content gaps. Generates content ideas based on your niche, finds trending topics in your industry, suggests content formats, and identifies content gaps. Never run out of ideas, stay on top of trends, and fill content gaps.",
    shortDescription: "Suggests content ideas and identifies content gaps",
    category: "Content",
    price: 20,
    priceType: "monthly" as const,
  },
  {
    name: "SEO Optimizer Bot",
    description: "AI-powered SEO content optimization. Analyzes content for SEO best practices, provides SEO score (0-100), keyword research and density analysis, meta title and description optimization, content length and readability analysis, heading structure recommendations, internal linking suggestions, and technical SEO checks. Improve search rankings, optimize content for search engines, and increase organic traffic.",
    shortDescription: "AI-powered SEO content optimization",
    category: "Marketing",
    price: 39,
    priceType: "monthly" as const,
  },
  // Analytics & Optimization Bots (3)
  {
    name: "Scheduling Assistant Bot",
    description: "AI-powered suggestions for optimal posting times. Analyzes your audience engagement patterns, suggests optimal posting times by day and time slot, platform-specific recommendations, and considers your audience's timezone. Maximize engagement by posting at the right times and reach more of your audience.",
    shortDescription: "AI-powered suggestions for optimal posting times",
    category: "Productivity",
    price: 15.5,
    priceType: "monthly" as const,
  },
  {
    name: "Engagement Analyzer Bot",
    description: "Analyzes engagement patterns and provides insights. Analyzes comments, likes, shares, saves, identifies what content gets most engagement, suggests content types that perform well, and provides engagement optimization tips. Understand what your audience loves and create more engaging content.",
    shortDescription: "Analyzes engagement patterns and provides insights",
    category: "Analytics",
    price: 24,
    priceType: "monthly" as const,
  },
  {
    name: "Analytics Coach Bot",
    description: "Provides analytics insights and recommendations. Explains your analytics data, identifies trends and patterns, suggests optimization strategies, and provides actionable insights. Understand your data, get actionable insights, and improve performance.",
    shortDescription: "Provides analytics insights and recommendations",
    category: "Analytics",
    price: 20,
    priceType: "monthly" as const,
  },
  // Trend & Research Bots (1)
  {
    name: "Trend Scout Bot",
    description: "Identifies trending topics and hashtags. Finds trending topics in your niche, identifies trending hashtags, suggests content ideas based on trends, and real-time trend alerts. Stay on top of trends, create timely content, and increase reach.",
    shortDescription: "Identifies trending topics and hashtags",
    category: "Marketing",
    price: 24,
    priceType: "monthly" as const,
  },
  // Social Media Management Bots (1)
  {
    name: "Social Media Manager Bot",
    description: "Creates and manages social media posts. Creates posts for multiple platforms, suggests content based on your brand, manages posting schedule, and optimizes content for each platform. Automate social media management, save time, and maintain consistent posting.",
    shortDescription: "Creates and manages social media posts",
    category: "Marketing",
    price: 31.5,
    priceType: "monthly" as const,
  },
  // Business Management Bots (5)
  {
    name: "Expense Tracker Bot",
    description: "Tracks business expenses and receipts. Log expenses by category, track receipts and invoices, generate expense reports, and tax preparation support. Track business expenses, prepare for taxes, and manage finances.",
    shortDescription: "Tracks business expenses and receipts",
    category: "Sales",
    price: 12,
    priceType: "monthly" as const,
  },
  {
    name: "Invoice Generator Bot",
    description: "Creates professional invoices for brand collaborations. Generate invoices for brand collaborations, customize invoice templates, track payments, and send invoices automatically. Professional invoicing, get paid faster, and track income.",
    shortDescription: "Creates professional invoices for brand collaborations",
    category: "Sales",
    price: 15.5,
    priceType: "monthly" as const,
  },
  {
    name: "Email Sorter Bot",
    description: "Organizes and prioritizes emails. Sorts emails by importance, categorizes emails (collaborations, inquiries, etc.), prioritizes urgent emails, and suggests responses. Never miss important emails, stay organized, and respond faster.",
    shortDescription: "Organizes and prioritizes emails",
    category: "Productivity",
    price: 12,
    priceType: "monthly" as const,
  },
  {
    name: "Customer Service Bot",
    description: "Handles customer service inquiries. Responds to common questions, routes complex inquiries, provides 24/7 support, and tracks customer interactions. Provide better customer service, save time, and improve satisfaction.",
    shortDescription: "Handles customer service inquiries",
    category: "Community",
    price: 24,
    priceType: "monthly" as const,
  },
  {
    name: "Product Recommendation Bot",
    description: "Recommends products to your audience. Analyzes your audience's interests, suggests relevant products, creates product recommendation posts, and tracks affiliate performance. Increase affiliate revenue, provide value to audience, and monetize content.",
    shortDescription: "Recommends products to your audience",
    category: "Sales",
    price: 20,
    priceType: "monthly" as const,
  },
  // Sales & Lead Management Bots (2)
  {
    name: "Sales Lead Qualifier Bot",
    description: "Qualifies sales leads and prioritizes high-value leads. Analyzes lead information, scores leads by quality, prioritizes high-value leads, and suggests follow-up actions. Focus on best leads, close more deals, and save time.",
    shortDescription: "Qualifies sales leads and prioritizes high-value leads",
    category: "Sales",
    price: 31.5,
    priceType: "monthly" as const,
  },
  {
    name: "Website Chat Bot",
    description: "Handles website chat inquiries. Responds to website visitors, answers common questions, qualifies leads, and routes to appropriate team member. Engage website visitors, capture leads, and provide instant support.",
    shortDescription: "Handles website chat inquiries",
    category: "Community",
    price: 24,
    priceType: "monthly" as const,
  },
  // Scheduling & Organization Bots (1)
  {
    name: "Meeting Scheduler Bot",
    description: "Schedules meetings and appointments. Finds available time slots, sends meeting invitations, manages calendar, and sends reminders. Automate scheduling, never double-book, and save time.",
    shortDescription: "Schedules meetings and appointments",
    category: "Productivity",
    price: 15.5,
    priceType: "monthly" as const,
  },
  {
    name: "Brand Deal Negotiation Assistant",
    description: "Analyzes brand deals and suggests negotiations. Analyzes brand deal offers, suggests counter-offers based on your metrics, provides industry rate benchmarks, generates professional negotiation emails, tracks negotiation history, and calculates fair rates based on audience size/engagement. Get paid what you're worth, increase income 20-50%, and never undercharge again.",
    shortDescription: "Analyzes brand deals and suggests negotiations",
    category: "Sales",
    price: 39,
    priceType: "monthly" as const,
  },
  {
    name: "Content Performance Attribution",
    description: "Tracks which content drives revenue. Tracks which content generates revenue, shows ROI of each post (revenue vs time spent), identifies content that converts to sales, tracks affiliate link performance per post, shows which content types drive most revenue, and suggests content that will drive revenue. Create content that makes money, not just gets likes, and optimize for revenue.",
    shortDescription: "Tracks which content drives revenue",
    category: "Analytics",
    price: 31.5,
    priceType: "monthly" as const,
  },
  {
    name: "Creator Tax Assistant",
    description: "Helps creators with taxes and deductions. Automatically categorizes creator income (sponsorships, affiliate, products), tracks deductible expenses (equipment, software, home office, travel), generates tax-ready reports (Schedule C, 1099s, deductions), estimates quarterly taxes based on income trends, reminds about tax deadlines, and provides tax recommendations. Save hours on taxes, avoid penalties, maximize deductions, and tax preparation made easy.",
    shortDescription: "Helps creators with taxes and deductions",
    category: "Sales",
    price: 24,
    priceType: "monthly" as const,
  },
  // Game-Changer Features (10)
  {
    name: "AI Content Performance Predictor",
    description: "Predicts how well your content will perform before posting. Analyzes content before publishing, predicts engagement, reach, and performance, suggests improvements to increase performance, and helps you optimize before posting. Post content that performs, optimize before publishing, and increase success rate.",
    shortDescription: "Predicts how well your content will perform before posting",
    category: "Analytics",
    price: 31.5,
    priceType: "monthly" as const,
  },
  {
    name: "Brand Voice Analyzer & Maintainer",
    description: "Analyzes and maintains your brand voice across all content. Analyzes your existing content to identify brand voice, ensures all new content matches your brand voice, suggests adjustments to maintain consistency, and tracks brand voice consistency over time. Maintain consistent brand voice, build stronger brand identity, and improve recognition.",
    shortDescription: "Analyzes and maintains your brand voice across all content",
    category: "Content",
    price: 24,
    priceType: "monthly" as const,
  },
  {
    name: "Cross-Platform Content Sync",
    description: "Syncs content across all your platforms. Automatically adapts content for each platform, maintains consistency across platforms, syncs updates across all platforms, and saves time on multi-platform posting. Save time, maintain consistency, and reach all audiences.",
    shortDescription: "Syncs content across all your platforms",
    category: "Marketing",
    price: 20,
    priceType: "monthly" as const,
  },
  {
    name: "Content Recycling System",
    description: "Automatically recycles and repurposes old content. Identifies high-performing old content, suggests when to repost or repurpose, automatically adapts for current trends, and maximizes content value. Get more value from content, save time, and increase reach.",
    shortDescription: "Automatically recycles and repurposes old content",
    category: "Content",
    price: 15.5,
    priceType: "monthly" as const,
  },
  {
    name: "Revenue Tracker & Income Dashboard",
    description: "Tracks all your creator income in one place. Tracks income from all sources (sponsorships, affiliates, products, etc.), visualizes income over time, categorizes income by source, and generates income reports. Understand your income, track growth, and prepare for taxes.",
    shortDescription: "Tracks all your creator income in one place",
    category: "Analytics",
    price: 20,
    priceType: "monthly" as const,
  },
  {
    name: "Real-Time Trend Alerts",
    description: "Alerts you to trending topics in real-time. Monitors trends in your niche, sends instant alerts when trends emerge, suggests content ideas based on trends, and helps you capitalize on trends quickly. Stay ahead of trends, create timely content, and increase reach.",
    shortDescription: "Alerts you to trending topics in real-time",
    category: "Marketing",
    price: 24,
    priceType: "monthly" as const,
  },
  {
    name: "Content A/B Testing System",
    description: "Tests different versions of content to find what works best. Creates multiple versions of content, tests different headlines, images, captions, tracks performance of each version, and identifies winning variations. Optimize content, increase engagement, and learn what works.",
    shortDescription: "Tests different versions of content to find what works best",
    category: "Analytics",
    price: 31.5,
    priceType: "monthly" as const,
  },
  {
    name: "Automated Content Series Generator",
    description: "Automatically generates content series. Creates multi-part content series, maintains consistency across series, suggests series topics, and schedules series posts. Create engaging content series, maintain consistency, and save time.",
    shortDescription: "Automatically generates content series",
    category: "Content",
    price: 24,
    priceType: "monthly" as const,
  },
  {
    name: "Automated Hashtag Optimization",
    description: "Automatically optimizes hashtags for maximum reach. Analyzes hashtag performance, suggests optimal hashtag combinations, tests different hashtag sets, and optimizes for each platform. Increase reach, find best hashtags, and optimize performance.",
    shortDescription: "Automatically optimizes hashtags for maximum reach",
    category: "Marketing",
    price: 20,
    priceType: "monthly" as const,
  },
  {
    name: "Creator Collaboration Marketplace",
    description: "Connects creators for collaborations. Find collaboration partners, discover brand partnership opportunities, connect with other creators, and manage collaborations. Find opportunities, grow network, and increase income.",
    shortDescription: "Connects creators for collaborations",
    category: "Community",
    price: 15.5,
    priceType: "monthly" as const,
  },
];

// CreatorFlow Bundle
const creatorFlowBundle = {
  name: "CreatorFlow - Complete Creator Toolkit",
  description: `The ultimate all-in-one platform for content creators. CreatorFlow includes 44 powerful tools and features to help you create, manage, optimize, and monetize your content across all platforms.

**What's Included:**
- 7 Core Tools: Documents, Hashtag Research, Templates, Calendar, Search, Analytics, Engagement Inbox
- 22 AI-Powered Bots: Content creation, SEO optimization, analytics, business management, and more
- 10 Game-Changer Features: Performance prediction, brand voice analyzer, content sync, and more
- 5 Community Features: Real-time chat, message board, collaboration marketplace, and more

**Why CreatorFlow?**
✅ All tools in one place - no need to juggle multiple subscriptions
✅ Seamless integration between all features
✅ Save 50%+ compared to buying tools individually
✅ Regular updates and new features
✅ Priority support

Perfect for creators who want everything they need in one powerful platform.`,
  shortDescription: "All-in-one platform with 44 tools for content creators",
  category: "Productivity",
  price: 99, // Bundle pricing - significantly less than buying all tools individually
  priceType: "monthly" as const,
  isFeatured: true,
};

async function main() {
  console.log("🌱 Seeding CreatorFlow tools...");

  // Find or create CreatorFlow seller
  let creatorFlowUser = await prisma.user.findUnique({
    where: { email: "creatorflow@creatorflow.ai" },
  });

  if (!creatorFlowUser) {
    creatorFlowUser = await prisma.user.create({
      data: {
        email: "creatorflow@creatorflow.ai",
        name: "CreatorFlow",
        // No password - this is a system account
      },
    });
    console.log("✅ Created CreatorFlow user");
  }

  // Find or create seller profile
  let sellerProfile = await prisma.sellerProfile.findUnique({
    where: { userId: creatorFlowUser.id },
  });

  if (!sellerProfile) {
    sellerProfile = await prisma.sellerProfile.create({
      data: {
        userId: creatorFlowUser.id,
        isVerified: true, // CreatorFlow is verified
      },
    });
    console.log("✅ Created CreatorFlow seller profile");
  }

  // Create individual tools
  console.log(`\n📦 Creating ${tools.length} individual tools...`);
  for (const toolData of tools) {
    const slug = generateSlug(toolData.name);
    
    // Check if tool already exists
    const existing = await prisma.tool.findUnique({
      where: { slug },
    });

    if (existing) {
      console.log(`⏭️  Skipping ${toolData.name} (already exists)`);
      continue;
    }

    await prisma.tool.create({
      data: {
        ...toolData,
        slug,
        sellerId: sellerProfile.id,
        isPublished: true,
        toolUrl: `https://creatorflow.ai/tools/${slug}`, // Placeholder URL
        toolType: "redirect",
      },
    });
    console.log(`✅ Created: ${toolData.name}`);
  }

  // Create CreatorFlow bundle
  console.log(`\n🎁 Creating CreatorFlow bundle...`);
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
    console.log(`✅ Created: ${creatorFlowBundle.name}`);
  } else {
    console.log(`⏭️  Skipping CreatorFlow bundle (already exists)`);
  }

  console.log("\n✨ Seeding complete!");
  console.log(`\n📊 Summary:`);
  console.log(`   - Individual tools: ${tools.length}`);
  console.log(`   - CreatorFlow bundle: 1`);
  console.log(`   - Total: ${tools.length + 1} tools`);
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


