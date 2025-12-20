import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { CarTemplate } from "@/constants/carsTemplates";
import { COLOR_MAP } from "@/constants/colorConstants";
import { useDeleteCar } from "@/hooks/queryHooks/cars/useDeleteCar";
import { CarActions } from "../CarCards/CarActions";

interface CarCardProps extends CarTemplate {
  isDeleted?: boolean;
}

function CarCard({
  brand,
  model,
  seats,
  daily_rate,
  vehicle_id,
  car_type,

  is_available,
  image_url,
  isDeleted = false,
}: CarCardProps) {
  const deleteCarMutation = useDeleteCar();
  const name = `${brand} ${model}`;
  const description = `type: ${car_type} | seats: ${seats}`;
  // for color map to access colors
  const color = is_available ? "green" : "red";

  return (
    <Card className="pt-0! overflow-hidden">
      <CardHeader className="p-0!">
        <div className="h-48">
          <img
            className="w-full h-full object-cover"
            src={`http://127.0.0.1:8000${image_url}`}
            alt={`Car ${name}`}
          />
        </div>
        <div className="pl-6 pt-2 flex flex-col gap-2">
          <CardTitle className="text-2xl md:text-lg">{name}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-6! pt-0! pb-1!">
        <span className="text-fluid-3xl font-bold "></span>
        <CardDescription className="flex items-center justify-between">
          <span
            style={{
              backgroundColor: isDeleted
                ? COLOR_MAP["blue"].bg
                : COLOR_MAP[color].bg,
              color: isDeleted ? COLOR_MAP["blue"].icon : COLOR_MAP[color].icon,
            }}
            className="px-3 py-1 rounded-lg"
          >
            {isDeleted ? "Deleted" : is_available ? "Available" : "Rented"}
          </span>
          <span className="font-bold">
            <span
              style={{ color: COLOR_MAP["blue"].icon }}
              className="text-xl font-bold"
            >
              ${daily_rate}
            </span>
            /day
          </span>
        </CardDescription>
      </CardContent>
      {isDeleted ? (
        " "
      ) : (
        <CardFooter className="border-t flex justify-end">
          <CarActions
            defaultData={{
              brand,
              model,
              image_url,
              daily_rate,
              seats,
              vehicle_id,
              car_type,
              is_available,
            }}
            onDelete={() => deleteCarMutation.mutate(vehicle_id)}
          />
        </CardFooter>
      )}
    </Card>
  );
}

export default CarCard;
