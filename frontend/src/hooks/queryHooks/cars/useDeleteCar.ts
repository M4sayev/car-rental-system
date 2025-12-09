import { API_BASE_URL } from "@/config";
import type { CarTemplate } from "@/constants/carsTemplates";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useDeleteCar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (vehicle_id: CarTemplate["vehicle_id"]) => {
      const response = await axios.delete(`${API_BASE_URL}/cars/${vehicle_id}`);
      return response.data.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      console.log(data);
    },
    onError: (error) => {
      console.error("Delete failed:", error);
    },
  });
}
