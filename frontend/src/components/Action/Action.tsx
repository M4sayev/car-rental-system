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
import DeleteDialog from "./DeleteDialog";
import ClientFormDialog from "../Clients/ClientFormDialog/ClientFormDialog";
import { Dialog } from "../ui/dialog";
import {
  clientSchema,
  type ClientFormData,
  type ClientTemplate,
} from "@/constants/clientTemplates";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateClient } from "@/hooks/queryHooks/clients/useUpdateClient";

type forField = "client" | "car";

interface ActionsProps {
  onDelete: () => void;
  type: forField;
  defaultData: ClientTemplate;
}
export function Actions({ onDelete, type, defaultData }: ActionsProps) {
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
            aria-label="Open menu"
            size="icon-sm"
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

      <DeleteDialog
        onDelete={onDelete}
        open={showDelete}
        onOpenChange={setShowDelete}
      />

      {type === "client" ? (
        <Dialog open={showEdit} onOpenChange={setShowEdit}>
          <ClientFormDialog mode="edit" form={form} onSumbit={onSubmit} />
        </Dialog>
      ) : (
        // <ClientEditDialog
        //   open={showShareDialog}
        //   onOpenChange={setShowShareDialog}
        // />
        <></>
      )}
    </>
  );
}
