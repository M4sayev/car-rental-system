import { API_BASE_URL } from "@/config";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface AuthReponseInterface {
  message: string;
  access_token: string;
  token_type: string;
}

export function loginHook() {
  return useMutation({
    mutationFn: async (
      user: URLSearchParams
    ): Promise<AuthReponseInterface> => {
      const response = await axios.post(`${API_BASE_URL}/login`, user);
      return response.data;
    },
    onError: (error) => {
      console.error(`Error loggin in: ${error}`);
    },
  });
}
