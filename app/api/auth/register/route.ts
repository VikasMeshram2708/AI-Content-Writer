import { registerSchema } from "@/models/user";
import * as z from "zod/v4";
import { NextRequest } from "next/server";
import { db } from "@/db";
import bcrypt from "bcryptjs";
import { userTable } from "@/db/schema/schema";
import { revalidatePath } from "next/cache";
import { emailOnRegister } from "@/app/utils/mailer";

export async function POST(req: NextRequest) {
  try {
    // schema validation
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      return new Response(
        JSON.stringify({
          error: z.flattenError(parsed.error),
          success: false,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          status: 400,
        },
      );
    }
    const { name, email, password } = parsed.data;
    // register unique user
    const userExist = await db.query.userTable.findFirst({
      where: (f, { eq }) => eq(f.email, email),
    });
    // return err when user exist
    if (userExist) {
      return new Response(
        JSON.stringify({ success: false, message: "User already exists" }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          status: 400,
        },
      );
    }
    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // save the user to db
    // send email feedback
    await db.insert(userTable).values({
      name,
      email,
      password: hashedPassword,
    });
    // send email on register
    await emailOnRegister(email);
    // revalidate
    revalidatePath("/register");
    // return response
    return new Response(
      JSON.stringify({ success: true, message: "User registered" }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 201,
      },
    );
  } catch (e) {
    const err = (e as Error)?.message ?? "Something went wrong.";
    return new Response(JSON.stringify({ error: err, success: false }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 500,
    });
  }
}
