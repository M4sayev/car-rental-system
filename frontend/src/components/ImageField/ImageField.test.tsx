import {
  render,
  renderHook,
  screen,
  cleanup,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import ImageField from "./ImageField";
import { vi } from "vitest";

// Mock URL.createObjectURL
vi.spyOn(URL, "createObjectURL").mockReturnValue("blob://mock-preview");

// Mock react-dropzone properly
vi.mock("react-dropzone", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useDropzone: ({ onDrop }: any) => ({
    getRootProps: () => ({ "data-testid": "dropzone-root" }),
    getInputProps: () => ({
      "data-testid": "dropzone-input",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onChange: (e: any) => {
        if (e.target.files && e.target.files.length > 0) {
          onDrop(e.target.files);
        }
      },
    }),
    open: vi.fn(),
  }),
}));

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

    // Upload the file
    await act(async () => await user.upload(input, file));

    // Form value should be updated
    expect(result.current.getValues("img")).toBe(file);

    // URL.createObjectURL called for preview
    expect(URL.createObjectURL).toHaveBeenCalledTimes(1);

    // Preview image should appear
    const preview = screen.getByAltText("preview") as HTMLImageElement;
    expect(preview).toBeInTheDocument();
    expect(preview.src).toContain("blob://mock-preview");
  });
});
