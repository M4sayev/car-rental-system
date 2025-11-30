import { routes } from "@/constants/routeConstants";
import NavbarButton from "./NavbarButton";
import { cn } from "@/lib/utils";

function NavbarDesktop() {
  return (
    <aside
      className={cn("bg-sidebar left-0 h-full inline-flex flex-col border-r")}
    >
      <div className="py-15"></div>
      <nav className="pt-5 px-3 h-full border-t flex flex-col gap-4">
        {routes.map((route) => {
          const { ariaLabel, actionText, id, Icon, path } = route;
          return (
            <NavbarButton
              key={id}
              ariaLabel={ariaLabel}
              path={path}
              activeClassName="bg-sidebar-accent"
              className="rounded-2xl pl-5 pr-20 py-3 transition-colors duration-300 ease-in-out"
            >
              <Icon />
              <span>{actionText}</span>
            </NavbarButton>
          );
        })}
      </nav>
    </aside>
  );
}

export default NavbarDesktop;
