import { API_BASE_URL } from "@/config";
import type { CarTemplate } from "@/constants/carsTemplates";
import type { ClientTemplate } from "@/constants/clientTemplates";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface CreateRentalInterface {
  vehicle_id: CarTemplate["vehicle_id"];
  client_id: ClientTemplate["client_id"];
}

export function useCreateRental() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ vehicle_id, client_id }: CreateRentalInterface) => {
      const response = await axios.post(
        `${API_BASE_URL}/rentals?car_id=${vehicle_id}&client_id=${client_id}`
      );
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rentals"] });
    },
    onError: (error) => console.error("Post failed:", error),
  });
}
