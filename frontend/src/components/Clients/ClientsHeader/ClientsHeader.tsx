import type { Dispatch, SetStateAction } from "react";
import AddClientDropdown from "./AddClientDropdown";
import { Button } from "@/components/ui/button";

interface ClientsHeaderProps {
  showDeleted: boolean;
  setShowDeleted: Dispatch<SetStateAction<boolean>>;
}

function ClientsHeader({ showDeleted, setShowDeleted }: ClientsHeaderProps) {
  return (
    <header className="flex flex-col md:flex-row mb-2 md:mb-0 items-start md:justify-between md:items-center">
      <h1 className="font-open text-fluid-2xl text-center md:text-start pt-4 mb-5">
        {showDeleted ? "Deleted Clients" : "Clients"}
      </h1>
      <div className="flex gap-2 items-stretch">
        <Button
          variant="outline"
          onClick={() => setShowDeleted(!showDeleted)}
          className="cursor-pointer"
          aria-label={
            showDeleted
              ? "Go back to clients table"
              : "View deleted clients table"
          }
        >
          {showDeleted ? "Go Back" : "Show Deleted"}
        </Button>
        <AddClientDropdown />
        {/*   
        <AddEntityDropdown<ClientTemplate, Omit<ClientTemplate, "client_id">>
          mutation={useAddNewClient()}
          DropdownTrigger={
            <Button
              type="button"
              className="cursor-pointer"
              aria-label="Add a new client"
            >
              <Plus aria-hidden="true" />
              <span>Add client</span>
            </Button>
          }
          schema={clientSchema}
          EntityForm={ClientFormDialog}
          defaultValues={clientDefaultValues}
        /> */}
      </div>
    </header>
  );
}

export default ClientsHeader;
