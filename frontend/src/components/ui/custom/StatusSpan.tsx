import type { AvailabilityStatus } from "@/constants/carsTemplates";
import type { COLOR_MAP } from "@/constants/colorConstants";
import type { Status } from "@/constants/rentalsTemplates";

interface StatusSpanProps {
  color: (typeof COLOR_MAP)[keyof typeof COLOR_MAP];
  status: Status | AvailabilityStatus | string;
  className?: string;
}
function StatusSpan({ color, status, className = "" }: StatusSpanProps) {
  return (
    <span
      data-testid="status-span"
      style={{ backgroundColor: color.bg, color: color.icon }}
      className={`${className} px-3 py-1 rounded-lg`}
    >
      {status}
    </span>
  );
}

export default StatusSpan;
