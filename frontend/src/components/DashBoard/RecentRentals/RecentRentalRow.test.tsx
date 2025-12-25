import { render, screen } from "@testing-library/react";
import { mockRecentRental } from "@/test/mockData";
import RecentRentalRow from "./RentalRecentRow";

describe("RecentRentalRow", () => {
  it("renders rental row correctly", () => {
    render(
      <table>
        <tbody>
          <RecentRentalRow rental={mockRecentRental} />
        </tbody>
      </table>
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Toyota")).toBeInTheDocument();
    expect(screen.getByText("active")).toBeInTheDocument();
    expect(screen.getByText("-")).toBeInTheDocument();
  });
});
