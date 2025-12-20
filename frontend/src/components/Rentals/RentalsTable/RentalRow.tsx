import DateTime from "@/components/A11y/DateTime";
import ShortID from "@/components/ui/custom/ShortID";
import { TableCell, TableRow } from "@/components/ui/table";
import type { RentalTemplate } from "@/constants/rentalsTemplates";
import { formatStringToISO, getStatusColor } from "@/utils/utils";
import { useState } from "react";
import RentalDialog from "../RentalDialog/RentalDialog";
import StatusSpan from "@/components/ui/custom/StatusSpan";

function RentalRow({ rental }: { rental: RentalTemplate }) {
  const [isOpen, setIsOpen] = useState(false);
  const { rental_id, client, car, start_date, end_date, is_active } = rental;
  const carName = `${car.brand} ${car.model} (${car.car_type})`;
  const clientName = client.name;
  const status = is_active ? "active" : "completed";
  const color = getStatusColor(status);

  const handleRowClicked = () => {
    setIsOpen(true);
  };

  const handleEnterClicked = (
    event: React.KeyboardEvent<HTMLTableRowElement>
  ) => {
    if (event.key !== "Enter") return;
    setIsOpen(true);
  };

  return (
    <>
      <TableRow
        className="h-12"
        onClick={handleRowClicked}
        tabIndex={0}
        onKeyDown={handleEnterClicked}
      >
        <TableCell className="font-medium">
          <ShortID id={rental_id} />
        </TableCell>
        <TableCell>{clientName}</TableCell>
        <TableCell className="hidden lg:table-cell">{carName}</TableCell>
        <TableCell className="hidden sm:table-cell">
          <DateTime date={formatStringToISO(start_date)} />
        </TableCell>
        <TableCell className="hidden lg:table-cell">
          {end_date ? (
            <DateTime date={formatStringToISO(end_date)} />
          ) : (
            <span aria-label="No end date for this rental">-</span>
          )}
        </TableCell>
        <TableCell className="text-right w-[10%]">
          <StatusSpan color={color} status={status} />
        </TableCell>
      </TableRow>
      <RentalDialog rental={rental} open={isOpen} setOpen={setIsOpen} />
    </>
  );
}

export default RentalRow;
