import { DialogContent } from "@/components/ui/dialog";
import type { ClientFormData } from "@/constants/clientTemplates";
import { FieldGroup } from "@/components/ui/field";
import FormField from "@/components/FormField/FormField";
import FormDialogFooter from "@/components/FormDialog/FormDialogFooter";
import FormDialogHeader from "@/components/FormDialog/FormDialogHeader";
import type { EntityFormDialogProps } from "@/types/entityTypes";

function ClientFormDialog({
  form,
  onSubmit,
  mode = "create",
}: EntityFormDialogProps<ClientFormData>) {
  return (
    <DialogContent
      data-testid="client-form-dialog"
      className="sm:max-w-[425px]"
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormDialogHeader
          title={mode === "edit" ? "Edit client's data" : "Add new client"}
          description={
            mode === "edit"
              ? "Edit the client's data."
              : "Enter the client's details below to add them to your database."
          }
        />
        <br />

        <FieldGroup>
          <FormField<ClientFormData>
            name="name"
            control={form.control}
            label="Full Name"
            placeholder="Pablo Pablissimooo"
          />
          <FormField<ClientFormData>
            name="email"
            control={form.control}
            label="Email"
            placeholder="youremail@gmail.com"
            type="email"
          />
          <FormField<ClientFormData>
            name="phone"
            control={form.control}
            label="Phone Number"
            placeholder="+992546823252"
            type="tel"
          />
        </FieldGroup>
        <br />
        <FormDialogFooter
          mode={mode}
          ariaSubmitLabel={
            mode === "edit"
              ? "Edit the current client's data"
              : "Create a new client"
          }
        />
      </form>
    </DialogContent>
  );
}

export default ClientFormDialog;
