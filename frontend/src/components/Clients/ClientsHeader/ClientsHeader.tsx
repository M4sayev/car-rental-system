import type { Dispatch, SetStateAction } from "react";
import AddClientDropdown from "./AddClientDropdown";
import { Button } from "@/components/ui/button";

interface ClientsHeaderProps {
  showDeleted: boolean;
  setShowDeleted: Dispatch<SetStateAction<boolean>>;
}

function ClientsHeader({ showDeleted, setShowDeleted }: ClientsHeaderProps) {
  return (
    <>
      <header className="flex justify-between items-center">
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
                ? "Go Back to Clients Table"
                : "View Deleted Clients Table"
            }
          >
            {showDeleted ? "Go Back" : "Show Deleted"}
          </Button>
          <AddClientDropdown />
        </div>
      </header>
    </>
  );
}

export default ClientsHeader;
