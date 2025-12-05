import { render, screen } from "@testing-library/react";
import ClientsHeader from "../ClientsHeader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const setShowDeleted = vi.fn();

const queryClient = new QueryClient();

describe("ClientsHeader", () => {
  const renderClientsHeader = (showDeleted: boolean) => {
    render(
      <QueryClientProvider client={queryClient}>
        <ClientsHeader
          showDeleted={showDeleted}
          setShowDeleted={setShowDeleted}
        />
      </QueryClientProvider>
    );
  };
  it("renders h1 and button text, aria-label properly on showDelete true", () => {
    renderClientsHeader(true);

    expect(
      screen.getByRole("heading", { name: "Deleted Clients" })
    ).toBeInTheDocument();

    const button = screen.getByText("Go Back");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-label", "Go Back to Clients Table");
  });
  it("renders h1 and button text, aria-label properly on showDelete false", () => {
    renderClientsHeader(false);

    expect(
      screen.getByRole("heading", { name: "Clients" })
    ).toBeInTheDocument();

    const button = screen.getByText("Show Deleted");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-label", "View Deleted Clients Table");
  });
});
