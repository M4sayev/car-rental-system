import { render, screen } from "@testing-library/react";
import ToggleButtons from "./ToggleButtons";
import { mockToggleButtonValues } from "@/test/mockData";
import userEvent from "@testing-library/user-event";

const mockSetValue = vi.fn();

describe("ToggleButtons", () => {
  let toggleBtns: HTMLElement;
  beforeEach(() => {
    render(
      <ToggleButtons
        values={mockToggleButtonValues}
        setValue={mockSetValue}
        value={mockToggleButtonValues[0]}
      />
    );
    toggleBtns = screen.getByTestId("toggle-btns");
  });
  it("sets aria-labels correctly", () => {
    expect(toggleBtns).toBeInTheDocument();

    const btns = toggleBtns.querySelectorAll("button");

    for (let i = 0; i < btns.length; i++)
      expect(btns[i]).toHaveAttribute(
        "aria-label",
        `Toggle ${mockToggleButtonValues[i]}`
      );
  });
  it("calls setValue on click", async () => {
    const user = userEvent.setup();
    const btns = toggleBtns.querySelectorAll("button");
    for (let i = 0; i < btns.length; i++) await user.click(btns[i]);

    expect(mockSetValue).toHaveBeenCalledTimes(btns.length);
  });
});
