import Component from "./Component.js";
import VNode from "./VNode.js";

/**
 * mounts a component to the DOM, calling all the lifecycle methods as needed
 *
 * @export
 * @param {VNode} vnode
 * @param {Component} component
 * @param {Node} node
 * @param {Node} domRoot
 */
export default function mountComponent(vnode, component, node, domRoot) {
    if (vnode._el) {
        // TODO: unmount the component
    }
    vnode._el = node;
    vnode._component = component;

    if (domRoot.childNodes) {
        if (Array.from(domRoot.childNodes).find(aNode => aNode === node)) {
            domRoot.removeChild(node);
        }
    }
    domRoot.appendChild(node);
}
