import FormDialogFooter from "@/components/FormDialog/FormDialogFooter";
import FormDialogHeader from "@/components/FormDialog/FormDialogHeader";
import FormField from "@/components/FormField/FormField";
import ImageField from "@/components/FormField/ImageField";
import { DialogContent } from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import type { CarFormData } from "@/constants/carsTemplates";
import type { modeType } from "@/types/forms";

import { type UseFormReturn } from "react-hook-form";

interface CarFormDialogProps {
  form: UseFormReturn<CarFormData>;
  onSubmit: (data: CarFormData) => void;
  mode: modeType;
}

function CarFormDialog({
  form,
  onSubmit,
  mode = "create",
}: CarFormDialogProps) {
  return (
    <DialogContent data-testid="car-form-dialog" className="sm:max-w-[425px]">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormDialogHeader
          title={mode === "edit" ? "Edit car data" : "Add new car"}
          description={
            mode === "edit"
              ? "Edit the car's data."
              : "Enter the car's details below to add to your database."
          }
        />
        <br />
        <FieldGroup className="flex flex-row mb-3">
          <FormField<CarFormData>
            name="brand"
            control={form.control}
            label="Car Brand Name"
            placeholder="Toyota"
            hideError={true}
          />
          <FormField<CarFormData>
            name="model"
            control={form.control}
            label="Car Model Name"
            placeholder="Supra"
            hideError={true}
          />
        </FieldGroup>
        <div className="mb-3">
          <FormField<CarFormData>
            name="car_type"
            control={form.control}
            label="Car Type"
            placeholder="Sedan"
            hideError={true}
          />
        </div>
        <FieldGroup className="flex flex-row mb-3">
          <FormField<CarFormData>
            name="daily_rate"
            control={form.control}
            label="Daily Rate ($)"
            placeholder="212.0"
            type="number"
            minVal={0}
            step={0.1}
            hideError={true}
          />
          <FormField<CarFormData>
            name="seats"
            control={form.control}
            label="Number of Seats"
            placeholder="4"
            type="number"
            minVal={0}
            step={1}
            hideError={true}
          />
        </FieldGroup>
        <ImageField<CarFormData>
          control={form.control}
          name="image_url"
          label="Car Image"
          actionText="Upload an image or drag and drop here"
        />
        <br />
        <FormDialogFooter
          mode={mode}
          ariaSubmitLabel={
            mode === "edit" ? "Edit selected car's data" : "Create a new car"
          }
        />
      </form>
    </DialogContent>
  );
}

export default CarFormDialog;
