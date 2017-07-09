import VNode from "./VNode.js";

/**
 * Render an expanded VNode tree into DOM elements
 * TODO: TEMPORARY; will be replaced with merging
 *
 * @export
 * @param {VNode} vnode
 * @returns {Node|void}
 */
export default function renderVNodeTree(vnode) {
    let node;

    // no vnode? No dom node!
    if (vnode === undefined || vnode === null) return;

    if (!(vnode instanceof VNode)) {
        // we're something like text or a number. We need to create a text node
        // with the contents.
        node = document.createTextNode(vnode);
    } else if (typeof vnode.tag === "string") {
        // we're a real vnode with a string tag -- create the element!
        node = document.createElement(vnode.tag);

        // ... and copy the properties and such into it
        // TODO!

        // create the children, too!
        if (
            vnode.children &&
            vnode.children.length &&
            vnode.children.length > 0
        ) {
            for (let child of vnode.children) {
                let childNode = renderVNodeTree(child);
                if (childNode && node) node.appendChild(childNode);
            }
        }
    }

    return node;
}
