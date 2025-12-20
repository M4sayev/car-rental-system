import Cards from "@/components/DashBoard/Cards/Cards";
import RecentRentalsHeader from "@/components/DashBoard/RecentRentals/RecentRentalsHeader";
import RecentRentalsSkeleton from "@/components/DashBoard/RecentRentals/RecentRentalsSkeleton";
import RentalRow from "@/components/DashBoard/RecentRentals/RentalRow";
import DataTableCard from "@/components/DataTableCard/DataTableCard";
import type { RecentRentalTemplate } from "@/constants/dashBoardTemplates";
import { useRecentRentals } from "@/hooks/queryHooks/dashboard/useRecentRentals";
import { CalendarOff } from "lucide-react";

function DashBoard() {
  return (
    <div className="min-h-screen px-5 md:px-8 py-2 max-w-md sm:max-w-xl md:max-w-7xl mx-auto">
      <h1 className="font-open text-fluid-2xl text-center md:text-start pt-4 mb-5">
        Dashboard overview
      </h1>
      <div className="mb-10">
        <Cards />
      </div>

      <DataTableCard<RecentRentalTemplate>
        queryFn={useRecentRentals()}
        emptyIcon={CalendarOff}
        emptyTitle="Oops..."
        emptyLabel="no rentals in the database"
        emptyDescription="No recent rentals in the database."
        title={"Recent Rental Activities"}
        Skeleton={RecentRentalsSkeleton}
        Header={RecentRentalsHeader}
        Row={(rental) => <RentalRow key={rental.rental_id} rental={rental} />}
      />
    </div>
  );
}

export default DashBoard;
