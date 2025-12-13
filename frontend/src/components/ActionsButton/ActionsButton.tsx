import { zodResolver } from "@hookform/resolvers/zod";
import type { UseMutationResult } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import type { ZodObject } from "zod";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontalIcon } from "lucide-react";
import ConfirmationDialog from "../ui/custom/ConfirmDialog";
import { Dialog } from "../ui/dialog";
import type { EntityFormDialogProps } from "@/types/entityTypes";

interface ActionsButtonProps<TForm extends FieldValues> {
  onDelete: () => void;
  defaultData: TForm;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutation: UseMutationResult<any, Error, any, unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: ZodObject<any>;
  id: string;
  EntityFormDialog: React.ComponentType<EntityFormDialogProps<TForm>>;
  imageSrc?: string;
  preTransformData?: (data: TForm) => TForm | FormData;
}
export function ActionsButton<TForm extends FieldValues>({
  onDelete,
  defaultData,
  mutation,
  schema,
  id,
  EntityFormDialog,
  imageSrc = "",
  preTransformData = (data: TForm) => data,
}: ActionsButtonProps<TForm>) {
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const form = useForm<TForm>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema as any),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    defaultValues: defaultData as any,
    mode: "onChange",
  });

  const onSubmit = (data: TForm) => {
    console.log("Validated form data:", data);

    // transform the data if needed (to a FormData e.g.)
    const newData = preTransformData(data);

    mutation.mutate(
      { id, data: newData },
      {
        onSuccess: () => {
          setShowEdit(false);
          form.reset();
        },
      }
    );
  };

  useEffect(() => {
    if (showEdit) form.reset(defaultData);
  }, [defaultData, showEdit, form]);

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
        <EntityFormDialog
          mode="edit"
          form={form}
          onSubmit={onSubmit}
          imageSrc={imageSrc}
        />
      </Dialog>
    </>
  );
}
