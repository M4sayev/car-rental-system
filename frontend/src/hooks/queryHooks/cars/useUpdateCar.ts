import apiClient from "@/auth/client";
import type { CarFormData, CarTemplate } from "@/constants/carsTemplates";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateInterface {
  id: CarTemplate["vehicle_id"];
  data: CarFormData;
}

export function useUpdateCar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id: vehicle_id, data }: UpdateInterface) => {
      const response = await apiClient.patch(`/cars/${vehicle_id}`, data);
      return response.data.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      console.log(data);
    },
    onError: (error) => {
      console.error("Update failed:", error);
    },
  });
}
