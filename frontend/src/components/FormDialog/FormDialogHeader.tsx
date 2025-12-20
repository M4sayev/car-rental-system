import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";

interface FormDialogHeaderProps {
  title: string;
  description: string;
}

function FormDialogHeader({ title, description }: FormDialogHeaderProps) {
  return (
    <DialogHeader>
      <DialogTitle>{title}</DialogTitle>
      <DialogDescription className="sr-only">{description}</DialogDescription>
    </DialogHeader>
  );
}

export default FormDialogHeader;
