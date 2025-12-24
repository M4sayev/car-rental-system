import CarsSelection from "@/components/Rentals/CreateRental/CarSelection/CarsSelection";
import CreateRentalHeader from "@/components/Rentals/CreateRental/CreateRentalHeader/CreateRentalHeader";
import { SEARCH_DEBOUNCE_MS } from "@/constants/search";
import { useState, type Dispatch, type SetStateAction } from "react";
import { useDebounce } from "use-debounce";
import ClientsSelection from "@/components/Rentals/CreateRental/Selections/ClientsSelection";

export type SelectionStage = "car" | "client";

export interface RentalSelection {
  vehicle_id: string;
  client_id: string;
}

export interface SelectionProps {
  setRentalSelection: Dispatch<SetStateAction<RentalSelection>>;
  rentalSelection: RentalSelection;
}

function CreateRental() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, SEARCH_DEBOUNCE_MS);
  const [currentStage, setCurrentStage] = useState<SelectionStage>("car");
  const [rentalSelection, setRentalSelection] = useState<RentalSelection>({
    vehicle_id: "",
    client_id: "",
  });

  return (
    <section className="min-h-screen px-5 md:px-8 py-2 max-w-md sm:max-w-xl md:max-w-7xl mx-auto">
      <CreateRentalHeader
        searchQuery={debouncedSearchQuery}
        setSearchQuery={setSearchQuery}
        currentStage={currentStage}
        setCurrentStage={setCurrentStage}
        rentalSelection={rentalSelection}
      />
      {currentStage === "car" ? (
        <CarsSelection
          setRentalSelection={setRentalSelection}
          rentalSelection={rentalSelection}
        />
      ) : (
        <ClientsSelection
          setRentalSelection={setRentalSelection}
          rentalSelection={rentalSelection}
        />
      )}
    </section>
  );
}

export default CreateRental;
