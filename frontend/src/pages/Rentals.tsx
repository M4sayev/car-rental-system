import RecentRentalsHeader from "@/components/DashBoard/RecentRentals/RecentRentalsHeader";
import RecentRentalsSkeleton from "@/components/DashBoard/RecentRentals/RecentRentalsSkeleton";
import RentalRow from "@/components/DashBoard/RecentRentals/RentalRow";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody } from "@/components/ui/table";
import { API_BASE_URL } from "@/config";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function Rentals() {
  // temp to create an mvp for the project to showcase

  const fetchAllRentals = async () => {
    const response = await axios.get(`${API_BASE_URL}/rentals`);
    return response.data.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["rentals"],
    queryFn: fetchAllRentals,
  });

  if (isError) return <div>error</div>;
  if (isLoading) return <div>loading...</div>;

  const newData = data.map((rental: any) => {
    return {
      ...rental,
      car_name: `${rental.car.brand} ${rental.car.model} (${rental.car.car_type})`,
      client_name: rental.client.name,
      status: rental.is_active ? "active" : "completed",
    };
  });

  return (
    <div className="min-h-screen px-5 md:px-8 py-2 max-w-md sm:max-w-xl md:max-w-7xl  mx-auto">
      <h1 className="font-open text-fluid-2xl text-center md:text-start pt-4 mb-5">
        Rentals overview page
      </h1>
      <Card className="max-h-160 overflow-auto mb-20 md:mb-10">
        <CardHeader className="">Rentals Overview</CardHeader>
        <CardContent>
          {isLoading ? (
            <RecentRentalsSkeleton />
          ) : (
            <Table>
              <RecentRentalsHeader />
              <TableBody>
                {newData?.map((rental: any) => (
                  <RentalRow key={rental.rental_id} rental={rental} />
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Rentals;
