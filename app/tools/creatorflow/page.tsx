import Link from "next/link";
import { ArrowLeft, Star, Check, ArrowRight, Sparkles, Zap, Users, TrendingUp } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function CreatorFlowPage() {
  // Check if CreatorFlow tool exists, if not create a placeholder or fetch from a special route
  let tool = await prisma.tool.findUnique({
    where: { slug: "creatorflow" },
    include: {
      seller: {
        include: {
          user: true,
        },
      },
      reviews: {
        include: {
          user: true,
        },
        orderBy: { createdAt: "desc" },
        take: 10,
      },
    },
  });

  // If CreatorFlow doesn't exist yet, show a special showcase page
  if (!tool) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="border-b bg-white sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                Micro-SaaS Marketplace
              </Link>
              <nav className="hidden md:flex gap-6">
                <Link href="/marketplace" className="text-gray-600 hover:text-gray-900">
                  Marketplace
                </Link>
                <Link href="/sell" className="text-gray-600 hover:text-gray-900">
                  Sell Tools
                </Link>
                <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                  Dashboard
                </Link>
              </nav>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 rounded-3xl p-12 border border-purple-200">
            <div className="text-center mb-12">
              <Sparkles className="w-16 h-16 text-purple-600 mx-auto mb-4" />
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                CreatorFlow
              </h1>
              <p className="text-2xl text-gray-700 mb-8">
                The Complete Micro-SaaS Marketplace
              </p>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                CreatorFlow is our flagship tool - a comprehensive platform that demonstrates
                the power of integrated creator tools. From content planning to analytics,
                CreatorFlow brings everything together in one place.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <Users className="w-8 h-8 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">10,000+ Creators</h3>
                <p className="text-gray-600">Trust CreatorFlow for their daily workflow</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <Zap className="w-8 h-8 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">50+ Tools</h3>
                <p className="text-gray-600">Integrated into one powerful platform</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <TrendingUp className="w-8 h-8 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">20hrs/week</h3>
                <p className="text-gray-600">Average time saved per creator</p>
              </div>
            </div>

            {/* Why CreatorFlow Section */}
            <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl p-8 mb-12 text-white">
              <h2 className="text-3xl font-bold mb-6">Why Choose CreatorFlow?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <div className="text-4xl font-bold mb-2">$1,200+</div>
                  <div className="text-purple-100">Value if purchased individually</div>
                  <div className="text-2xl font-bold mt-2 text-yellow-300">$99/month</div>
                  <div className="text-purple-100">Save 90% with bundle</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <div className="text-4xl font-bold mb-2">20+ hrs</div>
                  <div className="text-purple-100">Saved per week on content tasks</div>
                  <div className="text-sm mt-2 text-purple-200">Automation & AI do the heavy lifting</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <div className="text-4xl font-bold mb-2">44 Tools</div>
                  <div className="text-purple-100">All integrated in one platform</div>
                  <div className="text-sm mt-2 text-purple-200">No more juggling multiple subscriptions</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <div className="text-4xl font-bold mb-2">100%</div>
                  <div className="text-purple-100">Seamless integration</div>
                  <div className="text-sm mt-2 text-purple-200">All tools work together perfectly</div>
                </div>
              </div>
            </div>

            {/* Complete Tools Breakdown */}
            <div className="bg-white rounded-xl p-8 border border-gray-200 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">What's Included: 44 Powerful Tools</h2>
              <p className="text-gray-600 mb-8">Everything you need to create, manage, optimize, and monetize your content</p>
              
              {/* Core Tools */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">7 Core Tools</h3>
                    <p className="text-sm text-gray-600">Essential productivity and management features</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-3 ml-16">
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Documents Feature</span>
                      <span className="text-gray-600 text-sm"> - Save and organize content drafts, ideas, and notes</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Hashtag Research Tool</span>
                      <span className="text-gray-600 text-sm"> - Find best hashtags across all platforms</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Content Templates</span>
                      <span className="text-gray-600 text-sm"> - Create reusable post templates with variables</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Content Calendar/Scheduler</span>
                      <span className="text-gray-600 text-sm"> - Visual calendar for planning and scheduling</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Content Library Search</span>
                      <span className="text-gray-600 text-sm"> - Unified search across all your content</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Performance Analytics Dashboard</span>
                      <span className="text-gray-600 text-sm"> - Track performance and engagement metrics</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Engagement Inbox</span>
                      <span className="text-gray-600 text-sm"> - Manage all social interactions in one place</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI-Powered Bots */}
              <div className="mb-8 border-t pt-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">22 AI-Powered Bots</h3>
                    <p className="text-sm text-gray-600">Intelligent automation for content creation, optimization, and business management</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-3 ml-16">
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Content Writer Bot</span>
                      <span className="text-gray-600 text-sm"> - AI-powered content generation</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">SEO Optimizer Bot</span>
                      <span className="text-gray-600 text-sm"> - AI-powered SEO content optimization</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Content Repurposing Bot</span>
                      <span className="text-gray-600 text-sm"> - Transform content into multiple formats</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Brand Deal Negotiation Assistant</span>
                      <span className="text-gray-600 text-sm"> - Analyzes and suggests deal negotiations</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Analytics Coach Bot</span>
                      <span className="text-gray-600 text-sm"> - Provides insights and recommendations</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Trend Scout Bot</span>
                      <span className="text-gray-600 text-sm"> - Identifies trending topics and hashtags</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Social Media Manager Bot</span>
                      <span className="text-gray-600 text-sm"> - Creates and manages social posts</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Expense Tracker Bot</span>
                      <span className="text-gray-600 text-sm"> - Tracks business expenses and receipts</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Invoice Generator Bot</span>
                      <span className="text-gray-600 text-sm"> - Creates professional invoices</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Creator Tax Assistant</span>
                      <span className="text-gray-600 text-sm"> - Helps with taxes and deductions</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Content Gap Analyzer Bot</span>
                      <span className="text-gray-600 text-sm"> - Identifies content opportunities</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">+ 11 More AI Bots</span>
                      <span className="text-gray-600 text-sm"> - Content Assistant, Engagement Analyzer, Meeting Scheduler, and more</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Game-Changer Features */}
              <div className="mb-8 border-t pt-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Star className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">10 Game-Changer Features</h3>
                    <p className="text-sm text-gray-600">Advanced features that give you a competitive edge</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-3 ml-16">
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">AI Performance Predictor</span>
                      <span className="text-gray-600 text-sm"> - Predicts content performance before posting</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Brand Voice Analyzer</span>
                      <span className="text-gray-600 text-sm"> - Maintains your brand voice across all content</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Cross-Platform Content Sync</span>
                      <span className="text-gray-600 text-sm"> - Syncs content across all platforms</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Content A/B Testing System</span>
                      <span className="text-gray-600 text-sm"> - Tests different versions to find what works</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Revenue Tracker & Income Dashboard</span>
                      <span className="text-gray-600 text-sm"> - Tracks all creator income in one place</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Real-Time Trend Alerts</span>
                      <span className="text-gray-600 text-sm"> - Alerts you to trending topics instantly</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Automated Content Series Generator</span>
                      <span className="text-gray-600 text-sm"> - Generates multi-part content series</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Automated Hashtag Optimization</span>
                      <span className="text-gray-600 text-sm"> - Optimizes hashtags for maximum reach</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Content Recycling System</span>
                      <span className="text-gray-600 text-sm"> - Automatically repurposes old content</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Content Performance Attribution</span>
                      <span className="text-gray-600 text-sm"> - Tracks which content drives revenue</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Community Features */}
              <div className="border-t pt-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">5 Community Features</h3>
                    <p className="text-sm text-gray-600">Connect and collaborate with other creators (included free)</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-3 ml-16">
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Real-Time Chat</span>
                      <span className="text-gray-600 text-sm"> - Chat with other creators in real-time</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Message Board</span>
                      <span className="text-gray-600 text-sm"> - Community discussions and forums</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Creator Collaboration Marketplace</span>
                      <span className="text-gray-600 text-sm"> - Find collaboration partners</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Active Users Display</span>
                      <span className="text-gray-600 text-sm"> - See who's online and active</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">User Profile Features</span>
                      <span className="text-gray-600 text-sm"> - Showcase your content types and expertise</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Selling Points */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 border border-indigo-200 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Creators Love CreatorFlow</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <div className="text-2xl mb-3">💰 Massive Savings</div>
                  <p className="text-gray-700 mb-2">Buying all 44 tools individually would cost over $1,200/month. CreatorFlow gives you everything for just $99/month - that's 90% savings!</p>
                </div>
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <div className="text-2xl mb-3">⚡ Save 20+ Hours/Week</div>
                  <p className="text-gray-700 mb-2">AI-powered automation handles repetitive tasks, letting you focus on creating. Most creators save 20+ hours per week.</p>
                </div>
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <div className="text-2xl mb-3">🔗 Seamless Integration</div>
                  <p className="text-gray-700 mb-2">All 44 tools work together perfectly. No more switching between apps or copying data manually. Everything syncs automatically.</p>
                </div>
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <div className="text-2xl mb-3">📈 Grow Faster</div>
                  <p className="text-gray-700 mb-2">AI Performance Predictor tells you what will work before you post. Content A/B Testing finds your best formats. Real-time trend alerts keep you ahead.</p>
                </div>
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <div className="text-2xl mb-3">💼 Business Management</div>
                  <p className="text-gray-700 mb-2">Track expenses, generate invoices, negotiate brand deals, and handle taxes - all the business side of being a creator, automated.</p>
                </div>
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <div className="text-2xl mb-3">🤝 Community Access</div>
                  <p className="text-gray-700 mb-2">Connect with 10,000+ creators, find collaboration partners, and grow your network. The community features alone are worth it.</p>
                </div>
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <div className="text-2xl mb-3">🔄 Always Updated</div>
                  <p className="text-gray-700 mb-2">New features and improvements added regularly. You get access to everything new without paying extra.</p>
                </div>
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <div className="text-2xl mb-3">🎯 One Platform, Everything</div>
                  <p className="text-gray-700 mb-2">Stop juggling 10+ different subscriptions. CreatorFlow replaces them all with one integrated platform that does it better.</p>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-6">
                CreatorFlow is coming soon to the marketplace. This is what's possible
                when creators build comprehensive tools on our platform.
              </p>
              <Link
                href="/marketplace"
                className="bg-gray-900 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 inline-flex items-center gap-2"
              >
                Browse Other Tools
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If tool exists, show normal tool page
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Regular tool page would go here */}
      <p>CreatorFlow tool page</p>
    </div>
  );
}


