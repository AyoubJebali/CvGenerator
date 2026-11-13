import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ResumeEditor from "./ResumeEditor";
import { updateUserResume, createUserResume } from "@/app/dashboard/actions";
import { ResumeSchema } from "@/types";

const mockReplace = vi.fn();
const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
    prefetch: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/resumes/new",
}));

vi.mock("@/app/dashboard/actions", () => ({
  updateUserResume: vi.fn(),
  createUserResume: vi.fn(),
}));

// Mock printCv to avoid DOM iframe operations in test
vi.mock("./printCv", () => ({
  printComponent: vi.fn(),
}));

const mockResumeData: ResumeSchema = {
  name: "Alice Johnson",
  title: "Cloud Architect",
  contact: {
    email: "alice@example.com",
    phone: "12345678",
    location: "Berlin, Germany",
    linkedin: "https://linkedin.com/in/alice",
    github: "https://github.com/alice",
  },
  about: "Cloud infrastructure expert",
  skills: [],
  languages: [],
  hobbies: [],
  objectives: "",
  projects: [],
  studies_training: [],
  experiences: [],
};

describe("ResumeEditor Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders editor with initial data and name", () => {
    render(
      <ResumeEditor
        resumeId="11111111-1111-4111-8111-111111111111"
        initialName="Alice's CV"
        initialData={mockResumeData}
      />
    );

    expect(screen.getByText("Resume Editor")).toBeInTheDocument();
    // Verify name input in form
    const nameInput = screen.getByLabelText(/FULL NAME/i);
    expect(nameInput).toHaveValue("Alice Johnson");
  });

  it("calls updateUserResume when saving an existing resume", async () => {
    vi.mocked(updateUserResume).mockResolvedValueOnce({
      success: true,
      resume: {
        id: "11111111-1111-4111-8111-111111111111",
        name: "Alice's CV",
        userId: "user-1",
        resumeData: mockResumeData,
        lastModified: "2026-01-01",
      },
    });

    render(
      <ResumeEditor
        resumeId="11111111-1111-4111-8111-111111111111"
        initialName="Alice's CV"
        initialData={mockResumeData}
      />
    );

    const saveButton = screen.getByRole("button", { name: /save/i });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(updateUserResume).toHaveBeenCalledWith(
        "11111111-1111-4111-8111-111111111111",
        expect.objectContaining({ name: "Alice Johnson" })
      );
    });

    expect(await screen.findByText(/Resume saved/i)).toBeInTheDocument();
    expect(mockReplace).not.toHaveBeenCalled();
  });

  it("calls createUserResume and redirects when saving a new resume", async () => {
    const newResumeId = "22222222-2222-4222-8222-222222222222";
    vi.mocked(createUserResume).mockResolvedValueOnce({
      success: true,
      resume: {
        id: newResumeId,
        name: "Alice Johnson",
        userId: "user-1",
        resumeData: mockResumeData,
        lastModified: "2026-01-01",
      },
    });

    render(
      <ResumeEditor
        resumeId={null}
        initialName=""
        initialData={mockResumeData}
      />
    );

    const saveButton = screen.getByRole("button", { name: /save/i });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(createUserResume).toHaveBeenCalledWith(
        "Alice Johnson",
        expect.objectContaining({ name: "Alice Johnson" })
      );
    });

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith(`/resumes/${newResumeId}/edit`);
    });
  });
});
