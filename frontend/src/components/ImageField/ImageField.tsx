import {
  Controller,
  type FieldValues,
  type Path,
  type UseFormReturn,
} from "react-hook-form";
import { useEffect, useState, type ChangeEvent } from "react";

import { DropDozeField } from "./DropZoneField";
import { API_BASE_URL } from "@/config";

export interface ImageFieldProps<TForm extends FieldValues> {
  control: UseFormReturn<TForm>["control"];
  name: Path<TForm>;
  label?: string;
  actionText?: string;
  accept?: string;
  imageSrc?: string;
}

function ImageField<TForm extends FieldValues>({
  control,
  name,
  label = "Image",
  actionText = "Upload an image or drag and drop here",
  accept = ".png, .jpg, .jpeg, .webp",
  imageSrc = "",
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
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (!selectedFile && imageSrc) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPreviewUrl(`${API_BASE_URL}${imageSrc}`);
    }
  }, [imageSrc, selectedFile]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <DropDozeField
          setSelectedFile={setSelectedFile}
          field={field}
          fieldState={fieldState}
          handleFileChange={handleFileChange}
          previewUrl={previewUrl}
          name={name}
          label={label}
          actionText={actionText}
          accept={accept}
        />
      )}
    />
  );
}

export default ImageField;
