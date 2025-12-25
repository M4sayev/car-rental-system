import { render, screen } from "@testing-library/react";
import RentalsHeader from "./RentalsHeader";
import { MemoryRouter } from "react-router-dom";

const mockSearch = vi.fn();

describe("RentalsHeader", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <RentalsHeader searchQuery="test" setSearchQuery={mockSearch} />
      </MemoryRouter>
    );
  });
  it("renders the title properly", () => {
    const h1 = screen.getByRole("heading");
    expect(h1).toBeInTheDocument();
    expect(h1).toHaveTextContent(/Rentals Management/i);
  });
  it("renders the create rental button with correct text and aria-label", () => {
    const addBtn = screen.getByTestId("add-button");
    expect(addBtn).toBeInTheDocument();

    expect(addBtn).toHaveTextContent(/create rental/i);

    expect(addBtn).toHaveAttribute("aria-label", "Create a new rental");
  });

  it("renders a searchbar properly", () => {
    const searchBar = screen.getByPlaceholderText("Search for a rental");
    expect(searchBar).toBeInTheDocument();
  });
});
