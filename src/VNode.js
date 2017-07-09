import flatten from "./utils/flatten.js";

export default class VNode {
    constructor(tag, props = {}, ...children) {
        this.tag = tag; /* tag or Component constructor */
        this.props = props; /* styles, attributes, properties */
        this.key = props && props.key; /* unique key for things like lists */
        this.children = flatten(children); /* flattened children array */

        this._domNode = null; /* attached DOM element */
        this._component = null; /* attached component instance, if any */
    }

    clone() {
        let clone = new VNode(this.tag, this.props, ...this.children);
        clone._domNode = this._domNode;
        clone._component = this._component;
        return clone;
    }

    copyFrom(
        vnode,
        {
            exceptTag = false,
            exceptProps = false,
            exceptKey = false,
            exceptChildren = false,
            exceptInternal = false,
        } = {}
    ) {
        if (!exceptTag) this.tag = vnode.tag;
        if (!exceptProps) this.props = vnode.props;
        if (!exceptKey) this.key = vnode.key;
        if (!exceptChildren) this.children = vnode.children;
        if (!exceptInternal) {
            this._domNode = vnode._domNode;
            this._component = vnode._component;
        }
    }
}
