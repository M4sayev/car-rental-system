import { act, render, screen, waitFor } from "@testing-library/react";
import { Actions } from "./Action";
import { mockClient } from "@/test/mockData";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import userEvent from "@testing-library/user-event";

const queryClient = new QueryClient();

// Wrapp the whole test in act to resolve warnings

const mockOnDelete = vi.fn();
describe("Actions", () => {
  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <Actions
          onDelete={mockOnDelete}
          type="client"
          defaultData={mockClient}
        />
      </QueryClientProvider>
    );
  });
  it("renders actions button with proper className, aria-label", () => {
    const actionsButton = screen.getByTestId("actions-button");
    expect(actionsButton).toHaveClass("cursor-pointer");
    expect(actionsButton).toHaveAttribute("aria-label", "Open actions menu");
  });
  it("opens the delete edit options on actions button clicked", async () => {
    const user = userEvent.setup();
    const actionsButton = screen.getByTestId("actions-button");

    await act(async () => {
      user.click(actionsButton);
    });

    await waitFor(() => {
      expect(screen.getByText(/delete/i)).toBeInTheDocument();
      expect(screen.getByText(/edit/i)).toBeInTheDocument();
    });
  });
  it("opens confirmation dialog on delete clicked", async () => {
    const user = userEvent.setup();
    const actionsButton = screen.getByTestId("actions-button");

    user.click(actionsButton);

    const deleteButton = await waitFor(() => {
      return screen.getByText(/delete/i);
    });

    expect(deleteButton).toBeInTheDocument();

    user.click(deleteButton);

    await waitFor(() => {
      expect(screen.getByText(/confirm deletion/i)).toBeInTheDocument();
    });
  });
  it("calls onDelete on delete button clicked", async () => {
    await act(async () => {
      const user = userEvent.setup();
      const actionsButton = screen.getByTestId("actions-button");
      await user.click(actionsButton);

      const deletebtn = screen.getByText(/delete/i);
      await user.click(deletebtn);

      const confirmationDialog = screen.getByText(/confirm deletion/i);
      expect(confirmationDialog).toBeInTheDocument();

      const deleteButton = screen.getByRole("button", {
        name: /delete/i,
      });

      await user.click(deleteButton);

      expect(mockOnDelete).toHaveBeenCalledTimes(1);
    });
  });
  it("opens edit dialog on edit clicked", async () => {
    await act(async () => {
      const user = userEvent.setup();
      const actionsButton = screen.getByTestId("actions-button");
      await user.click(actionsButton);

      const editBtn = screen.getByText(/edit/i);
      await user.click(editBtn);

      const editDialog = screen.getByTestId("client-form-dialog");
      expect(editDialog).toBeInTheDocument();
    });
  });
});
