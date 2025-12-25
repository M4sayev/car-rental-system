import type { PropsWithChildren } from "react";

interface EmptyResponse extends PropsWithChildren {
  labelledBy?: string;
  className?: string;
}

function EmptyResponse({
  labelledBy,
  children,
  className = "",
}: EmptyResponse) {
  return (
    <div
      data-testid="empty-reponse"
      className={`grid place-items-center py-5 ${className}`}
      aria-labelledby={labelledBy}
      role="status"
      aria-live="polite"
    >
      {children}
    </div>
  );
}

export default EmptyResponse;
