import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "@/config";

export function useRecentRentals() {
  return useQuery({
    queryKey: ["recent-rentals"],
    queryFn: async () => {
      const response = await axios.get(
        `${API_BASE_URL}/dashboard/recent-rentals`
      );
      return response.data.data;
    },
  });
}
