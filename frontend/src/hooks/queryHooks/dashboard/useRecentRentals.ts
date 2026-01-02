import { useQuery } from "@tanstack/react-query";
import apiClient from "@/auth/client";

export function useRecentRentals() {
  return useQuery({
    queryKey: ["recent-rentals"],
    queryFn: async () => {
      const response = await apiClient.get("/dashboard/recent-rentals");
      return response.data.data;
    },
  });
}
