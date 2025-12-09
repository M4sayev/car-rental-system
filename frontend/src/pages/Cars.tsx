import CarCards from "@/components/Cars/CarCards/CarCards";
import CarsHeader from "@/components/Cars/CarsHeader/CarsHeader";
import DeletedCarCards from "@/components/Cars/DeletedCars/DeletedCars";
import { availabilityCategories } from "@/constants/carsTemplates";
import { useState } from "react";

function Cars() {
  const [showDeleted, setShowDeleted] = useState(false);
  const [availability, setAvailability] = useState(availabilityCategories[0]);
  return (
    <div className="min-h-screen px-5 md:px-8 py-2 max-w-md sm:max-w-xl md:max-w-7xl  mx-auto">
      <CarsHeader
        showDeleted={showDeleted}
        setShowDeleted={setShowDeleted}
        availability={availability}
        setAvailability={setAvailability}
      />

      {showDeleted ? (
        <DeletedCarCards />
      ) : (
        <CarCards availability={availability} />
      )}
    </div>
  );
}

export default Cars;
