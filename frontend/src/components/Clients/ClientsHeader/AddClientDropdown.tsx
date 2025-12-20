import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddNewClient } from "@/hooks/queryHooks/clients/useAddNewClient";
import { useState } from "react";
import { clientSchema, type ClientFormData } from "@/constants/clientTemplates";
import ClientFormDialog from "../ClientFormDialog/ClientFormDialog";

function AddClientDropdown() {
  const addClientMutation = useAddNewClient();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: ClientFormData) => {
    console.log("Validated form data:", data);
    addClientMutation.mutate(data, {
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
            aria-label="Add a new client"
          >
            <Plus aria-hidden="true" />
            <span>Add Client</span>
          </Button>
        </DialogTrigger>
      </DropdownMenu>
      <ClientFormDialog form={form} mode="create" onSubmit={onSubmit} />
    </Dialog>
  );
}

export default AddClientDropdown;
