import type { CarTemplate } from "@/constants/carsTemplates";
import type { ClientTemplate } from "@/constants/clientTemplates";
import type { RecentRentalTemplate } from "@/constants/dashBoardTemplates";

export const mockClient: ClientTemplate = {
  client_id: "test-id",
  name: "Pablo Pablissimooo",
  email: "youremail@gmail.com",
  phone: "+992546823252",
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

export const mockCar: CarTemplate = {
  vehicle_id: "car-test-id",
  daily_rate: 212.0,
  seats: 4,
  is_available: false,
  brand: "Toyota",
  model: "Supra",
  car_type: "Sedan",
  image_url: undefined,
  deletion_date: "21/21/2121",
};

const mockCarAv: CarTemplate = {
  ...mockCar,
  is_available: true,
  vehicle_id: "car-test-id-two",
  brand: "KIA",
  model: "RIO",
};

export const mockCars: CarTemplate[] = [mockCar, mockCarAv];

export const mockAvCars: CarTemplate[] = [mockCarAv];

export const mockDeletedCars: CarTemplate[] = [
  { ...mockCar, deletion_date: "test-date" },
];

export const mockDate = "2024-06-01T08:30";
export const mockDateIso = "2024-06-01";

// ToggleButtons
export const mockToggleButtonValues = ["one", "two", "three", "four"];
