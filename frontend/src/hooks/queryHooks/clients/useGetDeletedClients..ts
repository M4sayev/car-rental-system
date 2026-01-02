import apiClient from "@/auth/client";
import { useQuery } from "@tanstack/react-query";

export function useGetDeletedClients() {
  return useQuery({
    queryKey: ["deleted-clients"],
    queryFn: async () => {
      const response = await apiClient.get("/clients/deleted");
      return response.data.data;
    },
  });
}
