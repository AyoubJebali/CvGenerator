import { NextResponse } from "next/server";
import {
  createUserResume,
  fetchUserResumes,
  updateUserResume,
} from "@/app/dashboard/actions";

const statusFromError = (error: string, fallback = 400) => {
  if (error === "Unauthorized") return 401;
  if (error === "Resume not found") return 404;
  if (
    error === "Invalid resume data" ||
    error === "Resume name is required" ||
    error === "Invalid resume ID"
  ) {
    return 400;
  }
  return fallback;
};

export async function POST(req: Request) {
  try {
    const body = await req.json(); // Parse the request body
    const { name, resumeData } = body;

    // Validate input
    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing name. Must be a string." },
        { status: 400 },
      );
    }

    if (!resumeData || typeof resumeData !== "object") {
      return NextResponse.json(
        { error: "Invalid or missing resumeData. Must be a JSON object." },
        { status: 400 },
      );
    }

    const result = await createUserResume(name, resumeData);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: statusFromError(result.error ?? "Failed to create resume", 500) },
      );
    }

    // Return the created resume
    return NextResponse.json(
      { message: "Resume created successfully", resume: result.resume },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating resume:", error);
    return NextResponse.json(
      { error: "Failed to create resume. Please try again later." },
      { status: 500 },
    );
  }
}
// GET: Retrieve all resumes for a specific user
export async function GET(req: Request) {
  try {
    void req;
    const result = await fetchUserResumes();
    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: statusFromError(result.error ?? "Failed to fetch resumes", 500) },
      );
    }

    // Return the resumes
    return NextResponse.json({ resumes: result.resumes }, { status: 200 });
  } catch (error) {
    console.error("Error retrieving user resumes:", error);
    return NextResponse.json(
      { error: "Failed to retrieve resumes. Please try again later." },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { resumeId, resumeData } = body ?? {};
    const result = await updateUserResume(resumeId, resumeData);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: statusFromError(result.error, 500) },
      );
    }

    return NextResponse.json(
      { message: "Resume updated successfully", resume: result.resume },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating resume:", error);
    return NextResponse.json(
      { error: "Failed to update resume. Please try again later." },
      { status: 500 },
    );
  }
}
