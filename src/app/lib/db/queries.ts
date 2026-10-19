import { db } from './drizzle'; 
import { resumes } from './schema'; 
import { and, eq } from 'drizzle-orm';

// Function to create a new resume
export const createResume = async (userId: string, name: string, resumeData: object) => {
  try {
    const newResume = await db
      .insert(resumes)
      .values({
        name,
        userId,
        resumeData, // Ensure this is a valid JSON object
        lastModified: new Date(), // Automatically set the last modified date
      })
      .returning(); // Return the inserted resume

    return newResume[0]; // Return the first (and only) inserted resume
  } catch (error) {
    console.error('Error creating resume:', error);
    throw error; // Rethrow the error for the caller to handle
  }
};

// Function to retrieve all resumes for a specific user
export const getUserResumes = async (userId: string) => {
  try {
    const userResumes = await db
      .select()
      .from(resumes)
      .where(eq(resumes.userId, userId)); // Filter by userId
      
    return userResumes; // Return all resumes for the user
  } catch (error) {
    console.error('Error retrieving user resumes:', error);
    throw error; // Rethrow the error for the caller to handle
  }
};
// Function to delete a resume by its ID
export const deleteResume = async (resumeId: string) => {
  try {
    const deletedResume = await db
      .delete(resumes)
      .where(eq(resumes.id, resumeId)) // Filter by resume ID
      .returning(); // Return the deleted resume

    return deletedResume[0]; // Return the first (and only) deleted resume
  } catch (error) {
    console.error('Error deleting resume:', error);
    throw error; // Rethrow the error for the caller to handle
  }
};

export const deleteResumeForUser = async (resumeId: string, userId: string) => {
  try {
    const deletedResume = await db
      .delete(resumes)
      .where(and(eq(resumes.id, resumeId), eq(resumes.userId, userId)))
      .returning();

    return deletedResume[0] ?? null;
  } catch (error) {
    console.error('Error deleting resume for user:', error);
    throw error;
  }
};

export const getResumeByIdForUser = async (resumeId: string, userId: string) => {
  try {
    const result = await db
      .select()
      .from(resumes)
      .where(and(eq(resumes.id, resumeId), eq(resumes.userId, userId)))
      .limit(1);

    return result[0] ?? null;
  } catch (error) {
    console.error('Error retrieving resume by id for user:', error);
    throw error;
  }
};

export const updateResumeForUser = async (
  resumeId: string,
  userId: string,
  resumeData: object
) => {
  try {
    const updatedResume = await db
      .update(resumes)
      .set({
        resumeData,
        lastModified: new Date(),
      })
      .where(and(eq(resumes.id, resumeId), eq(resumes.userId, userId)))
      .returning();

    return updatedResume[0] ?? null;
  } catch (error) {
    console.error('Error updating resume for user:', error);
    throw error;
  }
};
