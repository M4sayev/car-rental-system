import LoadingSR from "@/components/A11y/LoadingSR";
import CarCard from "@/components/Cars/CarCard/CarCard";
import CarCardsSkeleton from "@/components/Cars/CardSkeleton/CarCardsSkeleton";
import ConnectionError from "@/components/ui/custom/API/ConnectionError";
import EmptyResponse from "@/components/ui/custom/API/EmptyResponse";
import ErrorMessage from "@/components/ui/custom/API/ErrorMessage";
import EmptyState from "@/components/ui/custom/EmptyState/EmptyState";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { CarTemplate } from "@/constants/carsTemplates";
import { useGetAvailableCars } from "@/hooks/queryHooks/cars/useGetAvailableCars";
import type { SelectionProps } from "@/pages/CreateRental";
import { Car, Search } from "lucide-react";

function CarsSelection({
  setRentalSelection,
  rentalSelection,
  searchQuery,
}: SelectionProps) {
  const { data, isError, error, isLoading } = useGetAvailableCars(searchQuery);

  const handleCarSelect = (vehicle_id: CarTemplate["vehicle_id"]) => {
    setRentalSelection((prev) => ({ ...prev, vehicle_id }));
  };

  if (isLoading) {
    return (
      <>
        <LoadingSR text="loading cars" />
        <CarCardsSkeleton />
      </>
    );
  }

  if (isError) {
    return (
      <ErrorMessage error={error} className="min-h-[70dvh]">
        <ConnectionError />
      </ErrorMessage>
    );
  }

  if (!data?.length && !isLoading) {
    return (
      <EmptyResponse labelledBy="empty-cars-title" className="h-135">
        <EmptyState
          Icon={searchQuery ? Search : Car}
          titleId="empty-cars-title"
          title={
            searchQuery
              ? "Oopss.."
              : "Oopss...No available cars in the database"
          }
          description={
            searchQuery ? `No cars matching '${searchQuery}'` : "Try adding one"
          }
          iconTestId="no-data-icon"
        />
      </EmptyResponse>
    );
  }

  return (
    <RadioGroup
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-5 mb-20 md:mb-3"
      onValueChange={handleCarSelect}
      value={rentalSelection.vehicle_id ?? undefined}
    >
      {data.map((car: CarTemplate) => {
        return (
          <div className="relative" key={car.vehicle_id}>
            <label
              htmlFor={car.vehicle_id}
              className="*:text-xs cursor-pointer"
            >
              <RadioGroupItem
                value={car.vehicle_id}
                id={car.vehicle_id}
                className="absolute bottom-5 right-5 peer sr-only"
              />
              <CarCard
                {...car}
                showActions={false}
                className="outline-0 outline-green-400 peer-data-[state=checked]:outline-2 tranisition-all duration-50"
              />
            </label>
          </div>
        );
      })}
    </RadioGroup>
  );
}

export default CarsSelection;
