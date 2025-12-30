"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Lock, AlertCircle } from "lucide-react";

const MARKETPLACE_FEE = 0.15;

export function CheckoutClient({ tool, user }: { tool: any; user: any }) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      // Create checkout session
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toolId: tool.id }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.redirect) {
          router.push(data.redirect);
          return;
        }
        throw new Error(data.error || "Failed to create checkout");
      }

      // For now, simulate payment (Stripe integration will replace this)
      // In production, this would redirect to Stripe Checkout
      if (data.checkoutUrl) {
        // Simulate payment processing
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Create purchase/subscription
        const purchaseResponse = await fetch("/api/purchases", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            toolId: tool.id,
            priceType: tool.priceType,
          }),
        });

        if (!purchaseResponse.ok) {
          throw new Error("Failed to process purchase");
        }

        // Redirect to tool access page
        router.push(`/tools/${tool.slug}?purchased=true`);
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete your purchase</h1>
      <p className="text-gray-600 mb-8">
        You're about to purchase <strong>{tool.name}</strong>
      </p>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-red-900">Payment failed</p>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {/* Payment Method */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h2>
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-gray-600" />
              <div className="flex-1">
                <p className="font-medium text-gray-900">Credit or Debit Card</p>
                <p className="text-sm text-gray-600">
                  Secure payment powered by Stripe
                </p>
              </div>
              <Lock className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            💡 In development mode. Stripe integration will be added for production.
          </p>
        </div>

        {/* Billing Info */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Billing Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                value={user.name || ""}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
              />
            </div>
          </div>
        </div>

        {/* Purchase Button */}
        <button
          onClick={handleCheckout}
          disabled={isProcessing}
          className="w-full bg-gray-900 text-white py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Lock className="w-5 h-5" />
              {tool.priceType === "one-time"
                ? `Pay $${tool.price.toFixed(2)}`
                : `Subscribe for $${tool.price.toFixed(2)}/${tool.priceType === "monthly" ? "mo" : "yr"}`}
            </>
          )}
        </button>

        <p className="text-xs text-center text-gray-500">
          By completing this purchase, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}

