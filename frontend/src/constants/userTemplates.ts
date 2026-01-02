import z from "zod";

export const userSchema = z.object({
  username: z.string().min(2, "Username is too short"),
  password: z.string().min(4, "Password is too short"),
});

export type userFormData = z.infer<typeof userSchema>;
