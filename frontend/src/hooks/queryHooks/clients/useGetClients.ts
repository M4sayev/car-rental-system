import { API_BASE_URL } from "@/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetClients(search: string = "") {
  return useQuery({
    queryKey: ["clients", search],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/clients`, {
        params: { search },
      });
      return response.data.data;
    },
  });
}
