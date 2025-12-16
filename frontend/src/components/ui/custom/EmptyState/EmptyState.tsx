import { type LucideIcon } from "lucide-react";

interface EmptyStateProps {
  Icon: LucideIcon;
  title: string;
  description?: string;
  iconTestId?: string;
  titleId?: string;
}

function EmptyState({
  Icon,
  title,
  description = "Nothing in there",
  iconTestId = "empty-state-icon",
  titleId = "empty-state-title",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center text-center gap-5 py-25">
      <Icon data-testid={iconTestId} aria-hidden="true" className="h-10 w-10" />
      <div className="font-semibold text-fluid-lg max-w-md">
        <h2 id={titleId} className="block font-bold">
          {title}
        </h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default EmptyState;
