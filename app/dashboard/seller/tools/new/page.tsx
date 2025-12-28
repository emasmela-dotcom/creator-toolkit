import { getCurrentUser } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CreateToolForm } from "./CreateToolForm";

export default async function NewToolPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect("/login");
  }

  // Get or create seller profile
  let sellerProfile = await prisma.sellerProfile.findUnique({
    where: { userId: user.id },
  });

  if (!sellerProfile) {
    sellerProfile = await prisma.sellerProfile.create({
      data: {
        userId: user.id,
      },
    });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/dashboard/seller"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>

        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create New Tool
          </h1>
          <p className="text-gray-600 mb-8">
            Add your tool to the marketplace and start earning
          </p>

          <CreateToolForm sellerId={sellerProfile.id} />
        </div>
      </div>
    </div>
  );
}


