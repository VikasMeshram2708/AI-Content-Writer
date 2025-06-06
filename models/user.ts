import * as z from "zod/v4";

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be less than 50 characters"),
  email: z.email(),
  password: z
    .string()
    .min(1, "Name is required")
    .max(100, "Password must be less than 100 characters"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
