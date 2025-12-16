import { useAddNewClient } from "@/hooks/queryHooks/clients/useAddNewClient";
import { clientSchema, type ClientFormData } from "@/constants/clientTemplates";
import ClientFormDialog from "../ClientFormDialog/ClientFormDialog";
import AddEntityDropdown from "@/components/AddEntityDropdown/AddEntityDropdown";

export default function AddClientDropdown() {
  const addClientMutation = useAddNewClient();
  return (
    <AddEntityDropdown<ClientFormData>
      formSchema={clientSchema}
      buttonLabel="Add a new client"
      buttonText="Add Client"
      mutation={addClientMutation}
      EntityFormDialog={ClientFormDialog}
    />
  );
}
