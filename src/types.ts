import { z } from "zod";

export const ContactSchema = z.object({
  email: z.string().email(),
  phone: z.string(),
  location: z.string(),
  linkedin: z.string().url(),
  github: z.string().url(),
});

export const LanguageSchema = z.object({
  language: z.string(),
  proficiency: z.string(),
});

export const ProjectSchema = z.object({
  title: z.string(),
  start: z.string(),
  end: z.string(),
  details: z.array(z.string()),
});

export const StudyTrainingSchema = z.object({
  start: z.string(),
  end: z.string(),
  degree: z.string(),
  institution: z.string(),
  honors: z.string(),
});

export const ExperienceSchema = z.object({
  position: z.string(),
  company: z.string(),
  start: z.string(),
  end: z.string(),
  details: z.array(z.string()),
});

export const SkillSchema = z.object({
  skill: z.string(),
  category: z.string(),
});

export const UserProfileSchema = z.object({
  name: z.string(),
  title: z.string(),
  contact: ContactSchema,
  about: z.string(),
  skills: z.array(SkillSchema),
  languages: z.array(LanguageSchema),
  hobbies: z.array(z.string()),
  objectives: z.string().optional().default(""),
  projects: z.array(ProjectSchema),
  studies_training: z.array(StudyTrainingSchema),
  experiences: z.array(ExperienceSchema),
});


// 👇 Generate TypeScript types automatically
export type UserProfile = z.infer<typeof UserProfileSchema>;
export type Contact = z.infer<typeof ContactSchema>;
export type Language = z.infer<typeof LanguageSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type StudyTraining = z.infer<typeof StudyTrainingSchema>;
export type Experience = z.infer<typeof ExperienceSchema>;
export type Skill = z.infer<typeof SkillSchema>;
export type CvProps = {
  data?: UserProfile;
};