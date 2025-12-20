import ClientsHeader from "@/components/Clients/ClientsHeader/ClientsHeader";
import ClientsRow from "@/components/Clients/ClientsTable/ClientsRow";
import ClientsTableHeader from "@/components/Clients/ClientsTable/ClientsTableHeader";
import ClientsTableSkeleton from "@/components/Clients/ClientsTable/ClientsTableSkeleton";
import DataTableCard from "@/components/DataTableCard/DataTableCard";
import type { ClientTemplate } from "@/constants/clientTemplates";
import { useGetClients } from "@/hooks/queryHooks/clients/useGetClients";
import { useGetDeletedClients } from "@/hooks/queryHooks/clients/useGetDeletedClients.";
import { UserRoundX } from "lucide-react";
import { useState } from "react";

function Clients() {
  const [showDeletedClients, setShowDeletedClients] = useState(false);

  // call both to avoid calling hooks conditionally
  const clientsQuery = useGetClients();
  const deletedClientsQuery = useGetDeletedClients();

  const queryToUse = showDeletedClients ? deletedClientsQuery : clientsQuery;

  return (
    <div className="min-h-screen px-5 md:px-8 py-2 max-w-md sm:max-w-xl md:max-w-7xl  mx-auto">
      <ClientsHeader
        showDeleted={showDeletedClients}
        setShowDeleted={setShowDeletedClients}
      />
      <DataTableCard<ClientTemplate, { deleted?: boolean }>
        queryFn={queryToUse}
        emptyLabel={
          showDeletedClients
            ? "no deleted clients in the database"
            : "no clients in the database"
        }
        emptyTitle={
          showDeletedClients ? "Oops..." : "Oops...No clients in the database."
        }
        emptyDescription={
          showDeletedClients
            ? "No deleted clients in the database."
            : "Click add a client to add one."
        }
        emptyIcon={UserRoundX}
        title={
          showDeletedClients ? "Deleted Clients Overview" : "Clients Overview"
        }
        Header={ClientsTableHeader}
        headerProps={{ deleted: showDeletedClients }}
        Skeleton={ClientsTableSkeleton}
        Row={(client) => (
          <ClientsRow
            key={client.client_id}
            client={client}
            deleted={showDeletedClients}
            deletedAt={showDeletedClients ? client.deletion_date : undefined}
          />
        )}
      />
    </div>
  );
}

export default Clients;
