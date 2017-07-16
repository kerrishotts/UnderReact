import VNode from "./VNode.js";
import isFunctionComponentCtor from "./utils/isFunctionComponentCtor.js";
import { UnknownTagError } from "./errors.js";

/**
 * Iterates over a VNode tree, rendering subtrees as necessary
 *
 * @export
 * @param {VNode} vnode
 * @param {any} [context = null]
 * @returns {VNode | any | undefined}
 */
export default function expandVNodeTree(vnode, context = null) {
    let node;
    if (!vnode) return node; // no node? no tree!

    if (!(vnode instanceof VNode)) return vnode; // just return as-is; it's a text node or something

    node = new VNode();

    if (typeof vnode.tag === "string") {
        // simple tag, so just copy everything except children (we'll do that nearer the end)
        node.copyFrom(vnode, { exceptChildren: true });
    } else {
        // is the tag a Component Constructor?
        if (isFunctionComponentCtor(vnode.tag)) {
            // it is! Construct it so that we can render it -- OR reuse the existing component
            let component = vnode._component ? vnode._component : Reflect.construct(vnode.tag, [vnode.props, null, context]);
            // do lifecylce events; first checking if we should update
            if (component.shouldComponentUpdate()) {
                // if we can update, send in the known props
                component.componentWillReceiveProps(component.props, context);
                // notify that the component will be updating (rendering)
                component.componentWillUpdate(component.props, component.state, context);
                // render! -- and save the results in case we don't want to render in the future
                node = component._previousRender = expandVNodeTree(component.render(component.props, null, context), context);
                // and notify the component that it did render (with previous props)
                component.componentDidUpdate(component.props, component.state, context);
            } else {
                // component didn't want to render; return previous render results
                node = component._previousRender || node;
            }
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

    if (node && vnode.children && vnode.children.length && vnode.children.length > 0) {
        // we have children, so we need to expand them too
        for (let child of vnode.children) {
            node.children.push(expandVNodeTree(child, context));
        }
    }

    // the vnode has a key -- make sure the node has it too.
    if (vnode.key != undefined) {
        node.key = vnode.key;
    }

    return node;
}
