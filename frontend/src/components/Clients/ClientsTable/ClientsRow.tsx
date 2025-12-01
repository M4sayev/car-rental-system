import { TableCell, TableRow } from "@/components/ui/table";
import ShortID from "@/components/DashBoard/RecentRentals/ShortID";
import type { ClientTemplate } from "@/constants/clientTemplates";

import { Actions } from "@/components/Action/Action";
import { useDeleteClient } from "@/hooks/queryHooks/clients/useDeleteClient";

function ClientsRow({ client }: { client: ClientTemplate }) {
  const { client_id, name, email, phone } = client;

  const deleteClientMutation = useDeleteClient();
  return (
    <TableRow key={client_id} className="h-12">
      <TableCell className="font-medium">
        <ShortID id={client_id} />
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell className="hidden sm:table-cell">{phone}</TableCell>
      <TableCell className="text-right">
        <Actions
          type="client"
          onDelete={() => deleteClientMutation.mutate(client.client_id)}
        />
      </TableCell>
    </TableRow>
  );
}

export default ClientsRow;
