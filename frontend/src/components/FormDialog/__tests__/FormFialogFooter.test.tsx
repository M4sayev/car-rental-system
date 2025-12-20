import { Dialog } from "@/components/ui/dialog";
import { render, screen } from "@testing-library/react";
import FormDialogFooter from "../FormDialogFooter";

describe("FormDialogFooter", () => {
  it("renders default values if not provided and create on create mode", () => {
    render(
      <Dialog>
        <FormDialogFooter mode="create" />
      </Dialog>
    );

    const closeBtn = screen.getByLabelText(
      "Cancel actions and close the dialog"
    );

    const actionBtn = screen.getByLabelText("Create a new item");

    expect(closeBtn).toBeInTheDocument();
    expect(closeBtn).toHaveTextContent("Cancel");
    expect(actionBtn).toBeInTheDocument();
    expect(actionBtn).toHaveTextContent("Create");
  });
  it("renders ariaSumbitLabel, ariCancelLabel", () => {
    render(
      <Dialog>
        <FormDialogFooter
          mode="create"
          ariaCancelLabel="test cancel"
          ariaSubmitLabel="test submit"
        />
      </Dialog>
    );

    const closeBtn = screen.getByLabelText("test cancel");

    const actionBtn = screen.getByLabelText("test submit");

    expect(closeBtn).toBeInTheDocument();
    expect(actionBtn).toBeInTheDocument();
  });
  it("renders submitLabel, cancelLabel", () => {
    render(
      <Dialog>
        <FormDialogFooter
          mode="create"
          submitLabel="test submit"
          cancelLabel="test cancel"
        />
      </Dialog>
    );

    const closeBtn = screen.getByLabelText(
      "Cancel actions and close the dialog"
    );

    const actionBtn = screen.getByLabelText("Create a new item");

    expect(closeBtn).toHaveTextContent("test cancel");
    expect(actionBtn).toHaveTextContent("test submit");
  });
  it("renders update on edit mode", () => {
    render(
      <Dialog>
        <FormDialogFooter mode="edit" />
      </Dialog>
    );

    const actionBtn = screen.getByLabelText("Edit the selected item");

    expect(actionBtn).toHaveTextContent("Update");
  });
});
