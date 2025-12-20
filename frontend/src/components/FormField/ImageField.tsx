import {
  Controller,
  type FieldValues,
  type Path,
  type UseFormReturn,
} from "react-hook-form";
import { Field, FieldLabel } from "../ui/field";
import { ImageUp } from "lucide-react";
import { useEffect, useState, type ChangeEvent } from "react";

import { useDropzone } from "react-dropzone";

interface ImageFieldProps<TForm extends FieldValues> {
  control: UseFormReturn<TForm>["control"];
  name: Path<TForm>;
  label?: string;
  actionText?: string;
  accept?: string;
}

function ImageField<TForm extends FieldValues>({
  control,
  name,
  label = "Image",
  actionText = "Upload an image or drag and drop here",
  accept = ".png, .jpg, .jpeg, .webp",
}: ImageFieldProps<TForm>) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target;
    if (file && file.files) {
      setSelectedFile(file.files[0]);
    } else {
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const handleDrop = (acceptedFiles: File[]) => {
          if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            setSelectedFile(file);
            field.onChange(file);
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
            <label
              {...getRootProps()}
              className="group border-dashed rounded border-2 grid place-items-center p-7 cursor-pointer"
            >
              <input
                {...getInputProps()}
                className="hidden"
                id={name}
                type="file"
                accept={accept}
                onChange={(e) => field.onChange(e.target.files?.[0] ?? null)}
              />
              <div className="flex flex-col items-center justify-center text-center gap-2 max-w-[80%] ">
                {previewUrl ? (
                  <img
                    className="h-20 rounded"
                    src={previewUrl}
                    alt="preview"
                  />
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
            </label>
          </Field>
        );
      }}
    />
  );
}

export default ImageField;
