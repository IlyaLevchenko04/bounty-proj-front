import { z } from "zod";

export const loginSchema = z.object({
  username: z.string(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = loginSchema.extend({});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type AuthFormData = LoginFormData | RegisterFormData;

export type User = {
  _id: string;
  username: string;
  role: "hunter" | "admin";
  acceptedBounties: string[];
  postedBounties: string[];
  __v: number;
};

export type AuthResponse = {
  user: User;
  token: string;
};
