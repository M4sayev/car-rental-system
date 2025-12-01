import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Dispatch, SetStateAction } from "react";

interface ClientEditDialogProps {
  open: boolean | undefined;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

function ClientEditDialog({ open, onOpenChange }: ClientEditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit the client</DialogTitle>
        </DialogHeader>
        <FieldGroup className="py-3">
          <Field>
            <Label htmlFor="full-name">Full Name</Label>
            <Input
              id="full-name"
              name="full-name"
              type="text"
              placeholder="Elvin Musayev"
              autoComplete="off"
            />
          </Field>
          <Field>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="youremail@gmail.com"
              autoComplete="off"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="message">Message (Optional)</FieldLabel>
            <Input
              id="phone"
              name="phone"
              type="phone"
              placeholder="+99994954533"
              autoComplete="off"
            />
          </Field>
        </FieldGroup>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Edit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ClientEditDialog;
