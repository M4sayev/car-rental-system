import { Users, type LucideIcon } from "lucide-react";
import CustomCard from "./CustomCard";
import type { ColorTheme } from "@/constants/colorConstants";

interface Result {
  id: string;
  text: string;
  Icon: LucideIcon;
  iconColor: ColorTheme;
  results: string;
  description: string;
}

const results: Result[] = [
  {
    id: "total-clients",
    text: "Total Clients",
    Icon: Users,
    iconColor: "red",
    results: "150",
    description: "Registered users",
  },
  {
    id: "available-clients",
    text: "Total Clients",
    Icon: Users,
    iconColor: "blue",
    results: "150",
    description: "Registered users",
  },
  {
    id: "available",
    text: "Total Clients",
    Icon: Users,
    iconColor: "green",
    results: "150",
    description: "Registered users",
  },
];

function Cards() {
  return (
    <ul className=" flex flex-col md:flex-row gap-5">
      {results.map((result) => {
        const { id, text, Icon, iconColor, results, description } = result;
        return (
          <CustomCard
            key={id}
            headerText={text}
            Icon={Icon}
            iconColor={iconColor}
            result={results}
            description={description}
            className="flex-1"
          />
        );
      })}
    </ul>
  );
}

export default Cards;
