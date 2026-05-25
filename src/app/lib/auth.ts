import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { supabaseAdmin } from "@/app/lib/supabaseServer";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id ?? "";
        session.user.email = token.email ?? "";
        session.user.name = token.name ?? undefined;
        session.user.image = token.image ?? undefined;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
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
    async redirect({ url, baseUrl }) {
      if (url && url !== baseUrl) {
        if (url.startsWith(baseUrl) || url.startsWith("/")) {
          return url.startsWith("/") ? `${baseUrl}${url}` : url;
        }
      }
      return `${baseUrl}/`;
    },
  },
  events: {
    async signIn({ user, account }) {
      try {
        await supabaseAdmin.from("users").upsert(
          {
            email: user.email,
            name: user.name,
            image: user.image,
            provider: account?.provider ?? null,
            provider_account_id: account?.providerAccountId ?? null,
            updated_at: new Date().toISOString(),
            last_sign_in_at: new Date().toISOString(),
            raw_user: user as object,
          },
          { onConflict: "email" }
        );
      } catch (err) {
        console.error("Supabase upsert error:", err);
      }
    },
  },
};
