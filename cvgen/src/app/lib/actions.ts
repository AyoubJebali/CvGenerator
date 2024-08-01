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
    name: z.string().optional(),
    title: z.string().optional(),
    contact: ContactSchema.optional(),
    about: z.string().optional(),
    skills: z.array(z.string()).optional(),
    languages: LanguagesSchema.optional(),
    hobbies: z.array(z.string()).optional(),
    objectives: z.string().optional(),
    projects_experiences: z.array(ProjectExperienceSchema).optional(),
    studies_training: z.array(StudyTrainingSchema).optional(),
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
    const validatedFileds = UserProfileSchema.safeParse({
        name:formData.get("name"),
        title:formData.get("title"),
        contact:{
            email: formData.get("email"),
            phone: formData.get("number"),
            location: formData.get("adress"),
            linkedin: formData.get("linkedin"),
        },
        //about:formData.get("about"),
        skills:formData.get("skill")
    });
    console.log(validatedFileds);
    //return prevState+1;
}