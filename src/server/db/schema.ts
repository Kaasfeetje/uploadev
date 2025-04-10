// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations } from "drizzle-orm";
import {
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
  userId: uuid("user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const projectsRelations = relations(projects, ({ one }) => ({
  user: one(users, {
    fields: [projects.userId],
    references: [users.id],
  }),
}));
