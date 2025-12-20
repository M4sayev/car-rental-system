import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { COLOR_MAP, type ColorTheme } from "@/constants/colorConstants";
import type { SetStateAction } from "react";

interface ToggleButtonsProps<T> {
  value: T;
  setValue: React.Dispatch<SetStateAction<T>>;
  values: T[];
}

// display different colors for different categories
const indexToColor: ColorTheme[] = ["blue", "green", "red"];

function ToggleButtons<T>({ value, setValue, values }: ToggleButtonsProps<T>) {
  return (
    <ToggleGroup
      value={value as string}
      type="single"
      variant="outline"
      spacing={2}
      size="sm"
      className="border p-1 bg-sidebar!"
      data-testid="toggle-btns"
    >
      {values.map((itemValue, index) => {
        // ensure if the index is out of bounds pick colors in loop
        const cyclicIndex = index % indexToColor.length;
        const color = indexToColor[cyclicIndex];
        return (
          <ToggleGroupItem
            key={`toggle-group-${itemValue}`}
            value={itemValue as string}
            aria-label={`Toggle ${itemValue}`}
            style={
              itemValue === value
                ? {
                    backgroundColor: COLOR_MAP[color].bg,
                    color: COLOR_MAP[color].icon,
                  }
                : {}
            }
            className="capitalize border-0 shadow-0 bg-sidebar cursor-pointer"
            onClick={() => setValue(itemValue)}
          >
            {itemValue as string}
          </ToggleGroupItem>
        );
      })}
    </ToggleGroup>
  );
}

export default ToggleButtons;
