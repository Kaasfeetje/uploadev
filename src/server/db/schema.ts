// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  pgTableCreator,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `uploadev_${name}`);

// Enums
export const statusEnum = pgEnum("status", [
  "pending",
  "success",
  "failed",
  "canceled",
]);

//Tables

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkId: varchar("clerk_id").notNull().unique(),
  email: varchar("email", { length: 256 }).notNull(),
  imageUrl: text("image_url").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  projects: many(projects),
}));

export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name").notNull().unique(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  apiKeyId: uuid("api_key_id")
    .references(() => apiKeys.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const projectsRelations = relations(projects, ({ one }) => ({
  user: one(users, {
    fields: [projects.userId],
    references: [users.id],
  }),
  apiKey: one(apiKeys, {
    fields: [projects.apiKeyId],
    references: [apiKeys.id],
  }),
}));

export const apiKeys = pgTable("apiKeys", {
  id: uuid("id").primaryKey().defaultRandom(),
  key: varchar("key", { length: 64 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
  expiresAt: timestamp("expires_at"),
  status: varchar("status", { length: 50 }).default("active").notNull(),
});

export const files = pgTable("files", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  projectId: uuid("project_id")
    .references(() => projects.id, {
      onDelete: "set null",
    })
    .notNull(),
  key: varchar("key", { length: 512 }).notNull(),
  filename: varchar("filename", { length: 255 }).notNull(),
  size: integer().notNull(),
  status: statusEnum("status").notNull().default("pending").notNull(),
  contentType: varchar("contentType", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
export type FileType = typeof files.$inferSelect;

export const filesRelations = relations(files, ({ one }) => ({
  project: one(projects, {
    fields: [files.projectId],
    references: [projects.id],
  }),
}));
