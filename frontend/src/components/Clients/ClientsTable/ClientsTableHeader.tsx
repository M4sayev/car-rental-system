import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

function ClientsTableHeader({ deleted = false }: { deleted?: boolean }) {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[150px]">Client ID</TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Email</TableHead>
        <TableHead className="hidden sm:table-cell">Phone</TableHead>
        <TableHead className="text-right">
          {deleted ? "Deleted At" : "Actions"}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}

export default ClientsTableHeader;
