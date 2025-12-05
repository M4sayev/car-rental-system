import { render, screen } from "@testing-library/react";
import ClientsTableHeader from "../ClientsTableHeader";

describe("ClientsTableHeader", () => {
  it("renders all the columns names properly", () => {
    render(<ClientsTableHeader />);
    expect(screen.getByText(/client id/i)).toBeInTheDocument();
    expect(screen.getByText(/name/i)).toBeInTheDocument();
    expect(screen.getByText(/email/i)).toBeInTheDocument();
    expect(screen.getByText(/phone/i)).toBeInTheDocument();
    expect(screen.getByText(/actions/i)).toBeInTheDocument();
  });
  it("renders Actions column name on deleted false", () => {
    render(<ClientsTableHeader deleted={true} />);
    expect(screen.getByText(/client id/i)).toBeInTheDocument();
    expect(screen.getByText(/name/i)).toBeInTheDocument();
    expect(screen.getByText(/email/i)).toBeInTheDocument();
    expect(screen.getByText(/phone/i)).toBeInTheDocument();
    expect(screen.getByText(/deleted at/i)).toBeInTheDocument();
  });
});
