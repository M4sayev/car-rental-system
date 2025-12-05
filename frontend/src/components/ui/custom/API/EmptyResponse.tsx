import type { PropsWithChildren } from "react";

interface EmptyResponse extends PropsWithChildren {
  label?: string;
  className?: string;
}

function EmptyResponse({ label, children, className = "" }: EmptyResponse) {
  return (
    <div
      data-testid="empty-reponse"
      className={`grid place-items-center py-5 ${className}`}
      aria-label={label}
      role="status"
      aria-live="polite"
    >
      {children}
    </div>
  );
}

export default EmptyResponse;
