import { render, screen } from "@testing-library/react";
import CarCards from "./CarCards";
import {
  QueryClient,
  QueryClientProvider,
  type UseQueryResult,
} from "@tanstack/react-query";

vi.mock("@/hooks/queryHooks/cars/useGetAllCars", () => ({
  useGetAllCars: vi.fn(),
}));

vi.mock("@/hooks/queryHooks/cars/useGetAvailableCars", () => ({
  useGetAvailableCars: vi.fn(),
}));

import { useGetAllCars } from "@/hooks/queryHooks/cars/useGetAllCars";
import { useGetAvailableCars } from "@/hooks/queryHooks/cars/useGetAvailableCars";
import { mockAvCars, mockCars } from "@/test/mockData";
import type {
  AvailabilityStatus,
  CarTemplate,
} from "@/constants/carsTemplates";

const client = new QueryClient();

const mockUseGetAllCars = vi.mocked(useGetAllCars);
const mockUseAvailableCars = vi.mocked(useGetAvailableCars);

interface RenderCarCardsArgs {
  allData: CarTemplate[];
  isAllLoading: boolean;
  isAllError: boolean;
  avData: CarTemplate[];
  isAvLoading: boolean;
  isAvError: boolean;
  availability?: AvailabilityStatus;
}
function renderCarCards({
  allData,
  isAllLoading,
  isAllError,
  avData,
  isAvLoading,
  isAvError,
  availability = "all",
}: RenderCarCardsArgs) {
  // mockCars false false [] false false
  mockUseGetAllCars.mockReturnValue({
    data: allData,
    isLoading: isAllLoading,
    isError: isAllError,
  } as UseQueryResult);

  mockUseAvailableCars.mockReturnValue({
    data: avData,
    isLoading: isAvLoading,
    isError: isAvError,
  } as UseQueryResult);
  return render(
    <QueryClientProvider client={client}>
      <CarCards availability={availability} />
    </QueryClientProvider>
  );
}
describe("CarCards", () => {
  it("renders rented cars when availability is rented", () => {
    renderCarCards({
      allData: mockCars,
      isAllLoading: false,
      isAllError: false,
      avData: mockAvCars,
      isAvLoading: false,
      isAvError: false,
      availability: "rented",
    });

    expect(screen.getByText(/Toyota/i)).toBeInTheDocument();

    expect(screen.queryByText(/kia/i)).not.toBeInTheDocument();
  });
  it("renders available cars when availability is available", () => {
    renderCarCards({
      allData: mockCars,
      isAllLoading: false,
      isAllError: false,
      avData: mockAvCars,
      isAvLoading: false,
      isAvError: false,
      availability: "available",
    });

    expect(screen.getByText(/kia/i)).toBeInTheDocument();

    expect(screen.queryByText(/Toyota/i)).not.toBeInTheDocument();
  });
  it("renders all cars when availability is all", () => {
    renderCarCards({
      allData: mockCars,
      isAllLoading: false,
      isAllError: false,
      avData: mockAvCars,
      isAvLoading: false,
      isAvError: false,
      availability: "all",
    });

    expect(screen.getByText(/kia/i)).toBeInTheDocument();
    expect(screen.getByText(/Toyota/i)).toBeInTheDocument();
  });
  it("renders error message on isAllError true", () => {
    renderCarCards({
      allData: mockCars,
      isAllLoading: false,
      isAllError: true,
      avData: mockAvCars,
      isAvLoading: false,
      isAvError: false,
      availability: "all",
    });

    const errorMessage = screen.getByTestId("api-error");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent(
      /We couldn't connect to the server. Please check your connection and try again./i
    );
  });
  it("does not display error if not on the current availability", () => {
    const { rerender } = renderCarCards({
      allData: mockCars,
      isAllLoading: false,
      isAllError: false,
      avData: mockAvCars,
      isAvLoading: false,
      isAvError: true,
      availability: "all",
    });
    expect(screen.queryByTestId("api-error")).not.toBeInTheDocument();

    rerender(
      <QueryClientProvider client={client}>
        <CarCards availability={"available"} />
      </QueryClientProvider>
    );

    expect(screen.queryByTestId("api-error")).toBeInTheDocument();
  });
  it("console logs error on isError", () => {
    vi.spyOn(console, "error");
    renderCarCards({
      allData: mockCars,
      isAllLoading: false,
      isAllError: true,
      avData: mockAvCars,
      isAvLoading: false,
      isAvError: false,
      availability: "all",
    });

    expect(console.error).toHaveBeenCalledTimes(1);
  });
  it("shows skeleton loading and sr-loading on isLoading", () => {
    renderCarCards({
      allData: mockCars,
      isAllLoading: true,
      isAllError: false,
      avData: mockAvCars,
      isAvLoading: false,
      isAvError: false,
      availability: "all",
    });

    expect(screen.getByTestId("car-card-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("loading-state-sr")).toBeInTheDocument();
  });
  it("displays no cars in the database if data is empty", () => {
    const { rerender } = renderCarCards({
      allData: [],
      isAllLoading: false,
      isAllError: false,
      avData: [],
      isAvLoading: false,
      isAvError: false,
      availability: "all",
    });

    let emptyIcon = screen.getByTestId("no-data-icon");
    expect(emptyIcon).toBeInTheDocument();

    expect(screen.getByText(/Oopss.. No cars in the database/i));

    rerender(
      <QueryClientProvider client={client}>
        <CarCards availability={"available"} />
      </QueryClientProvider>
    );

    expect(screen.getByText(/Oopss.. No available cars in the database/i));

    rerender(
      <QueryClientProvider client={client}>
        <CarCards availability={"rented"} />
      </QueryClientProvider>
    );

    expect(screen.getByText(/Oopss.. No rented cars in the database/i));
  });
});
