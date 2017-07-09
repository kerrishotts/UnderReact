import VNode from "./VNode.js";
import render from "./render.js";

/**
 * Perform a diff on the old and new trees
 *
 * @export
 * @param {VNode} oldTree
 * @param {VNode} newTree
 * @param {Node} domRoot
 */
export default function diff(oldTree, newTree, domRoot) {
    // if old and new trees are the same reference, do nothing
    if (oldTree === newTree) return;

    let merge = true;

    // tags are different, don't bother merging!
    if (oldTree.tag !== newTree.tag) merge = false;

    // keys are different, don't bother merging!
    if (oldTree.key !== newTree.key) merge = false;
}
