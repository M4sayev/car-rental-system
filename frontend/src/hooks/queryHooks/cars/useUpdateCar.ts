import { API_BASE_URL } from "@/config";
import type { CarTemplate } from "@/constants/carsTemplates";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface UpdateInterface {
  id: CarTemplate["vehicle_id"];
  data: Omit<CarTemplate, "vehicle_id">;
}

export function useUpdateCar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id: vehicle_id, data }: UpdateInterface) => {
      const response = await axios.patch(
        `${API_BASE_URL}/cars/${vehicle_id}`,
        data
      );
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
