import { useInput, useSafeManager } from "@renderer/hooks";
import { ICON_CELL_SIZE, ICON_GRID_COLUMN_COUNT, iconMap } from "@renderer/lib";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import filterWorker from "@renderer/lib/filter-worker?worker";
import { Button, Input, Tooltip } from "tredici";
import { LuTrash2 } from "react-icons/lu";
import { AutoSizer, Grid } from "react-virtualized";
import { IconCell } from "./icon-cell";
import { useTranslation } from "react-i18next";

const names = Array.from(iconMap.keys());

const IconSelector = () => {
  const [searchTerm, onSearchTermChange] = useInput("", true);
  const [filtered, setFiltered] = useState<string[]>(names);
  const { t } = useTranslation();

  const navigate = useNavigate();

  const worker = useMemo(() => new filterWorker(), []);

  const filter = async (): Promise<string[]> => {
    return new Promise((res, rej) => {
      worker.postMessage([searchTerm, names]);

      worker.onmessage = e => {
        res(e.data);
      };

      worker.onerror = rej;
    });
  };

  useEffect(() => {
    if (searchTerm === "") {
      setFiltered(names);
    }

    filter().then(setFiltered);
  }, [searchTerm]);

  const { openedSafe } = useSafeManager();
  const switchToCreateEntry = () => navigate(`/${openedSafe.get().name}`);

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <label className="text-sm" htmlFor="filter">
          {t("filter")}
        </label>
        <div className="flex gap-2">
          <Input
            spellCheck={false}
            className="w-[calc(100%-2.25rem)]"
            id="filter"
            value={searchTerm}
            onChange={onSearchTermChange}
          />
          <Tooltip content={t("clear")}>
            <Button.Icon
              variant="ghost"
              colorScheme="crimson"
              icon={<LuTrash2 size={20} />}
              onClick={() => onSearchTermChange("")}
            />
          </Tooltip>
        </div>
      </div>
      <div className="w-full h-80 mt-2 grid grid-cols-1 overflow-auto">
        <AutoSizer>
          {({ height, width }) => {
            return (
              <Grid
                width={width}
                height={height}
                columnCount={ICON_GRID_COLUMN_COUNT}
                rowCount={Math.ceil(filtered.length / ICON_GRID_COLUMN_COUNT)}
                columnWidth={ICON_CELL_SIZE}
                rowHeight={ICON_CELL_SIZE}
                cellRenderer={props => (
                  <IconCell {...props} key={props.key} data={{ filtered }} />
                )}
              ></Grid>
            );
          }}
        </AutoSizer>
      </div>

      <div className="w-full flex justify-start mt-2">
        <Button colorScheme="gray" onClick={switchToCreateEntry}>
          {t("back")}
        </Button>
      </div>
    </div>
  );
};

export { IconSelector };
