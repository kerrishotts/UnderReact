/* global describe, it */
import "mocha";
import { expect } from "chai";

import VNode from "../src/VNode.js";

describe("VNode tests", function() {
    describe("#create", function() {
        it("should be able to be created with no args", function() {
            const vnode = new VNode();
            expect(vnode).to.exist;
        });
        it("should be able to create a div vnode", function() {
            const div = new VNode("div");
            expect(div).to.exist;
            expect(div).to.have.property("tag", "div");
        });
        it("should be able to create a div node with props", function() {
            const div = new VNode("div", { key: 4 });
            expect(div).to.exist;
            expect(div).to.have.property("tag", "div");
            expect(div).to.have.property("props").that.deep.equals({ key: 4 });
        });
    });
});
