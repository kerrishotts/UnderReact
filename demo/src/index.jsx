import {
    createElement,
    cvtVNode2DOM,
    expandVNodeTree,
    diff,
} from "under-react";

import App from "./components/App.jsx";

const app = <App />,
    expandedVnode = expandVNodeTree(app),
    initialRendering = cvtVNode2DOM(expandedVnode);

console.log(expandedVnode);
console.log(initialRendering);

document.getElementById("root").appendChild(initialRendering);
/*
setTimeout(() => {
    const nextVnode = expandVNodeTree(app);
    diff(expandedVnode, nextVnode, initialRendering);
}, 5000);
*/

//React.render(<App />, document.getElementById("root"));
