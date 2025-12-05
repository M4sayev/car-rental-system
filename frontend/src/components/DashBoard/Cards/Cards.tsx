import CustomCard from "./CustomCard";
import { cardTemplates } from "@/constants/dashBoardTemplates";
import CardsSkeleton from "./CardsSkeleton";
import { useDashboardOverview } from "@/hooks/queryHooks/dashboard/useDashboardOverview";
import ErrorMessage from "@/components/ui/custom/API/ErrorMessage";

function Cards() {
  const { data, isError, isLoading, error } = useDashboardOverview();

  if (isError) {
    return (
      <ErrorMessage error={error}>
        <span className="pt-10">Error loading dashboard</span>
      </ErrorMessage>
    );
  }

  if (isLoading) {
    return <CardsSkeleton />;
  }

  return (
    <ul className="flex flex-col md:flex-row gap-5">
      {cardTemplates.map((card) => {
        const { dataKey, text, Icon, iconColor, description } = card;
        return (
          <CustomCard
            key={dataKey}
            headerText={text}
            Icon={Icon}
            iconColor={iconColor}
            result={data?.[card.dataKey] ?? "-"}
            description={description}
            className="flex-1"
          />
        );
      })}
    </ul>
  );
}

export default Cards;
