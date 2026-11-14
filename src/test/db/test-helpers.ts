import { db } from "@/app/lib/db/drizzle";
import { resumes } from "@/app/lib/db/schema";
import { inArray } from "drizzle-orm";
import { ResumeSchema } from "@/types";

export const createTestResumeData = (title = "Test Resume"): ResumeSchema => ({
  name: "Integration Test User",
  title,
  contact: {
    email: "test.integration@example.com",
    phone: "1234567890",
    location: "Test City",
    linkedin: "https://linkedin.com/in/testuser",
    github: "https://github.com/testuser",
  },
  about: "Automated database test profile",
  skills: [{ skill: "PostgreSQL", category: "Database" }],
  languages: [{ language: "English", proficiency: "Fluent" }],
  hobbies: ["Testing"],
  objectives: "Verify database integrity",
  projects: [
    {
      title: "Test Project",
      start: "2026-01-01",
      end: "2026-01-02",
      details: ["Automated testing step"],
    },
  ],
  studies_training: [
    {
      start: "2020",
      end: "2024",
      degree: "BSc",
      institution: "Test University",
      honors: "Honors",
    },
  ],
  experiences: [
    {
      position: "QA Engineer",
      company: "Test Labs",
      start: "2024-01-01",
      end: "2025-01-01",
      details: ["Wrote integration tests"],
    },
  ],
});

export async function cleanupTestUsers(userIds: string[]) {
  if (!userIds || userIds.length === 0) return;
  try {
    await db.delete(resumes).where(inArray(resumes.userId, userIds));
  } catch (err) {
    console.error("Cleanup error in test teardown:", err);
  }
}
