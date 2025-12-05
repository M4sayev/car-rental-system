import { render, screen } from "@testing-library/react";
import {
  QueryClient,
  QueryClientProvider,
  type UseQueryResult,
} from "@tanstack/react-query";

import DataTableCard from "./DataTableCard";
import { UserRoundX } from "lucide-react";
import { TableRow } from "../ui/table";
import type { ClientTemplate } from "@/constants/clientTemplates";

const queryClient = new QueryClient();

const renderDataTableCard = (
  queryResult: UseQueryResult<ClientTemplate[], unknown>
) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <DataTableCard<ClientTemplate>
        queryFn={queryResult}
        title="Test Table"
        Header={() => <thead data-testid="header"></thead>}
        Skeleton={() => <div data-testid="skeleton"></div>}
        Row={(item) => (
          <TableRow key={item.client_id}>{item.client_id}</TableRow>
        )}
        emptyIcon={UserRoundX}
        emptyLabel="no data"
        emptyTitle="Oops"
        emptyDescription="No data available"
      />
    </QueryClientProvider>
  );
};

describe("DataTableCard", () => {
  it("renders skeleton loader on isLoading true", () => {
    renderDataTableCard({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    } as Partial<UseQueryResult<ClientTemplate[]>> as UseQueryResult<ClientTemplate[]>);

    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });

  it("renders empty response on data falsy", () => {
    renderDataTableCard({
      data: undefined,
      isLoading: false,
      isError: false,
      error: null,
    } as Partial<UseQueryResult<ClientTemplate[]>> as UseQueryResult<ClientTemplate[]>);

    const empty = screen.getByText(/No data available/i);
    expect(empty).toBeInTheDocument();
  });

  it("renders error response on isError", () => {
    renderDataTableCard({
      data: undefined,
      isLoading: false,
      isError: true,
      error: new Error("Unknown error"),
    } as Partial<UseQueryResult<ClientTemplate[]>> as UseQueryResult<ClientTemplate[]>);

    const error = screen.getByText(/We couldn't connect to the server./i);
    expect(error).toBeInTheDocument();
  });
});
