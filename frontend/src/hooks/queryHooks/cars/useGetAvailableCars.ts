import { API_BASE_URL } from "@/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetAvailableCars() {
  return useQuery({
    queryKey: ["available-cars"],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/cars/available`);
      return response.data.data;
    },
  });
}
