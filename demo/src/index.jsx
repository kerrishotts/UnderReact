import { createElement, cvtVNode2DOM, expandVNodeTree } from "under-react";

import App from "./components/App.jsx";

const app = <App />,
    expandedVnode = expandVNodeTree(app),
    initialRendering = cvtVNode2DOM(expandedVnode);

console.log(expandedVnode);
console.log(initialRendering);

document.getElementById("root").appendChild(initialRendering);

//React.render(<App />, document.getElementById("root"));
