import { type CarTemplate } from "@/constants/carsTemplates";

import CarCard from "../CarCard/CarCard";
import ErrorMessage from "@/components/ui/custom/API/ErrorMessage";
import ConnectionError from "@/components/ui/custom/API/ConnectionError";
import EmptyState from "@/components/ui/custom/EmptyState/EmptyState";
import EmptyResponse from "@/components/ui/custom/API/EmptyResponse";
import { Car } from "lucide-react";
import { useGetDeletedCars } from "@/hooks/queryHooks/cars/useGetDeletedCars";
import LoadingSR from "@/components/A11y/LoadingSR";
import CarCardsSkeleton from "../CardSkeleton/CarCardsSkeleton";

function DeletedCarCards() {
  const { data, isError, isLoading, error } = useGetDeletedCars();

  if (isError) {
    const err = error instanceof Error ? error : new Error("Unknown error");

    return (
      <ErrorMessage error={err} className="min-h-[70dvh]">
        <ConnectionError />
      </ErrorMessage>
    );
  }

  if (isLoading)
    return (
      <>
        <LoadingSR text="loading deleted cars" />
        <CarCardsSkeleton />
      </>
    );

  if (!data?.length && !isLoading)
    return (
      <EmptyResponse labelledBy="empty-deleted-cars">
        <EmptyState
          Icon={Car}
          title={`Oopss.. No deleted cars in the database`}
          description="Try adding one"
          iconTestId="no-data-icon"
          titleId="empty-deleted-cars"
        />
      </EmptyResponse>
    );

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-5 mb-20 md:mb-3">
      {data.map((car: CarTemplate) => (
        <CarCard key={car.vehicle_id} {...car} isDeleted={true} />
      ))}
    </ul>
  );
}

export default DeletedCarCards;
