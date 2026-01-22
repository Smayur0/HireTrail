import type { FC } from "react";
import { Button } from "./components/ui/button";
import { HashRouter } from "react-router-dom";
import Root from "./navigation";

const App: FC = () => {
  return (
    <HashRouter>
      <Root />
    </HashRouter>
  );
};

export default App;
