import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { authOptions } from "@/app/lib/auth";
import { getResumeByIdForUser } from "@/app/lib/db/queries";
import ResumeEditor from "@/app/components/ResumeEditor";
import { ResumeSchema } from "@/types";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditResumePage({ params }: PageProps) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/SignIn");
  }

  const { id } = await params;
  const resume = await getResumeByIdForUser(id, session.user.id);

  if (!resume) {
    notFound();
  }

  return (
    <ResumeEditor
      resumeId={resume.id}
      initialName={resume.name}
      initialData={resume.resumeData as ResumeSchema}
    />
  );
}
