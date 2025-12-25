import { render, screen } from "@testing-library/react";
import { Dialog } from "@/components/ui/dialog";
import CustomDialogHeader from "../CustomDialogHeader";

describe("CustomDialogHeader", () => {
  it("renders title and description correctly", () => {
    render(
      <Dialog>
        <CustomDialogHeader
          title="test"
          description="description"
          showDescription={true}
        />
      </Dialog>
    );

    expect(screen.getByText("description")).toBeInTheDocument();
    expect(screen.getByText("test")).toBeInTheDocument();
  });
  it("show description only for sr on showDescription true", () => {
    render(
      <Dialog>
        <CustomDialogHeader title="test" description="description" />
      </Dialog>
    );
    const description = screen.getByText("description");
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass("sr-only");
  });
});
