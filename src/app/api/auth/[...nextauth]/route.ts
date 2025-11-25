import NextAuth , { DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { supabaseAdmin } from "@/app/lib/supabaseServer";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id?: string | undefined;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    sub?: string;
  }
}
/**
 * Minimal NextAuth config that upserts Google users to Supabase 'users' table
 */
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // attach id to session.user
    async session({ session, token }) {
      if (session.user) session.user.id = token.sub ?? undefined;
      return session;
    },
    async jwt({ token, user, account }) {
      // on first sign in, take providerAccountId if available
      if (user) token.sub = account?.providerAccountId ?? user.id;
      return token;
    },
    // ADD THIS redirect callback
    async redirect({ url, baseUrl }) {
      // If a specific callbackUrl was provided (url), keep it
      if (url && url !== baseUrl) {
        // allow same-origin or relative urls
        if (url.startsWith(baseUrl) || url.startsWith("/")) return url.startsWith("/") ? `${baseUrl}${url}` : url;
      }
      // default after sign in
      return `${baseUrl}/`;
    },
  },
  events: {
    // called after successful sign in - upsert user into Supabase
    async signIn({ user, account }) {
      try {
        const id = account?.providerAccountId ?? user.id ?? null;
        await supabaseAdmin.from("users").upsert(
          {
            id,
            email: user.email,
            name: user.name,
            image: user.image,
            provider: account?.provider ?? null,
            provider_account_id: account?.providerAccountId ?? null,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "id" }
        );
      } catch (err) {
        console.error("supabase upsert error:", err);
      }
    },
  },
});

export { handler as GET, handler as POST };