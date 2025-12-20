import { mockCar } from "@/test/mockData";
import type { modeType } from "@/types/forms";
import { useForm } from "react-hook-form";
import CarFormDialog from "./CarFormDialog";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { CarFormData } from "@/constants/carsTemplates";
import { Dialog } from "@radix-ui/react-dialog";

const client = new QueryClient();

function Wrapper({ mode }: { mode: modeType }) {
  const defaultValues =
    mode === "edit"
      ? mockCar
      : {
          vehicle_id: "",
          brand: "",
          model: "",
          daily_rate: 0.0,
          car_type: "",
          seats: 0,
          is_available: false,
          image_url: undefined,
        };

  const form = useForm<CarFormData>({
    defaultValues,
  });

  const onSubmit = vi.fn();

  return (
    <QueryClientProvider client={client}>
      <Dialog open={true}>
        <CarFormDialog mode={mode} onSubmit={onSubmit} form={form} />
      </Dialog>
    </QueryClientProvider>
  );
}

describe("CarFormDialog", () => {
  it("renders inputs with correct id, placeholder", () => {
    render(<Wrapper mode="create" />);

    const brandInput = screen.getByPlaceholderText(/Toyota/i);
    const modelInput = screen.getByPlaceholderText(/Supra/i);
    const carTypeInput = screen.getByPlaceholderText(/Sedan/i);
    const dailyRate = screen.getByPlaceholderText("212.0");
    const seatsInput = screen.getByPlaceholderText("4");
    const imageInput = screen.getByLabelText(/car image/i);

    expect(brandInput).toBeInTheDocument();
    expect(brandInput).toHaveAttribute("id", "brand");
    expect(brandInput).toHaveAttribute("aria-invalid", "false");
    expect(brandInput).toHaveAttribute("autocomplete", "off");

    expect(modelInput).toBeInTheDocument();
    expect(modelInput).toHaveAttribute("id", "model");
    expect(modelInput).toHaveAttribute("aria-invalid", "false");
    expect(modelInput).toHaveAttribute("autocomplete", "off");

    expect(carTypeInput).toBeInTheDocument();
    expect(carTypeInput).toHaveAttribute("id", "car_type");
    expect(carTypeInput).toHaveAttribute("aria-invalid", "false");
    expect(carTypeInput).toHaveAttribute("autocomplete", "off");

    expect(dailyRate).toBeInTheDocument();
    expect(dailyRate).toHaveAttribute("id", "daily_rate");
    expect(dailyRate).toHaveAttribute("aria-invalid", "false");
    expect(dailyRate).toHaveAttribute("autocomplete", "off");

    expect(seatsInput).toBeInTheDocument();
    expect(seatsInput).toHaveAttribute("id", "seats");
    expect(seatsInput).toHaveAttribute("aria-invalid", "false");
    expect(seatsInput).toHaveAttribute("autocomplete", "off");

    expect(imageInput).toBeInTheDocument();
    expect(imageInput).toHaveAttribute("id", "image_url");
    expect(
      screen.getByText("Upload an image or drag and drop here")
    ).toBeInTheDocument();
  });
  it("renders the header footer correctly on create mode", () => {
    render(<Wrapper mode="create" />);

    expect(screen.getByText(/Add new car/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Enter the car's details below to add to your database./i
      )
    ).toBeInTheDocument();
    const cancelButton = screen.getByLabelText(
      /Cancel actions and close the dialog/i
    );
    expect(cancelButton).toBeInTheDocument();
    expect(cancelButton).toHaveTextContent("Cancel");

    const createEditButton = screen.getByLabelText(/Create a new car/i);
    expect(createEditButton).toBeInTheDocument();

    expect(createEditButton).toHaveTextContent("Create");
  });
  it("renders the header footer correctly on edit mode", () => {
    render(<Wrapper mode="edit" />);

    expect(screen.getByText(/Edit car data/i)).toBeInTheDocument();

    const cancelButton = screen.getByLabelText(
      /Cancel actions and close the dialog/i
    );
    expect(cancelButton).toBeInTheDocument();
    expect(cancelButton).toHaveTextContent("Cancel");

    const createEditButton = screen.getByLabelText(/edit selected car's data/i);
    expect(createEditButton).toBeInTheDocument();

    expect(createEditButton).toHaveTextContent("Update");
  });
  it("renders default data on edit mode", () => {
    render(<Wrapper mode="edit" />);

    const brandInput = screen.getByPlaceholderText(/Toyota/i);
    const modelInput = screen.getByPlaceholderText(/Supra/i);
    const carTypeInput = screen.getByPlaceholderText(/Sedan/i);
    const dailyRate = screen.getByPlaceholderText("212.0");
    const seatsInput = screen.getByPlaceholderText("4");

    expect(brandInput).toHaveValue(mockCar.brand);
    expect(modelInput).toHaveValue(mockCar.model);
    expect(carTypeInput).toHaveValue(mockCar.car_type);
    expect(dailyRate).toHaveValue(mockCar.daily_rate);
    expect(seatsInput).toHaveValue(mockCar.seats);
  });
});
