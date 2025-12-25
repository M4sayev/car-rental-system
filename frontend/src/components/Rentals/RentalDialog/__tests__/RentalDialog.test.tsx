import { act, render, screen } from "@testing-library/react";
import RentalDialog from "../RentalDialog";
import { mockRental } from "@/test/mockData";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  mapRentalToUI,
  type RentalTemplate,
} from "@/constants/rentalsTemplates";
import { covertFromSnakeCaseToTitle } from "@/utils/utils";
import userEvent from "@testing-library/user-event";

const mockCompleteMutate = vi.fn();
const mockDeleteMutate = vi.fn();

const mockSetOpen = vi.fn();

vi.mock("@/hooks/queryHooks/rentals/useCompleteRental", () => ({
  useCompleteRental: () => ({
    mutate: mockCompleteMutate,
  }),
}));

vi.mock("@/hooks/queryHooks/rentals/useDeleteRental", () => ({
  useDeleteRental: () => ({
    mutate: mockDeleteMutate,
  }),
}));

const client = new QueryClient();

const renderRentalDialog = (open: boolean, rental: RentalTemplate) => {
  return render(
    <QueryClientProvider client={client}>
      <RentalDialog setOpen={mockSetOpen} open={open} rental={rental} />
    </QueryClientProvider>
  );
};

describe("RentalDialog", () => {
  it("renders all child components correctly", () => {
    renderRentalDialog(true, mockRental);

    // header
    expect(screen.getByText(/rental details/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Comprehensive information for rental agreement/i)
    ).toBeInTheDocument();

    // items

    Object.entries(mapRentalToUI(mockRental)).map(([key, value]) => {
      // placeholder
      expect(
        screen.getByText(covertFromSnakeCaseToTitle(key))
      ).toBeInTheDocument();
      // value

      expect(screen.getByText(value)).toBeInTheDocument();
    });

    expect(screen.getByText(/rental-id/i)).toBeInTheDocument();

    // footer
    expect(
      screen.getByRole("button", { name: /Complete current rental/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Delete current rental/i })
    ).toBeInTheDocument();
  });
  it("calls mockCompleteMutate on complete clicked", async () => {
    const user = userEvent.setup();
    renderRentalDialog(true, mockRental);
    const completeBtn = screen.getByRole("button", {
      name: /Complete current rental/i,
    });

    await act(async () => await user.click(completeBtn));

    // disabled
    expect(mockCompleteMutate).toHaveBeenCalledTimes(0);
  });
  it("calls mockDeleteMutate on delete clicked", async () => {
    const user = userEvent.setup();
    renderRentalDialog(true, mockRental);
    const deleteBtn = screen.getByRole("button", {
      name: /Delete current rental/i,
    });

    await act(async () => await user.click(deleteBtn));

    expect(mockDeleteMutate).toHaveBeenCalledTimes(1);
  });
});
