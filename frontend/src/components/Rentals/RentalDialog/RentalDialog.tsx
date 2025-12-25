import CustomDialogHeader from "@/components/FormDialog/CustomDialogHeader";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import RentalDialogItem from "./RentalDialogItem";
import {
  mapRentalToUI,
  type RentalTemplate,
} from "@/constants/rentalsTemplates";
import EmptyResponse from "@/components/ui/custom/API/EmptyResponse";
import type { SetStateAction } from "react";
import { covertFromSnakeCaseToTitle } from "@/utils/utils";
import { Button } from "@/components/ui/button";
import { useCompleteRental } from "@/hooks/queryHooks/rentals/useCompleteRental";
import { useDeleteRental } from "@/hooks/queryHooks/rentals/useDeleteRental";

interface RentalDialogProps {
  rental: RentalTemplate;
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

function RentalDialog({ rental, open, setOpen }: RentalDialogProps) {
  const newRental = mapRentalToUI(rental);

  const useCompleteRentalMutation = useCompleteRental();
  const useDeleteRentalMutation = useDeleteRental();

  const handleCompleteRental = (rentalId: string) => {
    useCompleteRentalMutation.mutate(rentalId);
  };

  const handleDeleteRental = (rentalId: string) => {
    useDeleteRentalMutation.mutate(rentalId);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="overflow-y-scroll max-h-120 [@media(max-height:400px)]:max-h-75 sm:max-h-screen sm:overflow-auto">
        <CustomDialogHeader
          title="Rental details"
          description="Comprehensive information for rental agreement"
          showDescription={true}
        />
        <ul className="flex flex-col gap-2">
          {!rental || !rental?.rental_id ? (
            <EmptyResponse className="text-center py-10">
              Failed to load rental data...
            </EmptyResponse>
          ) : (
            Object.entries(newRental).map(([key, value]) => {
              return (
                <RentalDialogItem
                  key={key}
                  value={value}
                  placeholder={covertFromSnakeCaseToTitle(key)}
                />
              );
            })
          )}
        </ul>
        <DialogFooter>
          <Button
            variant="secondary"
            disabled={newRental.status == "completed"}
            className="cursor-pointer"
            onClick={() => handleCompleteRental(rental.rental_id)}
            aria-label="Complete current rental"
          >
            Complete
          </Button>
          <Button
            variant="destructive"
            className="cursor-pointer"
            onClick={() => handleDeleteRental(rental.rental_id)}
            aria-label="Delete current rental"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default RentalDialog;
