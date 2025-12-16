import { render, screen } from "@testing-library/react";
import CarCard from "../CarCard";
import { mockCar } from "@/test/mockData";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { COLOR_MAP } from "@/constants/colorConstants";

const queryClient = new QueryClient();

const renderCarCard = (
  is_available: boolean = false,
  isDeleted: boolean = false
) => {
  const {
    brand,
    model,
    daily_rate,
    vehicle_id,
    seats,
    car_type,
    image_url,
    deletion_date,
  } = mockCar;
  return (
    <QueryClientProvider client={queryClient}>
      <CarCard
        is_available={is_available}
        isDeleted={isDeleted}
        brand={brand}
        seats={seats}
        vehicle_id={vehicle_id}
        daily_rate={daily_rate}
        image_url={image_url}
        model={model}
        car_type={car_type}
        deletion_date={deletion_date}
      />
    </QueryClientProvider>
  );
};
describe("CarCard", () => {
  it("sets color properly on availability", () => {
    const { rerender } = render(renderCarCard());
    let availabilitySpan = screen.getByText(/rented/i);
    expect(availabilitySpan).toHaveStyle(
      `background-color: ${COLOR_MAP["red"].bg}; color: ${COLOR_MAP["red"].icon}`
    );

    rerender(renderCarCard(true));

    availabilitySpan = screen.getByText(/available/i);
    expect(availabilitySpan).toHaveStyle(
      `background-color: ${COLOR_MAP["green"].bg}; color: ${COLOR_MAP["green"].icon}`
    );
  });
  it("renders name and description properly", () => {
    render(renderCarCard());

    expect(
      screen.getByText(`${mockCar.brand} ${mockCar.model}`)
    ).toBeInTheDocument();

    expect(
      screen.getByText(`type: ${mockCar.car_type} | seats: ${mockCar.seats}`)
    ).toBeInTheDocument();
  });
  it("display actions button on isDeleted false", () => {
    render(renderCarCard());
    const actionButtons = screen.getByTestId("actions-button");
    expect(actionButtons).toBeInTheDocument();
  });
  it("render Deleted, Available, Rented on isDeleted false, true respectively", () => {
    const { rerender } = render(renderCarCard(false, true));

    const availabilitySpan = screen.getByTestId("availability-span");
    expect(availabilitySpan).toHaveTextContent(/deleted/i);

    // not available, not deleted
    rerender(renderCarCard(false, false));
    expect(availabilitySpan).toHaveTextContent(/rented/i);

    // available, not deleted
    rerender(renderCarCard(true, false));
    expect(availabilitySpan).toHaveTextContent(/available/i);
  });
  it("renders date if isDeleted true", () => {
    render(renderCarCard(false, true));

    expect(screen.getByText("2121-21-21")).toBeInTheDocument();
  });
});
