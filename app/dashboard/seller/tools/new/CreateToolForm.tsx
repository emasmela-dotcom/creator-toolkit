"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const toolSchema = z.object({
  name: z.string().min(1, "Name is required"),
  shortDescription: z.string().min(10, "Description must be at least 10 characters"),
  description: z.string().min(50, "Full description must be at least 50 characters"),
  category: z.string().min(1, "Category is required"),
  price: z.number().min(0.01, "Price must be greater than 0"),
  priceType: z.enum(["one-time", "monthly", "yearly"]),
  imageUrl: z.string().url().optional().or(z.literal("")),
  demoUrl: z.string().url().optional().or(z.literal("")),
  toolUrl: z.string().url().optional().or(z.literal("")).nullable(),
  toolType: z.enum(["embed", "redirect", "api"]).optional(),
});

type ToolFormData = z.infer<typeof toolSchema>;

export function CreateToolForm({ sellerId }: { sellerId: string }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ToolFormData>({
    resolver: zodResolver(toolSchema),
  });

  async function onSubmit(data: ToolFormData) {
    setError("");
    setLoading(true);

    try {
      // Generate slug from name
      const slug = data.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      const response = await fetch("/api/tools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          slug,
          sellerId,
          imageUrl: data.imageUrl || null,
          demoUrl: data.demoUrl || null,
          toolUrl: data.toolUrl || null,
          toolType: data.toolType || null,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Failed to create tool");
        setLoading(false);
        return;
      }

      router.push(`/dashboard/seller/tools/${result.tool.id}/edit`);
    } catch (error) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tool Name *
        </label>
        <input
          {...register("name")}
          type="text"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          placeholder="e.g., Link-in-bio but for email"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Short Description *
        </label>
        <input
          {...register("shortDescription")}
          type="text"
          maxLength={150}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          placeholder="Brief description shown in listings (max 150 characters)"
        />
        {errors.shortDescription && (
          <p className="mt-1 text-sm text-red-600">
            {errors.shortDescription.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Full Description *
        </label>
        <textarea
          {...register("description")}
          rows={6}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          placeholder="Detailed description of your tool and its features..."
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>
          <select
            {...register("category")}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          >
            <option value="">Select category</option>
            <option value="Marketing">Marketing</option>
            <option value="Content">Content</option>
            <option value="Productivity">Productivity</option>
            <option value="Community">Community</option>
            <option value="Sales">Sales</option>
            <option value="Analytics">Analytics</option>
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Type *
          </label>
          <select
            {...register("priceType")}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          >
            <option value="one-time">One-time</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price ($) *
        </label>
        <input
          {...register("price", { valueAsNumber: true })}
          type="number"
          step="0.01"
          min="0"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          placeholder="9.99"
        />
        {errors.price && (
          <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tool URL (optional)
        </label>
        <input
          {...register("toolUrl")}
          type="url"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          placeholder="https://your-tool.com or embed URL"
        />
        <p className="mt-1 text-sm text-gray-500">
          Where your tool is hosted. Leave empty if not ready yet.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tool Type (optional)
        </label>
        <select
          {...register("toolType")}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
        >
          <option value="">Select type</option>
          <option value="embed">Embed (iframe/widget)</option>
          <option value="redirect">Redirect (external link)</option>
          <option value="api">API (requires API key)</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image URL (optional)
          </label>
          <input
            {...register("imageUrl")}
            type="url"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            placeholder="https://example.com/image.png"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Demo URL (optional)
          </label>
          <input
            {...register("demoUrl")}
            type="url"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            placeholder="https://demo.example.com"
          />
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating..." : "Create Tool"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

