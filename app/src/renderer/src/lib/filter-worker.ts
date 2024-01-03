onmessage = e => {
  let [searchTerm, names] = e.data as [string, string[]];
  postMessage(names.filter(name => name.toLowerCase().includes(searchTerm)));
};
