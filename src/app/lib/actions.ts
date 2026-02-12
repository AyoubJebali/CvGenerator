"use server";

import { z } from "zod";
import { promises as fs } from "fs";
import path from "path"; 
import { db } from "@/app/lib/db/drizzle";
import { resumes } from "@/app/lib/db/schema";
import { eq } from "drizzle-orm";
import { ResumeSchema } from "@/types";
import { redirect } from "next/navigation";

const ContactSchema = z.object({
  email: z.string().email(),
  phone: z.string(),
  location: z.string(),
  linkedin: z.string().url(),
});

const LanguageSchema = z.object({
  language: z.string(),
  proficiency: z.string(),
});

const ProjectSchema = z.object({
  title: z.string(),
  start: z.string(),
  end: z.string(),
  details: z.array(z.string()),
});

const StudyTrainingSchema = z.object({
  start: z.string(),
  end: z.string(),
  degree: z.string(),
  institution: z.string(),
  honors: z.string(),
});

const ExperienceSchema = z.object({
  position: z.string(),
  company: z.string(),
  start: z.string(),
  end: z.string(),
  details: z.array(z.string()),
});

const SkillSchema = z.object({
  skill: z.string(),
  category: z.string(),
});

const UserProfileSchema = z.object({
  name: z.string(),
  title: z.string(),
  contact: ContactSchema,
  about: z.string(),
  skills: z.array(SkillSchema), // <-- update to array of SkillSchema
  languages: z.array(LanguageSchema),
  hobbies: z.array(z.string()),
  objectives: z.string().optional().default(""),
  projects: z.array(ProjectSchema),
  studies_training: z.array(StudyTrainingSchema),
  experiences: z.array(ExperienceSchema),
});

export type State = {
  errors?: {
    [key: string]: string[] | undefined;
  };
  message?: string | null;
};

function validateCvData(data: unknown) {
  return UserProfileSchema.safeParse(data);
}

export async function validateForm(prevState: any, formData: FormData) {
  console.log("Form data received:", Object.fromEntries(formData.entries()));
  const languages = formData.getAll("language").map((lang, index) => ({
    language: lang.toString(),
    proficiency: formData.getAll("proficiency")[index].toString(),
  }));

  const projects = formData
    .getAll("project_title")
    .map((title, index) => ({
      title: title.toString(),
      start: formData.getAll("project_start")[index].toString(),
      end: formData.getAll("project_end")[index].toString(),
      details: formData
        .getAll("project_details")
        [index].toString()
        .split("\n")
        .filter((line) => line.trim() !== ""),
    }));

  const studies_training = formData
    .getAll("study_start")
    .map((start, index) => ({
      start: start.toString(),
      end: formData.getAll("study_end")[index].toString(),
      degree: formData.getAll("study_degree")[index].toString(),
      institution: formData.getAll("study_institution")[index].toString(),
      honors: formData.getAll("study_honors")[index].toString(),
    }));

  const experiences = formData
    .getAll("experience_position")
    .map((position, index) => ({
      position: position.toString(),
      company: formData.getAll("experience_company")[index].toString(),
      start: formData.getAll("experience_start")[index].toString(),
      end: formData.getAll("experience_end")[index].toString(),
      details: formData
        .getAll("experience_details")
        [index].toString()
        .split("\n")
        .filter((line) => line.trim() !== ""),
    }));

  const skills = formData.getAll("skill").map((skill, index) => ({
    skill: skill.toString(),
    category: formData.getAll("skill_category")[index]?.toString() || "",
  }));

  const cvData = {
    name: formData.get("name"),
    title: formData.get("title"),
    contact: {
      email: formData.get("email"),
      phone: formData.get("number"),
      location: formData.get("address"),
      linkedin: formData.get("linkedin"),
      github: formData.get("github"),
    },
    about: formData.get("profile"),
    skills: skills,
    languages: languages,
    hobbies: formData.getAll("hobby"),
    objectives: formData.get("objectives")?.toString() || "",
    projects: projects,
    studies_training: studies_training,
    experiences: experiences,
  };

  const validatedFields = validateCvData(cvData);

  if (!validatedFields.success) {
    console.error("Validation errors:", validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create CV.",
    };
  }

  const data = validatedFields.data;

  try {
    const filePath = path.join(process.cwd(), "public", "generated-cv.json");
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("File write error:", error);
    return { 
      message: "Failed to write CV to file.", 
      errors: { error: [error instanceof Error ? error.message : String(error)] } 
    };
  }
  // redirect("/Cvtemp");

  
}
