"use server";

import { z } from 'zod';
import { promises as fs } from 'fs';
import path from 'path';

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
    languages: z.array(LanguageSchema),
    hobbies: z.array(z.string()),
    objectives: z.string(),
    projects_experiences: z.array(ProjectExperienceSchema),
    studies_training: z.array(StudyTrainingSchema),
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
    const languages = formData.getAll('language').map((lang, index) => ({
        language: lang.toString(),
        proficiency: formData.getAll('proficiency')[index].toString(),
    }));

    const projects_experiences = formData.getAll('project_period').map((period, index) => ({
        period: period.toString(),
        details: formData.getAll('project_details')[index].toString().split('\n').filter(line => line.trim() !== ''),
    }));

    const studies_training = formData.getAll('study_period').map((period, index) => ({
        period: period.toString(),
        degree: formData.getAll('study_degree')[index].toString(),
        institution: formData.getAll('study_institution')[index].toString(),
        honors: formData.getAll('study_honors')[index].toString(),
    }));

    const cvData = {
        name: formData.get("name"),
        title: formData.get("title"),
        contact: {
            email: formData.get("email"),
            phone: formData.get("number"),
            location: formData.get("address"),
            linkedin: formData.get("linkedin"),
        },
        about: formData.get("profile"),
        skills: formData.getAll("skill"),
        languages: languages,
        hobbies: formData.getAll("hobby"),
        objectives: formData.get("objectives"),
        projects_experiences: projects_experiences,
        studies_training: studies_training,
    };

    const validatedFields = validateCvData(cvData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create CV.',
        };
    }

    const data = validatedFields.data;

    try {
        const filePath = path.join(process.cwd(), 'public', 'generated-cv.json');
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
        return { message: 'CV generated successfully!', errors: {} };
    } catch (error) {
        return { message: 'Failed to write CV to file.', errors: {} };
    }
}