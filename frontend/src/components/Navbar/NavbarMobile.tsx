import { routes } from "@/constants/routeConstants";
import NavbarButton from "./NavbarButton";
import { cn } from "@/lib/utils";

function NavbarMobile() {
  return (
    <div className="bg-black">
      <nav
        className={cn(
          " fixed bottom-0 z-1 left-0 right-0 pt-4",
          "flex items-center justify-around",
          "max-w-md mx-auto px-8 bg-background rounded-t-3xl",
          "border-t border-l border-r"
        )}
      >
        {routes.map((route) => {
          const { ariaLabel, actionText, id, Icon, path } = route;
          return (
            <NavbarButton
              key={id}
              ariaLabel={ariaLabel}
              path={path}
              activeClassName="bg-sidebar-accent"
              className="p-3 rounder rounded-t-2xl transition-colors duration-300 ease-in-out"
            >
              <Icon />
              <span className="sr-only">{actionText}</span>
            </NavbarButton>
          );
        })}
      </nav>
    </div>
  );
}

export default NavbarMobile;
