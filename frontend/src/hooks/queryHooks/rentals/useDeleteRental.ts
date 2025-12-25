import { API_BASE_URL } from "@/config";
import type { RentalTemplate } from "@/constants/rentalsTemplates";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useDeleteRental() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (rental_id: RentalTemplate["rental_id"]) => {
      const response = await axios.delete(
        `${API_BASE_URL}/rentals/${rental_id}`
      );
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
