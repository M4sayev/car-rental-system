import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

function ClientsTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">Client ID</TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Email</TableHead>
        <TableHead className="hidden sm:table-cell">Phone</TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
}

export default ClientsTableHeader;
