import { useQuery } from "@tanstack/react-query";
import apiClient from "@/auth/client";

export function useDashboardOverview() {
  return useQuery({
    queryKey: ["dashboard-overview"],
    queryFn: async () => {
      const response = await apiClient.get("/dashboard/overview");
      return response.data.data;
    },
  });
}
