/* global describe, it */
import "mocha";
import { expect } from "chai";
import { JSDOM } from "jsdom";

import createElement from "../src/createElement.js";
import diff from "../src/diff.js";
import expandVNodeTree from "../src/expandVNodeTree.js";
import cvtVNode2DOM from "../src/cvtVNode2DOM.js";

describe("diff tests", function() {
    describe("#simple", function() {
        const dom = new JSDOM("<!DOCTYPE html><div id='root'></div>");

        global["window"] = dom.window;
        global["document"] = dom.window.document;

        it("should be able to diff a simple tree", function() {
            const jsxA = (
                <div>
                    <h1>Hello, world</h1>
                    <p>This is a simple paragraph</p>
                </div>
            );

            const jsxB = (
                <div>
                    <p>This is a paragraph</p>
                </div>
            );

            const treeA = expandVNodeTree(jsxA);
            const domRoot = dom.window.document.getElementById("root");
            domRoot.appendChild(cvtVNode2DOM(treeA));
            expect(domRoot.innerHTML).to.equal("<div><h1>Hello, world</h1><p>This is a simple paragraph</p></div>");

            const treeB = expandVNodeTree(jsxB);
            diff(treeA, treeB, treeA._domNode);
            expect(domRoot.innerHTML).to.equal("<div><p>This is a paragraph</p></div>");
        });
    });
});
