import type { ClientTemplate } from "@/constants/clientTemplates";
import type { RecentRentalTemplate } from "@/constants/dashBoardTemplates";

export const mockClient: ClientTemplate = {
  client_id: "test-client",
  name: "test",
  email: "test@mail.ru",
  phone: "+123456789",
};

export const mockDashBoardOverviewReturn = {
  available_cars: 123,
  total_clients: 155,
  active_rentals: 2000,
};

export const mockRental: RecentRentalTemplate = {
  rental_id: "abc123",
  client_name: "John Doe",
  car_name: "Toyota",
  start_date: "2024-01-10",
  end_date: "",
  status: "active",
};

export const mockDate = "2024-06-01T08:30";
export const mockDateIso = "2024-06-01";
