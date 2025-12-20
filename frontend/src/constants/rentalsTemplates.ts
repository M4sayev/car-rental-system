import { formatStringToISO } from "@/utils/utils";
import type { CarTemplate } from "./carsTemplates";
import type { ClientTemplate } from "./clientTemplates";

export interface RentalTemplate {
  rental_id: string;
  client: ClientTemplate;
  car: CarTemplate;
  start_date: string;
  end_date: string | null;
  is_active: boolean;
}

export type Status = "active" | "completed";

export const statusCategories: Status[] = ["active", "completed"];

// map the rental object into a UI view
export function mapRentalToUI(rental: RentalTemplate) {
  const status = rental.is_active ? "active" : "completed";
  return {
    rental_id: rental.rental_id,
    car_id: rental.car.vehicle_id,
    car_details: `name: ${rental.car.brand} ${rental.car.model} | rate: $${rental.car.daily_rate}/day`,
    client_id: rental.client.client_id,
    client_details: `name: ${rental.client.name} | phone: ${rental.client.phone}`,
    start_date: formatStringToISO(rental.start_date),
    end_date: rental.end_date ? formatStringToISO(rental.end_date) : "-",
    status,
  };
}

export type UIRentalTemplate = ReturnType<typeof mapRentalToUI>;
