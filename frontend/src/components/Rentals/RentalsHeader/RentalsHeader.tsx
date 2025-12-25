import SearchBar from "@/components/SearchBar/SearchBar";
import { type SetStateAction } from "react";
import AddButton from "@/components/ui/custom/AddButton/AddButton";
import { useNavigate } from "react-router-dom";

interface RentalsHeaderProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<SetStateAction<string>>;
}

function RentalsHeader({ searchQuery, setSearchQuery }: RentalsHeaderProps) {
  const navigate = useNavigate();
  return (
    <header className="flex flex-col justify-between items-start mb-5">
      <h1 className="font-open text-fluid-2xl text-center md:text-start pt-4 mb-5">
        Rentals Management
      </h1>
      <div className="flex items-start gap-2 flex-col sm-items-center sm:flex-row justify-between w-full">
        <AddButton
          ariaLabel="Create a new rental"
          actionText="Create rental"
          onClick={() => navigate("create-rental")}
        />
        <SearchBar
          className="bg-sidebar"
          srLabel="Search for rentals"
          id="rentals-search-bar"
          placeholder="Search for a rental"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>
    </header>
  );
}

export default RentalsHeader;
