import { render, screen } from "@testing-library/react";
import ErrorMessage from "../ErrorMessage";

describe("ErrorMessage", () => {
  it("renders proper role, aria-live", () => {
    render(<ErrorMessage error={null}>Oops..</ErrorMessage>);

    const message = screen.getByTestId("api-error");

    expect(message).toHaveAttribute("role", "status");
    expect(message).toHaveAttribute("aria-live", "polite");
  });
  it("renders children properly", () => {
    render(<ErrorMessage error={null}>Oops..</ErrorMessage>);

    const message = screen.getByTestId("api-error");

    expect(message).toHaveTextContent("Oops..");
  });
  it("logs the error", () => {
    const err = new Error("unkown error");
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    render(<ErrorMessage error={err}>Oops..</ErrorMessage>);
    expect(consoleSpy).toHaveBeenCalledWith(err);
  });
  it("adds additional classnames properly", () => {
    const err = new Error("unkown error");
    render(
      <ErrorMessage error={err} className="p-4 border">
        Oops..
      </ErrorMessage>
    );

    const message = screen.getByTestId("api-error");
    expect(message).toHaveClass("p-4 border");
  });
});
