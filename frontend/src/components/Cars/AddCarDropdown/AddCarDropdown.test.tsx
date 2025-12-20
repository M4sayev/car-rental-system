import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";
import AddCarDropdown from "./AddCarDropdown";

const mockMutate = vi.fn();

// Mock mutation hook
vi.mock("@/hooks/queryHooks/clients/useAddCar", () => ({
  useAddCar: () => ({
    mutate: mockMutate,
  }),
}));

const client = new QueryClient();

describe("AddCarDropdown", () => {
  let button: HTMLButtonElement;
  beforeEach(() => {
    render(
      <QueryClientProvider client={client}>
        <AddCarDropdown />
      </QueryClientProvider>
    );
    button = screen.getByText(/Add Car/i);
  });
  it("renders Add Car button", () => {
    expect(button).toBeInTheDocument();
  });

  it("opens dialog on button click", () => {
    fireEvent.click(button);

    expect(screen.getByTestId("car-form-dialog")).toBeInTheDocument();
  });
});
