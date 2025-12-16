import { TableCell, TableRow } from "@/components/ui/table";
import ShortID from "@/components/ui/custom/ShortID";
import {
  clientSchema,
  type ClientFormData,
  type ClientTemplate,
} from "@/constants/clientTemplates";

import { useDeleteClient } from "@/hooks/queryHooks/clients/useDeleteClient";
import { ActionsButton } from "@/components/ActionsButton/ActionsButton";
import { useUpdateClient } from "@/hooks/queryHooks/clients/useUpdateClient";
import ClientFormDialog from "../ClientFormDialog/ClientFormDialog";
import EmailLink from "@/components/A11y/EmailLink";
import PhoneLink from "@/components/A11y/PhoneLink";
import DateTime from "@/components/A11y/DateTime";
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
  const deleteClientMutation = useDeleteClient();
  const updateCLientMutation = useUpdateClient();
  const { client_id, name, email, phone } = client;

  return (
    <TableRow key={client_id} className="h-12">
      <TableCell className="font-medium">
        <ShortID id={client_id} />
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>
        <EmailLink email={email} />
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        <PhoneLink phone={phone} />
      </TableCell>
      <TableCell className="text-right">
        {deleted ? (
          <DateTime date={formatStringToISO(deletedAt)} />
        ) : (
          <ActionsButton<ClientFormData>
            defaultData={{ name, email, phone }}
            id={client_id}
            onDelete={() => deleteClientMutation.mutate(client.client_id)}
            mutation={updateCLientMutation}
            schema={clientSchema}
            EntityFormDialog={ClientFormDialog}
          />
        )}
      </TableCell>
    </TableRow>
  );
}

export default ClientsRow;
