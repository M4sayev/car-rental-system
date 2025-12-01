import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody } from "@/components/ui/table";
import ClientsTableHeader from "./ClientsTableHeader";
import type { ClientTemplate } from "@/constants/clientTemplates";
import ClientsRow from "./ClientsRow";
import { useGetClients } from "@/hooks/queryHooks/clients/useGetClients";
import ErrorMessage from "@/components/API/ErrorMessage";

function ClientsTable() {
  const { data, isError, isLoading, error } = useGetClients();

  if (isError || !data)
    return (
      <ErrorMessage error={error}>
        Could not connect to the server...
      </ErrorMessage>
    );

  if (isLoading) return <div>loading...</div>;

  return (
    <Card className="max-h-160 overflow-auto mb-20 md:mb-10">
      <CardHeader className="">Clients Overview</CardHeader>
      <CardContent>
        <Table>
          <ClientsTableHeader />
          <TableBody>
            {data.map((client: ClientTemplate) => (
              <ClientsRow key={client.client_id} client={client} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default ClientsTable;
