"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check, Lock } from "lucide-react";

export function PurchaseButton({
  tool,
  userId,
}: {
  tool: {
    id: string;
    slug: string;
    price: number;
    priceType: string;
    name: string;
  };
  userId: string | null;
}) {
  const router = useRouter();
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!userId) {
      setIsChecking(false);
      return;
    }

    // Check if user has access
    fetch(`/api/purchases?toolId=${tool.id}`)
      .then((res) => res.json())
      .then((data) => {
        setHasAccess(data.hasAccess || false);
        setIsChecking(false);
      })
      .catch(() => {
        setIsChecking(false);
      });
  }, [tool.id, userId]);

  if (!userId) {
    return (
      <Link
        href={`/login?redirect=/tools/${tool.slug}`}
        className="w-full bg-gray-900 text-white py-4 rounded-lg font-semibold hover:bg-gray-800 mb-4 flex items-center justify-center gap-2"
      >
        Sign In to Purchase
        <ArrowRight className="w-5 h-5" />
      </Link>
    );
  }

  if (isChecking) {
    return (
      <button
        disabled
        className="w-full bg-gray-400 text-white py-4 rounded-lg font-semibold mb-4 flex items-center justify-center gap-2 cursor-not-allowed"
      >
        Checking access...
      </button>
    );
  }

  if (hasAccess) {
    return (
      <>
        <Link
          href={`/tools/${tool.slug}/access`}
          className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 mb-4 flex items-center justify-center gap-2"
        >
          <Check className="w-5 h-5" />
          Access Tool
        </Link>
        <p className="text-center text-sm text-green-600 mb-4">
          ✓ You have access to this tool
        </p>
      </>
    );
  }

  return (
    <>
      <Link
        href={`/checkout/${tool.slug}?toolId=${tool.id}`}
        className="w-full bg-gray-900 text-white py-4 rounded-lg font-semibold hover:bg-gray-800 mb-4 flex items-center justify-center gap-2"
      >
        <Lock className="w-5 h-5" />
        {tool.priceType === "one-time"
          ? `Purchase for $${tool.price}`
          : `Subscribe for $${tool.price}/${tool.priceType === "monthly" ? "mo" : "yr"}`}
        <ArrowRight className="w-5 h-5" />
      </Link>
      <div className="text-center text-sm text-gray-600 mb-6">
        {tool.priceType === "one-time"
          ? "One-time purchase • Lifetime access"
          : "Cancel anytime • Secure payment"}
      </div>
    </>
  );
}

