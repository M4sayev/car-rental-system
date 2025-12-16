import { mockClient } from "@/test/mockData";
import { ActionsButton } from "./ActionsButton";
import { clientSchema, type ClientFormData } from "@/constants/clientTemplates";
import ClientFormDialog from "../Clients/ClientFormDialog/ClientFormDialog";
import { act, render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import userEvent, { type UserEvent } from "@testing-library/user-event";

const mockUpdate = vi.fn();
const mockDelete = vi.fn();

// act to remove the warning

vi.mock("@/hooks/queryHooks/clients/useUpdateClient", () => ({
  useUpdateClient: () => ({
    mutate: mockUpdate,
  }),
}));

const mutation = {
  mutate: mockUpdate,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

const queryClient = new QueryClient();

const TestComponent = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ActionsButton<ClientFormData>
        onDelete={mockDelete}
        defaultData={mockClient}
        mutation={mutation}
        id="client_id"
        schema={clientSchema}
        EntityFormDialog={ClientFormDialog}
      />
    </QueryClientProvider>
  );
};
describe("ActionsButton", () => {
  let user: UserEvent;
  let actionsBtn: HTMLElement;

  beforeEach(() => {
    render(<TestComponent />);
    user = userEvent.setup();
    actionsBtn = screen.getByTestId("actions-button");
  });
  it("renders aria-label on button correctly", async () => {
    expect(actionsBtn).toBeInTheDocument();
    expect(actionsBtn).toHaveAttribute("aria-label", "Open actions menu");
  });
  it("opens a dropdown on actions button clicked", async () => {
    await act(async () => await user.click(actionsBtn));

    const deleteBtn = screen.getByText(/delete/i);
    expect(deleteBtn).toBeInTheDocument();
  });
  it("opens a confirmation dialog on delete clicked", async () => {
    await act(async () => await user.click(actionsBtn));

    const deleteBtn = screen.getByText(/delete/i);
    expect(deleteBtn).toBeInTheDocument();

    await act(async () => await user.click(deleteBtn));

    const confirmationDialog = screen.getByText(/confirm deletion/i);
    expect(confirmationDialog).toBeInTheDocument();
  });
  it("shows default data on edit dialog open", async () => {
    await act(async () => await user.click(actionsBtn));

    const editBtn = screen.getByText(/Edit/i);
    await act(async () => await user.click(editBtn));

    const nameInput = screen.getByPlaceholderText(/Pablo Pablissimooo/i);
    expect(nameInput).toHaveValue("Pablo Pablissimooo");

    const emailInput = screen.getByPlaceholderText(/youremail@gmail.com/i);
    expect(emailInput).toHaveValue("youremail@gmail.com");

    const phoneInput = screen.getByPlaceholderText(/\+992546823252/i);
    expect(phoneInput).toHaveValue("+992546823252");
  });
  it("calls onDelete on delete button being clicked and closes", async () => {
    await act(async () => await user.click(actionsBtn));

    const deleteBtn = screen.getByText(/delete/i);
    expect(deleteBtn).toBeInTheDocument();

    await act(async () => {
      await user.click(deleteBtn);
    });

    const confirmationDialog = screen.getByText(/confirm deletion/i);
    expect(confirmationDialog).toBeInTheDocument();

    const deleteBtnDialog = screen.getByText(/delete/i);

    await act(async () => await user.click(deleteBtnDialog));

    expect(mockDelete).toHaveBeenCalledTimes(1);
  });
  it("closes the confirmation dialog on cancel", async () => {
    await act(async () => await user.click(actionsBtn));

    const deleteBtn = screen.getByText(/delete/i);
    expect(deleteBtn).toBeInTheDocument();

    await act(async () => await user.click(deleteBtn));

    const confirmationDialog = screen.getByText(/confirm deletion/i);
    expect(confirmationDialog).toBeInTheDocument();

    const cancelBtnDialog = screen.getByText(/cancel/i);

    await act(async () => await user.click(cancelBtnDialog));

    expect(confirmationDialog).not.toBeInTheDocument();
  });
  it("closes the edit form on cancel", async () => {
    await act(async () => await user.click(actionsBtn));

    const editBtn = screen.getByText(/edit/i);
    expect(editBtn).toBeInTheDocument();

    await act(async () => {
      await user.click(editBtn);
    });

    const editDialog = screen.getByText(/edit client's data/i);
    expect(editDialog).toBeInTheDocument();

    const cancelBtnDialog = screen.getByText(/cancel/i);

    await act(async () => await user.click(cancelBtnDialog));

    expect(editDialog).not.toBeInTheDocument();
  });
});
