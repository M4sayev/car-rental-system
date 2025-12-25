import DateTime from "@/components/A11y/DateTime";
import StatusSpan from "@/components/ui/custom/StatusSpan";
import type { Status } from "@/constants/rentalsTemplates";
import { getStatusColor } from "@/utils/utils";

interface RentalDialogItemProps {
  placeholder: string;
  value: string;
}

function RentalItemValue({ placeholder, value }: RentalDialogItemProps) {
  if (placeholder === "end date" || placeholder === "start date")
    return <DateTime className="font-semibold" date={value} />;

  if (placeholder === "status")
    return (
      <StatusSpan
        className="font-semibold"
        status={value}
        color={getStatusColor(value as Status)}
      />
    );

  if (placeholder === "total cost")
    return <span className="font-semibold">{value}$</span>;

  return <span className="font-semibold text-end">{value}</span>;
}

function RentalDialogItem({ placeholder, value }: RentalDialogItemProps) {
  return (
    <li className="flex justify-between items-center border-b py-3 text-fluid-s">
      <span className="text-muted-foreground capitalize">{placeholder}</span>
      <RentalItemValue placeholder={placeholder} value={value} />
    </li>
  );
}

export default RentalDialogItem;
