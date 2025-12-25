import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, render, screen } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import CreateRentalNavigation from "./CreateRentalNavigation";
import type { RentalSelection, SelectionStage } from "@/pages/CreateRental";
import userEvent from "@testing-library/user-event";

const client = new QueryClient();

const mockSetCurrentStage = vi.fn();
const mockResetSearch = vi.fn();

const mockMutate = vi.fn();

vi.mock("@/hooks/queryHooks/rentals/useCompleteRental", () => ({
  useCompleteRental: () => ({
    mutate: mockMutate,
  }),
}));

// A small helper to display the current path for testing
const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid="location-display">{location.pathname}</div>;
};

const renderCreateRentalNav = (
  currentStage: SelectionStage = "car",
  rentalSelection: RentalSelection = { vehicle_id: "", client_id: "" }
) => {
  return (
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={["/rentals/create-rental"]}>
        <CreateRentalNavigation
          currentStage={currentStage}
          rentalSelection={rentalSelection}
          setCurrentStage={mockSetCurrentStage}
          resetSearchBar={mockResetSearch}
        />
        <LocationDisplay />
      </MemoryRouter>
    </QueryClientProvider>
  );
};
describe("CreateRentalNavigation", () => {
  it("renders buttons with correct aria-label, span on car stage", () => {
    render(renderCreateRentalNav());

    const backBtn = screen.getByRole("button", {
      name: /Go back to rentals page/i,
    });

    expect(backBtn).toBeInTheDocument();
    expect(backBtn).toHaveTextContent(/go back/i);

    const nextBtn = screen.getByRole("button", {
      name: /Go to select a client page/i,
    });

    expect(nextBtn).toBeInTheDocument();
    expect(nextBtn).toHaveTextContent(/next/i);
  });
  it("renders buttons with correct aria-label, text on client stage", () => {
    render(renderCreateRentalNav("client"));

    const backBtn = screen.getByRole("button", {
      name: /Go back to selecting a car/i,
    });

    expect(backBtn).toBeInTheDocument();
    expect(backBtn).toHaveTextContent(/go back/i);

    const nextBtn = screen.getByRole("button", {
      name: /Create a rental with selected data/i,
    });

    expect(nextBtn).toBeInTheDocument();
    expect(nextBtn).toHaveTextContent(/create/i);
  });
  it("disables next button if the car/client no selected", async () => {
    const user = userEvent.setup();
    const { rerender } = render(renderCreateRentalNav("car"));

    const nextBtn = screen.getByRole("button", {
      name: /Go to select a client page/i,
    });

    expect(nextBtn).toBeInTheDocument();

    await act(async () => await user.click(nextBtn));

    expect(mockSetCurrentStage).toHaveBeenCalledTimes(0);
    expect(mockResetSearch).toHaveBeenCalledTimes(0);

    // clients selection

    rerender(
      renderCreateRentalNav("client", {
        vehicle_id: "test-id",
        client_id: "",
      })
    );

    expect(nextBtn).toBeInTheDocument();

    await act(async () => await user.click(nextBtn));

    expect(mockSetCurrentStage).toHaveBeenCalledTimes(0);
    expect(mockResetSearch).toHaveBeenCalledTimes(0);
  });
  it("resets searchbar on next/back clicked", async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      renderCreateRentalNav("car", { vehicle_id: "test-car", client_id: "" })
    );

    const nextBtn = screen.getByRole("button", {
      name: /Go to select a client page/i,
    });

    expect(nextBtn).toBeInTheDocument();

    await act(async () => await user.click(nextBtn));

    expect(mockSetCurrentStage).toHaveBeenCalledTimes(1);
    expect(mockResetSearch).toHaveBeenCalledTimes(1);

    // clients selection

    rerender(
      renderCreateRentalNav("client", {
        vehicle_id: "test-car",
        client_id: "test-client",
      })
    );

    const backBtn = screen.getByRole("button", {
      name: /Go back to selecting a car/i,
    });

    expect(backBtn).toBeInTheDocument();

    await act(async () => await user.click(backBtn));

    expect(mockSetCurrentStage).toHaveBeenCalledTimes(2);
    expect(mockResetSearch).toHaveBeenCalledTimes(2);
  });
  it("navigates back on isCarStage true", async () => {
    const user = userEvent.setup();
    render(renderCreateRentalNav());

    const location = screen.getByTestId("location-display");
    expect(location).toHaveTextContent("/rentals/create-rental");

    const backBtn = screen.getByRole("button", {
      name: /go back to rentals page/i,
    });
    await act(async () => await user.click(backBtn));
    expect(location).toHaveTextContent("/rentals");
  });
});
