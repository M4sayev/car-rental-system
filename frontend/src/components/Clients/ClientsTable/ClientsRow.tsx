import { TableCell, TableRow } from "@/components/ui/table";
import ShortID from "@/components/ui/custom/ShortID";
import type { ClientTemplate } from "@/constants/clientTemplates";

import { Actions } from "@/components/ui/custom/Action/Action";
import { useDeleteClient } from "@/hooks/queryHooks/clients/useDeleteClient";
import { formatStringToISO } from "@/utils/utils";

interface ClientsRow {
  client: ClientTemplate;
  deleted?: boolean;
  deletedAt?: string;
}

function ClientsRow({
  client,
  deleted = false,
  deletedAt = "unknown",
}: ClientsRow) {
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
        {deleted ? (
          // convert the date into readable format
          formatStringToISO(deletedAt)
        ) : (
          <Actions
            type="client"
            defaultData={client}
            onDelete={() => deleteClientMutation.mutate(client.client_id)}
          />
        )}
      </TableCell>
    </TableRow>
  );
}

export default ClientsRow;
