/**
 * This file holds the auth options for NextAuth.js.
 */

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions, User } from "next-auth";
import { emailOnLogin } from "./mailer";
import { db } from "@/db";
import { userTable } from "@/db/schema/schema";
import bcrypt from "bcryptjs";

const { NEXTAUTH_SECRET, NEXTAUTH_GOOGLE_ID, NEXTAUTH_GOOGLE_SECRET } =
  process.env;

if (!NEXTAUTH_SECRET || !NEXTAUTH_GOOGLE_ID || !NEXTAUTH_GOOGLE_SECRET) {
  throw new Error(
    "NextAuth environment variables are not set. Please check your .env file."
  );
}

// console.log("ret", {
//   NEXTAUTH_SECRET,
//   NEXTAUTH_GOOGLE_ID,
//   NEXTAUTH_GOOGLE_SECRET,
// });
export const options = {
  secret: NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 3600, // 1 hour
  },
  pages: {
    signIn: "/login",
    // error: "/error", // Error code passed in query string as ?error=
    newUser: "/on-board", // Will disable the new account creation screen
  },
  theme: {
    colorScheme: "light", // "auto" | "dark" | "light"
    brandColor: "#4CAF50", // Hex color code
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      authorize: async (credentials): Promise<User | null> => {
        // console.log("incd-creds", JSON.stringify(credentials, null, 2));
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }
        // const user = {
        //   id: "1",
        //   name: "John Doe",
        //   email: credentials?.email || "",
        //   image: null,
        // };

        // If the user is found, return the user object
        const user = await db.query.userTable.findFirst({
          where: (f, { eq }) => eq(f.email, credentials?.email),
        });

        if (user) {
          // compare the hashed password
          const isValidPass = await bcrypt.compare(
            credentials?.password,
            user?.password
          );

          if (!isValidPass) {
            return null;
          } else {
            // email on login
            await emailOnLogin(user?.email);
            return user;
          }
        }

        // If no user is found, return null
        return null;
      },
    }),
    GoogleProvider({
      clientId: NEXTAUTH_GOOGLE_ID ?? "",
      clientSecret: NEXTAUTH_GOOGLE_SECRET ?? "",
    }),
  ],
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account?.provider === "google") {
        // Check if user exists by email
        const existingUser = await db.query.userTable.findFirst({
          where: (f, { eq }) => eq(f.email, user.email!),
        });

        if (!existingUser) {
          // Create new user with Google data
          try {
            await db.insert(userTable).values({
              email: user.email!,
              name: user.name || "Unknown User",
              picture: user.image,
              password: "", // No password for OAuth users
              isOnboarded: false,
            });
          } catch (error) {
            console.error("Error creating Google user:", error);
            return false;
          }
        }

        // Send login email for Google OAuth users
        try {
          await emailOnLogin(user.email!);
        } catch (error) {
          console.error("Failed to send login email for OAuth user:", error);
          // Don't block login if email fails
        }
      }
      return true;
    },
    jwt: async ({ user, token, trigger }) => {
      // If this is a new login (user object is present), set up initial token
      if (user) {
        token.email = user.email;
      }

      // Only refresh user data from database in these cases:
      // 1. New login (user object present)
      // 2. Session update triggered (from onboarding form)
      // 3. Token doesn't have required data
      if (
        user ||
        trigger === "update" ||
        !token.id ||
        token.isOnboarded === undefined
      ) {
        if (token.email) {
          const userData = await db.query.userTable.findFirst({
            where: (f, { eq }) => eq(f.email, token.email as string),
            columns: { id: true, isOnboarded: true, name: true, picture: true },
          });

          if (userData) {
            token.id = userData.id;
            token.isOnboarded = userData.isOnboarded || false;
            token.name = userData.name;
            token.picture = userData.picture;
          } else if (user) {
            // Fallback for new users during initial login
            token.id = user.id;
            token.isOnboarded = false;
            token.name = user.name;
            token.picture = user.image;
          }
        }
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.user.id = token?.id as string;
        session.user.email = token?.email as string;
        session.user.name = token?.name as string;
        session.user.isOnboarded = token?.isOnboarded as boolean;
        session.user.image = token?.picture as string;
      }
      return session;
    },
  },
} satisfies NextAuthOptions;

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image?: string;
      isOnboarded: boolean;
    };
  }

  interface JWT {
    id: string;
    email: string;
    name: string;
    picture?: string;
    isOnboarded: boolean;
  }
}
