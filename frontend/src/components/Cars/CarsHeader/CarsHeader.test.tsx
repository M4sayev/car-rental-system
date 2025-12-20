import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CarsHeader from "./CarsHeader";

const setShowDeleted = vi.fn();

const queryClient = new QueryClient();

describe("CarsHeader", () => {
  const renderCarsHeader = (showDeleted: boolean) => {
    render(
      <QueryClientProvider client={queryClient}>
        <CarsHeader showDeleted={showDeleted} setShowDeleted={setShowDeleted} />
      </QueryClientProvider>
    );
  };
  it("renders h1 and button text, aria-label properly on showDelete true", () => {
    renderCarsHeader(true);

    expect(
      screen.getByRole("heading", { name: "Deleted Cars" })
    ).toBeInTheDocument();

    const button = screen.getByText("Go Back");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-label", "Go back to cars overview");
  });
  it("renders h1 and button text, aria-label properly on showDelete false", () => {
    renderCarsHeader(false);

    expect(
      screen.getByRole("heading", { name: "Cars Overview" })
    ).toBeInTheDocument();

    const button = screen.getByText("Show Deleted");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-label", "View deleted cars");
  });
});
