import { shortenId } from "@/utils/utils";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

function ShortID({ id }: { id: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{shortenId(id)}</TooltipTrigger>
        {id.length < 10 ? (
          ""
        ) : (
          <TooltipContent className="bg-foreground text-background px-2 py-3 rounded-lg">
            <p>{id}</p>
            <TooltipArrow />
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}

export default ShortID;
