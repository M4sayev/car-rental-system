import { render, renderHook, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import FormField from "../FormField";
import userEvent from "@testing-library/user-event";

describe("FormField", () => {
  it("hides error even if the input is falsy on hideError true", async () => {
    const user = userEvent.setup();
    const result = renderHook(() =>
      useForm({ defaultValues: { age: 0 } })
    ).result;

    render(
      <FormField
        name="age"
        control={result.current.control}
        label="Age"
        type="number"
        placeholder="Enter age"
        hideError={true}
      />
    );

    result.current.register("age", { min: 5 });

    const input = screen.getByLabelText("Age");

    await user.clear(input);
    await user.type(input, "1");

    const error = screen.queryByText(/error/i);
    expect(error).toBeNull();
  });
  it("renders min and step for number inputs", () => {
    const { result } = renderHook(() => useForm({ defaultValues: { age: 0 } }));

    render(
      <FormField
        name="age"
        control={result.current.control}
        label="Age"
        type="number"
        placeholder="Enter age"
        minVal={10}
        step={0.5}
      />
    );

    const input = screen.getByLabelText("Age");

    expect(input).toHaveAttribute("min", "10");
    expect(input).toHaveAttribute("step", "0.5");
  });
  it("renders label correctly", () => {
    const { result } = renderHook(() => useForm({ defaultValues: { age: 0 } }));

    render(
      <FormField
        name="age"
        control={result.current.control}
        label="Age"
        type="number"
        placeholder="Enter age"
      />
    );

    expect(screen.getByLabelText("Age")).toBeInTheDocument();
  });
  it("coerces number inputs to numbers", async () => {
    const result = renderHook(() =>
      useForm({ defaultValues: { age: 0 } })
    ).result;

    render(
      <FormField
        name="age"
        control={result.current.control}
        label="Age"
        type="number"
        placeholder="Enter age"
      />
    );

    const input = screen.getByLabelText("Age") as HTMLInputElement;

    await userEvent.type(input, "42");

    expect(result.current.getValues("age")).toBe(42);
  });
});
