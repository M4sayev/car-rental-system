import { cn } from "@/lib/utils";

function Footer() {
  return (
    <footer
      className={cn(
        "text-fluid-xs relative bottom-0 bg-sidebar",
        "hidden border-t",
        "md:flex md:justify-center nd:items-center md:py-3"
      )}
    >
      © 2025 Car Rental Manager. All rights reserved.
    </footer>
  );
}

export default Footer;
