import { render, screen } from "@testing-library/react";
import ClientFormDialog from "./ClientFormDialog";
import { useForm } from "react-hook-form";
import { Dialog } from "@radix-ui/react-dialog";
import type { modeType } from "@/types/forms";
import { mockClient } from "@/test/mockData";

function Wrapper({ mode }: { mode: modeType }) {
  const defaultValues =
    mode === "edit" ? mockClient : { name: "", email: "", phone: "" };
  const form = useForm({
    defaultValues: defaultValues,
  });

  const onSubmit = vi.fn();

  return (
    // ClientFormDialog is just DialogContent so it needs to wrapped in a Dialog that is open
    <Dialog open={true}>
      <ClientFormDialog form={form} onSubmit={onSubmit} mode={mode} />
    </Dialog>
  );
}

describe("ClientFormDialog", () => {
  it("renders inputs with correct id, placeholder", () => {
    render(<Wrapper mode="create" />);

    const nameInput = screen.getByPlaceholderText(/Pablo Pablissimooo/i);
    const emailInput = screen.getByPlaceholderText(/youremail@gmail.com/i);
    const phoneInput = screen.getByPlaceholderText("+992546823252");

    expect(nameInput).toBeInTheDocument();
    expect(nameInput).toHaveAttribute("id", "name");
    expect(nameInput).toHaveAttribute("aria-invalid", "false");
    expect(nameInput).toHaveAttribute("autocomplete", "off");

    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("id", "email");
    expect(emailInput).toHaveAttribute("aria-invalid", "false");
    expect(emailInput).toHaveAttribute("autocomplete", "off");

    expect(phoneInput).toBeInTheDocument();
    expect(phoneInput).toHaveAttribute("id", "phone");
    expect(phoneInput).toHaveAttribute("aria-invalid", "false");
    expect(phoneInput).toHaveAttribute("autocomplete", "off");
  });
  it("renders the header footer correctly on create mode", () => {
    render(<Wrapper mode="create" />);
    expect(screen.getByText(/Add new client/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Enter the client's details below to add them to your database./i
      )
    ).toBeInTheDocument();
    const cancelButton = screen.getByLabelText(
      /Cancel actions and close the dialog/i
    );
    expect(cancelButton).toBeInTheDocument();
    expect(cancelButton).toHaveTextContent("Cancel");

    const createEditButton = screen.getByLabelText(/Create a new client/i);
    expect(createEditButton).toBeInTheDocument();

    expect(createEditButton).toHaveTextContent("Create");
  });
  it("renders the header footer correctly on edit mode", () => {
    render(<Wrapper mode="edit" />);

    expect(screen.getByText(/Edit the client's data./i)).toBeInTheDocument();

    const cancelButton = screen.getByLabelText(
      /Cancel actions and close the dialog/i
    );
    expect(cancelButton).toBeInTheDocument();
    expect(cancelButton).toHaveTextContent("Cancel");

    const createEditButton = screen.getByLabelText(
      /Edit the current client's data/i
    );
    expect(createEditButton).toBeInTheDocument();

    expect(createEditButton).toHaveTextContent("Update");
  });
  it("renders default data on edit mode", () => {
    render(<Wrapper mode="edit" />);

    const nameInput = screen.getByPlaceholderText(/Pablo Pablissimooo/i);
    const emailInput = screen.getByPlaceholderText(/youremail@gmail.com/i);
    const phoneInput = screen.getByPlaceholderText("+992546823252");

    expect(nameInput).toHaveValue(mockClient.name);
    expect(emailInput).toHaveValue(mockClient.email);
    expect(phoneInput).toHaveValue(mockClient.phone);
  });
});
