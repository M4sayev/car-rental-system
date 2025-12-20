import { API_BASE_URL } from "@/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useAddCar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => axios.post(`${API_BASE_URL}/cars`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
    onError: (error) => {
      console.error("Post failed:", error);
    },
  });
}
