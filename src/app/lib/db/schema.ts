import { pgTable, serial, text, timestamp, uuid, foreignKey } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey(),
  email: text("email").notNull(),
  name: text("name"),
  image: text("image"),
  provider: text("provider"),
  providerAccountId: text("provider_account_id"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const resumes = pgTable("resumes", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id), // Foreign key to users table
  resumeData: text("resume_data").notNull(), // Raw JSON data
  lastModified: timestamp("last_modified").defaultNow(),
});

export interface User {
  id: string; // UUID
  email: string;
  name?: string;
  image?: string;
  provider?: string;
  provider_account_id?: string;
  updated_at: string; // ISO timestamp
}