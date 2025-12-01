import {
  CalendarDays,
  Car,
  LayoutDashboard,
  Users,
  type LucideIcon,
} from "lucide-react";

interface Route {
  id: string;
  path: string;
  actionText: string;
  ariaLabel: string;
  Icon: LucideIcon;
}

export const routes: Route[] = [
  {
    id: "route-1",
    path: "/",
    actionText: "Dashboard",
    ariaLabel: "to go our Dashboard",
    Icon: LayoutDashboard,
  },
  {
    id: "route-2",
    path: "/clients",
    actionText: "Clients",
    ariaLabel: "view our clients page",
    Icon: Users,
  },
  {
    id: "route-3",
    path: "/cars",
    actionText: "Cars",
    ariaLabel: "to go our cars page",
    Icon: Car,
  },
  {
    id: "route-4",
    path: "/rentals",
    actionText: "Rentals",
    ariaLabel: "to go our rentals page",
    Icon: CalendarDays,
  },
];
