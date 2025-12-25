import { act, render, screen } from "@testing-library/react";
import SearchBar from "./SearchBar";
import userEvent from "@testing-library/user-event";

const mockSetSearchQuery = vi.fn();
const typedWord = "bebra";

describe("SearchBar", () => {
  beforeEach(() => {
    render(
      <SearchBar
        id="test"
        srLabel="test sr label"
        searchQuery="test"
        setSearchQuery={mockSetSearchQuery}
        placeholder="test-placeholder"
        className="w-100 h-20"
      />
    );
  });
  it("renders the sr label correctly", () => {
    const label = screen.getByText("test sr label");
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute("for", "test");
    expect(label).toHaveClass("sr-only");
  });
  it("renders the input with the placeholder and the value properly", () => {
    const input = screen.getByPlaceholderText("test-placeholder");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("id", "test");
    expect(input).toHaveValue("test");
  });
  it("fires setSeachQuery on typing", async () => {
    const user = userEvent.setup();

    const input = screen.getByPlaceholderText("test-placeholder");
    expect(input).toBeInTheDocument();

    await act(async () => await user.type(input, typedWord));

    expect(mockSetSearchQuery).toHaveBeenCalledTimes(typedWord.length);
  });
  it("adds additional className correctly", () => {
    const search = screen.getByTestId("search-bar");
    expect(search).toBeInTheDocument();
    expect(search).toHaveClass("w-100 h-20");
  });
});
