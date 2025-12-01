import { TableCell, TableRow } from "@/components/ui/table";
import ShortID from "./ShortID";
import type { RecentRentalTemplate } from "@/constants/dashBoardTemplates";
import { COLOR_MAP } from "@/constants/colorConstants";

function RentalRow({ rental }: { rental: RecentRentalTemplate }) {
  const { rental_id, client_name, car_name, start_date, end_date, status } =
    rental;
  const iconColor = status === "active" ? "green" : "blue";
  const color = COLOR_MAP[iconColor];
  const formated_start_date = new Date(start_date);
  const formated_end_date = end_date ? new Date(start_date) : null;
  return (
    <TableRow className="h-12">
      <TableCell className="font-medium">
        <ShortID id={rental_id} />
      </TableCell>
      <TableCell>{client_name}</TableCell>
      <TableCell className="hidden sm:table-cell">{car_name}</TableCell>
      <TableCell className="hidden sm:table-cell">
        {formated_start_date.toLocaleDateString()}
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        {formated_end_date ? formated_end_date.toLocaleDateString() : "-"}
      </TableCell>
      <TableCell className="text-right w-[10%]">
        <span
          style={{ backgroundColor: color.bg, color: color.icon }}
          className=" px-2 sm:px-4 py-1 rounded-lg"
        >
          {status}
        </span>
      </TableCell>
    </TableRow>
  );
}

export default RentalRow;
