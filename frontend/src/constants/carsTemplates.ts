import z from "zod";

export interface CarTemplate {
  vehicle_id: string;
  brand: string;
  model: string;
  daily_rate: number;
  car_type: string;
  seats: number;
  is_available: boolean;
  image_url?: File | undefined;
  deletion_date?: string;
}

export const carSchema = z.object({
  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),
  daily_rate: z.number().positive(),
  car_type: z.string().min(1, "Type is required"),
  seats: z.number().positive("Seats must be positive").max(50),
  image_url: z.file().optional(),
});

// for form hooks
export const carDefaultValues = {
  brand: "",
  model: "",
  daily_rate: 0.1,
  car_type: "",
  seats: 1,
  image_url: undefined,
};
// for the toggle buttons
export type CarFormData = z.infer<typeof carSchema>;

export type AvailabilityStatus = "all" | "available" | "rented";
export const availabilityCategories: AvailabilityStatus[] = [
  "all",
  "available",
  "rented",
];
