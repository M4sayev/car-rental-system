import Error from "@/components/API/Error";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { API_BASE_URL } from "@/config";
import { COLOR_MAP } from "@/constants/colorConstants";
import { shortenId } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ShortID from "./ShortID";

type Status = "active" | "completed";

interface RecentRentalTemplate {
  rental_id: string;
  client_name: string;
  car_name: string;
  start_date: string;
  end_date: string | null;
  status: Status;
}

function RecentRentals() {
  const fetchRecentRentals = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/dashboard/recent-rentals`
      );
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  };

  const { isError, isLoading, error, data } = useQuery({
    queryKey: ["recent-rentals"],
    queryFn: fetchRecentRentals,
  });

  if (isError || !data)
    return <Error error={error}>Could not connect to the server...</Error>;

  if (isLoading) return <div>loading...</div>;

  return (
    <Card className="max-h-160 overflow-auto mb-20 md:mb-10">
      <CardHeader className="">Recent Rental Activities</CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Rental ID</TableHead>
              <TableHead>Client</TableHead>
              <TableHead className="hidden sm:table-cell">Car</TableHead>
              <TableHead className="hidden sm:table-cell">Start Date</TableHead>
              <TableHead className="hidden sm:table-cell">End Date</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((rental: RecentRentalTemplate) => {
              const {
                rental_id,
                client_name,
                car_name,
                start_date,
                end_date,
                status,
              } = rental;
              const iconColor = status === "active" ? "green" : "blue";
              const color = COLOR_MAP[iconColor];
              const formated_start_date = new Date(start_date);
              const formated_end_date = end_date ? new Date(start_date) : null;
              return (
                <TableRow key={rental_id} className="h-12">
                  <TableCell className="font-medium">
                    <ShortID id={rental_id} />
                  </TableCell>
                  <TableCell>{client_name}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {car_name}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {formated_start_date.toLocaleDateString()}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {formated_end_date
                      ? formated_end_date.toLocaleDateString()
                      : "-"}
                  </TableCell>
                  <TableCell className="text-right w-[10%]">
                    <span
                      style={{ backgroundColor: color.bg, color: color.icon }}
                      className=" px-2 sm:px-4 py-1 rounded-lg"
                    >
                      {status}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default RecentRentals;
