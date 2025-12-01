import { API_BASE_URL } from "@/config";
import type { ClientTemplate } from "@/constants/clientTemplates";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useDeleteClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (clientId: ClientTemplate["client_id"]) => {
      const response = await axios.delete(
        `${API_BASE_URL}/clients/${clientId}`
      );
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
