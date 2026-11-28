import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin } from "./auth";

/** Public: the saved site content, or null to use the built-in defaults. */
export const get = query({
  args: {},
  handler: async (ctx) => {
    const doc = await ctx.db
      .query("content")
      .withIndex("by_key", (q) => q.eq("key", "main"))
      .unique();
    return doc ? { data: doc.data, updatedAt: doc.updatedAt } : null;
  },
});

export const save = mutation({
  args: { token: v.string(), data: v.any() },
  handler: async (ctx, { token, data }) => {
    await requireAdmin(ctx, token);
    if (!data || typeof data !== "object" || Array.isArray(data)) {
      throw new Error("Content must be an object");
    }
    const updatedAt = Date.now();
    const doc = await ctx.db
      .query("content")
      .withIndex("by_key", (q) => q.eq("key", "main"))
      .unique();
    if (doc) await ctx.db.patch(doc._id, { data, updatedAt });
    else await ctx.db.insert("content", { key: "main", data, updatedAt });
    return updatedAt;
  },
});

/** Deletes saved content so the site falls back to the built-in defaults. */
export const reset = mutation({
  args: { token: v.string() },
  handler: async (ctx, { token }) => {
    await requireAdmin(ctx, token);
    const doc = await ctx.db
      .query("content")
      .withIndex("by_key", (q) => q.eq("key", "main"))
      .unique();
    if (doc) await ctx.db.delete(doc._id);
  },
});

export const generateUploadUrl = mutation({
  args: { token: v.string() },
  handler: async (ctx, { token }) => {
    await requireAdmin(ctx, token);
    return await ctx.storage.generateUploadUrl();
  },
});

/** Turns an uploaded file into a permanent public URL. */
export const fileUrl = mutation({
  args: { token: v.string(), storageId: v.id("_storage") },
  handler: async (ctx, { token, storageId }) => {
    await requireAdmin(ctx, token);
    const url = await ctx.storage.getUrl(storageId);
    if (!url) throw new Error("Upload not found");
    return url;
  },
});
