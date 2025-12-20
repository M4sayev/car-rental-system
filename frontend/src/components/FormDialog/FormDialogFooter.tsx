import { DialogClose, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import type { modeType } from "@/types/forms";

interface FormDialogFooterProps {
  mode: modeType;
  submitLabel?: string;
  cancelLabel?: string;
  ariaSubmitLabel?: string;
  ariaCancelLabel?: string;
}

function FormDialogFooter({
  mode,
  submitLabel,
  cancelLabel,
  ariaSubmitLabel,
  ariaCancelLabel = "Cancel actions and close the dialog",
}: FormDialogFooterProps) {
  const defaultSubmit = mode === "edit" ? "Update" : "Create";
  const defaultCancel = "Cancel";
  return (
    <DialogFooter>
      <DialogClose asChild>
        <Button
          variant="outline"
          className="cursor-pointer"
          aria-label={ariaCancelLabel}
        >
          {cancelLabel ?? defaultCancel}
        </Button>
      </DialogClose>
      <Button
        type="submit"
        className="cursor-pointer"
        aria-label={
          ariaSubmitLabel ??
          (mode === "edit" ? "Edit the selected item" : "Create a new item")
        }
      >
        {submitLabel ?? defaultSubmit}
      </Button>
    </DialogFooter>
  );
}

export default FormDialogFooter;
