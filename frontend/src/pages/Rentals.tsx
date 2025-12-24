import DataTableCard from "@/components/DataTableCard/DataTableCard";
import RentalsHeader from "@/components/Rentals/RentalsHeader/RentalsHeader";
import RentalRow from "@/components/Rentals/RentalsTable/RentalRow";
import type { RentalTemplate } from "@/constants/rentalsTemplates";
import { useGetRentals } from "@/hooks/queryHooks/rentals/useGetRentals";
import { CalendarOff } from "lucide-react";
import { useState } from "react";
import RentalsTableHeader from "@/components/Rentals/RentalsTable/RentalsTableHeader";
import RentalsTableSkeleton from "@/components/Rentals/Skeletons/RentalsTableSkeleton";
import { useDebounce } from "use-debounce";
import { SEARCH_DEBOUNCE_MS } from "@/constants/search";

function Rentals() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, SEARCH_DEBOUNCE_MS);
  return (
    <section className="min-h-screen px-5 md:px-8 py-2 max-w-md sm:max-w-xl md:max-w-7xl  mx-auto">
      <RentalsHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <DataTableCard<RentalTemplate>
        query={useGetRentals(debouncedSearchQuery)}
        emptyIcon={CalendarOff}
        emptyTitle="Oops..."
        emptyDescription="No rentals in the database."
        title="Rental Activities"
        Skeleton={RentalsTableSkeleton}
        Row={(rental) => <RentalRow key={rental.rental_id} rental={rental} />}
        Header={RentalsTableHeader}
      />
    </section>
  );
}

export default Rentals;
