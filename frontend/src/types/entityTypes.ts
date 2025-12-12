import type { FieldValues, UseFormReturn } from "react-hook-form";
import type { modeType } from "./forms";

export type EntityType = "client" | "rental" | "car";

export interface EntityFormDialogProps<TForm extends FieldValues> {
  form: UseFormReturn<TForm>;
  onSubmit: (data: TForm) => void;
  mode: modeType;
  imageSrc?: string;
}
