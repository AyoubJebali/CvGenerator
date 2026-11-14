import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/lib/auth";
import ResumeEditor from "@/app/components/ResumeEditor";
import { emptyCvData } from "@/app/components/CvContext";

export default async function NewResumePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/signin?callbackUrl=/resumes/new");
  }

  return <ResumeEditor resumeId={null} initialData={emptyCvData} />;
}
