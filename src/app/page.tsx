import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/lib/auth";

interface HomePageProps {
  searchParams?: Promise<{ resumeId?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = searchParams ? await searchParams : undefined;

  // Handle backwards-compatible legacy ?resumeId= query parameter
  if (params?.resumeId) {
    redirect(`/resumes/${params.resumeId}/edit`);
  }

  const session = await getServerSession(authOptions);

  if (session?.user?.id) {
    redirect("/dashboard");
  } else {
    redirect("/SignIn");
  }
}
