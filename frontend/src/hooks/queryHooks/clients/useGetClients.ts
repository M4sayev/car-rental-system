import apiClient from "@/auth/client";
import { useQuery } from "@tanstack/react-query";

export function useGetClients(search: string = "") {
  return useQuery({
    queryKey: ["clients", search],
    queryFn: async () => {
      const response = await apiClient.get("/clients", {
        params: { search },
      });
      return response.data.data;
    },
  });
}
