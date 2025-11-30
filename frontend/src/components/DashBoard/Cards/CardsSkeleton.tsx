interface CardsSkeletonProps {
  count?: number;
}

function CardsSkeleton({ count = 3 }: CardsSkeletonProps) {
  const items = Array.from({ length: count }, (_, i) => i);
  return (
    <ul
      role="presentation"
      aria-hidden="true"
      className="flex flex-col md:flex-row gap-5 [&_span]:bg-[#1e212833] [&_span]:rounded  [&_span]:inline-block [&_span]:animate-pulse"
    >
      {items.map((item) => {
        return (
          <li key={`Skeleton-item-${item}`} className="w-full">
            <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm flex-1">
              <div className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-17 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6">
                <div className="flex justify-between items-center gap-2">
                  <span className="w-1/3 h-5.5"></span>
                  <span className="h-10 w-10"></span>
                </div>
                <div className="flex flex-col gap-3">
                  <span className="w-1/3 h-6 text-fluid-3xl font-bold"></span>
                  <span className="w-1/4 h-3"></span>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default CardsSkeleton;
