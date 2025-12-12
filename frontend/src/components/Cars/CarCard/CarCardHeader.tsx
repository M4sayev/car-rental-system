import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface CarCardHeaderProps {
  image_url: string | undefined;
  name: string;
  description: string;
}

function CarCardHeader({ name, image_url, description }: CarCardHeaderProps) {
  return (
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
  );
}

export default CarCardHeader;
