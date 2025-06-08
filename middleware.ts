import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { userTable } from "@/db/schema/schema";
import { eq } from "drizzle-orm";

export default withAuth(
  async function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // Allow access to auth pages and API routes
    if (
      pathname.startsWith("/login") ||
      pathname.startsWith("/register") ||
      pathname.startsWith("/api/auth") ||
      pathname.startsWith("/api/user/onboard")
    ) {
      return NextResponse.next();
    }

    // If user is authenticated, check onboarding status
    if (token?.id) {
      try {
        const user = await db.query.userTable.findFirst({
          where: eq(userTable.id, token.id as string),
          columns: { isOnboarded: true },
        });

        // If user is not onboarded and not on onboarding page, redirect to onboarding
        if (!user?.isOnboarded && pathname !== "/on-board") {
          return NextResponse.redirect(new URL("/on-board", req.url));
        }

        // If user is onboarded and on onboarding page, redirect to dashboard
        if (user?.isOnboarded && pathname === "/on-board") {
          return NextResponse.redirect(new URL("/dashboard", req.url));
        }
      } catch (error) {
        console.error("Middleware error:", error);
        // In case of error, allow the request to proceed
        return NextResponse.next();
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Allow public pages
        if (
          pathname === "/" ||
          pathname.startsWith("/login") ||
          pathname.startsWith("/register") ||
          pathname.startsWith("/api/auth")
        ) {
          return true;
        }

        // Require authentication for all other pages
        return !!token;
      },
    },
  },
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
