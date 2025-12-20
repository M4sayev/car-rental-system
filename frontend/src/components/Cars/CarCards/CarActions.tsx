import { useState } from "react";
import { MoreHorizontalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CarFormDialog from "../CarFormDialog/CarFormDialog";
import {
  carSchema,
  type CarFormData,
  type CarTemplate,
} from "@/constants/carsTemplates";
import ConfirmationDialog from "@/components/ui/custom/ConfirmDialog";
import { Dialog } from "@/components/ui/dialog";
import { useUpdateCar } from "@/hooks/queryHooks/cars/useUpdateCar";

// make it reusable later for now skip

interface ActionsProps {
  onDelete: () => void;
  defaultData: CarTemplate;
}
export function CarActions({ onDelete, defaultData }: ActionsProps) {
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const updateCarMutation = useUpdateCar();

  const form = useForm<CarFormData>({
    resolver: zodResolver(carSchema),
    defaultValues: {
      brand: defaultData.brand ?? "",
      model: defaultData.model ?? "",
      daily_rate: defaultData["daily_rate"] ?? 0,
      car_type: defaultData["car_type"] ?? "",
      seats: defaultData.seats ?? 0,
      image_url: defaultData["image_url"] ?? undefined,
      is_available: defaultData["is_available"] ?? false,
    },
    mode: "onChange",
  });

  const onSubmit = (data: CarFormData) => {
    console.log("Validated form data:", data);
    updateCarMutation.mutate(
      { id: defaultData["vehicle_id"], data },
      {
        onSuccess: () => {
          setShowEdit(false);
          form.reset();
        },
      }
    );
  };

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="cursor-pointer"
            aria-label="Open actions menu"
            size="icon-sm"
            data-testid="actions-button"
          >
            <MoreHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={() => setShowDelete(true)}>
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setShowEdit(true)}>
              Edit
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmationDialog
        onDelete={onDelete}
        open={showDelete}
        onOpenChange={setShowDelete}
        title="Confirm deletion"
        description="Are you sure? The actions are irreversable."
        actionText="Delete"
        closeText="Cancel"
      />

      <Dialog open={showEdit} onOpenChange={setShowEdit}>
        <CarFormDialog mode="edit" form={form} onSubmit={onSubmit} />
      </Dialog>
    </>
  );
}
