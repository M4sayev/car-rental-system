import apiClient from "@/auth/client";
import { useQuery } from "@tanstack/react-query";

export function useGetAllCars() {
  return useQuery({
    queryKey: ["cars"],
    queryFn: async () => {
      const response = await apiClient.get("/cars");
      return response.data.data;
    },
  });
}
