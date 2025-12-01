import type { PropsWithChildren } from "react";

interface ErrorProps extends PropsWithChildren {
  error: Error | null;
}
function Error({ error, children }: ErrorProps) {
  console.error(error);

  return (
    <div
      role="status"
      aria-live="polite"
      className="font-mono grid place-items-center"
    >
      {children}
    </div>
  );
}

export default Error;
