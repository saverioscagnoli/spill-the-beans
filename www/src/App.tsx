import { MDXProvider } from "@mdx-js/react";
import { BeansModel, Navbar } from "./components";
import { Checkbox, CheckboxProps } from "tredici";

import About from "../../docs/about.mdx";
import { ComponentProps } from "react";

const Heading1 = (props: ComponentProps<"h1">) => (
  <h1 className="text-5xl text-center font-bold" {...props} />
);
const Heading2 = (props: ComponentProps<"h2">) => (
  <h2 className="text-2xl text-center self-start font-bold" {...props} />
);
const Heading3 = (props: ComponentProps<"h3">) => (
  <h3 className="text-lg text-center" {...props} />
);
const input = (props: CheckboxProps) => <Checkbox {...props} />;

console.log(
  'The 3d model is from "Urpo": https://sketchfab.com/3d-models/can-of-beans-566323fb276f4fa7ac2943b38bb4e98d'
);

function App() {
  return (
    <div className="w-screen h-screen flex flex-col items-center antialiased">
      <Navbar />
      <div className="flex flex-col items-center mt-16">
        <MDXProvider>
          <About
            components={{
              h1: Heading1,
              h2: Heading2,
              h3: Heading3,
              // @ts-ignore
              input
            }}
          />
        </MDXProvider>
      </div>
      <BeansModel />
    </div>
  );
}

export default App;
