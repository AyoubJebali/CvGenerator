"use server";

import { db } from "@/app/lib/db/drizzle";
import { resumes } from "@/app/lib/db/schema";
import { eq } from "drizzle-orm";
import { ResumeSchema } from "@/types";
import { Resume } from "@/types";
import {createResume, getUserResumes} from '@/app/lib/db/queries';
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
type FetchSingleResult =
  | { success: true; resume: Resume }
  | { success: false; error: string };

  type CreateResult =
  | { success: true; resume: Resume }
  | { success: false; error: string };
  
// Fetch all resumes for a specific user
export const fetchUserResumes = async (userId: string) => {
  try {
    const userResumes = await getUserResumes(userId);
    //   // Map database results to Resume type
    const mappedResumes: Resume[] = userResumes.map((r) => ({
      id: r.id,
      name: r.name ?? "",
      userId: r.userId,
      resumeData: r.resumeData as object,
      lastModified: r.lastModified?.toISOString() ?? new Date().toISOString(),
    }));
    return { success: true, resumes: mappedResumes };
  } catch (error) {
    console.error("Error fetching user resumes:", error);
    return { success: false, error: "Failed to fetch resumes" };
  }
};

// Create a new resume for a specific user
export const createUserResume = async (userId: string, name: string) => {
  try {
    const newResume = await db
      .insert(resumes)
      .values({
        userId,
        name,
        resumeData: emptyCvData,
        lastModified: new Date(),
      })
      .returning();
    return { success: true, resume: newResume[0] };
  } catch (error) {
    console.error("Error creating resume:", error);
    return { success: false, error: "Failed to create resume" };
  }
};

// Delete a resume by its ID
export const deleteUserResume = async (resumeId: string) => {
  try {
    const deletedResume = await db
      .delete(resumes)
      .where(eq(resumes.id, resumeId))
      .returning();
    return { success: true, resume: deletedResume[0] };
  } catch (error) {
    console.error("Error deleting resume:", error);
    return { success: false, error: "Failed to delete resume" };
  }
};
// Fetch a single resume by ID
export const fetchResumeById = async (resumeId: string): Promise<FetchSingleResult> => {
  try {
    const result = await db
      .select()
      .from(resumes)
      .where(eq(resumes.id, resumeId))
      .limit(1);

    if (!result[0]) {
      return { success: false, error: "Resume not found" };
    }

    const mapped: Resume = {
      id: result[0].id,
      name: result[0].name ?? "",
      userId: result[0].userId,
      resumeData: result[0].resumeData as object,
      lastModified: result[0].lastModified?.toISOString() ?? new Date().toISOString(),
    };

    return { success: true, resume: mapped };
  } catch (error) {
    console.error("Error fetching resume:", error);
    return { success: false, error: "Failed to fetch resume" };
  }
};

// Update a resume
export const updateUserResume = async (resumeId: string, resumeData: ResumeSchema): Promise<CreateResult> => {
  try {
    const updatedResume = await db
      .update(resumes)
      .set({
        resumeData,
        lastModified: new Date(),
      })
      .where(eq(resumes.id, resumeId))
      .returning();

    if (!updatedResume[0]) {
      return { success: false, error: "Resume not found" };
    }

    const mapped: Resume = {
      id: updatedResume[0].id,
      name: updatedResume[0].name ?? "",
      userId: updatedResume[0].userId,
      resumeData: updatedResume[0].resumeData as object,
      lastModified: updatedResume[0].lastModified?.toISOString() ?? new Date().toISOString(),
    };

    return { success: true, resume: mapped };
  } catch (error) {
    console.error("Error updating resume:", error);
    return { success: false, error: "Failed to update resume" };
  }
};