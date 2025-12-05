import { render, screen } from "@testing-library/react";
import EmptyState from "./EmptyState";
import { Calendar } from "lucide-react";

describe("EmptyClientsTable", () => {
  beforeEach(() => {
    render(
      <EmptyState
        Icon={Calendar}
        title="Oops..."
        description="nothing in the database."
      />
    );
  });
  it("renders the icon with aria-hidden true correctly", () => {
    const icon = screen.getByTestId("empty-state-icon");

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("aria-hidden", "true");
  });
  it("renders children with proper texts", () => {
    expect(screen.getByText(/Oops.../i)).toBeInTheDocument();
    expect(screen.getByText("nothing in the database.")).toBeInTheDocument();
  });
});
