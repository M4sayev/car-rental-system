import apiClient from "@/auth/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddCar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => apiClient.post("/cars", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
    onError: (error) => {
      console.error("Post failed:", error);
    },
  });
}
