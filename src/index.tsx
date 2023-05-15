import { createRoot } from "react-dom/client";
import { App } from "./component/App";

//reactDOM render version react17
// ReactDOM.render(<h1>Hello World</h1>, document.getElementById("root"));

const container = document.getElementById("root");
if (container){
  const root = createRoot(container);
  root.render(<App/>);
}