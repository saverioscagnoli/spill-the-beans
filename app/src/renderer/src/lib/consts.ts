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
import { IconType } from "react-icons";

const iconMap = new Map<string, IconType>(
  Object.entries({
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
  })
);

const ICON_CELL_SIZE = 50;
const ICON_GRID_COLUMN_COUNT = 9;

export { iconMap, ICON_CELL_SIZE, ICON_GRID_COLUMN_COUNT };
