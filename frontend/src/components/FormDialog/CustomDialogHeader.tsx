import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";

interface CustomDialogHeaderProps {
  title: string;
  description: string;
  showDescription?: boolean;
}

function CustomDialogHeader({
  title,
  description,
  showDescription = false,
}: CustomDialogHeaderProps) {
  return (
    <DialogHeader>
      <DialogTitle>{title}</DialogTitle>
      <DialogDescription className={showDescription ? "" : "sr-only"}>
        {description}
      </DialogDescription>
    </DialogHeader>
  );
}

export default CustomDialogHeader;
