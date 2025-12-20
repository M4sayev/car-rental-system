import Cards from "@/components/DashBoard/Cards/Cards";
import RecentRentalRow from "@/components/DashBoard/RecentRentals/RentalRecentRow";
import DataTableCard from "@/components/DataTableCard/DataTableCard";
import type { RecentRentalTemplate } from "@/constants/dashBoardTemplates";
import { useRecentRentals } from "@/hooks/queryHooks/dashboard/useRecentRentals";
import { CalendarOff } from "lucide-react";
import RentalsTableHeader from "@/components/Rentals/RentalsTable/RentalsTableHeader";
import RentalsTableSkeleton from "@/components/Rentals/Skeletons/RentalsTableSkeleton";

function DashBoard() {
  return (
    <section className="min-h-screen px-5 md:px-8 py-2 max-w-md sm:max-w-xl md:max-w-7xl mx-auto">
      <h1 className="font-open text-fluid-2xl text-center md:text-start pt-4 mb-5">
        Dashboard overview
      </h1>
      <div className="mb-10">
        <Cards />
      </div>

      <DataTableCard<RecentRentalTemplate>
        query={useRecentRentals()}
        emptyIcon={CalendarOff}
        emptyTitle="Oops..."
        emptyDescription="No recent rentals in the database."
        title="Recent Rental Activities"
        Skeleton={RentalsTableSkeleton}
        Header={RentalsTableHeader}
        Row={(rental) => (
          <RecentRentalRow key={rental.rental_id} rental={rental} />
        )}
      />
    </section>
  );
}

export default DashBoard;
