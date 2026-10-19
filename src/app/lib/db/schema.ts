import { pgTable, text, timestamp, uuid, jsonb } from "drizzle-orm/pg-core";

export const resumes = pgTable("resumes", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name"),
  userId: uuid("user_id").notNull(), // References the Supabase users table; no local FK since users live in Supabase, not this DB
  resumeData: jsonb("resume_data").notNull(), // Raw JSON data
  lastModified: timestamp("last_modified").defaultNow(),
});

export interface Resume {
  id: string; // UUID
  name: string; // Name of the resume
  userId: string; // UUID of the user (foreign key to users table)
  resumeData: object; // JSON data for the resume
  lastModified: string; // ISO timestamp for the last modification date
}