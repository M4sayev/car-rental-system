import type { CarTemplate } from "./carsTemplates";
import type { ClientTemplate } from "./clientTemplates";

export interface RentalTemplate {
  rental_id: string;
  client: ClientTemplate;
  car: CarTemplate;
  start_date: string;
  end_date: string | null;
  status: Status;
}

export type Status = "active" | "completed";

export const statusCategories: Status[] = ["active", "completed"];
