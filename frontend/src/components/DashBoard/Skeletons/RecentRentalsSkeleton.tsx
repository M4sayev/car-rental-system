import { Skeleton } from "@/components/ui/skeleton";
import { SKELETON_TABLE_ROW_COUNT } from "@/constants/skeleton";

function RecentRentalsSkeleton() {
  return (
    <div data-testid="recent-rentals-table-skeleton" className="p-4">
      <div className="space-y-3">
        {[...Array(SKELETON_TABLE_ROW_COUNT)].map((_, i) => (
          <div
            key={i}
            className={`flex items-center space-x-4 ${i === 0 ? "pb-3" : ""}`}
          >
            <Skeleton className="h-6 w-10 sm:1/8 mr-auto" />
            <Skeleton className="h-6 w-8 sm:w-1/12 mx-auto" />
            <Skeleton className="h-6 w-1/7 mx-auto hidden lg:block" />
            <Skeleton className="h-6 w-1/12 mx-auto hidden sm:block" />
            <Skeleton className="h-6 w-1/12 mx-auto hidden lg:block" />
            <Skeleton className="h-6 w-6 sm:w-1/13 ml-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentRentalsSkeleton;
