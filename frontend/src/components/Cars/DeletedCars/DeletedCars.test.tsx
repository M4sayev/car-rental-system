import { render, screen } from "@testing-library/react";
import {
  QueryClient,
  QueryClientProvider,
  type UseQueryResult,
} from "@tanstack/react-query";

vi.mock("@/hooks/queryHooks/cars/useGetDeletedCars", () => ({
  useGetDeletedCars: vi.fn(),
}));

import { useGetDeletedCars } from "@/hooks/queryHooks/cars/useGetDeletedCars";
import { mockAvCars, mockCars, mockDeletedCars } from "@/test/mockData";
import type {
  AvailabilityStatus,
  CarTemplate,
} from "@/constants/carsTemplates";
import DeletedCarCards from "./DeletedCars";

const client = new QueryClient();

const mockUseGetDeletedCars = vi.mocked(useGetDeletedCars);

interface RenderDeletedCarCardsArgs {
  data: CarTemplate[];
  isLoading: boolean;
  isError: boolean;
}
function renderCarCards({
  data,
  isLoading,
  isError,
}: RenderDeletedCarCardsArgs) {
  mockUseGetDeletedCars.mockReturnValue({
    data,
    isLoading,
    isError,
  } as UseQueryResult);

  return render(
    <QueryClientProvider client={client}>
      <DeletedCarCards />
    </QueryClientProvider>
  );
}
describe("CarCards", () => {
  it("renders error message on isError true", () => {
    renderCarCards({
      data: mockDeletedCars,
      isLoading: false,
      isError: true,
    });
    const errorMessage = screen.getByTestId("api-error");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent(
      /We couldn't connect to the server. Please check your connection and try again./i
    );
  });
  it("console logs error on isError", () => {
    vi.spyOn(console, "error");
    renderCarCards({
      data: mockDeletedCars,
      isLoading: false,
      isError: true,
    });

    expect(console.error).toHaveBeenCalledTimes(1);
  });
  it("shows skeleton loading and sr-loading on isLoading", () => {
    renderCarCards({
      data: mockDeletedCars,
      isLoading: true,
      isError: false,
    });

    expect(screen.getByTestId("car-card-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("loading-state-sr")).toBeInTheDocument();
  });
  it("renders an empty state if no deleted cars in the database", () => {
    renderCarCards({
      data: [],
      isLoading: false,
      isError: false,
    });

    let emptyIcon = screen.getByTestId("no-data-icon");
    expect(emptyIcon).toBeInTheDocument();

    expect(screen.getByText(/Oopss.. No deleted cars in the database/i));
  });
});
