import { Skeleton } from "@/components/ui/skeleton";
import { SKELETON_CAR_CARD_COUNT } from "@/constants/skeleton";

function CarCardsSkeleton({ deleted = false }: { deleted?: boolean }) {
  return (
    <div
      data-testid="car-card-skeleton"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-5 mb-20 md:mb-3"
    >
      {Array.from({ length: SKELETON_CAR_CARD_COUNT }, (_, index) => (
        <div
          key={`car-card-skeleton-${index}`}
          className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border shadow-sm flex-1"
        >
          <div>
            <div className="h-48">
              <Skeleton className="w-full h-full" />
            </div>
            <div className="pl-6 pt-2 flex flex-col gap-2">
              <Skeleton className="w-1/2 h-9" />
              <Skeleton className="w-1/2 h-9" />
            </div>
          </div>
          <div className="p-6 pt-0 pb-1">
            <div className="flex items-center justify-between">
              <Skeleton className="w-1/4 h-5" />
              <Skeleton className="w-1/4 h-8" />
            </div>
          </div>
          <div
            className={`border-t flex justify-end p-6 ${
              deleted ? "justify-between" : ""
            }`}
          >
            {deleted && <Skeleton className="w-12 h-9" />}
            <Skeleton className={`w-9 h-9 ${deleted ? "w-12" : ""}`} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default CarCardsSkeleton;
