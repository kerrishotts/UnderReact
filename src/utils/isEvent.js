import EVENTS from "../constants/events.js";

/**
 * Determines if the candidate is an HTML event
 *
 * @export
 * @param {string} [c=""]
 * @returns  {boolean}
 */
export default function isEvent(c = "") {
    return EVENTS.indexOf(c) > -1;
}
