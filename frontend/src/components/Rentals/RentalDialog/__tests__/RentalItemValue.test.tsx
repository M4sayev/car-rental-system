import { render, screen } from "@testing-library/react";
import RentalDialogItem from "../RentalDialogItem";

const renderDialogItem = (value: string, placeholder: string) => {
  return render(<RentalDialogItem value={value} placeholder={placeholder} />);
};
describe("RentalDialogItem", () => {
  it("renders all child component correctly", () => {
    renderDialogItem("test", "placeholder");
    expect(screen.getByText("test")).toBeInTheDocument();
    expect(screen.getByText("placeholder")).toBeInTheDocument();
  });
  it("renders status time, status, cost elements differently", () => {
    // cost
    const rerender = renderDialogItem("test", "total cost").rerender;

    expect(screen.getByText("test$")).toBeInTheDocument();

    // status
    rerender(<RentalDialogItem value="available" placeholder="status" />);

    const status = screen.getByText("available");
    expect(status).toBeInTheDocument();
    expect(status).toHaveStyle(
      `background-color: rgb(230, 250, 236); color: rgb(22, 163, 74)`
    );

    // date
    rerender(<RentalDialogItem value="data" placeholder="start date" />);
    const time = screen.getByRole("time");
    expect(time).toBeInTheDocument();
    expect(time).toHaveTextContent("data");
  });
});
