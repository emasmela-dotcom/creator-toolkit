import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Users, TrendingUp, Check } from "lucide-react";

export function CreatorFlowShowcase() {
  const creatorFlowFeatures = [
    "Complete creator workflow automation",
    "Multi-platform content management",
    "Advanced analytics and insights",
    "AI-powered content suggestions",
    "Team collaboration tools",
    "Custom integrations",
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 rounded-3xl p-12 border border-purple-200">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-purple-600" />
              <span className="text-sm font-semibold text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
                Featured Showcase
              </span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              See CreatorFlow in Action
            </h2>
            <p className="text-xl text-gray-700 mb-6">
              CreatorFlow is the perfect example of what's possible on our marketplace.
              A complete creator toolkit that demonstrates the power of focused, integrated tools.
            </p>
            <p className="text-gray-600 mb-8">
              This is what happens when creators build tools for creators. No enterprise
              bloat, no unnecessary features - just everything you need to grow your
              creator business, all in one powerful platform.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {creatorFlowFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <Link
                href="/tools/creatorflow"
                className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 inline-flex items-center gap-2"
              >
                Explore CreatorFlow
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/marketplace"
                className="border border-gray-300 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-white inline-flex items-center gap-2"
              >
                Browse All Tools
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Right Side - Stats/Visual */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              CreatorFlow by the Numbers
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-gray-900">Active Users</span>
                </div>
                <span className="text-2xl font-bold text-gray-900">10,000+</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-gray-900">Tools Integrated</span>
                </div>
                <span className="text-2xl font-bold text-gray-900">50+</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-gray-900">Time Saved</span>
                </div>
                <span className="text-2xl font-bold text-gray-900">20hrs/week</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-gray-900">Satisfaction</span>
                </div>
                <span className="text-2xl font-bold text-gray-900">4.9★</span>
              </div>
            </div>
            <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-sm text-purple-900">
                <strong>Why CreatorFlow?</strong> It's the perfect example of a comprehensive
                tool built on our marketplace principles - simple, focused, and powerful.
                See how one tool can transform your entire creator workflow.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


