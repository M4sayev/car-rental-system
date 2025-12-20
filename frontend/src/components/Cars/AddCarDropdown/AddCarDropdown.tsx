import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { carSchema, type CarFormData } from "@/constants/carsTemplates";
import { useAddCar } from "@/hooks/queryHooks/cars/useAddCar";
import CarFormDialog from "../CarFormDialog/CarFormDialog";

function AddCarDropdown() {
  const addCarMutation = useAddCar();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<CarFormData>({
    resolver: zodResolver(carSchema),
    defaultValues: {
      brand: "",
      model: "",
      daily_rate: 0,
      car_type: "",
      seats: 0,
      image_url: undefined,
    },
    mode: "onChange",
  });

  const onSubmit = (data: CarFormData) => {
    console.log("Validated form data:", data);

    const formData = new FormData();

    formData.append("brand", data.brand);
    formData.append("model", data.model);
    formData.append("daily_rate", String(data.daily_rate));
    formData.append("car_type", data.car_type);
    formData.append("seats", String(data.seats));

    const imageFile = data.image_url;

    if (imageFile instanceof File) {
      formData.append("image_url", imageFile, imageFile.name);
    }

    addCarMutation.mutate(formData, {
      onSuccess: () => {
        setIsOpen(false);
        form.reset();
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu>
        <DialogTrigger asChild>
          <Button
            type="button"
            className="cursor-pointer"
            aria-label="Add a new car"
          >
            <Plus aria-hidden="true" />
            Add Car
          </Button>
        </DialogTrigger>
        <CarFormDialog form={form} onSubmit={onSubmit} mode="create" />
      </DropdownMenu>
    </Dialog>
  );
}

export default AddCarDropdown;
