import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  fetchResumeById,
  createUserResume,
  updateUserResume,
  deleteUserResume,
  fetchUserResumes,
} from "./actions";
import { getServerSession } from "next-auth";
import * as queries from "@/app/lib/db/queries";

vi.mock("next-auth", () => ({
  getServerSession: vi.fn(),
}));

vi.mock("@/app/lib/auth", () => ({
  authOptions: {},
}));

vi.mock("@/app/lib/db/queries", () => ({
  createResume: vi.fn(),
  deleteResumeForUser: vi.fn(),
  getResumeByIdForUser: vi.fn(),
  getUserResumes: vi.fn(),
  updateResumeForUser: vi.fn(),
}));

const validUuid = "11111111-1111-4111-8111-111111111111";
const validResumeData = {
  name: "John Doe",
  title: "Software Engineer",
  contact: {
    email: "john@example.com",
    phone: "123456789",
    location: "City, Country",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
  },
  about: "Experienced developer",
  skills: [{ skill: "TypeScript", category: "Languages" }],
  languages: [{ language: "English", proficiency: "Native" }],
  hobbies: ["Coding"],
  objectives: "Grow as an engineer",
  projects: [
    {
      title: "CvGen",
      start: "2024",
      end: "2025",
      details: ["Built cv builder"],
    },
  ],
  studies_training: [
    {
      start: "2018",
      end: "2022",
      degree: "BSc Computer Science",
      institution: "University",
      honors: "First Class",
    },
  ],
  experiences: [
    {
      position: "Senior Engineer",
      company: "Tech Corp",
      start: "2022",
      end: "Present",
      details: ["Led development"],
    },
  ],
};

describe("Dashboard Server Actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("fetchResumeById", () => {
    it("returns Unauthorized when user is not authenticated", async () => {
      vi.mocked(getServerSession).mockResolvedValueOnce(null);

      const result = await fetchResumeById(validUuid);
      expect(result).toEqual({ success: false, error: "Unauthorized" });
      expect(queries.getResumeByIdForUser).not.toHaveBeenCalled();
    });

    it("returns Resume not found when DB returns null", async () => {
      vi.mocked(getServerSession).mockResolvedValueOnce({
        user: { id: "user-123" },
      });
      vi.mocked(queries.getResumeByIdForUser).mockResolvedValueOnce(null as any);

      const result = await fetchResumeById(validUuid);
      expect(result).toEqual({ success: false, error: "Resume not found" });
      expect(queries.getResumeByIdForUser).toHaveBeenCalledWith(validUuid, "user-123");
    });

    it("returns resume data when found and authorized", async () => {
      vi.mocked(getServerSession).mockResolvedValueOnce({
        user: { id: "user-123" },
      });
      const mockDbResume = {
        id: validUuid,
        name: "My CV",
        userId: "user-123",
        resumeData: validResumeData,
        lastModified: new Date("2026-01-01T00:00:00Z"),
      };
      vi.mocked(queries.getResumeByIdForUser).mockResolvedValueOnce(mockDbResume);

      const result = await fetchResumeById(validUuid);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.resume.id).toBe(validUuid);
        expect(result.resume.name).toBe("My CV");
        expect(result.resume.resumeData).toEqual(validResumeData);
      }
    });
  });

  describe("createUserResume", () => {
    it("returns Unauthorized when user is not authenticated", async () => {
      vi.mocked(getServerSession).mockResolvedValueOnce(null);

      const result = await createUserResume("New CV", validResumeData);
      expect(result).toEqual({ success: false, error: "Unauthorized" });
    });

    it("returns error when resume name is empty", async () => {
      vi.mocked(getServerSession).mockResolvedValueOnce({
        user: { id: "user-123" },
      });

      const result = await createUserResume("   ");
      expect(result).toEqual({ success: false, error: "Resume name is required" });
    });

    it("creates resume and returns mapped data on success", async () => {
      vi.mocked(getServerSession).mockResolvedValueOnce({
        user: { id: "user-123" },
      });
      const createdDbResume = {
        id: validUuid,
        name: "New CV",
        userId: "user-123",
        resumeData: validResumeData,
        lastModified: new Date("2026-01-01T00:00:00Z"),
      };
      vi.mocked(queries.createResume).mockResolvedValueOnce(createdDbResume);

      const result = await createUserResume("New CV", validResumeData);
      expect(result.success).toBe(true);
      if (result.success && "resume" in result && result.resume) {
        expect(result.resume.id).toBe(validUuid);
        expect(result.resume.name).toBe("New CV");
      }
      expect(queries.createResume).toHaveBeenCalledWith(
        "user-123",
        "New CV",
        validResumeData
      );
    });
  });

  describe("updateUserResume", () => {
    it("returns Unauthorized when user is not authenticated", async () => {
      vi.mocked(getServerSession).mockResolvedValueOnce(null);

      const result = await updateUserResume(validUuid, validResumeData);
      expect(result).toEqual({ success: false, error: "Unauthorized" });
    });

    it("returns error for invalid UUID", async () => {
      vi.mocked(getServerSession).mockResolvedValueOnce({
        user: { id: "user-123" },
      });

      const result = await updateUserResume("not-a-uuid", validResumeData);
      expect(result).toEqual({ success: false, error: "Invalid resume ID" });
    });

    it("updates resume and returns updated record", async () => {
      vi.mocked(getServerSession).mockResolvedValueOnce({
        user: { id: "user-123" },
      });
      const updatedDbResume = {
        id: validUuid,
        name: "My CV",
        userId: "user-123",
        resumeData: validResumeData,
        lastModified: new Date("2026-01-02T00:00:00Z"),
      };
      vi.mocked(queries.updateResumeForUser).mockResolvedValueOnce(updatedDbResume);

      const result = await updateUserResume(validUuid, validResumeData);
      expect(result.success).toBe(true);
      if (result.success && "resume" in result && result.resume) {
        expect(result.resume.id).toBe(validUuid);
      }
      expect(queries.updateResumeForUser).toHaveBeenCalledWith(
        validUuid,
        "user-123",
        validResumeData
      );
    });
  });
});
