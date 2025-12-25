import {
  QueryClient,
  QueryClientProvider,
  type UseQueryResult,
} from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import CarsSelection from "./CarsSelection";

vi.mock("@/hooks/queryHooks/cars/useGetAvailableCars", () => ({
  useGetAvailableCars: vi.fn(),
}));

import { useGetAvailableCars } from "@/hooks/queryHooks/cars/useGetAvailableCars";
import type { CarTemplate } from "@/constants/carsTemplates";
import { render, screen } from "@testing-library/react";
import { mockCars } from "@/test/mockData";

const client = new QueryClient();

const mockSetRentalSelection = vi.fn();
const mockUseAvailableCars = vi.mocked(useGetAvailableCars);

const MockCarsSelection = (
  searchQuery: string = "",
  data: CarTemplate[],
  isError: boolean,
  isLoading: boolean
) => {
  mockUseAvailableCars.mockReturnValue({
    data,
    isError,
    isLoading,
  } as UseQueryResult);

  return (
    <MemoryRouter>
      <QueryClientProvider client={client}>
        <CarsSelection
          searchQuery={searchQuery}
          rentalSelection={{ vehicle_id: "", client_id: "" }}
          setRentalSelection={mockSetRentalSelection}
        />
      </QueryClientProvider>
    </MemoryRouter>
  );
};

describe("CarsSelection", () => {
  it("renders sr-loading and skeleton loading correctly", () => {
    render(MockCarsSelection("", mockCars, false, true));

    const srLoading = screen.getByTestId("loading-state-sr");
    expect(srLoading).toBeInTheDocument();
    expect(srLoading).toHaveTextContent(/loading cars/i);
    expect(screen.getByTestId("car-card-skeleton")).toBeInTheDocument();
  });
  it("renders error message correctly", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    render(MockCarsSelection("", mockCars, true, false));

    expect(screen.getByTestId("api-error")).toBeInTheDocument();
    expect(consoleSpy).toHaveBeenCalled();
  });
  it("renders empty state if no data exists", () => {
    const { rerender } = render(MockCarsSelection("", [], false, false));

    const emptyResponse = screen.getByTestId("empty-reponse");
    expect(emptyResponse).toBeInTheDocument();
    expect(emptyResponse).toHaveAttribute(
      "aria-labelledby",
      "empty-cars-title"
    );

    // empty state
    const heading = screen.getByRole("heading");
    const description = screen.getByTestId("empty-reponse-description");

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveAttribute("id", "empty-cars-title");
    expect(heading).toHaveTextContent(
      /Oopss...No available cars in the database/i
    );
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent(/Try adding one/i);

    // with searchQuery not empty

    rerender(MockCarsSelection("bebra", [], false, false));
    expect(heading).toHaveTextContent("Oopss..");
    expect(description).toHaveTextContent(/No cars matching 'bebra'/i);
  });
});
