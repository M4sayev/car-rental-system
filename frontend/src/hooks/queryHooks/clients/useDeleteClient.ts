import apiClient from "@/auth/client";
import type { ClientTemplate } from "@/constants/clientTemplates";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (clientId: ClientTemplate["client_id"]) => {
      const response = await apiClient.delete(`/clients/${clientId}`);
      return response.data.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      console.log(data);
    },
    onError: (error) => {
      console.error("Delete failed:", error);
    },
  });
}
