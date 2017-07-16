import isAttribute from "./isAttribute.js";
import isOnEvent from "./isOnEvent.js";

/**
 * removes the properties in props from the node
 *
 * @export
 * @param {HTMLElement} el
 * @param {any} [props={}]
 * @returns {void}
 */
export default function removePropsFromElement(el, props = {}) {
    if (!el) return;

    if (!props) return;

    for (const [k, v] of Object.entries(props)) {
        if (k === "key") {
            el.removeAttribute("data-key");
        } else if (k === "style") {
            el.removeAttribute("style");
        } else if (isOnEvent(k)) {
            // event handler
            const eventName = k.substr(2).toLowerCase();
            el.removeEventListener(eventName, v);
            // there may still be unsub fns laying around, but that's OK
            // removeEventListener won't fail if there is no listener anymore
        } else if (isAttribute(k)) {
            // attribute
            el.removeAttribute(k);
        } else {
            // object property
            Reflect.deleteProperty(el, k);
        }
    }
}
