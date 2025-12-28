import { getCurrentUser } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect("/login");
  }

  // Check if user has seller profile
  const sellerProfile = await prisma.sellerProfile.findUnique({
    where: { userId: user.id },
  });

  // Get user's subscriptions
  const subscriptions = await prisma.subscription.findMany({
    where: { userId: user.id },
  });

  // Route to appropriate dashboard
  // If user has tools to sell OR has no subscriptions, show seller dashboard
  // Otherwise show buyer dashboard
  if (sellerProfile) {
    const tools = await prisma.tool.findMany({
      where: { sellerId: sellerProfile.id },
    });
    
    if (tools.length > 0 || subscriptions.length === 0) {
      redirect("/dashboard/seller");
    }
  }

  redirect("/dashboard/buyer");
}
