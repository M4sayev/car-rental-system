import { API_BASE_URL } from "@/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetAvailableCars(search: string = "") {
  return useQuery({
    queryKey: ["available-cars", search],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/cars/available`, {
        params: { search },
      });
      return response.data.data;
    },
  });
}
