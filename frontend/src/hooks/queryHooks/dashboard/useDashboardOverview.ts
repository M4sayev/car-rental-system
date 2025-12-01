import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "@/config";

export function useDashboardOverview() {
  const fetchDashboardOverview = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/dashboard/overview`);
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  };

  return useQuery({
    queryKey: ["dashboard-overview"],
    queryFn: fetchDashboardOverview,
  });
}
