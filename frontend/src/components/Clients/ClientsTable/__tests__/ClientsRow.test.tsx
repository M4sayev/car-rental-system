import { render, screen } from "@testing-library/react";
import ClientsRow from "../ClientsRow";
import { mockClient, mockDate, mockDateIso } from "@/test/mockData";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Table, TableBody } from "@/components/ui/table";

const mockMuate = vi.fn();

vi.mock("@/hooks/queryHooks/clients/useDeleteClient", () => ({
  useDeleteClient: () => ({
    mutate: mockMuate,
  }),
}));

const queryClient = new QueryClient();

// wrapped in Table, TableBody not to get hydration warning
describe("ClientsRow", () => {
  const renderClientsRow = (deleted?: boolean, deletedAt?: string) => {
    render(
      <QueryClientProvider client={queryClient}>
        <Table>
          <TableBody>
            <ClientsRow
              client={mockClient}
              deleted={deleted}
              deletedAt={deletedAt}
            />
          </TableBody>
        </Table>
      </QueryClientProvider>
    );
  };
  it("renders date on deleted true", () => {
    renderClientsRow(true, mockDate);
    screen.debug();
    expect(screen.getByText(mockDateIso)).toBeInTheDocument();
  });
  it("renders actions button on deleted false", () => {
    renderClientsRow();

    const actions = screen.getByTestId("actions-button");

    expect(actions).toBeInTheDocument();
  });
});
