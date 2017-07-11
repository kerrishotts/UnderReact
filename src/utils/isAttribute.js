import ATTRIBUTES from "../constants/attributes.js";

/**
 * Determine if a string value, c, is an HTML attribute
 *
 * @param {string} [c=""]
 * @returns {boolean}
 */
export default function isAttribute(c = "") {
    let lowerC = c.toLowerCase();
    if (lowerC.substr(0, 5) === "data-") {
        return true;
    }
    return ATTRIBUTES.indexOf(lowerC) > -1;
}
