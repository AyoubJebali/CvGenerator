import NextAuth, { DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { supabaseAdmin } from "@/app/lib/supabaseServer";

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


const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // Attach the actual database ID to the session.user
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id ?? undefined;
        session.user.email = token.email ?? undefined;
        session.user.name = token.name ?? undefined;
        session.user.image = token.image ?? undefined;
      }
      return session;
    },

    // Attach the actual database ID to the JWT
    async jwt({ token, user, account }) {
      if (user) {
        // Fetch the user's actual database ID from Supabase
        const { data: dbUser, error } = await supabaseAdmin
          .from("users")
          .select("id, email, name, image, provider, provider_account_id")
          .eq("email", user.email)
          .single();

        if (error) {
          console.error("Error fetching user ID from Supabase:", error);
        } else {
          token.id = dbUser?.id;
          token.email = dbUser?.email;
          token.name = dbUser?.name;
          token.image = dbUser?.image;
          token.provider = dbUser?.provider;
          token.providerAccountId = dbUser?.provider_account_id;
        }
      }
      return token;
    },

    // Redirect callback
    async redirect({ url, baseUrl }) {
      // If a specific callbackUrl was provided (url), keep it
      if (url && url !== baseUrl) {
        // Allow same-origin or relative URLs
        if (url.startsWith(baseUrl) || url.startsWith("/")) {
          return url.startsWith("/") ? `${baseUrl}${url}` : url;
        }
      }
      // Default after sign-in
      return `${baseUrl}/`;
    },
  },
  events: {
    // Called after successful sign-in - upsert user into Supabase
    async signIn({ user, account }) {
      try {
        await supabaseAdmin.from("users").upsert(
          {
            email: user.email,
            name: user.name,
            image: user.image,
            provider: account?.provider ?? null,
            providerAccountId: account?.providerAccountId ?? null,
            updatedAt: new Date().toISOString(),
            lastSignInAt: new Date().toISOString(),
            rawUser: user as object,
          },
          { onConflict: "email" } // Use email as the unique identifier for upserts
        );
      } catch (err) {
        console.error("Supabase upsert error:", err);
      }
    },
  },
});

export { handler as GET, handler as POST };