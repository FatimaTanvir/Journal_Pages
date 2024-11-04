import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  documents: defineTable({
    coverImage: v.optional(v.string()),
    isArchived: v.boolean(),
    icon: v.optional(v.string()),
    isPublished: v.boolean(),
    content: v.optional(v.string()),
    parentDocument: v.optional(v.id("documents")),
    userId: v.string(),
    title: v.string(),
  })
    .index("by_user", ["userId"])
    .index("by_user_parent", ["userId", "parentDocument"]),
});