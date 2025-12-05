import type { PropsWithChildren } from "react";

interface ErrorProps extends PropsWithChildren {
  error: Error | null;
  className?: string;
}
function ErrorMessage({ error, children, className = "" }: ErrorProps) {
  console.error(error);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`font-mono grid place-items-center ${className}`}
      data-testid="api-error"
    >
      {children}
    </div>
  );
}

export default ErrorMessage;
