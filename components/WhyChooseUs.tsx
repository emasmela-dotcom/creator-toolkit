import { Zap, Shield, Users, TrendingUp, CheckCircle, Sparkles } from "lucide-react";

export function WhyChooseUs() {
  const advantages = [
    {
      icon: Zap,
      title: "Simple & Focused",
      description: "Each tool does one thing perfectly. No bloat, no complexity.",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "All payments handled securely. Your data is always safe.",
    },
    {
      icon: Users,
      title: "Built by Creators",
      description: "Tools designed by creators, for creators. We understand your needs.",
    },
    {
      icon: TrendingUp,
      title: "Proven Results",
      description: "Thousands of creators trust our marketplace for their tools.",
    },
    {
      icon: CheckCircle,
      title: "Verified Sellers",
      description: "All sellers are verified. Quality tools from trusted creators.",
    },
    {
      icon: Sparkles,
      title: "Complete Solutions",
      description: "From CreatorFlow to simple utilities - everything you need in one place.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Why Choose Micro-SaaS Marketplace?
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          We're not just another marketplace. We're the platform built specifically
          for creators who want simple, powerful tools without the complexity.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {advantages.map((advantage, index) => (
          <div key={index} className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <advantage.icon className="w-8 h-8 text-gray-900" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {advantage.title}
            </h3>
            <p className="text-gray-600">{advantage.description}</p>
          </div>
        ))}
      </div>

      {/* Competitive Comparison */}
      <div className="mt-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-12 text-white">
        <h3 className="text-3xl font-bold text-center mb-8">
          How We Compare
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">15%</div>
            <div className="text-gray-300 mb-4">Marketplace Fee</div>
            <p className="text-sm text-gray-400">
              Lower than most competitors (typically 20-30%)
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">100%</div>
            <div className="text-gray-300 mb-4">Creator-Focused</div>
            <p className="text-sm text-gray-400">
              Built specifically for non-tech creators
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">∞</div>
            <div className="text-gray-300 mb-4">Tool Variety</div>
            <p className="text-sm text-gray-400">
              From CreatorFlow to simple utilities
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


