import cvtVNode2DOM from "./cvtVNode2DOM.js";
import expandVNodeTree from "./expandVNodeTree.js";

export function render(node, domRoot, context) {
    domRoot.appendChild(cvtVNode2DOM(expandVNodeTree(node, context)));
}

export default render;
