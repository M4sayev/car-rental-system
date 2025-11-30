import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { COLOR_MAP } from "@/constants/colorConstants";

type Status = "active" | "complete";

interface Activity {
  rentalId: string;
  client: string;
  car: string;
  startDate: string;
  endDate: string;
  status: Status;
}

const activities: Activity[] = [
  {
    rentalId: "R001",
    client: "me",
    car: "gaegeg",
    startDate: "143-1241-51",
    endDate: "124515325",
    status: "active",
  },
  {
    rentalId: "R002",
    client: "me",
    car: "gaegeg",
    startDate: "143-1241-51",
    endDate: "124515325",
    status: "active",
  },
  {
    rentalId: "R003",
    client: "me",
    car: "gaegeg",
    startDate: "143-1241-51",
    endDate: "124515325",
    status: "active",
  },
  {
    rentalId: "R004",
    client: "me",
    car: "gaegeg",
    startDate: "143-1241-51",
    endDate: "124515325",
    status: "complete",
  },
  {
    rentalId: "R005",
    client: "me",
    car: "gaegeg",
    startDate: "143-1241-51",
    endDate: "124515325",
    status: "active",
  },
  {
    rentalId: "R007",
    client: "me",
    car: "gaegeg",
    startDate: "143-1241-51",
    endDate: "124515325",
    status: "complete",
  },
  {
    rentalId: "R006",
    client: "me",
    car: "gaegeg",
    startDate: "143-1241-51",
    endDate: "124515325",
    status: "active",
  },
];

function RecentRentals() {
  return (
    <Card className="max-h-160 overflow-auto mb-20 md:mb-10">
      <CardHeader className="">Recent Rental Activities</CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Rental ID</TableHead>
              <TableHead>Client</TableHead>
              <TableHead className="hidden sm:block">Car</TableHead>
              <TableHead className="hidden sm:block">Start Date</TableHead>
              <TableHead className="hidden sm:block">End Date</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity) => {
              const { rentalId, client, car, startDate, endDate, status } =
                activity;
              const iconColor = status === "active" ? "green" : "blue";
              const color = COLOR_MAP[iconColor];
              return (
                <TableRow key={rentalId} className="h-12">
                  <TableCell className="font-medium">{rentalId}</TableCell>
                  <TableCell>{client}</TableCell>
                  <TableCell className="hidden sm:block">{car}</TableCell>
                  <TableCell className="hidden sm:block">{startDate}</TableCell>
                  <TableCell className="hidden sm:block">{endDate}</TableCell>
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
