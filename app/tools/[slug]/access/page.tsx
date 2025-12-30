import { getCurrentUser } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Code, Lock, Check } from "lucide-react";
import { ApiKeyDisplay } from "./ApiKeyDisplay";

export default async function ToolAccessPage({
  params,
}: {
  params: { slug: string };
}) {
  const user = await getCurrentUser();
  if (!user) {
    redirect(`/login?redirect=/tools/${params.slug}/access`);
  }

  const tool = await prisma.tool.findUnique({
    where: { slug: params.slug },
    include: {
      seller: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!tool || !tool.isPublished) {
    redirect("/marketplace");
  }

  // Check access
  let hasAccess = false;

  if (tool.priceType === "one-time") {
    const purchase = await prisma.purchase.findUnique({
      where: {
        userId_toolId: {
          userId: user.id,
          toolId: tool.id,
        },
      },
    });
    hasAccess = purchase?.status === "completed" || false;
  } else {
    const subscription = await prisma.subscription.findUnique({
      where: {
        userId_toolId: {
          userId: user.id,
          toolId: tool.id,
        },
      },
    });
    hasAccess = subscription?.status === "active" || false;
  }

  if (!hasAccess) {
    redirect(`/tools/${tool.slug}`);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Micro-SaaS Marketplace
            </Link>
            <Link
              href={`/tools/${tool.slug}`}
              className="text-gray-600 hover:text-gray-900"
            >
              Back to tool page
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-green-600 mb-4">
            <Check className="w-4 h-4" />
            <span>You have access to this tool</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{tool.name}</h1>
          <p className="text-gray-600">{tool.shortDescription}</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Access Your Tool</h2>

          {tool.toolType === "embed" && tool.toolUrl ? (
            <div className="space-y-4">
              <p className="text-gray-600 mb-4">
                This tool is embedded below. You can use it directly on this page.
              </p>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <iframe
                  src={tool.toolUrl}
                  className="w-full h-[600px] border-0"
                  title={tool.name}
                />
              </div>
            </div>
          ) : tool.toolType === "redirect" && tool.toolUrl ? (
            <div className="space-y-4">
              <p className="text-gray-600 mb-4">
                Click the button below to access your tool on the seller's website.
              </p>
              <a
                href={tool.toolUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800"
              >
                <ExternalLink className="w-5 h-5" />
                Open Tool
              </a>
            </div>
          ) : tool.toolType === "api" && tool.apiKey ? (
            <div className="space-y-4">
              <p className="text-gray-600 mb-4">
                This tool provides API access. Use your API key below to integrate it into your
                applications.
              </p>
              <ApiKeyDisplay apiKey={tool.apiKey || ""} />
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900">
                  <strong>API Endpoint:</strong> {tool.toolUrl || "Contact seller for endpoint"}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Tool Access Pending
              </h3>
              <p className="text-gray-600 mb-6">
                The seller is setting up access to this tool. You'll receive an email when it's
                ready.
              </p>
              <Link
                href={`/tools/${tool.slug}`}
                className="inline-flex items-center gap-2 text-gray-900 hover:text-gray-700"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to tool page
              </Link>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Need Help?</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>
              If you're having trouble accessing this tool, please contact the seller or our
              support team.
            </p>
            <p>
              <strong>Seller:</strong> {tool.seller.user.name || tool.seller.user.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

