import { Button } from "@/components/ui/button";
import { useCreateRental } from "@/hooks/queryHooks/rentals/useCreateRental";
import type { RentalSelection, SelectionStage } from "@/pages/CreateRental";
import { Check, MoveLeft, MoveRight, type LucideIcon } from "lucide-react";
import type { SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

interface CreateRentalNavigationProps {
  currentStage: SelectionStage;
  setCurrentStage: React.Dispatch<SetStateAction<SelectionStage>>;
  rentalSelection: RentalSelection;
}

interface NextBtn {
  text: string;
  Icon: LucideIcon;
  hoverEffect: string;
}
function CreateRentalNavigation({
  currentStage,
  setCurrentStage,
  rentalSelection,
}: CreateRentalNavigationProps) {
  const createRentalMutation = useCreateRental();
  const navigate = useNavigate();

  const isCarStage = currentStage === "car";
  const carNotSelected = !rentalSelection.vehicle_id && isCarStage;
  const clientNotSelected = !rentalSelection.client_id && !isCarStage;

  const nextBtn: NextBtn = isCarStage
    ? { Icon: MoveRight, text: "Next", hoverEffect: "translate-x-0.5" }
    : { text: "create", Icon: Check, hoverEffect: "text-green-400" };

  const handleGoBack = () => {
    if (isCarStage) navigate(-1);
    else setCurrentStage("car");
  };

  const handleNext = () => {
    // dont do anything if not selected
    if (carNotSelected || clientNotSelected) return;
    if (isCarStage) setCurrentStage("client");
    else {
      createRentalMutation.mutate(rentalSelection);
      navigate("..", { relative: "path" });
    }
  };
  return (
    <div role="group" className="flex gap-2">
      <Button
        variant="outline"
        className="flex items-center cursor-pointer group"
        aria-label={
          isCarStage ? "Go back to rentals page" : "Go back to selecting a car"
        }
        onClick={handleGoBack}
      >
        <MoveLeft
          aria-hidden="true"
          className="group-hover:-translate-x-0.5 transition-all duration-200 ease-in-out"
        />
        <span>Go Back</span>
      </Button>
      <Button
        className="flex items-center cursor-pointer group"
        aria-label={
          isCarStage
            ? "Go to select a client page"
            : "Create a rental with selected data"
        }
        onClick={handleNext}
        disabled={carNotSelected || clientNotSelected}
      >
        <span>{nextBtn.text}</span>
        <nextBtn.Icon
          aria-hidden="true"
          className={`transition-all duration-200 ease-in-out group-hover:${nextBtn.hoverEffect}`}
        />
      </Button>
    </div>
  );
}

export default CreateRentalNavigation;
