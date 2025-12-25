import { Skeleton } from "@/components/ui/skeleton";
import { SKELETON_TABLE_ROW_COUNT } from "@/constants/skeleton";

function ClientsTableSkeleton() {
  return (
    <div data-testid="clients-table-skeleton" className="p-4">
      <div className="space-y-3">
        {[...Array(SKELETON_TABLE_ROW_COUNT)].map((_, i) => (
          <div
            key={i}
            className={`flex items-center gap-1 space-x-4 ${
              i === 0 ? "pb-3" : ""
            }`}
          >
            <Skeleton className="h-6 w-20 sm:w-1/8 mr-auto" />
            <Skeleton className="h-6 w-20 sm:w-1/6 mx-auto" />
            <Skeleton className="h-6 w-1/8 mx-auto hidden sm:block" />
            <Skeleton className="h-6 w-1/6 mx-auto hidden sm:block" />
            <Skeleton className="h-6 w-12 sm:w-1/10 ml-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClientsTableSkeleton;
