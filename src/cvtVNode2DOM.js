import VNode from "./VNode.js";
import copyPropsToElement from "./utils/copyPropsToElement.js";

/**
 * Render an expanded VNode tree into DOM elements
 * TODO: TEMPORARY; will be replaced with merging
 *
 * @export
 * @param {VNode | undefined} vnode
 * @returns {any}
 */
export default function cvtVNode2DOM(vnode) {
    let node;

    // no vnode? No dom node!
    if (vnode === undefined || vnode === null) return node;

    if (!(vnode instanceof VNode)) {
        // we're something like text or a number. We need to create a text node
        // with the contents.
        node = document.createTextNode(vnode);
    } else if (typeof vnode.tag === "string") {
        // we're a real vnode with a string tag -- create the element!
        node = document.createElement(vnode.tag);

        // check to see if we need to trigger the will/didMount portion of a
        // component's lifecycle.
        if (vnode._component) {
            if (!vnode._component._mounted) {
                setTimeout(() => {
                    // only trigger the lifecycle if we're in the DOM
                    if (document.body.contains(node)) {
                        if (!vnode._component._mounted) {
                            vnode._component.componentWillMount();
                            vnode._component._mounted = true;
                            vnode._component.componentDidMount();
                        }
                    }
                }, 0);
            }
        }

        // ... and copy the properties and such into it
        vnode._unsubscribers = copyPropsToElement(node, vnode.props);

        // add the key, if present
        if (vnode.key != undefined) {
            node.setAttribute("data-key", vnode.key);
        }

        // create the children, too!
        if (vnode.children && vnode.children.length && vnode.children.length > 0) {
            for (const child of vnode.children) {
                const childNode = cvtVNode2DOM(child);
                if (childNode && node) node.appendChild(childNode);
            }
        }
    }

    if (vnode instanceof VNode) {
        vnode._domNode = node;
        if (vnode._component) {
            vnode._component._domNode = node;
        }
    }

    return node;
}
