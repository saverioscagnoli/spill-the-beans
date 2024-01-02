import { useEntryCreation } from "@renderer/hooks";
import { ICON_GRID_COLUMN_COUNT, iconMap } from "@renderer/lib";
import React, { CSSProperties, createElement, memo } from "react";
import { Button } from "tredici";

interface IconCellProps {
  columnIndex: number;
  rowIndex: number;
  style: CSSProperties;
  data: { filtered: string[] };
}

const IconCell: React.FC<IconCellProps> = memo(
  ({ columnIndex, rowIndex, style, data }) => {
    const { iconName } = useEntryCreation();
    const { filtered } = data;
    const i = rowIndex * ICON_GRID_COLUMN_COUNT + columnIndex;

    if (i >= filtered.length) return null;

    const icon = filtered[i];
    const Icon = iconMap.get(icon)!;

    const onClick = (name: string) => () => {
      if (iconName.get() === name) iconName.set("");
      else iconName.set(name);
    };

    return (
      <div className="w-12 h-12 flex justify-center items-center" style={style}>
        <Button.Icon
          key={icon}
          colorScheme={iconName.get() === icon ? "green" : "gray"}
          icon={createElement(Icon)}
          onClick={onClick(icon)}
        />
      </div>
    );
  }
);

export { IconCell };
