import { NextResponse } from 'next/server';
import { createResume, getUserResumes } from '@/app/lib/db/queries'; // Import the createResume function
import { isUUID } from 'validator'; // For validating UUIDs

export async function POST(req: Request) {
  try {
    const body = await req.json(); // Parse the request body
    const { userId, name, resumeData } = body;

    // Validate input
    if (!userId || !isUUID(userId)) {
      return NextResponse.json({ error: 'Invalid or missing userId. Must be a valid UUID.' }, { status: 400 });
    }

    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: 'Invalid or missing name. Must be a string.' }, { status: 400 });
    }

    if (!resumeData || typeof resumeData !== 'object') {
      return NextResponse.json({ error: 'Invalid or missing resumeData. Must be a JSON object.' }, { status: 400 });
    }

    // Call the createResume function to insert the resume into the database
    const newResume = await createResume(userId, name, resumeData);

    // Return the created resume
    return NextResponse.json({ message: 'Resume created successfully', resume: newResume }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating resume:', error);
    return NextResponse.json({ error: 'Failed to create resume. Please try again later.' }, { status: 500 });
  }
}
// GET: Retrieve all resumes for a specific user
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId'); // Get userId from query parameters

    // Validate userId
    if (!userId || !isUUID(userId)) {
      return NextResponse.json({ error: 'Invalid or missing userId. Must be a valid UUID.' }, { status: 400 });
    }

    // Fetch all resumes for the user
    const userResumes = await getUserResumes(userId);

    // Return the resumes
    return NextResponse.json({ resumes: userResumes }, { status: 200 });
  } catch (error: any) {
    console.error('Error retrieving user resumes:', error);
    return NextResponse.json({ error: 'Failed to retrieve resumes. Please try again later.' }, { status: 500 });
  }
}