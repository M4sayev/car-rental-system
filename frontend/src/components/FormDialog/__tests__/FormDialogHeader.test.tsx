import { render, screen } from "@testing-library/react";
import FormDialogHeader from "../FormDialogHeader";
import { Dialog } from "@/components/ui/dialog";

describe("FormDialogHeader", () => {
  it("renders title and description correctly", () => {
    render(
      <Dialog>
        <FormDialogHeader title="test" description="description" />
      </Dialog>
    );

    expect(screen.getByText("description")).toBeInTheDocument();
    expect(screen.getByText("test")).toBeInTheDocument();
  });
});
