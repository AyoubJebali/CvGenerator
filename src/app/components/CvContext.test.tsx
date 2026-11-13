import { describe, it, expect, vi } from "vitest";
import React from "react";
import { render, screen, act } from "@testing-library/react";
import { CvProvider, useCv } from "./CvContext";
import { ResumeSchema } from "@/types";

vi.mock("next-auth/react", () => ({
  useSession: () => ({ data: null, status: "unauthenticated" }),
}));

const sampleResumeData: ResumeSchema = {
  name: "Jane Smith",
  title: "Frontend Architect",
  contact: {
    email: "jane@example.com",
    phone: "987654321",
    location: "Paris, France",
    linkedin: "https://linkedin.com/in/janesmith",
    github: "https://github.com/janesmith",
  },
  about: "UI/UX enthusiast",
  skills: [{ skill: "React", category: "Frontend" }],
  languages: [{ language: "French", proficiency: "Native" }],
  hobbies: ["Photography"],
  objectives: "Build great UI",
  projects: [],
  studies_training: [],
  experiences: [],
};

function TestConsumer() {
  const { data, setData, reset } = useCv();
  return (
    <div>
      <span data-testid="resume-name">{data.name}</span>
      <span data-testid="resume-title">{data.title}</span>
      <button
        onClick={() =>
          setData((prev) => ({ ...prev, name: "Updated Jane" }))
        }
      >
        Update Name
      </button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

describe("CvContext and CvProvider", () => {
  it("initializes with initialData when provided", () => {
    render(
      <CvProvider initialData={sampleResumeData}>
        <TestConsumer />
      </CvProvider>
    );

    expect(screen.getByTestId("resume-name").textContent).toBe("Jane Smith");
    expect(screen.getByTestId("resume-title").textContent).toBe("Frontend Architect");
  });

  it("updates data through setData", () => {
    render(
      <CvProvider initialData={sampleResumeData}>
        <TestConsumer />
      </CvProvider>
    );

    expect(screen.getByTestId("resume-name").textContent).toBe("Jane Smith");

    act(() => {
      screen.getByText("Update Name").click();
    });

    expect(screen.getByTestId("resume-name").textContent).toBe("Updated Jane");
  });

  it("resets to emptyCvData when reset is called", () => {
    render(
      <CvProvider initialData={sampleResumeData}>
        <TestConsumer />
      </CvProvider>
    );

    expect(screen.getByTestId("resume-name").textContent).toBe("Jane Smith");

    act(() => {
      screen.getByText("Reset").click();
    });

    expect(screen.getByTestId("resume-name").textContent).toBe("");
  });
});
