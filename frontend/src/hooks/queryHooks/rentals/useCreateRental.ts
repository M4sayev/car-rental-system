import apiClient from "@/auth/client";
import type { CarTemplate } from "@/constants/carsTemplates";
import type { ClientTemplate } from "@/constants/clientTemplates";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CreateRentalInterface {
  vehicle_id: CarTemplate["vehicle_id"];
  client_id: ClientTemplate["client_id"];
}

export function useCreateRental() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ vehicle_id, client_id }: CreateRentalInterface) => {
      const response = await apiClient.post(
        `/rentals?car_id=${vehicle_id}&client_id=${client_id}`
      );
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rentals"] });
    },
    onError: (error) => console.error("Post failed:", error),
  });
}
