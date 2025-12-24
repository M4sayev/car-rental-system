import ClientsTableHeader from "@/components/Clients/ClientsTable/ClientsTableHeader";
import ClientsTableSkeleton from "@/components/Clients/TableSkeleton/ClientsTableSkeleton";
import DataTableCard from "@/components/DataTableCard/DataTableCard";
import { RadioGroup } from "@/components/ui/radio-group";
import type { ClientTemplate } from "@/constants/clientTemplates";
import { useGetClients } from "@/hooks/queryHooks/clients/useGetClients";
import { UserRoundX } from "lucide-react";
import ClientSelectionRow from "./ClientSelectionRow";
import type { SelectionProps } from "@/pages/CreateRental";

function ClientsSelection({
  setRentalSelection,
  rentalSelection,
}: SelectionProps) {
  const handleClientSelect = (client_id: ClientTemplate["client_id"]) => {
    setRentalSelection((prev) => ({ ...prev, client_id }));
  };

  return (
    <RadioGroup
      onValueChange={handleClientSelect}
      value={rentalSelection?.client_id ?? undefined}
    >
      <DataTableCard<ClientTemplate>
        query={useGetClients()}
        emptyTitle="Oops...No clients to select from."
        emptyDescription="Click 'Add client' to add one."
        emptyIcon={UserRoundX}
        title="Clients Overview"
        Header={ClientsTableHeader}
        Skeleton={ClientsTableSkeleton}
        Row={(client) => (
          <ClientSelectionRow key={client.client_id} client={client} />
        )}
      />
    </RadioGroup>
  );
}

export default ClientsSelection;
