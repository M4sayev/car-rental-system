import { type LucideIcon } from "lucide-react";

interface EmptyStateProps {
  Icon: LucideIcon;
  title: string;
  description?: string;
  iconTestId?: string;
}

function EmptyState({
  Icon,
  title,
  description = "Nothing in there",
  iconTestId = "empty-state-icon",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center text-center gap-5 py-25">
      <Icon data-testid={iconTestId} aria-hidden="true" className="h-10 w-10" />
      <p className="font-semibold text-fluid-lg max-w-md">
        <span className="block font-bold">{title}</span>
        {description}
      </p>
    </div>
  );
}

export default EmptyState;
