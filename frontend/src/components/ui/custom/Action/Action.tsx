import { useState } from "react";
import { MoreHorizontalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ClientFormDialog from "../../../Clients/ClientFormDialog/ClientFormDialog";
import { Dialog } from "../../dialog";
import {
  clientSchema,
  type ClientFormData,
  type ClientTemplate,
} from "@/constants/clientTemplates";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateClient } from "@/hooks/queryHooks/clients/useUpdateClient";
import ConfirmationDialog from "../ConfirmDialog";

// make it reusable later for now skip

interface ActionsProps {
  onDelete: () => void;
  defaultData: ClientTemplate;
}
export function Actions({ onDelete, defaultData }: ActionsProps) {
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const updateClientMutation = useUpdateClient();

  const form = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: defaultData.name ?? "",
      email: defaultData.email ?? "",
      phone: defaultData.phone ?? "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: ClientFormData) => {
    console.log("Validated form data:", data);
    updateClientMutation.mutate(
      { id: defaultData["client_id"], data },
      {
        onSuccess: () => {
          setShowEdit(false);
          form.reset();
        },
      }
    );
  };

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
        <ClientFormDialog mode="edit" form={form} onSubmit={onSubmit} />
      </Dialog>
    </>
  );
}
