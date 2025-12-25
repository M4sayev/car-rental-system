import type { RentalSelection, SelectionStage } from "@/pages/CreateRental";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import CreateRentalHeader from "./CreateRentalHeader";
import { render, screen } from "@testing-library/react";

const mockSetSearchQuery = vi.fn();
const mockSetCurrentStage = vi.fn();

const client = new QueryClient();

const renderCreateRentalHeader = (
  currentStage: SelectionStage = "car",
  rentalSelection: RentalSelection = { vehicle_id: "", client_id: "" }
) => {
  return (
    <MemoryRouter>
      <QueryClientProvider client={client}>
        <CreateRentalHeader
          setCurrentStage={mockSetCurrentStage}
          setSearchQuery={mockSetSearchQuery}
          currentStage={currentStage}
          rentalSelection={rentalSelection}
          searchQuery="test-query"
        />
      </QueryClientProvider>
    </MemoryRouter>
  );
};
describe("CreateRentalHeader", () => {
  it("renders header with correct title depending on mode", () => {
    const { rerender } = render(renderCreateRentalHeader());
    const heading = screen.getByRole("heading");
    expect(heading).toHaveTextContent("Create a rental (select a car)");

    rerender(renderCreateRentalHeader("client"));
    expect(heading).toHaveTextContent("Create a rental (select a client)");
  });
  it("renders searchbar with correct placeholder and aria-label depending on mode", () => {
    const { rerender } = render(renderCreateRentalHeader());
    const searchBar = screen.getByTestId("search-bar");
    const label = searchBar.querySelector("label");
    const input = searchBar.querySelector("input");

    expect(label).toHaveTextContent(/Search for available cars/i);
    expect(label).toHaveAttribute("for", "create-rental-search-bar");
    expect(input).toHaveAttribute("placeholder", "Search for cars");
    expect(input).toHaveAttribute("id", "create-rental-search-bar");
    expect(input).toHaveValue("test-query");

    rerender(renderCreateRentalHeader("client"));
    expect(label).toHaveTextContent(/Search for clients/i);
    expect(input).toHaveAttribute("placeholder", "Search for clients");
    expect(input).toHaveValue("test-query");
  });
});
