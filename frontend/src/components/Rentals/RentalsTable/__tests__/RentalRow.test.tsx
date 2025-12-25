import { act, render, screen } from "@testing-library/react";
import RentalRow from "../RentalRow";
import { mockRental } from "@/test/mockData";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import userEvent from "@testing-library/user-event";
import { Table, TableBody } from "@/components/ui/table";

const client = new QueryClient();

describe("RentalRow", () => {
  beforeEach(() => {
    render(
      <QueryClientProvider client={client}>
        <Table>
          <TableBody>
            <RentalRow rental={mockRental} />
          </TableBody>
        </Table>
      </QueryClientProvider>
    );
  });
  it("renders cells properly", () => {
    expect(screen.getByText(mockRental.rental_id)).toBeInTheDocument();
    expect(screen.getByText(mockRental.client.name)).toBeInTheDocument();
    expect(
      screen.getByText(
        `${mockRental.car.brand} ${mockRental.car.model} (${mockRental.car.car_type})`
      )
    ).toBeInTheDocument();
    expect(screen.getByText(mockRental.start_date)).toBeInTheDocument();

    const emptySpan = screen.getByLabelText("No end date for this rental");
    expect(emptySpan).toBeInTheDocument();
    expect(emptySpan).toHaveTextContent("-");
    expect(screen.getByText("completed")).toBeInTheDocument();

    expect(screen.getByTestId("rental-row")).toHaveAttribute(
      "aria-label",
      "View rental details"
    );
  });
  it("opens dialog on tab and enter", async () => {
    const user = userEvent.setup();

    const rentalRow = screen.getByTestId("rental-row");

    rentalRow.focus();

    await act(async () => await user.keyboard("{Enter}"));

    expect(screen.getByText("Complete")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });
  it("opens dialog on click", async () => {
    const user = userEvent.setup();

    const rentalRow = screen.getByTestId("rental-row");

    rentalRow.focus();

    await act(async () => await user.click(rentalRow));

    expect(screen.getByText("Complete")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });
});
