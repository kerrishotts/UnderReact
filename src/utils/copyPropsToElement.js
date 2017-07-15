import isAttribute from "./isAttribute.js";
import isOnEvent from "./isOnEvent.js";

function deepCopyProps(obj, props) {
    for (const [k, v] of Object.entries(props)) {
        if (obj[k] && obj[k] instanceof Object) {
            deepCopyProps(obj[k], v);
        } else {
            obj[k] = v;
        }
    }
}

/**
 * copies the properties in props to the node and returns unsubscriber functions
 * for any event handlers that were created
 *
 * @export
 * @param {HTMLElement} el
 * @param {any} [props={}]
 * @returns {function[]}
 */
export default function copyPropsToElement(el, props = {}) {
    const eventUnsubscribers = [];

    if (!el) return eventUnsubscribers;

    if (!props) return eventUnsubscribers;

    for (const [k, v] of Object.entries(props)) {
        if (k === "key") {
            el.setAttribute("data-key", v);
        } else if (k === "style") {
            // styles are special!
            if (typeof v === "string") {
                // treat it like setting an attribute
                el.setAttribute(k, v);
            } else {
                // copy in the style values
                deepCopyProps(el.style, v);
            }
        } else if (isOnEvent(k)) {
            // event handler
            const eventName = k.substr(2).toLowerCase();
            el.addEventListener(eventName, v);
            eventUnsubscribers.push(() => el.removeEventListener(eventName, v));
        } else if (isAttribute(k)) {
            // attribute
            el.setAttribute(k, v);
        } else {
            // object property
            el[k] = v;
        }
    }

    return eventUnsubscribers;
}
