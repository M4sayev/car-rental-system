import { API_BASE_URL } from "@/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetAllCars() {
  const fetchCars = async () => {
    const response = await axios.get(`${API_BASE_URL}/cars`);
    return response.data.data;
  };
  return useQuery({
    queryKey: ["cars"],
    queryFn: fetchCars,
  });
}
