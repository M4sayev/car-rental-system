import { API_BASE_URL } from "@/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetClients() {
  const fetchClients = async () => {
    const response = await axios.get(`${API_BASE_URL}/clients`);
    return response.data.data;
  };

  return useQuery({
    queryKey: ["clients"],
    queryFn: fetchClients,
  });
}
