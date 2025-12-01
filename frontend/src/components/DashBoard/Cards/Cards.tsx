import CustomCard from "./CustomCard";
import axios from "axios";
import { API_BASE_URL } from "@/config";
import { useQuery } from "@tanstack/react-query";
import { cardTemplates } from "@/constants/dashBoardTemplates";
import CardsSkeleton from "./CardsSkeleton";
import Error from "@/components/API/Error";

function Cards() {
  const fetchDashboardOverview = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/dashboard/overview`);
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  };

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["dashboard-overview"],
    queryFn: fetchDashboardOverview,
  });

  if (isLoading) {
    return <CardsSkeleton />;
  }

  if (isError || !data) {
    return <Error error={error}>Error loading dashboard</Error>;
  }

  return (
    <ul className=" flex flex-col md:flex-row gap-5">
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
