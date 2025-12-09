import { type Dispatch, type SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import ToggleButtons from "@/components/ui/custom/ToggleButtons/ToggleButtons";
import AddCarDropdown from "../AddCarDropdown/AddCarDropdown";
import {
  availabilityCategories,
  type AvailabilityStatus,
} from "@/constants/carsTemplates";

interface CarsHeaderProps {
  showDeleted: boolean;
  setShowDeleted: Dispatch<SetStateAction<boolean>>;
  availability: AvailabilityStatus;
  setAvailability: Dispatch<SetStateAction<AvailabilityStatus>>;
}

function CarsHeader({
  showDeleted,
  setShowDeleted,
  availability,
  setAvailability,
}: CarsHeaderProps) {
  return (
    <header className="flex flex-col justify-between items-start mb-2">
      <h1 className="font-open text-fluid-2xl text-center md:text-start pt-4 mb-5">
        {showDeleted ? "Deleted Cars" : "Cars Overview"}
      </h1>
      <div className="flex items-start gap-2 sm:items-center flex-col sm:flex-row justify-between w-full">
        {/* hide on deleted cars view */}
        <div
          aria-hidden={showDeleted}
          className={showDeleted ? "invisible pointer-none" : ""}
        >
          <ToggleButtons<AvailabilityStatus>
            values={availabilityCategories}
            value={availability}
            setValue={setAvailability}
          />
        </div>

        <div role="group" className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowDeleted(!showDeleted)}
            className="cursor-pointer"
            aria-label={
              showDeleted ? "Go back to cars overview" : "View deleted cars"
            }
          >
            {showDeleted ? "Go Back" : "Show Deleted"}
          </Button>
          <AddCarDropdown />
        </div>
      </div>
    </header>
  );
}

export default CarsHeader;
