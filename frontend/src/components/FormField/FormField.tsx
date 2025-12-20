import {
  Controller,
  type FieldValues,
  type Path,
  type UseFormReturn,
} from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

interface FormFieldProps<TForm extends FieldValues> {
  name: Path<TForm>;
  control: UseFormReturn<TForm>["control"];
  placeholder: string;
  label: string;
  type?: string;
  minVal?: number;
  step?: number;
  hideError?: boolean;
}
function FormField<TForm extends FieldValues>({
  name,
  control,
  label,
  type = "text",
  placeholder,
  minVal = 0,
  step = 0.1,
  hideError = false,
}: FormFieldProps<TForm>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="grid">
          <FieldLabel htmlFor={name}>{label}</FieldLabel>
          <Input
            {...field}
            type={type}
            id={name}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
            autoComplete="off"
            min={type === "number" ? minVal : undefined}
            step={type === "number" ? step : undefined}
            onChange={(e) => {
              const value =
                type === "number" ? e.target.valueAsNumber : e.target.value;
              field.onChange(value);
            }}
          />
          {fieldState.invalid && !hideError && (
            <FieldError errors={[fieldState.error]} />
          )}
        </Field>
      )}
    />
  );
}

export default FormField;
