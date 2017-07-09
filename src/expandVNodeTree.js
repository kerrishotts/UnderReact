import VNode from "./VNode.js";
import isFunctionComponentCtor from "./utils/isFunctionComponentCtor.js";
import { UnknownTagError } from "./errors.js";

/**
 * Iterates over a VNode tree, rendering subtrees as necessary
 *
 * @export
 * @param {VNode} vnode
 * @param {any} [context = null]
 * @returns {VNode|void}
 */
export default function expandVNodeTree(vnode, context = null) {
    let node;
    if (!vnode) return; // no node? no tree!

    if (!(vnode instanceof VNode)) return vnode; // just return as-is; it's a text node or something

    node = new VNode();

    if (typeof vnode.tag === "string") {
        node.copyFrom(vnode, { exceptChildren: true });
    } else {
        // is the tag a Component Constructor?
        if (isFunctionComponentCtor(vnode.tag)) {
            // it is! Construct it so that we can render it
            let component = vnode._component
                ? vnode._component
                : Reflect.construct(vnode.tag, [vnode.props, null, context]);
            // TODO: ask if component really wants an update; if not, return memoized render
            node = expandVNodeTree(
                component.render(component.props, null, context),
                context
            );
            vnode._component = component;
            if (node) node._component = component;
        } else if (typeof vnode.tag === "function") {
            // the tag is a stateless component
            node = expandVNodeTree(vnode.tag(vnode.props, null, context));
        } else {
            // uh oh; something's gone wrong and we don't know what to do with
            // the tag we received. Complain!
            throw new UnknownTagError(`Unknown tag encountered: ${vnode.tag}`);
        }
    }

    if (
        node &&
        vnode.children &&
        vnode.children.length &&
        vnode.children.length > 0
    ) {
        // we have children, so we need to expand them too
        for (let child of vnode.children) {
            node.children.push(expandVNodeTree(child, context));
        }
    }

    return node;
}
