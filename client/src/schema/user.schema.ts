import { z } from "zod";

export const userSignupSchema = z.object({
  fullName: z.string().min(3, { message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password is required" })
});

export const userLoginSchema = userSignupSchema.omit({ fullName: true });

export type UserSignupSchema = z.infer<typeof userSignupSchema>;
export type UserLoginSchema = z.infer<typeof userLoginSchema>;
