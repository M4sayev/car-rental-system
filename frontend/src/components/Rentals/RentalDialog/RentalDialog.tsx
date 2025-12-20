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

interface RentalDialogProps {
  rental: RentalTemplate;
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

function RentalDialog({ rental, open, setOpen }: RentalDialogProps) {
  const newRental = mapRentalToUI(rental);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="overflow-y-scroll max-h-120 [@media(max-height:400px)]:max-h-75 sm:max-h-screen sm:overflow-auto">
        <CustomDialogHeader
          title="Rental details"
          description="Comprehensive information for rental agreement"
          showDescription={true}
        />
        <ul className="flex flex-col gap-2">
          {!rental ? (
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
          >
            Complete
          </Button>
          <Button variant="destructive" className="cursor-pointer">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default RentalDialog;
