import z from "zod";

export interface ClientTemplate {
  client_id: string;
  name: string;
  email: string;
  phone: string;
  deletion_date?: string;
}

export const clientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  phone: z.string().min(7, "Phone is too short").max(15, "Phone is too long"),
});

export type ClientFormData = z.infer<typeof clientSchema>;
