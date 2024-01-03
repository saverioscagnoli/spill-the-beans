import clsx, { ClassValue } from "clsx";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

function removeDuplicates(str: string) {
  return str
    .split("")
    .filter((item, pos, self) => self.indexOf(item) === pos)
    .join("");
}

function cn(...classes: ClassValue[]) {
  return twMerge(clsx(classes));
}

function capitalize(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

function filter(arr: [string, IconType][], str: string): [string, IconType][] {
  if (arr.length === 0) return [];

  let mi = Math.floor(arr.length / 2);
  let mv = arr[mi][0];

  if (mv === str) {
    let results = [arr[mi]];

    let li = mi - 1;
    while (li >= 0 && arr[li][0] === str) {
      results.unshift(arr[li]);
      li--;
    }

    let ri = mi + 1;
    while (ri < arr.length && arr[ri][0] === str) {
      results.push(arr[ri]);
      ri++;
    }

    return results;
  } else if (mv > str) {
    return filter(arr.slice(0, mi), str);
  } else {
    return filter(arr.slice(mi + 1), str);
  }
}

export { removeDuplicates, cn, capitalize, filter };
