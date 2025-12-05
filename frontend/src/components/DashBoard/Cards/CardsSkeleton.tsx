import { Skeleton } from "@/components/ui/skeleton";

interface CardsSkeletonProps {
  count?: number;
}

function CardsSkeleton({ count = 3 }: CardsSkeletonProps) {
  const items = Array.from({ length: count });

  return (
    <ul
      data-testid="cards-skeleton"
      className="flex flex-col md:flex-row gap-5"
    >
      {items.map((_, i) => (
        <li key={i} className="w-full">
          <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm flex-1">
            <div className="grid gap-4 px-6">
              <div className="flex justify-between items-center gap-2">
                <Skeleton className="w-1/3 h-5" />
                <Skeleton className="w-10 h-10 rounded-full" />
              </div>
              <div className="flex flex-col gap-3">
                <Skeleton className="w-1/3 h-6" />
                <Skeleton className="w-1/4 h-3" />
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CardsSkeleton;
