import { describe, it, expect, beforeAll, afterAll } from "vitest";
import {
  createResume,
  getUserResumes,
  getResumeByIdForUser,
  updateResumeForUser,
  deleteResumeForUser,
} from "@/app/lib/db/queries";
import { createTestResumeData, cleanupTestUsers } from "./test-helpers";

describe("Database CRUD Operations & Multi-Tenant Isolation", () => {
  const testUserA = crypto.randomUUID();
  const testUserB = crypto.randomUUID();
  const nonExistentId = crypto.randomUUID();

  let createdResumeId: string;

  beforeAll(async () => {
    // Ensure clean state before running
    await cleanupTestUsers([testUserA, testUserB]);
  });

  afterAll(async () => {
    // Clean up all records created by test users
    await cleanupTestUsers([testUserA, testUserB]);
  });

  describe("CREATE (createResume)", () => {
    it("successfully creates a new resume record with JSONB payload", async () => {
      const initialData = createTestResumeData("Initial Resume A");
      const result = await createResume(testUserA, "Resume A1", initialData);

      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.userId).toBe(testUserA);
      expect(result.name).toBe("Resume A1");
      expect(result.resumeData).toEqual(initialData);
      expect(result.lastModified).toBeInstanceOf(Date);

      createdResumeId = result.id;
    });
  });

  describe("READ (getResumeByIdForUser & getUserResumes)", () => {
    it("retrieves the created resume by ID for the owning user", async () => {
      const result = await getResumeByIdForUser(createdResumeId, testUserA);

      expect(result).not.toBeNull();
      expect(result?.id).toBe(createdResumeId);
      expect(result?.userId).toBe(testUserA);
      expect(result?.name).toBe("Resume A1");
    });

    it("returns null when searching for a non-existent resume ID", async () => {
      const result = await getResumeByIdForUser(nonExistentId, testUserA);
      expect(result).toBeNull();
    });

    it("lists all resumes belonging to User A", async () => {
      // Create a second resume for User A
      await createResume(testUserA, "Resume A2", createTestResumeData("Second"));

      const list = await getUserResumes(testUserA);
      expect(Array.isArray(list)).toBe(true);
      expect(list.length).toBe(2);

      const names = list.map((r) => r.name);
      expect(names).toContain("Resume A1");
      expect(names).toContain("Resume A2");
    });

    it("returns an empty array for a user with no resumes", async () => {
      const list = await getUserResumes(testUserB);
      expect(Array.isArray(list)).toBe(true);
      expect(list.length).toBe(0);
    });

    it("enforces isolation: User B cannot read User A's resume by ID", async () => {
      const result = await getResumeByIdForUser(createdResumeId, testUserB);
      expect(result).toBeNull();
    });
  });

  describe("UPDATE (updateResumeForUser)", () => {
    it("enforces isolation: User B cannot update User A's resume", async () => {
      const maliciousUpdate = createTestResumeData("Hacked Title");
      const updateResult = await updateResumeForUser(
        createdResumeId,
        testUserB,
        maliciousUpdate
      );

      // Must return null
      expect(updateResult).toBeNull();

      // Verify User A's resume remains unchanged in DB
      const current = await getResumeByIdForUser(createdResumeId, testUserA);
      expect(current?.name).toBe("Resume A1");
      expect((current?.resumeData as any).title).toBe("Initial Resume A");
    });

    it("successfully updates resumeData and advances lastModified for owning user", async () => {
      const beforeUpdate = await getResumeByIdForUser(createdResumeId, testUserA);
      const originalTime = new Date(beforeUpdate!.lastModified!).getTime();

      const updatedPayload = createTestResumeData("Updated Senior Title");
      const updatedResult = await updateResumeForUser(
        createdResumeId,
        testUserA,
        updatedPayload
      );

      expect(updatedResult).not.toBeNull();
      expect(updatedResult?.id).toBe(createdResumeId);
      expect((updatedResult?.resumeData as any).title).toBe("Updated Senior Title");

      const newTime = new Date(updatedResult!.lastModified!).getTime();
      expect(newTime).toBeGreaterThanOrEqual(originalTime);
    });

    it("returns null when attempting to update a non-existent ID", async () => {
      const result = await updateResumeForUser(
        nonExistentId,
        testUserA,
        createTestResumeData()
      );
      expect(result).toBeNull();
    });
  });

  describe("DELETE (deleteResumeForUser)", () => {
    it("enforces isolation: User B cannot delete User A's resume", async () => {
      const deleteResult = await deleteResumeForUser(createdResumeId, testUserB);
      expect(deleteResult).toBeNull();

      // Verify resume still exists in database
      const checkStillExists = await getResumeByIdForUser(createdResumeId, testUserA);
      expect(checkStillExists).not.toBeNull();
      expect(checkStillExists?.id).toBe(createdResumeId);
    });

    it("successfully deletes the resume for the owning user", async () => {
      const deleteResult = await deleteResumeForUser(createdResumeId, testUserA);

      expect(deleteResult).not.toBeNull();
      expect(deleteResult?.id).toBe(createdResumeId);

      // Verify it is no longer retrievable
      const afterDelete = await getResumeByIdForUser(createdResumeId, testUserA);
      expect(afterDelete).toBeNull();
    });

    it("returns null when attempting to delete an already deleted resume", async () => {
      const deleteResult = await deleteResumeForUser(createdResumeId, testUserA);
      expect(deleteResult).toBeNull();
    });
  });
});
