import apiClient from "@/auth/client";
import type { RentalTemplate } from "@/constants/rentalsTemplates";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCompleteRental() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (rental_id: RentalTemplate["rental_id"]) => {
      const response = await apiClient.patch(`/rentals/${rental_id}/complete`);
      return response.data.data;
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["rentals"] });
    },
    onError: (error) => console.error("Error updating", error),
  });
}
