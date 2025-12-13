import type {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  Path,
} from "react-hook-form";
import type { ImageFieldProps } from "./ImageField";
import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { useDropzone } from "react-dropzone";
import { Field, FieldLabel } from "../ui/field";
import { ImageUp } from "lucide-react";

interface DropZoneFieldProps<TForm extends FieldValues>
  extends Omit<ImageFieldProps<TForm>, "control"> {
  setSelectedFile: Dispatch<SetStateAction<File | null>>;
  field: ControllerRenderProps<TForm, Path<TForm>>;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  fieldState: ControllerFieldState;
  previewUrl: string | null;
}

export function DropDozeField<TForm extends FieldValues>({
  setSelectedFile,
  field,
  handleFileChange,
  fieldState,
  previewUrl,
  label,
  name,
  accept,
  actionText,
}: DropZoneFieldProps<TForm>) {
  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedFile(file);
      field.onChange(file);
    } else {
      setSelectedFile(null);
      field.onChange(null);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
  });

  return (
    <Field
      data-invalid={fieldState.invalid}
      className="grid"
      onChange={handleFileChange}
    >
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <div
        {...getRootProps()}
        className="group border-dashed rounded border-2 grid place-items-center p-7 cursor-pointer"
      >
        <input
          {...getInputProps()}
          className="hidden"
          id={name}
          type="file"
          accept={accept}
        />
        <div className="flex flex-col items-center justify-center text-center gap-2 max-w-[80%] ">
          {previewUrl ? (
            <img className="h-20 rounded" src={previewUrl} alt="preview" />
          ) : (
            <>
              <ImageUp
                aria-hidden="true"
                className="opacity-20 group-hover:opacity-40 transition-opacity duration-400 ease-in-out"
              />
              <p className="text-fluid-xs opacity-30 group-hover:opacity-50 transition-opacity duration-400 ease-in-out">
                {actionText}
              </p>
              <span className="text-xs opacity-10 group-hover:opacity-20 transition-opacity duration-400 ease-in-out">
                {accept}
              </span>
            </>
          )}
        </div>
      </div>
    </Field>
  );
}
