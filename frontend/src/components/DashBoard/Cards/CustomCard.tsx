import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ClientSideCountUp from "@/components/ui/ClientSideCountUp";
import CustomIcon from "@/components/ui/CustomIcon";
import type { ColorTheme } from "@/constants/colorConstants";
import type { LucideIcon } from "lucide-react";

interface CardProps {
  headerText: string;
  result: string;
  description: string;
  Icon: LucideIcon;
  iconColor?: ColorTheme;
  className?: string;
}

function CustomCard({
  headerText,
  result,
  description,
  Icon,
  iconColor = "green",
  className = "",
}: CardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex justify-between items-center gap-2">
          <CardTitle>{headerText}</CardTitle>
          <CustomIcon Icon={Icon} colorTheme={iconColor} className="sm:p-3" />
        </div>
      </CardHeader>
      <CardContent>
        <span className="text-fluid-3xl font-bold ">
          <ClientSideCountUp end={Number(result)} />
        </span>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

export default CustomCard;
