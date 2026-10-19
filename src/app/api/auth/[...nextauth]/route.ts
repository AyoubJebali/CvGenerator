import NextAuth, { DefaultSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string; // UUID from the database
      email: string;
      name?: string;
      image?: string;
      provider?: string;
      providerAccountId?: string;
      lastSignInAt?: string; // ISO timestamp
      createdAt?: string; // ISO timestamp
      updatedAt?: string; // ISO timestamp
    } & DefaultSession["user"];
  }

  interface User {
    id: string; // UUID from the database
    email: string;
    name?: string;
    image?: string;
    provider?: string;
    providerAccountId?: string;
    lastSignInAt?: string; // ISO timestamp
    createdAt?: string; // ISO timestamp
    updatedAt?: string; // ISO timestamp
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string; // UUID from the database
    email: string;
    name?: string;
    image?: string;
    provider?: string;
    providerAccountId?: string;
  }
}


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
