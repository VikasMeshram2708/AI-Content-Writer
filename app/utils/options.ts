/**
 * This file holds the auth options for NextAuth.js.
 */

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions, User } from "next-auth";


const { NEXTAUTH_SECRET, NEXTAUTH_GOOGLE_ID, NEXTAUTH_GOOGLE_SECRET } =
  process.env;

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
        // Here you would typically fetch user data from your database
        // For demonstration, we are using a static user
        const user = {
          id: "1",
          name: "John Doe",
          email: credentials?.email || "",
          image: null,
        };

        // If the user is found, return the user object
        if (
          user.email === credentials?.email &&
          credentials?.password === "1234"
        ) {
          return user;
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
      id: string
      email: string
      name:string
    }
  }
}