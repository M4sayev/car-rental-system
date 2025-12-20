import { render, renderHook, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import ImageField from "../ImageField";
import { vi } from "vitest";

vi.mock("react-dropzone", () => {
  return {
    useDropzone: vi.fn().mockImplementation(({ onDrop }) => ({
      getRootProps: () => ({ "data-testid": "dropzone-root" }),
      getInputProps: () => ({ "data-testid": "dropzone-input" }),
      open: vi.fn(),
      onDrop,
    })),
  };
});

const mockCreate = vi
  .spyOn(URL, "createObjectURL")
  .mockReturnValue("blob://mock-preview");

describe("ImageField", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders label", () => {
    const { result } = renderHook(() =>
      useForm({ defaultValues: { img: null } })
    );

    render(
      <ImageField
        name="img"
        control={result.current.control}
        label="Profile Picture"
      />
    );

    expect(screen.getByText("Profile Picture")).toBeInTheDocument();
  });

  it("uploads file and displays preview image", async () => {
    const user = userEvent.setup();
    const file = new File(["test"], "test.png", { type: "image/png" });

    const { result } = renderHook(() =>
      useForm({ defaultValues: { img: null } })
    );

    render(<ImageField name="img" control={result.current.control} />);

    const input = screen.getByTestId("dropzone-input") as HTMLInputElement;

    await user.upload(input, file);

    expect(result.current.getValues("img")).toBe(file);

    expect(mockCreate).toHaveBeenCalledTimes(1);

    const preview = screen.getByAltText("preview") as HTMLImageElement;
    expect(preview).toBeInTheDocument();
    expect(preview.src).toContain("blob://mock-preview");
  });
});
