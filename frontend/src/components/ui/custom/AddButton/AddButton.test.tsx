import { render, screen } from "@testing-library/react";
import AddButton from "./AddButton";

describe("Add button", () => {
  let button: HTMLButtonElement;
  beforeEach(() => {
    render(
      <AddButton
        ariaLabel="test label"
        actionText="Add test"
        className="w-100"
      />
    );
    button = screen.getByTestId("add-button");
  });
  it("add aria-hidden to the icon", () => {
    const svg = screen.getByTestId("plus-icon");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });
  it("renders button with the text and the aria-label properly", () => {
    expect(button).toHaveTextContent(/add test/i);
    expect(button).toHaveAttribute("aria-label", "test label");
  });
  it("adds additional className", () => {
    expect(button).toHaveClass("w-100");
  });
});
