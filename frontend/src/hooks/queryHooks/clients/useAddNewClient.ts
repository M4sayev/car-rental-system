import { API_BASE_URL } from "@/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface ClientInput {
  name: string;
  email: string;
  phone: string;
}

export function useAddNewClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newClient: ClientInput) => {
      const response = await axios.post(`${API_BASE_URL}/clients`, newClient);
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
