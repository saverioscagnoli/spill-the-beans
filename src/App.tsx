import { useState } from "react";
import { Button } from "tredici";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Button onClick={() => setCount(p => p + 1)}>Click Me!</Button>
      <p>Count: {count}</p>
    </>
  );
}

export default App;
