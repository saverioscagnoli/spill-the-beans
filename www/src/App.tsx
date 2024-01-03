import { MDXProvider } from "@mdx-js/react";

import Hello from "../../docs/hello.mdx";

function App() {
  return (
    <MDXProvider>
      <Hello />
    </MDXProvider>
  );
}

export default App;
