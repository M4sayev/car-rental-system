import { TableCell, TableRow } from "@/components/ui/table";
import ShortID from "../../ui/custom/ShortID";
import type { RecentRentalTemplate } from "@/constants/dashBoardTemplates";
import { COLOR_MAP } from "@/constants/colorConstants";
import { formatStringToISO } from "@/utils/utils";

function RentalRow({ rental }: { rental: RecentRentalTemplate }) {
  const { rental_id, client_name, car_name, start_date, end_date, status } =
    rental;
  const iconColor = status === "active" ? "green" : "blue";
  const color = COLOR_MAP[iconColor];
  return (
    <TableRow className="h-12">
      <TableCell className="font-medium">
        <ShortID id={rental_id} />
      </TableCell>
      <TableCell>{client_name}</TableCell>
      <TableCell className="hidden lg:table-cell">{car_name}</TableCell>
      <TableCell className="hidden sm:table-cell">
        {formatStringToISO(start_date)}
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        {end_date ? formatStringToISO(end_date) : "-"}
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
