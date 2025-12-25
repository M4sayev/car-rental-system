import type {
  AvailabilityStatus,
  CarFormData,
} from "@/constants/carsTemplates";
import { COLOR_MAP } from "@/constants/colorConstants";
import type { Status } from "@/constants/rentalsTemplates";

export function shortenId(id: string) {
  if (id.length < 10) return id;
  return `${id.slice(0, 8)}…${id.slice(-4)}`;
}

export function formatStringToISO(str: string): string {
  // If it's already ISO-ish
  if (/^\d{4}-\d{2}-\d{2}/.test(str)) {
    return str.split("T")[0];
  }

  // If it's mm/dd/yyyy
  const match = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (match) {
    const [, m, d, y] = match.map(Number);
    return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  }

  return "-";
}

// to transorm edit or create car data into a formData for generic components such as AddEntityDropdown, ActionButtons
export const preTransformCarData = (data: CarFormData) => {
  const formData = new FormData();
  formData.append("brand", data.brand);
  formData.append("model", data.model);
  formData.append("daily_rate", String(data.daily_rate));
  formData.append("car_type", data.car_type);
  formData.append("seats", String(data.seats));
  const imageFile = data.image_url;

  if (imageFile instanceof File) {
    formData.append("image_url", imageFile, imageFile.name);
  }
  return formData;
};

export const covertFromSnakeCaseToTitle = (str: string): string =>
  str.split("_").join(" ");

export function getStatusColor(
  status: Status | AvailabilityStatus | "deleted"
) {
  switch (status) {
    case "available":
      return COLOR_MAP.green;
    case "rented":
      return COLOR_MAP.red;
    case "active":
      return COLOR_MAP.green;
    case "completed":
      return COLOR_MAP.blue;
    default:
      return COLOR_MAP.blue;
  }
}
