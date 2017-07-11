import Component from "./src/Component.js";
import createElement from "./src/createElement.js";
import render from "./src/render.js";
import cvtVNode2DOM from "./src/cvtVNode2DOM.js";
import expandVNodeTree from "./src/expandVNodeTree.js";

export default {
    Component,
    createElement,

    /* things that are supposed to be temporary for now */
    expandVNodeTree,
    render,
    cvtVNode2DOM,
};
