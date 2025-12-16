import { carSchema, type CarFormData } from "@/constants/carsTemplates";
import AddEntityDropdown from "@/components/AddEntityDropdown/AddEntityDropdown";
import CarFormDialog from "../CarFormDialog/CarFormDialog";
import { useAddCar } from "@/hooks/queryHooks/cars/useAddCar";
import { preTransformCarData } from "@/utils/utils";

export default function AddCarDropdown() {
  const addCarMutation = useAddCar();
  return (
    <AddEntityDropdown<CarFormData>
      formSchema={carSchema}
      buttonLabel="Add a new car"
      buttonText="Add Car"
      mutation={addCarMutation}
      preTransformData={preTransformCarData}
      EntityFormDialog={CarFormDialog}
    />
  );
}
