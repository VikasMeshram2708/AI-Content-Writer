import { onboardingSchema } from "@/models/user";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "@/app/utils/options";
import { db } from "@/db";
import { userTable } from "@/db/schema/schema";
import { eq } from "drizzle-orm";
import * as z from "zod/v4";

export async function POST(req: NextRequest) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(options);
    if (!session?.user?.id) {
      return new Response(
        JSON.stringify({ error: "Unauthorized", success: false }),
        {
          headers: { "Content-Type": "application/json" },
          status: 401,
        }
      );
    }

    // Validate request body
    const body = await req.json();
    const parsed = onboardingSchema.safeParse(body);
    if (!parsed.success) {
      return new Response(
        JSON.stringify({
          error: z.flattenError(parsed.error),
          success: false,
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    const { name, picture } = parsed.data;

    // Update user profile and mark as onboarded
    await db
      .update(userTable)
      .set({
        name,
        picture: picture || null,
        isOnboarded: true,
      })
      .where(eq(userTable.id, session.user.id));

    return new Response(
      JSON.stringify({ success: true, message: "Onboarding completed" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (e) {
    const err = (e as Error)?.message ?? "Something went wrong.";
    return new Response(JSON.stringify({ error: err, success: false }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}

