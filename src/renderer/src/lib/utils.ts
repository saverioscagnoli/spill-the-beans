import clsx, { ClassValue } from "clsx";
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

export { removeDuplicates, cn };
