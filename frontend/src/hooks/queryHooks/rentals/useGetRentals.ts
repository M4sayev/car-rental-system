import { API_BASE_URL } from "@/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetRentals() {
  const fetchAllRentals = async () => {
    const response = await axios.get(`${API_BASE_URL}/rentals`);
    return response.data.data;
  };

  return useQuery({
    queryKey: ["rentals"],
    queryFn: fetchAllRentals,
  });
}
