import { clientSchema, type ClientFormData } from "@/constants/clientTemplates";
import AddEntityDropdown from "./AddEntityDropdown";
import ClientFormDialog from "../Clients/ClientFormDialog/ClientFormDialog";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockAdd = vi.fn();

vi.mock("@/hooks/queryHooks/clients/useAddClient", () => ({
  useUpdateClient: () => ({
    mutate: mockAdd,
  }),
}));

const mutation = {
  mutate: mockAdd,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

describe("AddEntityDropdown", () => {
  beforeEach(() => {
    render(
      <AddEntityDropdown<ClientFormData>
        formSchema={clientSchema}
        buttonText="test button text"
        buttonLabel="test button label"
        EntityFormDialog={ClientFormDialog}
        mutation={mutation}
      />
    );
  });
  it("renders button with proper aria-label and type and text", () => {
    const button = screen.getByLabelText(/test button label/i);
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveTextContent(/test button text/i);
  });
  it("opens add entity dropdown on click", async () => {
    const user = userEvent.setup();
    const button = screen.getByLabelText(/test button label/i);
    await act(async () => await user.click(button));

    const addDialog = screen.getByTestId("client-form-dialog");
    expect(addDialog).toBeInTheDocument();
  });
});
