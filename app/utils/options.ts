/**
 * This file holds the auth options for NextAuth.js.
 */

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions, User } from "next-auth";
import { emailOnLogin } from "./mailer";
import { db } from "@/db";
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
        console.log("incd-creds", JSON.stringify(credentials, null, 2));
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
    jwt: ({ user, token }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.user.id = token?.id as string;
        session.user.email = token?.email as string;
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
      /** The user's postal address. */
      id: string;
      email: string;
      name: string;
    };
  }
}
