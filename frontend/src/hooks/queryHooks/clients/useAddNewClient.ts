import apiClient from "@/auth/client";
import type { ClientFormData } from "@/constants/clientTemplates";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddNewClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newClient: ClientFormData) => {
      const response = await apiClient.post("/clients", newClient);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
    onError: (error) => {
      console.error("Delete failed:", error);
    },
  });
}
