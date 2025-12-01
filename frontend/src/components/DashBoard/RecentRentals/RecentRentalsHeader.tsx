import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

function RecentRentalsHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">Rental ID</TableHead>
        <TableHead>Client</TableHead>
        <TableHead className="hidden sm:table-cell">Car</TableHead>
        <TableHead className="hidden sm:table-cell">Start Date</TableHead>
        <TableHead className="hidden sm:table-cell">End Date</TableHead>
        <TableHead className="text-right">Status</TableHead>
      </TableRow>
    </TableHeader>
  );
}

export default RecentRentalsHeader;
