import { render, screen, waitFor } from "@testing-library/react";

import { ArrowUp } from "lucide-react";
import CustomCard from "../CustomCard";

vi.mock("@/components/ui/custom/ClientSideCountUp", () => ({
  default: ({ end }: { end: string }) => <span>{end}</span>,
}));

describe("CustomCard", () => {
  it("renders header, result, and description", () => {
    render(
      <CustomCard
        headerText="Revenue"
        result="123"
        description="Total revenue"
        Icon={ArrowUp}
      />
    );

    expect(screen.getByText("Revenue")).toBeInTheDocument();
    expect(screen.getByText("Total revenue")).toBeInTheDocument();
  });

  it("passes numeric result to ClientSideCountUp", async () => {
    render(
      <CustomCard
        headerText="Revenue"
        result="99"
        description="Test"
        Icon={ArrowUp}
      />
    );

    await waitFor(() => {
      expect(screen.getByText("99")).toBeInTheDocument();
    });
  });
});
