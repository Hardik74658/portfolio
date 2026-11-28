import { mutation, query, QueryCtx } from "./_generated/server";
import { v } from "convex/values";

const SESSION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const WINDOW_MS = 15 * 60 * 1000; // rate-limit window
const MAX_FAILURES = 8; // failed logins allowed per window (site-wide)

function randomToken() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

// Length-independent string compare so timing doesn't leak the password.
function safeEqual(a: string, b: string) {
  let diff = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return diff === 0;
}

/** Throws unless `token` is a live admin session. */
export async function requireAdmin(ctx: QueryCtx, token: string) {
  const session = await ctx.db
    .query("sessions")
    .withIndex("by_token", (q) => q.eq("token", token))
    .unique();
  if (!session || session.expiresAt < Date.now()) {
    throw new Error("Not signed in");
  }
}

export const login = mutation({
  args: { password: v.string() },
  handler: async (ctx, { password }) => {
    const expected = process.env.ADMIN_PASSWORD;
    if (!expected) throw new Error("ADMIN_PASSWORD is not configured");

    const now = Date.now();
    const recent = await ctx.db
      .query("loginFailures")
      .withIndex("by_at", (q) => q.gt("at", now - WINDOW_MS))
      .collect();
    if (recent.length >= MAX_FAILURES) {
      return { ok: false as const, error: "Too many attempts. Try again in 15 minutes." };
    }

    if (!safeEqual(password, expected)) {
      await ctx.db.insert("loginFailures", { at: now });
      return { ok: false as const, error: "Wrong password." };
    }

    // Tidy up expired sessions and old failures.
    for (const s of await ctx.db.query("sessions").collect()) {
      if (s.expiresAt < now) await ctx.db.delete(s._id);
    }
    for (const f of await ctx.db
      .query("loginFailures")
      .withIndex("by_at", (q) => q.lt("at", now - WINDOW_MS))
      .collect()) {
      await ctx.db.delete(f._id);
    }

    const token = randomToken();
    await ctx.db.insert("sessions", { token, expiresAt: now + SESSION_MS });
    return { ok: true as const, token };
  },
});

export const check = query({
  args: { token: v.string() },
  handler: async (ctx, { token }) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", token))
      .unique();
    return !!session && session.expiresAt > Date.now();
  },
});

export const logout = mutation({
  args: { token: v.string() },
  handler: async (ctx, { token }) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", token))
      .unique();
    if (session) await ctx.db.delete(session._id);
  },
});
