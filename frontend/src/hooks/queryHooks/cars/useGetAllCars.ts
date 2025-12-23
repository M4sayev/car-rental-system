import { API_BASE_URL } from "@/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetAllCars() {
  return useQuery({
    queryKey: ["cars"],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/cars`);
      return response.data.data;
    },
  });
}
