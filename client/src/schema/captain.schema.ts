import { z } from "zod";
import { VehicleType } from "@/types";

export const captainSignupSchema = z.object({
  fullName: z.string().min(3, { message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password is required" }),
  type: z.nativeEnum(VehicleType),
  color: z.string().min(3, { message: "Color is required" }),
  numberPlate: z.string().min(3, { message: "Number plate is required" }),
  capacity: z.number().min(1, { message: "Number plate is required" })
});

export const captainLoginSchema = captainSignupSchema.omit({
  fullName: true,
  type: true,
  color: true,
  numberPlate: true,
  capacity: true
});

export type CaptainSignupSchema = z.infer<typeof captainSignupSchema>;
export type CaptainLoginSchema = z.infer<typeof captainLoginSchema>;
