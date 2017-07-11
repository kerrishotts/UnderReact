import isEvent from "./isEvent.js";

/**
 * Determines if the candidate string represents an on event, as in "ontouchstart"
 *
 * @export
 * @param {string} [c=""]
 * @returns {boolean}
 */
export default function isOnEvent(c = "") {
    if (c[0] === "o" && c[1] === "n") {
        // it's got chance!
        // we need to support onClick by transforming to onclick
        // but we also need onDOMContentLoaded to work, so test without the lowercase as well
        // yes, hacky!
        return (
            isEvent(c[2].toLowerCase() + c.substr(3)) || isEvent(c.substr(2))
        );
    } else {
        return false;
    }
}
