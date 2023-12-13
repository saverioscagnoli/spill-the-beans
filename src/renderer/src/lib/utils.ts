function removeDuplicates(str: string) {
  return str
    .split("")
    .filter((item, pos, self) => self.indexOf(item) === pos)
    .join("");
}

export { removeDuplicates };
