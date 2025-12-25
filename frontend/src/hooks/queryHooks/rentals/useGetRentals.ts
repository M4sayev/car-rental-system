import { API_BASE_URL } from "@/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetRentals(search: string = "") {
  return useQuery({
    queryKey: ["rentals", search],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/rentals`, {
        params: { search },
      });
      return response.data.data;
    },
  });
}
