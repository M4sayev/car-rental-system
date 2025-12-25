import { render, screen } from "@testing-library/react";
import ClientSelectionRow from "../ClientSelectionRow";
import { mockClient } from "@/test/mockData";
import { RadioGroup } from "@/components/ui/radio-group";
import { Table, TableBody } from "@/components/ui/table";

describe("ClientSelectionRow", () => {
  it("renders all child components correctly", () => {
    render(
      <RadioGroup>
        <Table>
          <TableBody>
            <ClientSelectionRow client={mockClient} />
          </TableBody>
        </Table>
      </RadioGroup>
    );

    Object.values(mockClient).map((value) =>
      expect(screen.getByText(value)).toBeInTheDocument()
    );
  });
});
