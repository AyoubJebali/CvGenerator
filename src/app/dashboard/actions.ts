"use server";

import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/app/lib/auth";
import {
  createResume,
  deleteResumeForUser,
  getResumeByIdForUser,
  getUserResumes,
  updateResumeForUser,
} from "@/app/lib/db/queries";
import { ResumeSchema, Resume, UserProfileSchema } from "@/types";

// Empty initial data
const emptyCvData: ResumeSchema = {
  name: "",
  title: "",
  contact: {
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
  },
  about: "",
  skills: [],
  languages: [],
  hobbies: [],
  objectives: "",
  projects: [],
  studies_training: [],
  experiences: [],
};

const ResumeIdSchema = z.string().uuid();

type FetchSingleResult =
  | { success: true; resume: Resume }
  | { success: false; error: string };

type CreateResult =
  | { success: true; resume: Resume }
  | { success: false; error: string };

const getAuthenticatedUserId = async () => {
  const session = await getServerSession(authOptions);
  return session?.user?.id ?? null;
};

const mapResume = (resume: {
  id: string;
  name: string | null;
  userId: string;
  resumeData: unknown;
  lastModified: Date | null;
}): Resume => ({
  id: resume.id,
  name: resume.name ?? "",
  userId: resume.userId,
  resumeData: resume.resumeData as object,
  lastModified: resume.lastModified?.toISOString() ?? new Date().toISOString(),
});

// Fetch all resumes for a specific user
export const fetchUserResumes = async () => {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    const userResumes = await getUserResumes(userId);
    const mappedResumes: Resume[] = userResumes.map(mapResume);
    return { success: true, resumes: mappedResumes };
  } catch (error) {
    console.error("Error fetching user resumes:", error);
    return { success: false, error: "Failed to fetch resumes" };
  }
};

// Create a new resume for a specific user
export const createUserResume = async (name: string, resumeData?: ResumeSchema) => {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    const trimmedName = name.trim();
    if (!trimmedName) {
      return { success: false, error: "Resume name is required" };
    }

    const parsedResumeData = resumeData ? UserProfileSchema.safeParse(resumeData) : null;
    if (parsedResumeData && !parsedResumeData.success) {
      return { success: false, error: "Invalid resume data" };
    }

    const newResume = await createResume(
      userId,
      trimmedName,
      parsedResumeData?.data ?? emptyCvData,
    );
    return { success: true, resume: mapResume(newResume) };
  } catch (error) {
    console.error("Error creating resume:", error);
    return { success: false, error: "Failed to create resume" };
  }
};

// Delete a resume by its ID
export const deleteUserResume = async (resumeId: string) => {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    const deletedResume = await deleteResumeForUser(resumeId, userId);
    if (!deletedResume) {
      return { success: false, error: "Resume not found" };
    }
    return { success: true, resume: mapResume(deletedResume) };
  } catch (error) {
    console.error("Error deleting resume:", error);
    return { success: false, error: "Failed to delete resume" };
  }
};

// Fetch a single resume by ID
export const fetchResumeById = async (resumeId: string): Promise<FetchSingleResult> => {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    const resume = await getResumeByIdForUser(resumeId, userId);
    if (!resume) {
      return { success: false, error: "Resume not found" };
    }

    return { success: true, resume: mapResume(resume) };
  } catch (error) {
    console.error("Error fetching resume:", error);
    return { success: false, error: "Failed to fetch resume" };
  }
};

// Update a resume
export const updateUserResume = async (resumeId: string, resumeData: ResumeSchema): Promise<CreateResult> => {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    const parsedResumeId = ResumeIdSchema.safeParse(resumeId);
    if (!parsedResumeId.success) {
      return { success: false, error: "Invalid resume ID" };
    }

    const parsed = UserProfileSchema.safeParse(resumeData);
    if (!parsed.success) {
      return { success: false, error: "Invalid resume data" };
    }

    const updatedResume = await updateResumeForUser(parsedResumeId.data, userId, parsed.data);
    if (!updatedResume) {
      return { success: false, error: "Resume not found" };
    }

    return { success: true, resume: mapResume(updatedResume) };
  } catch (error) {
    console.error("Error updating resume:", error);
    return { success: false, error: "Failed to update resume" };
  }
};
