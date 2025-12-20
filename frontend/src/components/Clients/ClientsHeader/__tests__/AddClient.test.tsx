import { act, fireEvent, render, screen } from "@testing-library/react";
import AddClientDropdown from "../AddClientDropdown";
import userEvent from "@testing-library/user-event";

const mockMutate = vi.fn();

// Mock mutation hook
vi.mock("@/hooks/queryHooks/clients/useAddNewClient", () => ({
  useAddNewClient: () => ({
    mutate: mockMutate,
  }),
}));

describe("AddClientDropdown", () => {
  let button: HTMLButtonElement;
  beforeEach(() => {
    render(<AddClientDropdown />);
    button = screen.getByText(/Add Client/i);
  });
  it("renders Add Client button", () => {
    expect(button).toBeInTheDocument();
  });

  it("opens dialog on button click", () => {
    fireEvent.click(button);

    expect(screen.getByTestId("client-form-dialog")).toBeInTheDocument();
  });

  it("calls mutate on form submit", async () => {
    await act(async () => {
      const user = userEvent.setup();
      await user.click(button);

      // random placholders I chose for the ClientFormDialog
      const nameInput = screen.getByPlaceholderText("Pablo Pablissimooo");
      const emailInput = screen.getByPlaceholderText("youremail@gmail.com");
      const phoneInput = screen.getByPlaceholderText("+992546823252");

      await user.type(nameInput, "Pablo Pablissimooo");

      await user.type(emailInput, "youremail@gmail.com");
      await user.type(phoneInput, "+992546823252");

      const submitButton = screen.getByRole("button", { name: /Create/i });

      await user.click(submitButton);

      expect(mockMutate).toHaveBeenCalledTimes(1);
    });
  });
});
