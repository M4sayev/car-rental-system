import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import Cards from "../Cards";
import { mockDashBoardOverviewReturn } from "@/test/mockData";

// Mock the hook **before imports**
vi.mock("@/hooks/queryHooks/dashboard/useDashboardOverview", () => ({
  useDashboardOverview: vi.fn(),
}));

import { useDashboardOverview } from "@/hooks/queryHooks/dashboard/useDashboardOverview";
import type { Mock } from "vitest";

const queryClient = new QueryClient();

const renderWithQueryProvider = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <Cards />
    </QueryClientProvider>
  );

describe("Cards", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders error if isError is true", () => {
    (useDashboardOverview as Mock).mockReturnValue({
      isError: true,
      error: new Error("Test error"),
    });

    renderWithQueryProvider();

    expect(screen.getByText("Error loading dashboard")).toBeInTheDocument();
  });

  it("renders skeleton if isLoading is true", () => {
    (useDashboardOverview as Mock).mockReturnValue({
      isLoading: true,
    });

    renderWithQueryProvider();

    expect(screen.getByTestId("cards-skeleton")).toBeInTheDocument();
  });

  it("renders cards when data is available", () => {
    (useDashboardOverview as Mock).mockReturnValue({
      data: mockDashBoardOverviewReturn,
      isLoading: false,
      isError: false,
    });

    renderWithQueryProvider();
    expect(screen.getByText(/available cars/i)).toBeInTheDocument();
  });
});
