import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  carSchema,
  type CarFormData,
  type CarTemplate,
} from "@/constants/carsTemplates";
import { COLOR_MAP } from "@/constants/colorConstants";
import { useDeleteCar } from "@/hooks/queryHooks/cars/useDeleteCar";
import CarCardHeader from "./CarCardHeader";
import { ActionsButton } from "@/components/ActionsButton/ActionsButton";
import { useUpdateCar } from "@/hooks/queryHooks/cars/useUpdateCar";
import CarFormDialog from "../CarFormDialog/CarFormDialog";
import { preTransformCarData } from "@/utils/utils";

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
  const updateCarMutation = useUpdateCar();
  const name = `${brand} ${model}`;
  const description = `type: ${car_type} | seats: ${seats}`;
  // for color map to access colors
  const color = is_available ? "green" : "red";

  return (
    <Card className="pt-0! overflow-hidden">
      <CarCardHeader
        name={name}
        description={description}
        image_url={image_url}
      />
      <CardContent className="p-6! pt-0! pb-1!">
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
          <ActionsButton<CarFormData>
            defaultData={{
              brand,
              model,
              daily_rate,
              seats,
              car_type,
            }}
            id={vehicle_id}
            mutation={updateCarMutation}
            onDelete={() => deleteCarMutation.mutate(vehicle_id)}
            schema={carSchema}
            imageSrc={image_url}
            EntityFormDialog={CarFormDialog}
            preTransformData={preTransformCarData}
          />
        </CardFooter>
      )}
    </Card>
  );
}

export default CarCard;
