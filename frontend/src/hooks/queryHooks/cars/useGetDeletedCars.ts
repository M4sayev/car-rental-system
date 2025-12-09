import { API_BASE_URL } from "@/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetDeletedCars() {
  const fetchDeletedCars = async () => {
    const response = await axios.get(`${API_BASE_URL}/cars/deleted`);
    console.log({ response });
    return response.data.data;
  };
  return useQuery({
    queryKey: ["deleted-cars"],
    queryFn: fetchDeletedCars,
  });
}
