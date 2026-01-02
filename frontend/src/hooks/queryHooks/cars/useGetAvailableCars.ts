import apiClient from "@/auth/client";
import { useQuery } from "@tanstack/react-query";

export function useGetAvailableCars(search: string = "") {
  return useQuery({
    queryKey: ["available-cars", search],
    queryFn: async () => {
      const response = await apiClient.get("/cars/available", {
        params: { search },
      });
      return response.data.data;
    },
  });
}
