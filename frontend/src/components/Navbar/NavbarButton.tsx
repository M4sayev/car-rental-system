import { cn } from "@/lib/utils";
import { type PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";

export interface NavbarButtonProps extends PropsWithChildren {
  path: string;
  ariaLabel: string;
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
}

function NavbarButton({
  path,
  ariaLabel,
  children,
  className = "",
  activeClassName = "text-primary",
  inactiveClassName = "text-muted-foreground",
}: NavbarButtonProps) {
  return (
    <NavLink
      to={path}
      aria-label={ariaLabel}
      className={({ isActive }) =>
        cn(
          className,
          "flex gap-2",
          isActive ? activeClassName : inactiveClassName
        )
      }
    >
      {children}
    </NavLink>
  );
}

export default NavbarButton;
