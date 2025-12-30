"use client";

import { Clock, Zap, DollarSign, CheckCircle } from "lucide-react";

interface SubscriptionValueProps {
  price: number;
  priceType: string;
  toolName: string;
}

export function SubscriptionValue({ price, priceType, toolName }: SubscriptionValueProps) {
  if (priceType === "one-time") return null;

  // Calculate value propositions
  const monthlyPrice = price;
  const costPerDay = (monthlyPrice / 30).toFixed(2);
  const costPerWeek = (monthlyPrice / 4).toFixed(2);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-6">
      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Zap className="w-5 h-5 text-blue-600" />
        Why Subscribe Monthly?
      </h3>
      <div className="space-y-3 text-sm">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-gray-900">Always Available When You Need It</p>
            <p className="text-gray-600">
              No waiting, no setup time. Access {toolName} instantly, even at 2am when inspiration strikes.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-gray-900">Less Than ${costPerDay} Per Day</p>
            <p className="text-gray-600">
              ${monthlyPrice}/month = ${costPerDay}/day. Cheaper than a coffee, always ready when you need it.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-gray-900">Regular Updates & Improvements</p>
            <p className="text-gray-600">
              Get new features, bug fixes, and improvements automatically. No extra cost, always getting better.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-gray-900">Cancel Anytime, No Risk</p>
            <p className="text-gray-600">
              Try it risk-free. Cancel anytime if it doesn't work for you. No long-term commitment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

