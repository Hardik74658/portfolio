import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // The whole editable site lives in one document (key "main").
  content: defineTable({
    key: v.string(),
    data: v.any(),
    updatedAt: v.number(),
  }).index("by_key", ["key"]),

  // Admin sessions created by a successful password login.
  sessions: defineTable({
    token: v.string(),
    expiresAt: v.number(),
  }).index("by_token", ["token"]),

  // Failed login attempts, used for simple rate limiting.
  loginFailures: defineTable({
    at: v.number(),
  }).index("by_at", ["at"]),
});
