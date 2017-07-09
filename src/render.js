import VNode from "./VNode.js";
import Component from "./Component.js";

export default function render(vdomRoot = {}, domRoot = null, context = {}) {
    const { tag, props = {}, children = [] } = vdomRoot;
    let el;

    if (typeof tag === "string") {
        el = document.createElement(tag);
        if (props !== null) {
            for (const [prop, val] of Object.entries(props)) {
                if (
                    typeof el[prop] !== undefined &&
                    el[prop] instanceof Object
                ) {
                    for (const [oKey, oVal] of Object.entries(val)) {
                        el[prop][oKey] = oVal;
                    }
                } else {
                    el[prop] = val;
                }
            }
        }

        vdomRoot._domNode = el;
    } else if (tag.prototype && tag.prototype.render) {
        const component = Reflect.construct(tag, [props]);
        el = render(
            component.render(props, component.state, context),
            null,
            context
        );

        // link the component and the dom node together so we can mount later
        el._component = component;
        component._domNode = el;

        vdomRoot._domNode = el;
        vdomRoot._component = component;
    } else {
        el = render(tag(props, null, context), null, context);

        vdomRoot._domNode = el;
    }

    for (const child of children) {
        if (child instanceof VNode) {
            el.appendChild(render(child, null, context));
        } else {
            el.appendChild(document.createTextNode(child));
        }
    }

    if (domRoot) {
        domRoot.appendChild(el);
    }

    return el;
}
