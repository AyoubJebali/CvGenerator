import { pgTable, text, timestamp, uuid, jsonb ,serial } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(), // Change from uuid to text
  email: text("email"), // Remove `notNull` to match Supabase
  name: text("name"),
  image: text("image"),
  provider: text("provider"),
  providerAccountId: text("provider_account_id"),
  rawUser: jsonb("raw_user"), // Add raw_user column
  lastSignInAt: timestamp("last_sign_in_at", { withTimezone: true }), // Add last_sign_in_at column
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(), // Add created_at column
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(), // Match Supabase's updated_at
});

export const resumes = pgTable("resumes", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name"),
  userId: uuid("user_id").notNull().references(() => users.id), // Foreign key to users table
  resumeData: jsonb("resume_data").notNull(), // Raw JSON data
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
export interface Resume {
  id: string; // UUID
  name: string; // Name of the resume
  userId: string; // UUID of the user (foreign key to users table)
  resumeData: object; // JSON data for the resume
  lastModified: string; // ISO timestamp for the last modification date
}