import { API_BASE_URL } from "@/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetDeletedClients() {
  return useQuery({
    queryKey: ["deleted-clients"],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/clients/deleted`);
      return response.data.data;
    },
  });
}
