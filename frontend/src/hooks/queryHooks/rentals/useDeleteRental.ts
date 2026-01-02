import apiClient from "@/auth/client";
import type { RentalTemplate } from "@/constants/rentalsTemplates";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteRental() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (rental_id: RentalTemplate["rental_id"]) => {
      const response = await apiClient.delete(`/rentals/${rental_id}`);
      return response.data.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["rentals"] });
      console.log(data);
    },
    onError: (error) => {
      console.error("Deletion failed", error);
    },
  });
}
