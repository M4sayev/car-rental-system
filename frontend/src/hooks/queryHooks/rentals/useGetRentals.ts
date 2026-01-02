import apiClient from "@/auth/client";
import { useQuery } from "@tanstack/react-query";

export function useGetRentals(search: string = "") {
  return useQuery({
    queryKey: ["rentals", search],
    queryFn: async () => {
      const response = await apiClient.get("/rentals", {
        params: { search },
      });
      return response.data.data;
    },
  });
}
