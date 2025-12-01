import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "@/config";

export function useRecentRentals() {
  const fetchRecentRentals = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/dashboard/recent-rentals`
      );
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  };

  return useQuery({
    queryKey: ["recent-rentals"],
    queryFn: fetchRecentRentals,
  });
}
