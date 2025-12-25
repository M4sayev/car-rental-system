import SearchBar from "@/components/SearchBar/SearchBar";
import type { RentalSelection, SelectionStage } from "@/pages/CreateRental";
import type { SetStateAction } from "react";
import CreateRentalNavigation from "../CreateRentalNavigation/CreateRentalNavigation";

interface CreateRentalHeaderProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<SetStateAction<string>>;
  currentStage: SelectionStage;
  setCurrentStage: React.Dispatch<SetStateAction<SelectionStage>>;
  rentalSelection: RentalSelection;
}

function CreateRentalHeader({
  searchQuery,
  setSearchQuery,
  currentStage,
  setCurrentStage,
  rentalSelection,
}: CreateRentalHeaderProps) {
  return (
    <header className="flex flex-col justify-between items-start mb-5">
      <h1 className="font-open text-fluid-2xl text-center md:text-start pt-4 mb-5">
        Create a rental (select a {currentStage})
      </h1>
      <div className="flex items-start gap-2 flex-col sm-items-center sm:flex-row justify-between w-full">
        <CreateRentalNavigation
          setCurrentStage={setCurrentStage}
          currentStage={currentStage}
          rentalSelection={rentalSelection}
          resetSearchBar={() => setSearchQuery("")}
        />
        <SearchBar
          className="bg-sidebar"
          srLabel={`Search for ${
            currentStage === "car" ? "available cars" : "clients"
          }`}
          id="create-rental-search-bar"
          placeholder={`Search for ${currentStage}s`}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>
    </header>
  );
}

export default CreateRentalHeader;
