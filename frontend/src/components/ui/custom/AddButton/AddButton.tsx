import { Plus } from "lucide-react";
import { Button } from "../../button";
import { forwardRef, type ButtonHTMLAttributes } from "react";

// Use forward ref to let radix and shadcn see the button and pass their props

interface AddButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  actionText?: string;
  ariaLabel?: string;
}

const AddButton = forwardRef<HTMLButtonElement, AddButtonProps>(
  ({ actionText = "Add", ariaLabel = "add a new one", ...props }, ref) => {
    return (
      <Button
        data-testid="add-button"
        className="cursor-pointer"
        ref={ref}
        {...props}
        aria-label={ariaLabel}
      >
        <Plus aria-hidden="true" data-testid="plus-icon" />
        {actionText}
      </Button>
    );
  }
);

export default AddButton;
