import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Controller, type UseFormReturn } from "react-hook-form";
import type {
  ClientFormData,
  ClientTemplate,
} from "@/constants/clientTemplates";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

// export for testing
export type modeType = "edit" | "create";

interface ClientFormDialogProps {
  form: UseFormReturn<{ name: string; email: string; phone: string }>;
  onSumbit: (data: ClientFormData) => void;
  mode: modeType;
  defaultData?: ClientTemplate;
}

function ClientFormDialog({
  form,
  onSumbit,
  mode = "create",
  defaultData,
}: ClientFormDialogProps) {
  return (
    <DialogContent
      data-testid="client-form-dialog"
      className="sm:max-w-[425px]"
    >
      <form onSubmit={form.handleSubmit(onSumbit)}>
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Edit client's data" : "Add new client"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {mode === "edit"
              ? "Edit the client's data."
              : "Enter the client's details below to add them to your database."}
          </DialogDescription>
        </DialogHeader>
        <br />

        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="grid gap-3">
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  {...field}
                  id="name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Pablo Pablissimooo"
                  defaultValue={mode === "edit" ? defaultData?.name : ""}
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="grid gap-3">
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...field}
                  id="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="youremail@gmail.com"
                  defaultValue={mode === "edit" ? defaultData?.email : ""}
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="grid gap-3">
                <FieldLabel htmlFor="phone">Phone</FieldLabel>
                <Input
                  {...field}
                  id="phone"
                  aria-invalid={fieldState.invalid}
                  placeholder="+992546823252"
                  defaultValue={mode === "edit" ? defaultData?.phone : ""}
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <br />
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              className="cursor-pointer"
              aria-label="Cancel actions and close the dialog"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            className="cursor-pointer"
            aria-label={
              mode === "edit"
                ? "Edit the current client's data"
                : "Create a new client"
            }
          >
            {mode === "edit" ? "Update" : "Create"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}

export default ClientFormDialog;
