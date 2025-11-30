import { Calendar, Car, Users, type LucideIcon } from "lucide-react";
import type { ColorTheme } from "./colorConstants";

interface CardTemplate {
  text: string;
  Icon: LucideIcon;
  iconColor: ColorTheme;
  dataKey: string;
  description: string;
}

export const cardTemplates: CardTemplate[] = [
  {
    text: "Total Clients",
    Icon: Users,
    iconColor: "blue",
    dataKey: "total_clients",
    description: "Registered users",
  },
  {
    text: "Available Cars",
    Icon: Car,
    iconColor: "green",
    dataKey: "available_cars",
    description: "Ready for rent",
  },
  {
    text: "Active Rentals",
    Icon: Calendar,
    iconColor: "red",
    dataKey: "active_rentals",
    description: "Currently in use",
  },
];
