import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";
import EditResumePage from "./page";
import { getServerSession } from "next-auth";
import { getResumeByIdForUser } from "@/app/lib/db/queries";
import { redirect, notFound } from "next/navigation";

vi.mock("next-auth", () => ({
  getServerSession: vi.fn(),
}));

vi.mock("@/app/lib/auth", () => ({
  authOptions: {},
}));

vi.mock("@/app/lib/db/queries", () => ({
  getResumeByIdForUser: vi.fn(),
}));

// Mock ResumeEditor component
vi.mock("@/app/components/ResumeEditor", () => ({
  default: ({ resumeId, initialName }: any) => (
    <div data-testid="resume-editor" data-resume-id={resumeId} data-name={initialName}>
      Resume Editor Mock
    </div>
  ),
}));

const validUuid = "11111111-1111-4111-8111-111111111111";

describe("/resumes/[id]/edit Server Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("redirects unauthenticated users to /signin with callbackUrl", async () => {
    vi.mocked(getServerSession).mockResolvedValueOnce(null);

    await expect(EditResumePage({ params: Promise.resolve({ id: validUuid }) })).rejects.toThrow(
      `NEXT_REDIRECT:/signin?callbackUrl=/resumes/${validUuid}/edit`
    );
    expect(redirect).toHaveBeenCalledWith(`/signin?callbackUrl=/resumes/${validUuid}/edit`);
  });

  it("calls notFound when resume is not found or not owned by user", async () => {
    vi.mocked(getServerSession).mockResolvedValueOnce({
      user: { id: "user-123" },
    });
    vi.mocked(getResumeByIdForUser).mockResolvedValueOnce(null as any);

    await expect(EditResumePage({ params: Promise.resolve({ id: validUuid }) })).rejects.toThrow(
      "NEXT_NOT_FOUND"
    );
    expect(notFound).toHaveBeenCalled();
  });

  it("renders ResumeEditor when resume exists and user is owner", async () => {
    vi.mocked(getServerSession).mockResolvedValueOnce({
      user: { id: "user-123" },
    });
    const mockDbResume = {
      id: validUuid,
      name: "Software Engineer CV",
      userId: "user-123",
      resumeData: { name: "Alice", title: "Dev" },
      lastModified: new Date("2026-01-01"),
    };
    vi.mocked(getResumeByIdForUser).mockResolvedValueOnce(mockDbResume);

    const jsx = await EditResumePage({ params: Promise.resolve({ id: validUuid }) });
    expect(jsx).toBeDefined();
    expect(getResumeByIdForUser).toHaveBeenCalledWith(validUuid, "user-123");
  });
});
