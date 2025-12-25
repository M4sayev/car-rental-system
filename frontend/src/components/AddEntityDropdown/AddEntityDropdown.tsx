import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { DropdownMenu } from "../ui/dropdown-menu";
import type { ZodObject } from "zod";
import type { UseMutationResult } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import type { EntityFormDialogProps } from "@/types/entityTypes";
import AddButton from "../ui/custom/AddButton/AddButton";

interface AddEntityDropdownProps<TForm extends FieldValues> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formSchema: ZodObject<any>;
  preTransformData?: (data: TForm) => TForm | FormData;
  buttonLabel: string;
  buttonText: string;

  mutation: UseMutationResult<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    AxiosResponse<any, any, Record<string, unknown>>,
    Error,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    unknown
  >;
  EntityFormDialog: React.ComponentType<EntityFormDialogProps<TForm>>;
}

function AddEntityDropdown<TForm extends FieldValues>({
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(formSchema as any),
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
          <AddButton
            ariaLabel={buttonLabel}
            actionText={buttonText}
            type="button"
          />
        </DialogTrigger>
        <EntityFormDialog form={form} onSubmit={onSubmit} mode="create" />
      </DropdownMenu>
    </Dialog>
  );
}

export default AddEntityDropdown;
