import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { ClientTemplate } from "../../../constants/clientTemplates";
import axios from "axios";
import { API_BASE_URL } from "@/config";

interface UpdateInterface {
  id: ClientTemplate["client_id"];
  data: Omit<ClientTemplate, "client_id">;
}

export function useUpdateClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: UpdateInterface) => {
      const response = await axios.patch(`${API_BASE_URL}/clients/${id}`, data);
      return response.data.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      console.log(data);
    },
    onError: (error) => {
      console.error("Update failed:", error);
    },
  });
}
