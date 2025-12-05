import { render, screen } from "@testing-library/react";
import EmptyResponse from "../EmptyResponse";

describe("EmptyResponse", () => {
  it("renders proper role, aria-live, label", () => {
    render(<EmptyResponse label="Test label">Oops..</EmptyResponse>);

    const message = screen.getByTestId("empty-reponse");

    expect(message).toHaveAttribute("role", "status");
    expect(message).toHaveAttribute("aria-live", "polite");
    expect(message).toHaveAttribute("aria-label", "Test label");
  });
  it("renders children properly", () => {
    render(<EmptyResponse label="Test label">Oops..</EmptyResponse>);

    const message = screen.getByTestId("empty-reponse");

    expect(message).toHaveTextContent("Oops..");
  });

  it("adds additional classnames properly", () => {
    render(<EmptyResponse className="p-4 border">Oops..</EmptyResponse>);

    const message = screen.getByTestId("empty-reponse");
    expect(message).toHaveClass("p-4 border");
  });
});
