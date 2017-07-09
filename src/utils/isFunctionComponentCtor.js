/**
 * Determines if an function is a Component Constructor. This is a duck-type
 * test in that we return true if the prototype has a render method.
 *
 * @export
 * @param {function} fn                 the function to test
 * @returns {boolean}                   whether the function is a Component Constructor
 */
export default function isFunctionComponentCtor(fn) {
    return (
        fn &&
        fn.prototype &&
        fn.prototype.render &&
        typeof fn.prototype.render === "function"
    );
}
