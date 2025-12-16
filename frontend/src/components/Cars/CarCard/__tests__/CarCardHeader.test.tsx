import { render, screen } from "@testing-library/react";
import CarCardHeader from "../CarCardHeader";

describe("CarCardHeader", () => {
  beforeEach(() => {
    render(
      <CarCardHeader
        image_url="/media/test"
        name="name"
        description="test car header description"
      />
    );
  });
  it("renders correct image url, alt", () => {
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "http://127.0.0.1:8000/media/test");
    expect(img).toHaveAttribute("alt", "Car name");
  });
  it("renders description, name correctly", () => {
    expect(screen.getByText("name")).toBeInTheDocument();
    expect(
      screen.getByText(/test car header description/i)
    ).toBeInTheDocument();
  });
});
