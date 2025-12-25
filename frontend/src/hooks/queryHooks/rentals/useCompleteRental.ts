import { API_BASE_URL } from "@/config";
import type { RentalTemplate } from "@/constants/rentalsTemplates";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useCompleteRental() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (rental_id: RentalTemplate["rental_id"]) => {
      const response = await axios.patch(
        `${API_BASE_URL}/rentals/${rental_id}/complete`
      );
      return response.data.data;
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["rentals"] });
    },
    onError: (error) => console.error("Error updating", error),
  });
}
