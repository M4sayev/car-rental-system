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
import ClientEditDialog from "../Clients/ClientEditDialog/ClientEditDialog";
import DeleteDialog from "./DeleteDialog";

type forField = "client" | "car";

interface ActionsProps {
  onDelete: () => void;
  type: forField;
}

export function Actions({ onDelete, type }: ActionsProps) {
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" aria-label="Open menu" size="icon-sm">
            <MoreHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={() => setShowNewDialog(true)}>
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setShowShareDialog(true)}>
              Edit
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteDialog
        onDelete={onDelete}
        open={showNewDialog}
        onOpenChange={setShowNewDialog}
      />

      {type === "client" ? (
        <ClientEditDialog
          open={showShareDialog}
          onOpenChange={setShowShareDialog}
        />
      ) : (
        <></>
      )}
    </>
  );
}
