import VNode from "./VNode.js";
import cvtVNode2DOM from "./cvtVNode2DOM.js";
import copyPropsToElement from "./utils/copyPropsToElement.js";
import removePropsFromElement from "./utils/removePropsFromElement.js";

import { UnattachedOrTopLevelDOMRootError } from "./errors.js";

/**
 * Call any unsubscribe functions
 *
 * @param {VNode} vnode
 */
function unSub(vnode) {
    if (vnode._unsubscribers) {
        for (const unSubFn of vnode._unsubscribers) {
            unSubFn();
        }
        vnode._unsubscribers = null;
    }
}

/**
 * Perform a diff on the old and new trees
 *
 * @export
 * @param {VNode} oldRootNode
 * @param {VNode} newRootNode
 * @param {HTMLElement | Node} domRoot
 */
export default function diff(oldRootNode, newRootNode, domRoot) {
    const domRootParent = domRoot.parentNode;

    // if old and new trees are the same reference, do nothing
    if (oldRootNode === newRootNode) return;

    // it's possible we won't be a vnode at all
    if (!(oldRootNode instanceof VNode && newRootNode instanceof VNode)) {
        if (domRootParent && oldRootNode !== newRootNode) {
            domRootParent.replaceChild(cvtVNode2DOM(newRootNode), domRoot);
        }
        return;
    }

    let merge = true,
        mergeProps = false;

    // tags are different, don't bother merging!
    if (oldRootNode.tag !== newRootNode.tag) merge = false;

    // keys are different, don't bother merging!
    // TODO: this isn't actually right, but it'll work for the diff case for now
    if (oldRootNode.key !== newRootNode.key) merge = false;

    // detect if any props are different across both nodes and flag if we need
    // to merge props
    for (const [nodeA, nodeB] of [
        [oldRootNode, newRootNode],
        [newRootNode, oldRootNode],
    ]) {
        for (const [k, v] of Object.entries(nodeA.props || {})) {
            if (nodeB[k] !== v) {
                mergeProps = true;
            }
        }
    }

    if (!merge) {
        // easy! render the new root node and replace it in the DOM
        const el = cvtVNode2DOM(newRootNode);

        if (domRootParent) {
            domRootParent.replaceChild(el, domRoot);
        } else {
            // either isn't attached to the DOM OR is a top-level DOM
            // element, which we don't support
            throw new UnattachedOrTopLevelDOMRootError(
                "Unattached or Top Level DOM Root -- can't find a parent node."
            );
        }

        // but we also need to unsub any event listeners
        unSub(oldRootNode);
    } else {
        const df = document.createDocumentFragment();
        // the elements are mergeable, so merge what we can and then traverse the children.
        if (mergeProps) {
            // unwire any event listeners on the old node
            unSub(oldRootNode);

            // then, we need to see what props need to be removed
            const propsToBeRemoved = {};
            for (const [k, v] of Object.entries(newRootNode.props || {})) {
                if (typeof oldRootNode[k] === "undefined") {
                    propsToBeRemoved[k] = v;
                }
            }
            if (domRoot instanceof HTMLElement) {
                removePropsFromElement(domRoot, propsToBeRemoved);
                // next, copy in new and modified props
                newRootNode._unsubscribers = copyPropsToElement(
                    domRoot,
                    newRootNode.props
                );
            }
        }

        // make sure the new vnode has the in-DOM element
        newRootNode._domNode = domRoot;

        // and continue with our children
        // TODO: will we be thrashing the DOM a lot?
        for (
            let i = 0,
                l = Math.min(
                    oldRootNode.children.length,
                    newRootNode.children.length
                );
            i < l;
            i++
        ) {
            diff(
                oldRootNode.children[i],
                newRootNode.children[i],
                domRoot.childNodes.item(i)
            );
        }

        // add new children
        for (
            let i = oldRootNode.children.length,
                l = newRootNode.children.length;
            i < l;
            i++
        ) {
            df.appendChild(cvtVNode2DOM(newRootNode.children[i]));
        }
        if (df.hasChildNodes()) {
            domRoot.appendChild(df);
        }

        // and remove any children that shouldn't exist
        for (
            let i = newRootNode.children.length,
                l = oldRootNode.children.length;
            i < l;
            i++
        ) {
            unSub(oldRootNode.children[i]);
            domRoot.removeChild(oldRootNode.children[i]._domNode);
        }
    }
}
