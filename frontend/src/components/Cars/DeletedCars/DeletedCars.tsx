import { type CarTemplate } from "@/constants/carsTemplates";

import CarCard from "../CarCard/CarCard";
import ErrorMessage from "@/components/ui/custom/API/ErrorMessage";
import ConnectionError from "@/components/ui/custom/API/ConnectionError";
import EmptyState from "@/components/ui/custom/EmptyState/EmptyState";
import EmptyResponse from "@/components/ui/custom/API/EmptyResponse";
import { Car } from "lucide-react";
import { useGetDeletedCars } from "@/hooks/queryHooks/cars/useGetDeletedCars";

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

  if (isLoading) return <div>Loading...</div>;

  if (!data && !isLoading)
    return (
      <EmptyResponse label={`No deleted cars in the database`}>
        <EmptyState
          Icon={Car}
          title={`Oopss.. No deleted in the database`}
          description="Try adding one"
          iconTestId="no-data-icon"
        />
      </EmptyResponse>
    );

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-5 mb-20 md:mb-0">
      {data.map((car: CarTemplate) => (
        <CarCard key={car.vehicle_id} {...car} isDeleted={true} />
      ))}
    </ul>
  );
}

export default DeletedCarCards;
