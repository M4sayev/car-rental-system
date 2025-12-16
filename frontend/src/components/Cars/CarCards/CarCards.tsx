import EmptyResponse from "@/components/ui/custom/API/EmptyResponse";
import ErrorMessage from "@/components/ui/custom/API/ErrorMessage";
import EmptyState from "@/components/ui/custom/EmptyState/EmptyState";
import {
  type AvailabilityStatus,
  type CarTemplate,
} from "@/constants/carsTemplates";
import { useGetAllCars } from "@/hooks/queryHooks/cars/useGetAllCars";
import { useGetAvailableCars } from "@/hooks/queryHooks/cars/useGetAvailableCars";
import { Car } from "lucide-react";
import { useMemo } from "react";
import CarCard from "../CarCard/CarCard";
import CarCardsSkeleton from "../CardSkeleton/CarCardsSkeleton";
import LoadingSR from "@/components/A11y/LoadingSR";
import ConnectionError from "@/components/ui/custom/API/ConnectionError";

interface CarCardsProps {
  availability: AvailabilityStatus;
}

function CarCards({ availability }: CarCardsProps) {
  const { data: allCars, isError, isLoading, error } = useGetAllCars();
  const {
    data: availableCars,
    isError: avIsError,
    error: avError,
    isLoading: avIsLoadings,
  } = useGetAvailableCars();

  // Determine which queries matter
  const needsAvailableCars = availability !== "all";
  const needsAllCars = availability !== "available";

  // to display proper aria-label and description depending on availability for empty state
  const carPage = availability === "all" ? "" : availability;

  const cars = useMemo(() => {
    if (!allCars || !availableCars) return [];

    if (availability === "available") return availableCars;
    else if (availability === "rented")
      return allCars.filter(
        (car: CarTemplate) =>
          !availableCars.some(
            (avCar: CarTemplate) => avCar.vehicle_id === car.vehicle_id
          )
      );

    return allCars;
  }, [availability, allCars, availableCars]);

  if ((needsAllCars && isError) || (avIsError && needsAvailableCars)) {
    const combinedError = error ?? avError;

    return (
      <ErrorMessage error={combinedError} className="min-h-[70dvh]">
        <ConnectionError />
      </ErrorMessage>
    );
  }

  if ((needsAllCars && isLoading) || (needsAvailableCars && avIsLoadings))
    return (
      <>
        <LoadingSR text="loading cars" />
        <CarCardsSkeleton />
      </>
    );

  if (
    (needsAllCars && !allCars?.length && !isLoading) ||
    (needsAvailableCars && !availableCars?.length && !avIsLoadings)
  )
    return (
      <EmptyResponse labelledBy="empty-cars-title" className="h-135">
        <EmptyState
          Icon={Car}
          titleId="empty-cars-title"
          title={`Oopss.. No ${carPage} cars in the database`}
          description="Try adding one"
          iconTestId="no-data-icon"
        />
      </EmptyResponse>
    );

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-5 mb-20 md:mb-3">
      {cars.map((car: CarTemplate) => (
        <CarCard key={car.vehicle_id} {...car} />
      ))}
    </ul>
  );
}

export default CarCards;
