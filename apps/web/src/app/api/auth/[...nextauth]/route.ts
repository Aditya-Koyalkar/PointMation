import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "../../../../../../../packages/db/client";
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      googleId?: string;
    };
  }

  interface User {
    id: string;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        // Only proceed if we have an email

        if (!user.email) {
          console.error("No email provided by authentication provider");
          return false;
        }

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
          where: {
            email: user.email,
          },
        });

        // If user doesn't exist, create a new one
        if (!existingUser) {
          const newUser = await prisma.user.create({
            data: {
              email: user.email,
              name: user.name || "",
              image: user.image || null,
              provider: account?.provider === "github" ? "github" : "google",
            },
          });
          await prisma.chat.create({
            data: {
              name: "Welcome to Pointmation",
              userId: newUser.id,
            },
          });
        }

        return true;
      } catch (error) {
        console.error("Error during sign in:", error);
        return false;
      }
    },
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      if (session.user) {
        const dbUser = await prisma.user.findUnique({
          where: {
            email: session.user.email as string,
          },
        });

        if (dbUser) {
          session.user.id = dbUser.id;
          session.user.name = dbUser.name;
          session.user.image = dbUser.image;
        }

        // Add OAuth provider IDs from the token
        if (token.googleId) {
          session.user.googleId = token.googleId as string;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin", // Custom sign-in page
    error: "/auth/error", // Custom error page
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXT_PUBLIC_JWT_SECRET || "mysupersecret",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
