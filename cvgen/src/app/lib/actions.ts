"use server";

import { z } from 'zod';

const ContactSchema = z.object({
    email: z.string(),
    phone: z.string(),
    location: z.string(),
    linkedin: z.string(),
});

const LanguagesSchema = z.object({
    English: z.string(),
    Spanish: z.string(),
});

const ProjectExperienceSchema = z.object({
    period: z.string(),
    details: z.array(z.string()),
});

const StudyTrainingSchema = z.object({
    period: z.string(),
    degree: z.string(),
    institution: z.string(),
    honors: z.string(),
});

const UserProfileSchema = z.object({
    name: z.string(),
    title: z.string(),
    contact: ContactSchema,
    about: z.string(),
    skills: z.array(z.string()),
    languages: LanguagesSchema,
    hobbies: z.array(z.string()),
    objectives: z.string(),
    projects_experiences: z.array(ProjectExperienceSchema),
    studies_training: z.array(StudyTrainingSchema),
});
export type State = {
    errors?: {
      name?: string[];
      title?: string[];
      status?: string[];
    };
    message?: string | null;
  };

// To use the schema for validation or type inference
type UserProfile = z.infer<typeof UserProfileSchema>;


export async function validateForm(prevState:any, formData: FormData) {
//const validatedFileds = UserProfileSchema.safeParse(formData);
    console.log(formData);
    return prevState+1;
}