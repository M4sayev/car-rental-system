import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { DropdownMenu } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import type { ZodObject } from "zod";
import type { UseMutationResult } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import type { EntityFormDialogProps } from "@/types/entityTypes";

interface AddEntityDropdownProps<TForm extends FieldValues> {
  defaultValues: TForm;
  formSchema: ZodObject<any>;
  preTransformData?: (data: TForm) => TForm | FormData;
  buttonLabel: string;
  buttonText: string;
  mutation: UseMutationResult<AxiosResponse<any, any, {}>, Error, any, unknown>;
  EntityFormDialog: React.ComponentType<EntityFormDialogProps<TForm>>;
}

function AddEntityDropdown<TForm extends FieldValues>({
  defaultValues,
  formSchema,
  // return the same data to keep the function logic
  preTransformData = (data: TForm) => data,
  buttonLabel,
  buttonText,
  EntityFormDialog,
  mutation,
}: AddEntityDropdownProps<TForm>) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<TForm>({
    resolver: zodResolver(formSchema as any),
    defaultValues: defaultValues as any,
    mode: "onChange",
  });

  const onSubmit = (data: TForm) => {
    console.log("Validated form data:", data);
    const newData = preTransformData(data);
    mutation.mutate(newData, {
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
            aria-label={buttonLabel}
          >
            <Plus aria-hidden="true" />
            {buttonText}
          </Button>
        </DialogTrigger>
        <EntityFormDialog form={form} onSubmit={onSubmit} mode="create" />
      </DropdownMenu>
    </Dialog>
  );
}

export default AddEntityDropdown;
