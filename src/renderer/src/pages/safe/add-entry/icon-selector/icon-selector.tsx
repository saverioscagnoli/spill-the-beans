import {
  createElement,
  memo,
  useCallback,
  useEffect,
  //useCallback,
  //useEffect,
  useMemo,
  useRef,
  useState
  //  useState
} from "react";
import { Button, Input, Tooltip } from "tredici";
import { useInput } from "@renderer/hooks";

import { LuTrash2 } from "react-icons/lu";
//import { IconType } from "react-icons";

import * as bsIcons from "react-icons/bs";
import * as aiIcons from "react-icons/ai";
import * as biIcons from "react-icons/bi";
import * as cgIcons from "react-icons/cg";
import * as faIcons from "react-icons/fa";
import * as fiIcons from "react-icons/fi";
import * as giIcons from "react-icons/gi";
import * as goIcons from "react-icons/go";
import * as grIcons from "react-icons/gr";
import * as hiIcons from "react-icons/hi";
import * as imIcons from "react-icons/im";
import * as ioIcons from "react-icons/io";
import * as mdIcons from "react-icons/md";
import * as riIcons from "react-icons/ri";
import * as siIcons from "react-icons/si";
import * as tiIcons from "react-icons/ti";
import * as vscIcons from "react-icons/vsc";
import * as wiIcons from "react-icons/wi";
import * as io5Icons from "react-icons/io5";
import * as fcIcons from "react-icons/fc";
import * as luicons from "react-icons/lu";
import * as mdiiIcons from "react-icons/md";
import * as ri5Icons from "react-icons/ri";
import * as rxIcons from "react-icons/rx";

import { AutoSizer, Grid } from "react-virtualized";

import filterWorker from "@renderer/lib/filter-worker?worker";

const iconLibraries = {
  ...bsIcons,
  ...aiIcons,
  ...biIcons,
  ...cgIcons,
  ...faIcons,
  ...fiIcons,
  ...giIcons,
  ...goIcons,
  ...grIcons,
  ...hiIcons,
  ...imIcons,
  ...ioIcons,
  ...mdIcons,
  ...riIcons,
  ...siIcons,
  ...tiIcons,
  ...vscIcons,
  ...wiIcons,
  ...io5Icons,
  ...fcIcons,
  ...luicons,
  ...mdiiIcons,
  ...ri5Icons,
  ...rxIcons
};

const names = Object.keys(iconLibraries);

const itemSize = 50;
const columnCount = 9;

const IconSelector = () => {
  const [searchTerm, onSearchTermChange] = useInput("", true);
  const [filtered, setFiltered] = useState<string[]>(names);

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

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <label className="text-sm" htmlFor="filter">
          Filter
        </label>
        <div className="flex gap-2">
          <Input
            spellCheck={false}
            className="w-[calc(100%-2.25rem)]"
            id="filter"
            value={searchTerm}
            onChange={onSearchTermChange}
          />
          <Tooltip content="Clear">
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
                columnCount={columnCount}
                rowCount={Math.ceil(filtered.length / columnCount)}
                columnWidth={itemSize}
                rowHeight={itemSize}
                cellRenderer={props => (
                  <Cell {...props} key={props.key} data={{ filtered }} />
                )}
              ></Grid>
            );
          }}
        </AutoSizer>
      </div>

      <div className="w-full flex justify-end mt-2">
        <Button colorScheme="gray">Back</Button>
      </div>
    </div>
  );
};

const Cell = memo(({ columnIndex, rowIndex, style, data }: any) => {
  const { filtered } = data;
  const index = rowIndex * columnCount + columnIndex;

  if (index >= filtered.length) return null;

  const iconName: string = filtered[index];
  const IconComponent = iconLibraries[iconName];

  return (
    <div className="w-12 h-12 flex justify-center items-center" style={style}>
      <Button.Icon
        key={iconName}
        colorScheme="gray"
        icon={createElement(IconComponent)}
        onClick={() => console.log(iconName)}
      />
    </div>
  );
});

export { IconSelector };
