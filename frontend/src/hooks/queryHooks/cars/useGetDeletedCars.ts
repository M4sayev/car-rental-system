import apiClient from "@/auth/client";
import { useQuery } from "@tanstack/react-query";

export function useGetDeletedCars() {
  return useQuery({
    queryKey: ["deleted-cars"],
    queryFn: async () => {
      const response = await apiClient.get("/cars/deleted");
      return response.data.data;
    },
  });
}
