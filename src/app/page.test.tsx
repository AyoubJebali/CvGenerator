import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";
import HomePage from "./page";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

vi.mock("next-auth", () => ({
  getServerSession: vi.fn(),
}));

vi.mock("@/app/lib/auth", () => ({
  authOptions: {},
}));

describe("Root / Route Redirects", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("redirects ?resumeId=XYZ legacy query param to /resumes/XYZ/edit", async () => {
    await expect(
      HomePage({ searchParams: Promise.resolve({ resumeId: "resume-123" }) })
    ).rejects.toThrow("NEXT_REDIRECT:/resumes/resume-123/edit");
    expect(redirect).toHaveBeenCalledWith("/resumes/resume-123/edit");
  });

  it("redirects authenticated users without resumeId to /dashboard", async () => {
    vi.mocked(getServerSession).mockResolvedValueOnce({
      user: { id: "user-123" },
    });

    await expect(
      HomePage({ searchParams: Promise.resolve({}) })
    ).rejects.toThrow("NEXT_REDIRECT:/dashboard");
    expect(redirect).toHaveBeenCalledWith("/dashboard");
  });

  it("redirects unauthenticated users to /SignIn", async () => {
    vi.mocked(getServerSession).mockResolvedValueOnce(null);

    await expect(
      HomePage({ searchParams: Promise.resolve({}) })
    ).rejects.toThrow("NEXT_REDIRECT:/SignIn");
    expect(redirect).toHaveBeenCalledWith("/SignIn");
  });
});
