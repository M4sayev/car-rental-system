// TO BE IMPLEMENTED
// generic type for addCarDropdown and add ClientDropdonw (cannot type it properly)

// import { zodResolver } from "@hookform/resolvers/zod";
// import type { UseMutationResult } from "@tanstack/react-query";
// import { useState } from "react";
// import { useForm, type FieldValues, type UseFormReturn } from "react-hook-form";
// import { z, ZodObject } from "zod";
// import { Dialog, DialogTrigger } from "@/components/ui/dialog";
// import { DropdownMenu } from "@/components/ui/dropdown-menu";
// import type { modeType } from "@/types/forms";

// interface EntityFormProps<F extends FieldValues> {
//   form: UseFormReturn<F>;
//   mode: modeType;
//   onSumbit: (data: F) => void;
//   defaultValues?: F;
// }

// interface AddEntityDropdown<T, F extends FieldValues> {
//   mutation: UseMutationResult<T[], unknown, T, unknown>;
//   schema: ZodObject<any>;
//   defaultValues: F;
//   EntityForm: React.FC<EntityFormProps<F>>;
//   DropdownTrigger: React.ReactNode;
// }
// function AddEntityDropdown<T, F extends FieldValues>({
//   mutation,
//   schema,
//   defaultValues,
//   EntityForm,
//   DropdownTrigger,
// }: AddEntityDropdown<T, F>) {
//   const addEntityMutation = mutation;
//   const [isOpen, setIsOpen] = useState(false);

//   const form = useForm<z.infer<typeof schema>>({
//     resolver: zodResolver(schema),
//     defaultValues,
//     mode: "onChange",
//   });

//   const onSubmit = (data: z.infer<typeof schema>) => {
//     console.log("Validated form data: ", data);
//     addEntityMutation.mutate(data as any, {
//       onSuccess: () => {
//         setIsOpen(false);
//         form.reset();
//       },
//     });
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={setIsOpen}>
//       <DropdownMenu>
//         <DialogTrigger asChild>{DropdownTrigger}</DialogTrigger>
//       </DropdownMenu>
//       <EntityForm form={form as any} mode="create" onSumbit={onSubmit} />
//     </Dialog>
//   );
// }

// export default AddEntityDropdown;
