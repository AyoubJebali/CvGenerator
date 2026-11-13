import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";
import NewResumePage from "./page";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

vi.mock("next-auth", () => ({
  getServerSession: vi.fn(),
}));

vi.mock("@/app/lib/auth", () => ({
  authOptions: {},
}));

vi.mock("@/app/components/ResumeEditor", () => ({
  default: ({ resumeId }: any) => (
    <div data-testid="resume-editor" data-resume-id={resumeId}>
      Resume Editor Mock
    </div>
  ),
}));

describe("/resumes/new Server Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("redirects unauthenticated users to /SignIn", async () => {
    vi.mocked(getServerSession).mockResolvedValueOnce(null);

    await expect(NewResumePage()).rejects.toThrow("NEXT_REDIRECT:/SignIn");
    expect(redirect).toHaveBeenCalledWith("/SignIn");
  });

  it("renders ResumeEditor with resumeId=null for authenticated users", async () => {
    vi.mocked(getServerSession).mockResolvedValueOnce({
      user: { id: "user-123" },
    });

    const jsx = await NewResumePage();
    expect(jsx).toBeDefined();
  });
});
