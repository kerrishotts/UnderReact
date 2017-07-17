(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("under-react", [], factory);
	else if(typeof exports === 'object')
		exports["under-react"] = factory();
	else
		root["under-react"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var flatten_js_1 = __webpack_require__(11);
var VNode = (function () {
    function VNode(tag, props) {
        if (props === void 0) { props = {}; }
        var children = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            children[_i - 2] = arguments[_i];
        }
        this.tag = tag; /* tag or Component constructor */
        this.props = props; /* styles, attributes, properties */
        this.key = props && props.key; /* unique key for things like lists */
        this.children = flatten_js_1.default(children); /* flattened children array */
        this._domNode = null; /* attached DOM element */
        this._component = null; /* attached component instance, if any */
        this._unsubscribers = null; /* functions to call to unsubscribe event listeners */
    }
    VNode.prototype.clone = function () {
        var clone = new (VNode.bind.apply(VNode, [void 0, this.tag, this.props].concat(this.children)))();
        clone._domNode = this._domNode;
        clone._component = this._component;
        return clone;
    };
    VNode.prototype.copyFrom = function (vnode, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.exceptTag, exceptTag = _c === void 0 ? false : _c, _d = _b.exceptProps, exceptProps = _d === void 0 ? false : _d, _e = _b.exceptKey, exceptKey = _e === void 0 ? false : _e, _f = _b.exceptChildren, exceptChildren = _f === void 0 ? false : _f, _g = _b.exceptInternal, exceptInternal = _g === void 0 ? false : _g;
        if (!exceptTag)
            this.tag = vnode.tag;
        if (!exceptProps)
            this.props = vnode.props;
        if (!exceptKey)
            this.key = vnode.key;
        if (!exceptChildren)
            this.children = vnode.children;
        if (!exceptInternal) {
            this._domNode = vnode._domNode;
            this._component = vnode._component;
        }
    };
    return VNode;
}());
exports.default = VNode;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var VNode_js_1 = __webpack_require__(0);
var copyPropsToElement_js_1 = __webpack_require__(4);
/**
 * Render an expanded VNode tree into DOM elements
 * TODO: TEMPORARY; will be replaced with merging
 *
 * @export
 * @param {VNode | undefined} vnode
 * @returns {any}
 */
function cvtVNode2DOM(vnode) {
    var node;
    // no vnode? No dom node!
    if (vnode === undefined || vnode === null)
        return node;
    if (!(vnode instanceof VNode_js_1.default)) {
        // we're something like text or a number. We need to create a text node
        // with the contents.
        node = document.createTextNode(vnode);
    }
    else if (typeof vnode.tag === "string") {
        // we're a real vnode with a string tag -- create the element!
        node = document.createElement(vnode.tag);
        // check to see if we need to trigger the will/didMount portion of a
        // component's lifecycle.
        if (vnode._component) {
            if (!vnode._component._mounted) {
                setTimeout(function () {
                    // only trigger the lifecycle if we're in the DOM
                    if (document.body.contains(node)) {
                        if (!vnode._component._mounted) {
                            vnode._component.componentWillMount();
                            vnode._component._mounted = true;
                            vnode._component.componentDidMount();
                        }
                    }
                }, 0);
            }
        }
        // ... and copy the properties and such into it
        vnode._unsubscribers = copyPropsToElement_js_1.default(node, vnode.props);
        // add the key, if present
        if (vnode.key != undefined) {
            node.setAttribute("data-key", vnode.key);
        }
        // create the children, too!
        if (vnode.children && vnode.children.length && vnode.children.length > 0) {
            for (var _i = 0, _a = vnode.children; _i < _a.length; _i++) {
                var child = _a[_i];
                var childNode = cvtVNode2DOM(child);
                if (childNode && node)
                    node.appendChild(childNode);
            }
        }
    }
    if (vnode instanceof VNode_js_1.default) {
        vnode._domNode = node;
        if (vnode._component) {
            vnode._component._domNode = node;
        }
    }
    return node;
}
exports.default = cvtVNode2DOM;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var VNode_js_1 = __webpack_require__(0);
var isFunctionComponentCtor_js_1 = __webpack_require__(16);
var errors_js_1 = __webpack_require__(7);
/**
 * Iterates over a VNode tree, rendering subtrees as necessary
 *
 * @export
 * @param {VNode} vnode
 * @param {any} [context = null]
 * @returns {VNode | any | undefined}
 */
function expandVNodeTree(vnode, context) {
    if (context === void 0) { context = null; }
    var node;
    if (!vnode)
        return node; // no node? no tree!
    if (!(vnode instanceof VNode_js_1.default))
        return vnode; // just return as-is; it's a text node or something
    node = new VNode_js_1.default();
    if (typeof vnode.tag === "string") {
        // simple tag, so just copy everything except children (we'll do that nearer the end)
        node.copyFrom(vnode, { exceptChildren: true });
    }
    else {
        // is the tag a Component Constructor?
        if (isFunctionComponentCtor_js_1.default(vnode.tag)) {
            // it is! Construct it so that we can render it -- OR reuse the existing component
            var component = vnode._component ? vnode._component : Reflect.construct(vnode.tag, [vnode.props, null, context]);
            // do lifecylce events; first checking if we should update
            if (component.shouldComponentUpdate()) {
                // if we can update, send in the known props
                component.componentWillReceiveProps(component.props, context);
                // notify that the component will be updating (rendering)
                component.componentWillUpdate(component.props, component.state, context);
                // render! -- and save the results in case we don't want to render in the future
                node = component._previousRender = expandVNodeTree(component.render(component.props, null, context), context);
                // and notify the component that it did render (with previous props)
                component.componentDidUpdate(component.props, component.state, context);
            }
            else {
                // component didn't want to render; return previous render results
                node = component._previousRender || node;
            }
            vnode._component = component;
            if (node)
                node._component = component;
        }
        else if (typeof vnode.tag === "function") {
            // the tag is a stateless component
            node = expandVNodeTree(vnode.tag(vnode.props, null, context));
        }
        else {
            // uh oh; something's gone wrong and we don't know what to do with
            // the tag we received. Complain!
            throw new errors_js_1.UnknownTagError("Unknown tag encountered: " + vnode.tag);
        }
    }
    if (node && vnode.children && vnode.children.length && vnode.children.length > 0) {
        // we have children, so we need to expand them too
        for (var _i = 0, _a = vnode.children; _i < _a.length; _i++) {
            var child = _a[_i];
            node.children.push(expandVNodeTree(child, context));
        }
    }
    // the vnode has a key -- make sure the node has it too.
    if (vnode.key != undefined) {
        node.key = vnode.key;
    }
    return node;
}
exports.default = expandVNodeTree;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var VNode_js_1 = __webpack_require__(0);
var cvtVNode2DOM_js_1 = __webpack_require__(1);
var copyPropsToElement_js_1 = __webpack_require__(4);
var removePropsFromElement_js_1 = __webpack_require__(15);
var errors_js_1 = __webpack_require__(7);
/**
 * Call any unsubscribe functions
 *
 * @param {VNode} vnode
 */
function unSub(vnode) {
    if (vnode._unsubscribers) {
        for (var _i = 0, _a = vnode._unsubscribers; _i < _a.length; _i++) {
            var unSubFn = _a[_i];
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
 * @param {any} [context]
 */
function diff(oldRootNode, newRootNode, domRoot, context) {
    // if old and new trees are the same reference, do nothing
    if (oldRootNode === newRootNode)
        return;
    var domRootParent = domRoot.parentNode;
    // it's possible we won't be a vnode at all
    if (!(oldRootNode instanceof VNode_js_1.default && newRootNode instanceof VNode_js_1.default)) {
        if (domRootParent && oldRootNode !== newRootNode) {
            if (oldRootNode._component !== newRootNode._component && oldRootNode._component) {
                oldRootNode._component.componentWillUnmount();
            }
            if (domRoot instanceof Text && !(oldRootNode instanceof VNode_js_1.default || newRootNode instanceof VNode_js_1.default)) {
                domRoot.textContent = newRootNode;
            }
            else {
                domRootParent.replaceChild(cvtVNode2DOM_js_1.default(newRootNode), domRoot);
            }
        }
        return;
    }
    var merge = true, mergeProps = false;
    // tags are different, don't bother merging!
    if (oldRootNode.tag !== newRootNode.tag)
        merge = false;
    // components are different, don't merge
    if (oldRootNode._component !== newRootNode._component)
        merge = false;
    // keys are different, don't bother merging!
    // TODO: this isn't actually right, but it'll work for the diff case for now
    if (oldRootNode.key !== newRootNode.key)
        merge = false;
    // detect if any props are different across both nodes and flag if we need
    // to merge props
    for (var _i = 0, _a = [[oldRootNode, newRootNode], [newRootNode, oldRootNode]]; _i < _a.length; _i++) {
        var _b = _a[_i], nodeA = _b[0], nodeB = _b[1];
        for (var _c = 0, _d = Object.entries(nodeA.props || {}); _c < _d.length; _c++) {
            var _e = _d[_c], k = _e[0], v = _e[1];
            if (nodeB[k] !== v) {
                mergeProps = true;
            }
        }
    }
    if (!merge) {
        // easy! render the new root node and replace it in the DOM
        var el = cvtVNode2DOM_js_1.default(newRootNode);
        if (oldRootNode._component !== newRootNode._component && oldRootNode._component) {
            oldRootNode._component.componentWillUnmount();
        }
        unSub(oldRootNode);
        newRootNode._domNode = el;
        if (newRootNode._component) {
            newRootNode._component._domNode = el;
        }
        if (domRootParent) {
            domRootParent.replaceChild(el, domRoot);
        }
        else {
            // either isn't attached to the DOM OR is a top-level DOM
            // element, which we don't support
            throw new errors_js_1.UnattachedOrTopLevelDOMRootError("Unattached or Top Level DOM Root -- can't find a parent node.");
        }
        // but we also need to unsub any event listeners
        unSub(oldRootNode);
    }
    else {
        var df = document.createDocumentFragment();
        // the elements are mergeable, so merge what we can and then traverse the children.
        if (mergeProps) {
            // unwire any event listeners on the old node
            unSub(oldRootNode);
            // then, we need to see what props need to be removed
            var propsToBeRemoved = {};
            for (var _f = 0, _g = Object.entries(newRootNode.props || {}); _f < _g.length; _f++) {
                var _h = _g[_f], k = _h[0], v = _h[1];
                if (typeof oldRootNode[k] === "undefined") {
                    propsToBeRemoved[k] = v;
                }
            }
            if (domRoot instanceof HTMLElement) {
                removePropsFromElement_js_1.default(domRoot, propsToBeRemoved);
                // next, copy in new and modified props
                newRootNode._unsubscribers = copyPropsToElement_js_1.default(domRoot, newRootNode.props);
            }
        }
        if (oldRootNode._component === newRootNode._component && mergeProps && newRootNode._component) {
            newRootNode._component.componentWillReceiveProps(newRootNode.props, context);
        }
        // make sure the new vnode has the in-DOM element
        newRootNode._domNode = domRoot;
        // and continue with our children
        // TODO: will we be thrashing the DOM a lot?
        for (var i = 0, l = Math.min(oldRootNode.children.length, newRootNode.children.length); i < l; i++) {
            diff(oldRootNode.children[i], newRootNode.children[i], domRoot.childNodes.item(i), context);
        }
        // add new children
        for (var i = oldRootNode.children.length, l = newRootNode.children.length; i < l; i++) {
            df.appendChild(cvtVNode2DOM_js_1.default(newRootNode.children[i]));
        }
        if (df.hasChildNodes()) {
            domRoot.appendChild(df);
        }
        // and remove any children that shouldn't exist
        for (var i = newRootNode.children.length, l = oldRootNode.children.length; i < l; i++) {
            var child = oldRootNode.children[i];
            if (child._component) {
                child._component.componentWillUnmount();
            }
            unSub(child);
            domRoot.removeChild(child._domNode);
        }
    }
}
exports.default = diff;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var isAttribute_js_1 = __webpack_require__(5);
var isOnEvent_js_1 = __webpack_require__(6);
function deepCopyProps(obj, props) {
    for (var _i = 0, _a = Object.entries(props); _i < _a.length; _i++) {
        var _b = _a[_i], k = _b[0], v = _b[1];
        if (obj[k] && obj[k] instanceof Object) {
            deepCopyProps(obj[k], v);
        }
        else {
            obj[k] = v;
        }
    }
}
/**
 * copies the properties in props to the node and returns unsubscriber functions
 * for any event handlers that were created
 *
 * @export
 * @param {HTMLElement} el
 * @param {any} [props={}]
 * @returns {function[]}
 */
function copyPropsToElement(el, props) {
    if (props === void 0) { props = {}; }
    var eventUnsubscribers = [];
    if (!el)
        return eventUnsubscribers;
    if (!props)
        return eventUnsubscribers;
    var _loop_1 = function (k, v) {
        if (k === "key") {
            el.setAttribute("data-key", v);
        }
        else if (k === "style") {
            // styles are special!
            if (typeof v === "string") {
                // treat it like setting an attribute
                el.setAttribute(k, v);
            }
            else {
                // copy in the style values
                deepCopyProps(el.style, v);
            }
        }
        else if (isOnEvent_js_1.default(k)) {
            // event handler
            var eventName_1 = k.substr(2).toLowerCase();
            el.addEventListener(eventName_1, v);
            eventUnsubscribers.push(function () { return el.removeEventListener(eventName_1, v); });
        }
        else if (isAttribute_js_1.default(k)) {
            // attribute
            el.setAttribute(k, v);
        }
        else {
            // object property
            el[k] = v;
        }
    };
    for (var _i = 0, _a = Object.entries(props); _i < _a.length; _i++) {
        var _b = _a[_i], k = _b[0], v = _b[1];
        _loop_1(k, v);
    }
    return eventUnsubscribers;
}
exports.default = copyPropsToElement;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var attributes_js_1 = __webpack_require__(12);
/**
 * Determine if a string value, c, is an HTML attribute
 *
 * @param {string} [c=""]
 * @returns {boolean}
 */
function isAttribute(c) {
    if (c === void 0) { c = ""; }
    var lowerC = c.toLowerCase();
    if (lowerC.substr(0, 5) === "data-") {
        return true;
    }
    return attributes_js_1.default.indexOf(lowerC) > -1;
}
exports.default = isAttribute;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var isEvent_js_1 = __webpack_require__(13);
/**
 * Determines if the candidate string represents an on event, as in "ontouchstart"
 *
 * @export
 * @param {string} [c=""]
 * @returns {boolean}
 */
function isOnEvent(c) {
    if (c === void 0) { c = ""; }
    if (c[0] === "o" && c[1] === "n") {
        // it's got chance!
        // we need to support onClick by transforming to onclick
        // but we also need onDOMContentLoaded to work, so test without the lowercase as well
        // yes, hacky!
        return (isEvent_js_1.default(c[2].toLowerCase() + c.substr(3)) || isEvent_js_1.default(c.substr(2)));
    }
    else {
        return false;
    }
}
exports.default = isOnEvent;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractMethodError = (function (_super) {
    __extends(AbstractMethodError, _super);
    function AbstractMethodError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AbstractMethodError;
}(Error));
exports.AbstractMethodError = AbstractMethodError;
var UnknownTagError = (function (_super) {
    __extends(UnknownTagError, _super);
    function UnknownTagError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UnknownTagError;
}(Error));
exports.UnknownTagError = UnknownTagError;
var UnattachedOrTopLevelDOMRootError = (function (_super) {
    __extends(UnattachedOrTopLevelDOMRootError, _super);
    function UnattachedOrTopLevelDOMRootError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UnattachedOrTopLevelDOMRootError;
}(Error));
exports.UnattachedOrTopLevelDOMRootError = UnattachedOrTopLevelDOMRootError;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(9);


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Component_js_1 = __webpack_require__(10);
exports.Component = Component_js_1.default;
var createElement_js_1 = __webpack_require__(17);
exports.createElement = createElement_js_1.default;
var cvtVNode2DOM_js_1 = __webpack_require__(1);
exports.cvtVNode2DOM = cvtVNode2DOM_js_1.default;
var expandVNodeTree_js_1 = __webpack_require__(2);
exports.expandVNodeTree = expandVNodeTree_js_1.default;
var diff_js_1 = __webpack_require__(3);
exports.diff = diff_js_1.default;
var render_js_1 = __webpack_require__(18);
exports.render = render_js_1.default;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var diff_js_1 = __webpack_require__(3);
var VNode_js_1 = __webpack_require__(0);
var expandVNodeTree_js_1 = __webpack_require__(2);
var Component = (function () {
    function Component(props, context) {
        if (props === void 0) { props = {}; }
        if (context === void 0) { context = {}; }
        this.props = props;
        this.state = {};
        this.context = context;
        /* private-ish properties */
        this._dirty = true;
        this._mounted = false;
        this._domNode = null;
        this._previousRender = null;
    }
    /**
     *
     * @param {any} [props]
     * @param {any} [state]
     * @param {any} [context]
     * @returns {VNode}
     * @memberof Component
     */
    Component.prototype.render = function (props, state, context) {
        return new VNode_js_1.default();
    };
    /**
     * sets the component's new state and enqueues a rendering pass
     *
     * @param {any|function} newState
     * @memberof Component
     */
    Component.prototype.setState = function (newState) {
        var _this = this;
        if (this.state === newState) {
            return;
        }
        this._dirty = true;
        var nextState = newState;
        var prevState = Object.assign({}, this.state), prevProps = Object.assign({}, this.props), prevContext = Object.assign({}, this.context);
        if (typeof newState === "function") {
            nextState = newState(prevState, this.props);
        }
        this.state = Object.assign({}, this.state, nextState);
        // trigger a render at the next frame
        window.requestAnimationFrame(function () {
            var rendering = _this._previousRender;
            if (_this.shouldComponentUpdate(_this.props, _this.state, _this.context)) {
                _this.componentWillUpdate(_this.props, _this.state, _this.context);
                rendering = expandVNodeTree_js_1.default(_this.render(_this.props, _this.state, _this.context), _this.context);
                _this.componentDidUpdate(prevProps, prevState, prevContext);
            }
            rendering._component = _this;
            diff_js_1.default(_this._previousRender, rendering, _this._domNode, _this.context);
            _this._previousRender = rendering;
            _this._dirty = false;
        });
    };
    /**
     * Determine whether or not the component should update. If `false` is
     * returned, the component may not be updated.
     *
     * @param {any} nextProps
     * @param {any} nextState
     * @param {any} nextContext
     * @returns
     * @memberof Component
     */
    Component.prototype.shouldComponentUpdate = function (nextProps, nextState, nextContext) {
        return this._dirty;
    };
    /**
     * Fires before the component is officially added to the DOM. (In our case,
     * it's already there, but the component doesn't know that)
     *
     * @memberof Component
     */
    Component.prototype.componentWillMount = function () { };
    /**
     * Fires after the component is officially added to the DOM.
     *
     * @memberof Component
     */
    Component.prototype.componentDidMount = function () { };
    /**
     * Fires before a component is removed from the DOM.
     *
     * @memberof Component
     */
    Component.prototype.componentWillUnmount = function () { };
    /**
     * Fires when a component receives new props
     *
     * @param {any} nextProps
     * @param {any} nextContext
     * @memberof Component
     */
    Component.prototype.componentWillReceiveProps = function (nextProps, nextContext) {
        this.props = nextProps;
    };
    /**
     * Called before the component is about to be rendered
     *
     * @param {any} nextProps
     * @param {any} nextState
     * @param {any} nextContext
     * @memberof Component
     */
    Component.prototype.componentWillUpdate = function (nextProps, nextState, nextContext) { };
    /**
     * Called after the component has been rendered
     *
     * @param {any} prevProps
     * @param {any} prevState
     * @param {any} prevContext
     * @memberof Component
     */
    Component.prototype.componentDidUpdate = function (prevProps, prevState, prevContext) { };
    return Component;
}());
exports.default = Component;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function flatten() {
    var items = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        items[_i] = arguments[_i];
    }
    var arr = [];
    items.forEach(function (item) {
        if (item instanceof Array) {
            arr = arr.concat(flatten.apply(void 0, item));
        }
        else {
            arr.push(item);
        }
    });
    return arr;
}
exports.default = flatten;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/* from: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes */
exports.default = [
    "accept",
    "accept-charset",
    "accesskey",
    "action",
    "align",
    "alt",
    "async",
    "autocomplete",
    "autofocus",
    "autoplay",
    "autosave",
    "bgcolor",
    "border",
    "buffered",
    "challenge",
    "charset",
    "checked",
    "cite",
    "class",
    "code",
    "codebase",
    "color",
    "cols",
    "colspan",
    "content",
    "contenteditable",
    "contextmenu",
    "controls",
    "coords",
    "crossorigin",
    "data",
    "datetime",
    "default",
    "defer",
    "dir",
    "dirname",
    "disabled",
    "download",
    "draggable",
    "dropzone",
    "enctype",
    "for",
    "form",
    "formaction",
    "headers",
    "height",
    "hidden",
    "high",
    "href",
    "hreflang",
    "http-equiv",
    "icon",
    "id",
    "integrity",
    "ismap",
    "itemprop",
    "keytype",
    "kind",
    "label",
    "lang",
    "language",
    "list",
    "loop",
    "low",
    "manifest",
    "max",
    "maxlength",
    "minlength",
    "media",
    "method",
    "min",
    "multiple",
    "muted",
    "name",
    "novalidate",
    "open",
    "optimum",
    "pattern",
    "ping",
    "placeholder",
    "poster",
    "preload",
    "radiogroup",
    "readonly",
    "rel",
    "required",
    "reversed",
    "rows",
    "rowspan",
    "sandbox",
    "scope",
    "scoped",
    "seamless",
    "selected",
    "shape",
    "size",
    "sizes",
    "slot",
    "span",
    "spellcheck",
    "src",
    "srcdoc",
    "srclang",
    "srcset",
    "start",
    "step",
    "style",
    "summary",
    "tabindex",
    "target",
    "title",
    "type",
    "usemap",
    "value",
    "width",
    "wrap",
];


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var events_js_1 = __webpack_require__(14);
/**
 * Determines if the candidate is an HTML event
 *
 * @export
 * @param {string} [c=""]
 * @returns  {boolean}
 */
function isEvent(c) {
    if (c === void 0) { c = ""; }
    return events_js_1.default.indexOf(c) > -1;
}
exports.default = isEvent;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/* from https://developer.mozilla.org/en-US/docs/Web/Events */
exports.default = [
    "abort",
    "afterprint",
    "animationend",
    "animationiteration",
    "animationstart",
    "appinstalled",
    "audioprocess",
    "audioend",
    "audiostart",
    "beforeprint",
    "beforeunload",
    "beginEvent",
    "blocked",
    "blur",
    "boundary",
    "cached",
    "canplay",
    "canplaythrough",
    "change",
    "chargingchange",
    "chargingtimechange",
    "checking",
    "click",
    "close",
    "complete",
    "compositionend",
    "compositionstart",
    "compositionupdate",
    "contextmenu",
    "copy",
    "cut",
    "dblclick",
    "devicechange",
    "devicelight",
    "devicemotion",
    "deviceorientation",
    "deviceproximity",
    "dischargingtime",
    "DOMActivate",
    "DOMAttributeNameChanged",
    "DOMAttrModified",
    "DOMCharacterDataModified",
    "DOMContentLoaded",
    "DOMElementNameChanged",
    "DOMFocusIn",
    "DOMFocusOut",
    "DOMNodeInserted",
    "DOMNodeInsertedIntoDocument",
    "DOMNodeRemoved",
    "DOMNodeRemovedFromDocument",
    "DOMSubtreeModified",
    "downloading",
    "drag",
    "dragend",
    "dragenter",
    "dragleave",
    "dragover",
    "dragstart",
    "drop",
    "durationchange",
    "emptied",
    "end",
    "ended",
    "endEvent",
    "error",
    "focus",
    "focusin",
    "focusout",
    "fullscreenchange",
    "fullscreenerror",
    "gamepadconnected",
    "gamepaddisconnected",
    "gotpointercapture",
    "hashchange",
    "lostpointercapture",
    "input",
    "invalid",
    "keydown",
    "keypress",
    "keyup",
    "languagechange",
    "levelchange",
    "load",
    "loadeddata",
    "loadedmetadata",
    "loadend",
    "loadstart",
    "mark",
    "message",
    "mousedown",
    "mouseenter",
    "mouseleave",
    "mousemove",
    "mouseout",
    "mouseover",
    "mouseup",
    "nomatch",
    "notificationclick",
    "noupdate",
    "obsolete",
    "offline",
    "online",
    "open",
    "orientationchange",
    "pagehide",
    "pageshow",
    "paste",
    "pause",
    "pointercancel",
    "pointerdown",
    "pointerenter",
    "pointerleave",
    "pinterlockchange",
    "pointerlockerror",
    "pointermove",
    "pointerout",
    "pointerover",
    "pointerup",
    "play",
    "playing",
    "popstate",
    "progress",
    "push",
    "pushsubscriptionchange",
    "ratechange",
    "readystatechange",
    "repeatEvent",
    "reset",
    "resize",
    "resourcetimingbufferfull",
    "result",
    "resume",
    "scroll",
    "seeked",
    "seeking",
    "select",
    "selectstart",
    "selectionchange",
    "show",
    "soundend",
    "soundstart",
    "speechend",
    "speechstart",
    "stalled",
    "start",
    "storage",
    "submit",
    "success",
    "suspend",
    "SVGAbort",
    "SVGError",
    "SVGLoad",
    "SVGResize",
    "SVGScroll",
    "SVGUnload",
    "SVGZoom",
    "timeout",
    "timeupdate",
    "touchcancel",
    "touchend",
    "touchmove",
    "touchstart",
    "transitionend",
    "unload",
    "updateready",
    "upgradeneeded",
    "userproximity",
    "voiceschanged",
    "versionchange",
    "visibilitychange",
    "volumechange",
    "waiting",
    "wheel",
];


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var isAttribute_js_1 = __webpack_require__(5);
var isOnEvent_js_1 = __webpack_require__(6);
/**
 * removes the properties in props from the node
 *
 * @export
 * @param {HTMLElement} el
 * @param {any} [props={}]
 * @returns {void}
 */
function removePropsFromElement(el, props) {
    if (props === void 0) { props = {}; }
    if (!el)
        return;
    if (!props)
        return;
    for (var _i = 0, _a = Object.entries(props); _i < _a.length; _i++) {
        var _b = _a[_i], k = _b[0], v = _b[1];
        if (k === "key") {
            el.removeAttribute("data-key");
        }
        else if (k === "style") {
            el.removeAttribute("style");
        }
        else if (isOnEvent_js_1.default(k)) {
            // event handler
            var eventName = k.substr(2).toLowerCase();
            el.removeEventListener(eventName, v);
            // there may still be unsub fns laying around, but that's OK
            // removeEventListener won't fail if there is no listener anymore
        }
        else if (isAttribute_js_1.default(k)) {
            // attribute
            el.removeAttribute(k);
        }
        else {
            // object property
            Reflect.deleteProperty(el, k);
        }
    }
}
exports.default = removePropsFromElement;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Determines if an function is a Component Constructor. This is a duck-type
 * test in that we return true if the prototype has a render method.
 *
 * @export
 * @param {function} fn                 the function to test
 * @returns {boolean}                   whether the function is a Component Constructor
 */
function isFunctionComponentCtor(fn) {
    return (fn &&
        fn.prototype &&
        fn.prototype.render &&
        typeof fn.prototype.render === "function");
}
exports.default = isFunctionComponentCtor;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var VNode_js_1 = __webpack_require__(0);
function createElement(tag, props) {
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    return new (VNode_js_1.default.bind.apply(VNode_js_1.default, [void 0, tag, props].concat(children)))();
}
exports.default = createElement;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cvtVNode2DOM_js_1 = __webpack_require__(1);
var expandVNodeTree_js_1 = __webpack_require__(2);
function render(node, domRoot, context) {
    domRoot.appendChild(cvtVNode2DOM_js_1.default(expandVNodeTree_js_1.default(node, context)));
}
exports.render = render;
exports.default = render;


/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBlOTFmOGQzMTRkZDYxYzE5ODA1ZSIsIndlYnBhY2s6Ly8vLi9zcmMvVk5vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2N2dFZOb2RlMkRPTS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZXhwYW5kVk5vZGVUcmVlLmpzIiwid2VicGFjazovLy8uL3NyYy9kaWZmLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9jb3B5UHJvcHNUb0VsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2lzQXR0cmlidXRlLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9pc09uRXZlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Vycm9ycy5qcyIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9mbGF0dGVuLmpzIiwid2VicGFjazovLy8uL3NyYy9jb25zdGFudHMvYXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvaXNFdmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RhbnRzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvcmVtb3ZlUHJvcHNGcm9tRWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvaXNGdW5jdGlvbkNvbXBvbmVudEN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NyZWF0ZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlbmRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDN0RBLDJDQUF5QztBQUV6QztJQUNJLGVBQVksR0FBRyxFQUFFLEtBQVU7UUFBVixrQ0FBVTtRQUFFLGtCQUFXO2FBQVgsVUFBVyxFQUFYLHFCQUFXLEVBQVgsSUFBVztZQUFYLGlDQUFXOztRQUNwQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLGtDQUFrQztRQUNsRCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLG9DQUFvQztRQUN4RCxJQUFJLENBQUMsR0FBRyxHQUFHLEtBQUssSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsc0NBQXNDO1FBQ3JFLElBQUksQ0FBQyxRQUFRLEdBQUcsb0JBQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLDhCQUE4QjtRQUVqRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDLDBCQUEwQjtRQUNoRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxDQUFDLHlDQUF5QztRQUNqRSxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxDQUFDLHNEQUFzRDtJQUN0RixDQUFDO0lBRUQscUJBQUssR0FBTDtRQUNJLElBQUksS0FBSyxRQUFPLEtBQUssWUFBTCxLQUFLLFdBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxTQUFLLElBQUksQ0FBQyxRQUFRLEtBQUMsQ0FBQztRQUM5RCxLQUFLLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDL0IsS0FBSyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ25DLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVELHdCQUFRLEdBQVIsVUFDSSxLQUFLLEVBQ0wsRUFNTTtZQU5OLDRCQU1NLEVBTEYsaUJBQWlCLEVBQWpCLHNDQUFpQixFQUNqQixtQkFBbUIsRUFBbkIsd0NBQW1CLEVBQ25CLGlCQUFpQixFQUFqQixzQ0FBaUIsRUFDakIsc0JBQXNCLEVBQXRCLDJDQUFzQixFQUN0QixzQkFBc0IsRUFBdEIsMkNBQXNCO1FBRzFCLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO1FBQ3JDLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDO1lBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQzNDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO1FBQ3JDLEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDO1lBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDO1FBQ3BELEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUM7WUFDL0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDO1FBQ3ZDLENBQUM7SUFDTCxDQUFDO0lBQ0wsWUFBQztBQUFELENBQUM7Ozs7Ozs7Ozs7O0FDeENELHdDQUErQjtBQUMvQixxREFBK0Q7QUFFL0Q7Ozs7Ozs7R0FPRztBQUNILHNCQUFxQyxLQUFLO0lBQ3RDLElBQUksSUFBSSxDQUFDO0lBRVQseUJBQXlCO0lBQ3pCLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQztRQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFFdkQsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssWUFBWSxrQkFBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVCLHVFQUF1RTtRQUN2RSxxQkFBcUI7UUFDckIsSUFBSSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssQ0FBQyxHQUFHLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztRQUN2Qyw4REFBOEQ7UUFDOUQsSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXpDLG9FQUFvRTtRQUNwRSx5QkFBeUI7UUFDekIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDbkIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLFVBQVUsQ0FBQztvQkFDUCxpREFBaUQ7b0JBQ2pELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDL0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7NEJBQzdCLEtBQUssQ0FBQyxVQUFVLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzs0QkFDdEMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDOzRCQUNqQyxLQUFLLENBQUMsVUFBVSxDQUFDLGlCQUFpQixFQUFFLENBQUM7d0JBQ3pDLENBQUM7b0JBQ0wsQ0FBQztnQkFDTCxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDVixDQUFDO1FBQ0wsQ0FBQztRQUVELCtDQUErQztRQUMvQyxLQUFLLENBQUMsY0FBYyxHQUFHLCtCQUFrQixDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFN0QsMEJBQTBCO1FBQzFCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0MsQ0FBQztRQUVELDRCQUE0QjtRQUM1QixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkUsR0FBRyxDQUFDLENBQWdCLFVBQWMsRUFBZCxVQUFLLENBQUMsUUFBUSxFQUFkLGNBQWMsRUFBZCxJQUFjO2dCQUE3QixJQUFNLEtBQUs7Z0JBQ1osSUFBTSxTQUFTLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN0QyxFQUFFLENBQUMsQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDO29CQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDdEQ7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQUVELEVBQUUsQ0FBQyxDQUFDLEtBQUssWUFBWSxrQkFBSyxDQUFDLENBQUMsQ0FBQztRQUN6QixLQUFLLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUN0QixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNuQixLQUFLLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckMsQ0FBQztJQUNMLENBQUM7SUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUF4REQsK0JBd0RDOzs7Ozs7Ozs7O0FDbkVELHdDQUErQjtBQUMvQiwyREFBeUU7QUFDekUseUNBQThDO0FBRTlDOzs7Ozs7O0dBT0c7QUFDSCx5QkFBd0MsS0FBSyxFQUFFLE9BQWM7SUFBZCx3Q0FBYztJQUN6RCxJQUFJLElBQUksQ0FBQztJQUNULEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLG9CQUFvQjtJQUU3QyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxZQUFZLGtCQUFLLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxtREFBbUQ7SUFFaEcsSUFBSSxHQUFHLElBQUksa0JBQUssRUFBRSxDQUFDO0lBRW5CLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxDQUFDLEdBQUcsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLHFGQUFxRjtRQUNyRixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNKLHNDQUFzQztRQUN0QyxFQUFFLENBQUMsQ0FBQyxvQ0FBdUIsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLGtGQUFrRjtZQUNsRixJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNqSCwwREFBMEQ7WUFDMUQsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLHFCQUFxQixFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyw0Q0FBNEM7Z0JBQzVDLFNBQVMsQ0FBQyx5QkFBeUIsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUM5RCx5REFBeUQ7Z0JBQ3pELFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQ3pFLGdGQUFnRjtnQkFDaEYsSUFBSSxHQUFHLFNBQVMsQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQzlHLG9FQUFvRTtnQkFDcEUsU0FBUyxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztZQUM1RSxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osa0VBQWtFO2dCQUNsRSxJQUFJLEdBQUcsU0FBUyxDQUFDLGVBQWUsSUFBSSxJQUFJLENBQUM7WUFDN0MsQ0FBQztZQUNELEtBQUssQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1lBQzdCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFBQyxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUMxQyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxDQUFDLEdBQUcsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLG1DQUFtQztZQUNuQyxJQUFJLEdBQUcsZUFBZSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNsRSxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixrRUFBa0U7WUFDbEUsaUNBQWlDO1lBQ2pDLE1BQU0sSUFBSSwyQkFBZSxDQUFDLDhCQUE0QixLQUFLLENBQUMsR0FBSyxDQUFDLENBQUM7UUFDdkUsQ0FBQztJQUNMLENBQUM7SUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLFFBQVEsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9FLGtEQUFrRDtRQUNsRCxHQUFHLENBQUMsQ0FBYyxVQUFjLEVBQWQsVUFBSyxDQUFDLFFBQVEsRUFBZCxjQUFjLEVBQWQsSUFBYztZQUEzQixJQUFJLEtBQUs7WUFDVixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7U0FDdkQ7SUFDTCxDQUFDO0lBRUQsd0RBQXdEO0lBQ3hELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDekIsQ0FBQztJQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQXZERCxrQ0F1REM7Ozs7Ozs7Ozs7QUNuRUQsd0NBQStCO0FBQy9CLCtDQUE2QztBQUM3QyxxREFBK0Q7QUFDL0QsMERBQXVFO0FBRXZFLHlDQUErRDtBQUUvRDs7OztHQUlHO0FBQ0gsZUFBZSxLQUFLO0lBQ2hCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLEdBQUcsQ0FBQyxDQUFrQixVQUFvQixFQUFwQixVQUFLLENBQUMsY0FBYyxFQUFwQixjQUFvQixFQUFwQixJQUFvQjtZQUFyQyxJQUFNLE9BQU87WUFDZCxPQUFPLEVBQUUsQ0FBQztTQUNiO1FBQ0QsS0FBSyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7SUFDaEMsQ0FBQztBQUNMLENBQUM7QUFFRDs7Ozs7Ozs7R0FRRztBQUNILGNBQTZCLFdBQVcsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLE9BQU87SUFDbkUsMERBQTBEO0lBQzFELEVBQUUsQ0FBQyxDQUFDLFdBQVcsS0FBSyxXQUFXLENBQUM7UUFBQyxNQUFNLENBQUM7SUFFeEMsSUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztJQUV6QywyQ0FBMkM7SUFDM0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsWUFBWSxrQkFBSyxJQUFJLFdBQVcsWUFBWSxrQkFBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLEVBQUUsQ0FBQyxDQUFDLGFBQWEsSUFBSSxXQUFXLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztZQUMvQyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsVUFBVSxLQUFLLFdBQVcsQ0FBQyxVQUFVLElBQUksV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQzlFLFdBQVcsQ0FBQyxVQUFVLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztZQUNsRCxDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxZQUFZLElBQUksSUFBSSxDQUFDLENBQUMsV0FBVyxZQUFZLGtCQUFLLElBQUksV0FBVyxZQUFZLGtCQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdGLE9BQU8sQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1lBQ3RDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixhQUFhLENBQUMsWUFBWSxDQUFDLHlCQUFZLENBQUMsV0FBVyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDbkUsQ0FBQztRQUNMLENBQUM7UUFDRCxNQUFNLENBQUM7SUFDWCxDQUFDO0lBRUQsSUFBSSxLQUFLLEdBQUcsSUFBSSxFQUNaLFVBQVUsR0FBRyxLQUFLLENBQUM7SUFFdkIsNENBQTRDO0lBQzVDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEtBQUssV0FBVyxDQUFDLEdBQUcsQ0FBQztRQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFFdkQsd0NBQXdDO0lBQ3hDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLEtBQUssV0FBVyxDQUFDLFVBQVUsQ0FBQztRQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFFckUsNENBQTRDO0lBQzVDLDRFQUE0RTtJQUM1RSxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxLQUFLLFdBQVcsQ0FBQyxHQUFHLENBQUM7UUFBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBRXZELDBFQUEwRTtJQUMxRSxpQkFBaUI7SUFDakIsR0FBRyxDQUFDLENBQXlCLFVBQXdELEVBQXhELE1BQUMsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUMsRUFBeEQsY0FBd0QsRUFBeEQsSUFBd0Q7UUFBMUUsZUFBYyxFQUFiLGFBQUssRUFBRSxhQUFLO1FBQ3BCLEdBQUcsQ0FBQyxDQUFpQixVQUFpQyxFQUFqQyxXQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLEVBQWpDLGNBQWlDLEVBQWpDLElBQWlDO1lBQTNDLGVBQU0sRUFBTCxTQUFDLEVBQUUsU0FBQztZQUNaLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLENBQUM7U0FDSjtLQUNKO0lBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ1QsMkRBQTJEO1FBQzNELElBQU0sRUFBRSxHQUFHLHlCQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFckMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLFVBQVUsS0FBSyxXQUFXLENBQUMsVUFBVSxJQUFJLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQzlFLFdBQVcsQ0FBQyxVQUFVLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUNsRCxDQUFDO1FBRUQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRW5CLFdBQVcsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQzFCLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLFdBQVcsQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUN6QyxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUNoQixhQUFhLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM1QyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSix5REFBeUQ7WUFDekQsa0NBQWtDO1lBQ2xDLE1BQU0sSUFBSSw0Q0FBZ0MsQ0FBQywrREFBK0QsQ0FBQyxDQUFDO1FBQ2hILENBQUM7UUFFRCxnREFBZ0Q7UUFDaEQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNKLElBQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1FBQzdDLG1GQUFtRjtRQUNuRixFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2IsNkNBQTZDO1lBQzdDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUVuQixxREFBcUQ7WUFDckQsSUFBTSxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7WUFDNUIsR0FBRyxDQUFDLENBQWlCLFVBQXVDLEVBQXZDLFdBQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsRUFBdkMsY0FBdUMsRUFBdkMsSUFBdUM7Z0JBQWpELGVBQU0sRUFBTCxTQUFDLEVBQUUsU0FBQztnQkFDWixFQUFFLENBQUMsQ0FBQyxPQUFPLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO29CQUN4QyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzVCLENBQUM7YUFDSjtZQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sWUFBWSxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxtQ0FBc0IsQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztnQkFDbEQsdUNBQXVDO2dCQUN2QyxXQUFXLENBQUMsY0FBYyxHQUFHLCtCQUFrQixDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEYsQ0FBQztRQUNMLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsVUFBVSxLQUFLLFdBQVcsQ0FBQyxVQUFVLElBQUksVUFBVSxJQUFJLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQzVGLFdBQVcsQ0FBQyxVQUFVLENBQUMseUJBQXlCLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNqRixDQUFDO1FBRUQsaURBQWlEO1FBQ2pELFdBQVcsQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBRS9CLGlDQUFpQztRQUNqQyw0Q0FBNEM7UUFDNUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ2pHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDaEcsQ0FBQztRQUVELG1CQUFtQjtRQUNuQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3BGLEVBQUUsQ0FBQyxXQUFXLENBQUMseUJBQVksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxRCxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNyQixPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzVCLENBQUM7UUFFRCwrQ0FBK0M7UUFDL0MsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNwRixJQUFNLEtBQUssR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixLQUFLLENBQUMsVUFBVSxDQUFDLG9CQUFvQixFQUFFLENBQUM7WUFDNUMsQ0FBQztZQUNELEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNiLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hDLENBQUM7SUFDTCxDQUFDO0FBQ0wsQ0FBQztBQXpIRCx1QkF5SEM7Ozs7Ozs7Ozs7QUN2SkQsOENBQTJDO0FBQzNDLDRDQUF1QztBQUV2Qyx1QkFBdUIsR0FBRyxFQUFFLEtBQUs7SUFDN0IsR0FBRyxDQUFDLENBQWlCLFVBQXFCLEVBQXJCLFdBQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQXJCLGNBQXFCLEVBQXJCLElBQXFCO1FBQS9CLGVBQU0sRUFBTCxTQUFDLEVBQUUsU0FBQztRQUNaLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLFlBQVksTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNyQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzdCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDZixDQUFDO0tBQ0o7QUFDTCxDQUFDO0FBRUQ7Ozs7Ozs7O0dBUUc7QUFDSCw0QkFBMkMsRUFBRSxFQUFFLEtBQVU7SUFBVixrQ0FBVTtJQUNyRCxJQUFNLGtCQUFrQixHQUFHLEVBQUUsQ0FBQztJQUU5QixFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQztJQUVuQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQzs0QkFFMUIsQ0FBQyxFQUFFLENBQUM7UUFDWixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNkLEVBQUUsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDdkIsc0JBQXNCO1lBQ3RCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLHFDQUFxQztnQkFDckMsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDMUIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLDJCQUEyQjtnQkFDM0IsYUFBYSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDL0IsQ0FBQztRQUNMLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsc0JBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsZ0JBQWdCO1lBQ2hCLElBQU0sV0FBUyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDNUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLFdBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNsQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsY0FBTSxTQUFFLENBQUMsbUJBQW1CLENBQUMsV0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFwQyxDQUFvQyxDQUFDLENBQUM7UUFDeEUsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyx3QkFBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixZQUFZO1lBQ1osRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDMUIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osa0JBQWtCO1lBQ2xCLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDZCxDQUFDO0lBQ0wsQ0FBQztJQXhCRCxHQUFHLENBQUMsQ0FBaUIsVUFBcUIsRUFBckIsV0FBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBckIsY0FBcUIsRUFBckIsSUFBcUI7UUFBL0IsZUFBTSxFQUFMLFNBQUMsRUFBRSxTQUFDO2dCQUFKLENBQUMsRUFBRSxDQUFDO0tBd0JmO0lBRUQsTUFBTSxDQUFDLGtCQUFrQixDQUFDO0FBQzlCLENBQUM7QUFsQ0QscUNBa0NDOzs7Ozs7Ozs7O0FDeERELDhDQUFvRDtBQUVwRDs7Ozs7R0FLRztBQUNILHFCQUFvQyxDQUFNO0lBQU4sMEJBQU07SUFDdEMsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzdCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ0QsTUFBTSxDQUFDLHVCQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzNDLENBQUM7QUFORCw4QkFNQzs7Ozs7Ozs7OztBQ2RELDJDQUFtQztBQUVuQzs7Ozs7O0dBTUc7QUFDSCxtQkFBa0MsQ0FBTTtJQUFOLDBCQUFNO0lBQ3BDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDL0IsbUJBQW1CO1FBQ25CLHdEQUF3RDtRQUN4RCxxRkFBcUY7UUFDckYsY0FBYztRQUNkLE1BQU0sQ0FBQyxDQUNILG9CQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxvQkFBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDcEUsQ0FBQztJQUNOLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNKLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztBQUNMLENBQUM7QUFaRCw0QkFZQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyQkQ7SUFBeUMsdUNBQUs7SUFBOUM7O0lBQWdELENBQUM7SUFBRCwwQkFBQztBQUFELENBQUMsQ0FBUixLQUFLLEdBQUc7QUFBcEMsa0RBQW1CO0FBQ2hDO0lBQXFDLG1DQUFLO0lBQTFDOztJQUE0QyxDQUFDO0lBQUQsc0JBQUM7QUFBRCxDQUFDLENBQVIsS0FBSyxHQUFHO0FBQWhDLDBDQUFlO0FBQzVCO0lBQXNELG9EQUFLO0lBQTNEOztJQUE2RCxDQUFDO0lBQUQsdUNBQUM7QUFBRCxDQUFDLENBQVIsS0FBSyxHQUFHO0FBQWpELDRFQUFnQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGN0MsNkNBQTJDO0FBUXZDLG9CQVJHLHNCQUFTLENBUUg7QUFQYixpREFBbUQ7QUFRL0Msd0JBUkcsMEJBQWEsQ0FRSDtBQVBqQiwrQ0FBaUQ7QUFXN0MsdUJBWEcseUJBQVksQ0FXSDtBQVZoQixrREFBdUQ7QUFTbkQsMEJBVEcsNEJBQWUsQ0FTSDtBQVJuQix1Q0FBaUM7QUFVN0IsZUFWRyxpQkFBSSxDQVVIO0FBVFIsMENBQXFDO0FBS2pDLGlCQUxHLG1CQUFNLENBS0g7Ozs7Ozs7Ozs7QUNWVix1Q0FBNkI7QUFDN0Isd0NBQStCO0FBQy9CLGtEQUFtRDtBQUVuRDtJQUNJLG1CQUFZLEtBQVUsRUFBRSxPQUFZO1FBQXhCLGtDQUFVO1FBQUUsc0NBQVk7UUFDaEMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFFdkIsNEJBQTRCO1FBQzVCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO0lBQ2hDLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsMEJBQU0sR0FBTixVQUFPLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTztRQUN4QixNQUFNLENBQUMsSUFBSSxrQkFBSyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsNEJBQVEsR0FBUixVQUFTLFFBQVE7UUFBakIsaUJBK0JDO1FBOUJHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUMxQixNQUFNLENBQUM7UUFDWCxDQUFDO1FBRUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFFbkIsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFDM0MsU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFDekMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVsRCxFQUFFLENBQUMsQ0FBQyxPQUFPLFFBQVEsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLFNBQVMsR0FBRyxRQUFRLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoRCxDQUFDO1FBRUQsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRXRELHFDQUFxQztRQUNyQyxNQUFNLENBQUMscUJBQXFCLENBQUM7WUFDekIsSUFBSSxTQUFTLEdBQUcsS0FBSSxDQUFDLGVBQWUsQ0FBQztZQUNyQyxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBRSxLQUFJLENBQUMsS0FBSyxFQUFFLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25FLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFJLENBQUMsS0FBSyxFQUFFLEtBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMvRCxTQUFTLEdBQUcsNEJBQWUsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSSxDQUFDLEtBQUssRUFBRSxLQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUM3RixLQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQztZQUMvRCxDQUFDO1lBQ0QsU0FBUyxDQUFDLFVBQVUsR0FBRyxLQUFJLENBQUM7WUFDNUIsaUJBQUksQ0FBQyxLQUFJLENBQUMsZUFBZSxFQUFFLFNBQVMsRUFBRSxLQUFJLENBQUMsUUFBUSxFQUFFLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNuRSxLQUFJLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQztZQUNqQyxLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCx5Q0FBcUIsR0FBckIsVUFBc0IsU0FBUyxFQUFFLFNBQVMsRUFBRSxXQUFXO1FBQ25ELE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILHNDQUFrQixHQUFsQixjQUFzQixDQUFDO0lBRXZCOzs7O09BSUc7SUFDSCxxQ0FBaUIsR0FBakIsY0FBcUIsQ0FBQztJQUV0Qjs7OztPQUlHO0lBQ0gsd0NBQW9CLEdBQXBCLGNBQXdCLENBQUM7SUFFekI7Ozs7OztPQU1HO0lBQ0gsNkNBQXlCLEdBQXpCLFVBQTBCLFNBQVMsRUFBRSxXQUFXO1FBQzVDLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO0lBQzNCLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsdUNBQW1CLEdBQW5CLFVBQW9CLFNBQVMsRUFBRSxTQUFTLEVBQUUsV0FBVyxJQUFHLENBQUM7SUFFekQ7Ozs7Ozs7T0FPRztJQUNILHNDQUFrQixHQUFsQixVQUFtQixTQUFTLEVBQUUsU0FBUyxFQUFFLFdBQVcsSUFBRyxDQUFDO0lBQzVELGdCQUFDO0FBQUQsQ0FBQzs7Ozs7Ozs7Ozs7QUN0SUQ7SUFBZ0MsZUFBUTtTQUFSLFVBQVEsRUFBUixxQkFBUSxFQUFSLElBQVE7UUFBUiwwQkFBUTs7SUFDcEMsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBQ2IsS0FBSyxDQUFDLE9BQU8sQ0FBQyxjQUFJO1FBQ2QsRUFBRSxDQUFDLENBQUMsSUFBSSxZQUFZLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDeEIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxlQUFJLElBQUksRUFBRSxDQUFDO1FBQ3ZDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkIsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxDQUFDLEdBQUcsQ0FBQztBQUNmLENBQUM7QUFWRCwwQkFVQzs7Ozs7Ozs7OztBQ1ZELHdFQUF3RTtBQUN4RSxrQkFBZTtJQUNYLFFBQVE7SUFDUixnQkFBZ0I7SUFDaEIsV0FBVztJQUNYLFFBQVE7SUFDUixPQUFPO0lBQ1AsS0FBSztJQUNMLE9BQU87SUFDUCxjQUFjO0lBQ2QsV0FBVztJQUNYLFVBQVU7SUFDVixVQUFVO0lBQ1YsU0FBUztJQUNULFFBQVE7SUFDUixVQUFVO0lBQ1YsV0FBVztJQUNYLFNBQVM7SUFDVCxTQUFTO0lBQ1QsTUFBTTtJQUNOLE9BQU87SUFDUCxNQUFNO0lBQ04sVUFBVTtJQUNWLE9BQU87SUFDUCxNQUFNO0lBQ04sU0FBUztJQUNULFNBQVM7SUFDVCxpQkFBaUI7SUFDakIsYUFBYTtJQUNiLFVBQVU7SUFDVixRQUFRO0lBQ1IsYUFBYTtJQUNiLE1BQU07SUFDTixVQUFVO0lBQ1YsU0FBUztJQUNULE9BQU87SUFDUCxLQUFLO0lBQ0wsU0FBUztJQUNULFVBQVU7SUFDVixVQUFVO0lBQ1YsV0FBVztJQUNYLFVBQVU7SUFDVixTQUFTO0lBQ1QsS0FBSztJQUNMLE1BQU07SUFDTixZQUFZO0lBQ1osU0FBUztJQUNULFFBQVE7SUFDUixRQUFRO0lBQ1IsTUFBTTtJQUNOLE1BQU07SUFDTixVQUFVO0lBQ1YsWUFBWTtJQUNaLE1BQU07SUFDTixJQUFJO0lBQ0osV0FBVztJQUNYLE9BQU87SUFDUCxVQUFVO0lBQ1YsU0FBUztJQUNULE1BQU07SUFDTixPQUFPO0lBQ1AsTUFBTTtJQUNOLFVBQVU7SUFDVixNQUFNO0lBQ04sTUFBTTtJQUNOLEtBQUs7SUFDTCxVQUFVO0lBQ1YsS0FBSztJQUNMLFdBQVc7SUFDWCxXQUFXO0lBQ1gsT0FBTztJQUNQLFFBQVE7SUFDUixLQUFLO0lBQ0wsVUFBVTtJQUNWLE9BQU87SUFDUCxNQUFNO0lBQ04sWUFBWTtJQUNaLE1BQU07SUFDTixTQUFTO0lBQ1QsU0FBUztJQUNULE1BQU07SUFDTixhQUFhO0lBQ2IsUUFBUTtJQUNSLFNBQVM7SUFDVCxZQUFZO0lBQ1osVUFBVTtJQUNWLEtBQUs7SUFDTCxVQUFVO0lBQ1YsVUFBVTtJQUNWLE1BQU07SUFDTixTQUFTO0lBQ1QsU0FBUztJQUNULE9BQU87SUFDUCxRQUFRO0lBQ1IsVUFBVTtJQUNWLFVBQVU7SUFDVixPQUFPO0lBQ1AsTUFBTTtJQUNOLE9BQU87SUFDUCxNQUFNO0lBQ04sTUFBTTtJQUNOLFlBQVk7SUFDWixLQUFLO0lBQ0wsUUFBUTtJQUNSLFNBQVM7SUFDVCxRQUFRO0lBQ1IsT0FBTztJQUNQLE1BQU07SUFDTixPQUFPO0lBQ1AsU0FBUztJQUNULFVBQVU7SUFDVixRQUFRO0lBQ1IsT0FBTztJQUNQLE1BQU07SUFDTixRQUFRO0lBQ1IsT0FBTztJQUNQLE9BQU87SUFDUCxNQUFNO0NBQ1QsQ0FBQzs7Ozs7Ozs7OztBQ3RIRiwwQ0FBNEM7QUFFNUM7Ozs7OztHQU1HO0FBQ0gsaUJBQWdDLENBQU07SUFBTiwwQkFBTTtJQUNsQyxNQUFNLENBQUMsbUJBQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDbEMsQ0FBQztBQUZELDBCQUVDOzs7Ozs7Ozs7O0FDWEQsOERBQThEO0FBQzlELGtCQUFlO0lBQ1gsT0FBTztJQUNQLFlBQVk7SUFDWixjQUFjO0lBQ2Qsb0JBQW9CO0lBQ3BCLGdCQUFnQjtJQUNoQixjQUFjO0lBQ2QsY0FBYztJQUNkLFVBQVU7SUFDVixZQUFZO0lBQ1osYUFBYTtJQUNiLGNBQWM7SUFDZCxZQUFZO0lBQ1osU0FBUztJQUNULE1BQU07SUFDTixVQUFVO0lBQ1YsUUFBUTtJQUNSLFNBQVM7SUFDVCxnQkFBZ0I7SUFDaEIsUUFBUTtJQUNSLGdCQUFnQjtJQUNoQixvQkFBb0I7SUFDcEIsVUFBVTtJQUNWLE9BQU87SUFDUCxPQUFPO0lBQ1AsVUFBVTtJQUNWLGdCQUFnQjtJQUNoQixrQkFBa0I7SUFDbEIsbUJBQW1CO0lBQ25CLGFBQWE7SUFDYixNQUFNO0lBQ04sS0FBSztJQUNMLFVBQVU7SUFDVixjQUFjO0lBQ2QsYUFBYTtJQUNiLGNBQWM7SUFDZCxtQkFBbUI7SUFDbkIsaUJBQWlCO0lBQ2pCLGlCQUFpQjtJQUNqQixhQUFhO0lBQ2IseUJBQXlCO0lBQ3pCLGlCQUFpQjtJQUNqQiwwQkFBMEI7SUFDMUIsa0JBQWtCO0lBQ2xCLHVCQUF1QjtJQUN2QixZQUFZO0lBQ1osYUFBYTtJQUNiLGlCQUFpQjtJQUNqQiw2QkFBNkI7SUFDN0IsZ0JBQWdCO0lBQ2hCLDRCQUE0QjtJQUM1QixvQkFBb0I7SUFDcEIsYUFBYTtJQUNiLE1BQU07SUFDTixTQUFTO0lBQ1QsV0FBVztJQUNYLFdBQVc7SUFDWCxVQUFVO0lBQ1YsV0FBVztJQUNYLE1BQU07SUFDTixnQkFBZ0I7SUFDaEIsU0FBUztJQUNULEtBQUs7SUFDTCxPQUFPO0lBQ1AsVUFBVTtJQUNWLE9BQU87SUFDUCxPQUFPO0lBQ1AsU0FBUztJQUNULFVBQVU7SUFDVixrQkFBa0I7SUFDbEIsaUJBQWlCO0lBQ2pCLGtCQUFrQjtJQUNsQixxQkFBcUI7SUFDckIsbUJBQW1CO0lBQ25CLFlBQVk7SUFDWixvQkFBb0I7SUFDcEIsT0FBTztJQUNQLFNBQVM7SUFDVCxTQUFTO0lBQ1QsVUFBVTtJQUNWLE9BQU87SUFDUCxnQkFBZ0I7SUFDaEIsYUFBYTtJQUNiLE1BQU07SUFDTixZQUFZO0lBQ1osZ0JBQWdCO0lBQ2hCLFNBQVM7SUFDVCxXQUFXO0lBQ1gsTUFBTTtJQUNOLFNBQVM7SUFDVCxXQUFXO0lBQ1gsWUFBWTtJQUNaLFlBQVk7SUFDWixXQUFXO0lBQ1gsVUFBVTtJQUNWLFdBQVc7SUFDWCxTQUFTO0lBQ1QsU0FBUztJQUNULG1CQUFtQjtJQUNuQixVQUFVO0lBQ1YsVUFBVTtJQUNWLFNBQVM7SUFDVCxRQUFRO0lBQ1IsTUFBTTtJQUNOLG1CQUFtQjtJQUNuQixVQUFVO0lBQ1YsVUFBVTtJQUNWLE9BQU87SUFDUCxPQUFPO0lBQ1AsZUFBZTtJQUNmLGFBQWE7SUFDYixjQUFjO0lBQ2QsY0FBYztJQUNkLGtCQUFrQjtJQUNsQixrQkFBa0I7SUFDbEIsYUFBYTtJQUNiLFlBQVk7SUFDWixhQUFhO0lBQ2IsV0FBVztJQUNYLE1BQU07SUFDTixTQUFTO0lBQ1QsVUFBVTtJQUNWLFVBQVU7SUFDVixNQUFNO0lBQ04sd0JBQXdCO0lBQ3hCLFlBQVk7SUFDWixrQkFBa0I7SUFDbEIsYUFBYTtJQUNiLE9BQU87SUFDUCxRQUFRO0lBQ1IsMEJBQTBCO0lBQzFCLFFBQVE7SUFDUixRQUFRO0lBQ1IsUUFBUTtJQUNSLFFBQVE7SUFDUixTQUFTO0lBQ1QsUUFBUTtJQUNSLGFBQWE7SUFDYixpQkFBaUI7SUFDakIsTUFBTTtJQUNOLFVBQVU7SUFDVixZQUFZO0lBQ1osV0FBVztJQUNYLGFBQWE7SUFDYixTQUFTO0lBQ1QsT0FBTztJQUNQLFNBQVM7SUFDVCxRQUFRO0lBQ1IsU0FBUztJQUNULFNBQVM7SUFDVCxVQUFVO0lBQ1YsVUFBVTtJQUNWLFNBQVM7SUFDVCxXQUFXO0lBQ1gsV0FBVztJQUNYLFdBQVc7SUFDWCxTQUFTO0lBQ1QsU0FBUztJQUNULFlBQVk7SUFDWixhQUFhO0lBQ2IsVUFBVTtJQUNWLFdBQVc7SUFDWCxZQUFZO0lBQ1osZUFBZTtJQUNmLFFBQVE7SUFDUixhQUFhO0lBQ2IsZUFBZTtJQUNmLGVBQWU7SUFDZixlQUFlO0lBQ2YsZUFBZTtJQUNmLGtCQUFrQjtJQUNsQixjQUFjO0lBQ2QsU0FBUztJQUNULE9BQU87Q0FDVixDQUFDOzs7Ozs7Ozs7O0FDL0tGLDhDQUEyQztBQUMzQyw0Q0FBdUM7QUFFdkM7Ozs7Ozs7R0FPRztBQUNILGdDQUErQyxFQUFFLEVBQUUsS0FBVTtJQUFWLGtDQUFVO0lBQ3pELEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQUMsTUFBTSxDQUFDO0lBRWhCLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQUMsTUFBTSxDQUFDO0lBRW5CLEdBQUcsQ0FBQyxDQUFpQixVQUFxQixFQUFyQixXQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFyQixjQUFxQixFQUFyQixJQUFxQjtRQUEvQixlQUFNLEVBQUwsU0FBQyxFQUFFLFNBQUM7UUFDWixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNkLEVBQUUsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbkMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN2QixFQUFFLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hDLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsc0JBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsZ0JBQWdCO1lBQ2hCLElBQU0sU0FBUyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDNUMsRUFBRSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNyQyw0REFBNEQ7WUFDNUQsaUVBQWlFO1FBQ3JFLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsd0JBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsWUFBWTtZQUNaLEVBQUUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osa0JBQWtCO1lBQ2xCLE9BQU8sQ0FBQyxjQUFjLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLENBQUM7S0FDSjtBQUNMLENBQUM7QUF4QkQseUNBd0JDOzs7Ozs7Ozs7O0FDbkNEOzs7Ozs7O0dBT0c7QUFDSCxpQ0FBZ0QsRUFBRTtJQUM5QyxNQUFNLENBQUMsQ0FDSCxFQUFFO1FBQ0YsRUFBRSxDQUFDLFNBQVM7UUFDWixFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU07UUFDbkIsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sS0FBSyxVQUFVLENBQzVDLENBQUM7QUFDTixDQUFDO0FBUEQsMENBT0M7Ozs7Ozs7Ozs7QUNmRCx3Q0FBK0I7QUFDL0IsdUJBQXNDLEdBQUcsRUFBRSxLQUFLO0lBQUUsa0JBQVc7U0FBWCxVQUFXLEVBQVgscUJBQVcsRUFBWCxJQUFXO1FBQVgsaUNBQVc7O0lBQ3pELE1BQU0sTUFBSyxrQkFBSyxZQUFMLGtCQUFLLFdBQUMsR0FBRyxFQUFFLEtBQUssU0FBSyxRQUFRLE1BQUU7QUFDOUMsQ0FBQztBQUZELGdDQUVDOzs7Ozs7Ozs7O0FDSEQsK0NBQTZDO0FBQzdDLGtEQUFtRDtBQUVuRCxnQkFBdUIsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPO0lBQ3pDLE9BQU8sQ0FBQyxXQUFXLENBQUMseUJBQVksQ0FBQyw0QkFBZSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdEUsQ0FBQztBQUZELHdCQUVDO0FBRUQsa0JBQWUsTUFBTSxDQUFDIiwiZmlsZSI6InVuZGVyLXJlYWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJ1bmRlci1yZWFjdFwiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJ1bmRlci1yZWFjdFwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJ1bmRlci1yZWFjdFwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA4KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBlOTFmOGQzMTRkZDYxYzE5ODA1ZSIsImltcG9ydCBmbGF0dGVuIGZyb20gXCIuL3V0aWxzL2ZsYXR0ZW4uanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVk5vZGUge1xuICAgIGNvbnN0cnVjdG9yKHRhZywgcHJvcHMgPSB7fSwgLi4uY2hpbGRyZW4pIHtcbiAgICAgICAgdGhpcy50YWcgPSB0YWc7IC8qIHRhZyBvciBDb21wb25lbnQgY29uc3RydWN0b3IgKi9cbiAgICAgICAgdGhpcy5wcm9wcyA9IHByb3BzOyAvKiBzdHlsZXMsIGF0dHJpYnV0ZXMsIHByb3BlcnRpZXMgKi9cbiAgICAgICAgdGhpcy5rZXkgPSBwcm9wcyAmJiBwcm9wcy5rZXk7IC8qIHVuaXF1ZSBrZXkgZm9yIHRoaW5ncyBsaWtlIGxpc3RzICovXG4gICAgICAgIHRoaXMuY2hpbGRyZW4gPSBmbGF0dGVuKGNoaWxkcmVuKTsgLyogZmxhdHRlbmVkIGNoaWxkcmVuIGFycmF5ICovXG5cbiAgICAgICAgdGhpcy5fZG9tTm9kZSA9IG51bGw7IC8qIGF0dGFjaGVkIERPTSBlbGVtZW50ICovXG4gICAgICAgIHRoaXMuX2NvbXBvbmVudCA9IG51bGw7IC8qIGF0dGFjaGVkIGNvbXBvbmVudCBpbnN0YW5jZSwgaWYgYW55ICovXG4gICAgICAgIHRoaXMuX3Vuc3Vic2NyaWJlcnMgPSBudWxsOyAvKiBmdW5jdGlvbnMgdG8gY2FsbCB0byB1bnN1YnNjcmliZSBldmVudCBsaXN0ZW5lcnMgKi9cbiAgICB9XG5cbiAgICBjbG9uZSgpIHtcbiAgICAgICAgbGV0IGNsb25lID0gbmV3IFZOb2RlKHRoaXMudGFnLCB0aGlzLnByb3BzLCAuLi50aGlzLmNoaWxkcmVuKTtcbiAgICAgICAgY2xvbmUuX2RvbU5vZGUgPSB0aGlzLl9kb21Ob2RlO1xuICAgICAgICBjbG9uZS5fY29tcG9uZW50ID0gdGhpcy5fY29tcG9uZW50O1xuICAgICAgICByZXR1cm4gY2xvbmU7XG4gICAgfVxuXG4gICAgY29weUZyb20oXG4gICAgICAgIHZub2RlLFxuICAgICAgICB7XG4gICAgICAgICAgICBleGNlcHRUYWcgPSBmYWxzZSxcbiAgICAgICAgICAgIGV4Y2VwdFByb3BzID0gZmFsc2UsXG4gICAgICAgICAgICBleGNlcHRLZXkgPSBmYWxzZSxcbiAgICAgICAgICAgIGV4Y2VwdENoaWxkcmVuID0gZmFsc2UsXG4gICAgICAgICAgICBleGNlcHRJbnRlcm5hbCA9IGZhbHNlLFxuICAgICAgICB9ID0ge31cbiAgICApIHtcbiAgICAgICAgaWYgKCFleGNlcHRUYWcpIHRoaXMudGFnID0gdm5vZGUudGFnO1xuICAgICAgICBpZiAoIWV4Y2VwdFByb3BzKSB0aGlzLnByb3BzID0gdm5vZGUucHJvcHM7XG4gICAgICAgIGlmICghZXhjZXB0S2V5KSB0aGlzLmtleSA9IHZub2RlLmtleTtcbiAgICAgICAgaWYgKCFleGNlcHRDaGlsZHJlbikgdGhpcy5jaGlsZHJlbiA9IHZub2RlLmNoaWxkcmVuO1xuICAgICAgICBpZiAoIWV4Y2VwdEludGVybmFsKSB7XG4gICAgICAgICAgICB0aGlzLl9kb21Ob2RlID0gdm5vZGUuX2RvbU5vZGU7XG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnQgPSB2bm9kZS5fY29tcG9uZW50O1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1ZOb2RlLmpzIiwiaW1wb3J0IFZOb2RlIGZyb20gXCIuL1ZOb2RlLmpzXCI7XG5pbXBvcnQgY29weVByb3BzVG9FbGVtZW50IGZyb20gXCIuL3V0aWxzL2NvcHlQcm9wc1RvRWxlbWVudC5qc1wiO1xuXG4vKipcbiAqIFJlbmRlciBhbiBleHBhbmRlZCBWTm9kZSB0cmVlIGludG8gRE9NIGVsZW1lbnRzXG4gKiBUT0RPOiBURU1QT1JBUlk7IHdpbGwgYmUgcmVwbGFjZWQgd2l0aCBtZXJnaW5nXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHtWTm9kZSB8IHVuZGVmaW5lZH0gdm5vZGVcbiAqIEByZXR1cm5zIHthbnl9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGN2dFZOb2RlMkRPTSh2bm9kZSkge1xuICAgIGxldCBub2RlO1xuXG4gICAgLy8gbm8gdm5vZGU/IE5vIGRvbSBub2RlIVxuICAgIGlmICh2bm9kZSA9PT0gdW5kZWZpbmVkIHx8IHZub2RlID09PSBudWxsKSByZXR1cm4gbm9kZTtcblxuICAgIGlmICghKHZub2RlIGluc3RhbmNlb2YgVk5vZGUpKSB7XG4gICAgICAgIC8vIHdlJ3JlIHNvbWV0aGluZyBsaWtlIHRleHQgb3IgYSBudW1iZXIuIFdlIG5lZWQgdG8gY3JlYXRlIGEgdGV4dCBub2RlXG4gICAgICAgIC8vIHdpdGggdGhlIGNvbnRlbnRzLlxuICAgICAgICBub2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodm5vZGUpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHZub2RlLnRhZyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAvLyB3ZSdyZSBhIHJlYWwgdm5vZGUgd2l0aCBhIHN0cmluZyB0YWcgLS0gY3JlYXRlIHRoZSBlbGVtZW50IVxuICAgICAgICBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh2bm9kZS50YWcpO1xuXG4gICAgICAgIC8vIGNoZWNrIHRvIHNlZSBpZiB3ZSBuZWVkIHRvIHRyaWdnZXIgdGhlIHdpbGwvZGlkTW91bnQgcG9ydGlvbiBvZiBhXG4gICAgICAgIC8vIGNvbXBvbmVudCdzIGxpZmVjeWNsZS5cbiAgICAgICAgaWYgKHZub2RlLl9jb21wb25lbnQpIHtcbiAgICAgICAgICAgIGlmICghdm5vZGUuX2NvbXBvbmVudC5fbW91bnRlZCkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBvbmx5IHRyaWdnZXIgdGhlIGxpZmVjeWNsZSBpZiB3ZSdyZSBpbiB0aGUgRE9NXG4gICAgICAgICAgICAgICAgICAgIGlmIChkb2N1bWVudC5ib2R5LmNvbnRhaW5zKG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXZub2RlLl9jb21wb25lbnQuX21vdW50ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2bm9kZS5fY29tcG9uZW50LmNvbXBvbmVudFdpbGxNb3VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZub2RlLl9jb21wb25lbnQuX21vdW50ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZub2RlLl9jb21wb25lbnQuY29tcG9uZW50RGlkTW91bnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gLi4uIGFuZCBjb3B5IHRoZSBwcm9wZXJ0aWVzIGFuZCBzdWNoIGludG8gaXRcbiAgICAgICAgdm5vZGUuX3Vuc3Vic2NyaWJlcnMgPSBjb3B5UHJvcHNUb0VsZW1lbnQobm9kZSwgdm5vZGUucHJvcHMpO1xuXG4gICAgICAgIC8vIGFkZCB0aGUga2V5LCBpZiBwcmVzZW50XG4gICAgICAgIGlmICh2bm9kZS5rZXkgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShcImRhdGEta2V5XCIsIHZub2RlLmtleSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjcmVhdGUgdGhlIGNoaWxkcmVuLCB0b28hXG4gICAgICAgIGlmICh2bm9kZS5jaGlsZHJlbiAmJiB2bm9kZS5jaGlsZHJlbi5sZW5ndGggJiYgdm5vZGUuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiB2bm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkTm9kZSA9IGN2dFZOb2RlMkRPTShjaGlsZCk7XG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkTm9kZSAmJiBub2RlKSBub2RlLmFwcGVuZENoaWxkKGNoaWxkTm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodm5vZGUgaW5zdGFuY2VvZiBWTm9kZSkge1xuICAgICAgICB2bm9kZS5fZG9tTm9kZSA9IG5vZGU7XG4gICAgICAgIGlmICh2bm9kZS5fY29tcG9uZW50KSB7XG4gICAgICAgICAgICB2bm9kZS5fY29tcG9uZW50Ll9kb21Ob2RlID0gbm9kZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBub2RlO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2N2dFZOb2RlMkRPTS5qcyIsImltcG9ydCBWTm9kZSBmcm9tIFwiLi9WTm9kZS5qc1wiO1xuaW1wb3J0IGlzRnVuY3Rpb25Db21wb25lbnRDdG9yIGZyb20gXCIuL3V0aWxzL2lzRnVuY3Rpb25Db21wb25lbnRDdG9yLmpzXCI7XG5pbXBvcnQgeyBVbmtub3duVGFnRXJyb3IgfSBmcm9tIFwiLi9lcnJvcnMuanNcIjtcblxuLyoqXG4gKiBJdGVyYXRlcyBvdmVyIGEgVk5vZGUgdHJlZSwgcmVuZGVyaW5nIHN1YnRyZWVzIGFzIG5lY2Vzc2FyeVxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7Vk5vZGV9IHZub2RlXG4gKiBAcGFyYW0ge2FueX0gW2NvbnRleHQgPSBudWxsXVxuICogQHJldHVybnMge1ZOb2RlIHwgYW55IHwgdW5kZWZpbmVkfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBleHBhbmRWTm9kZVRyZWUodm5vZGUsIGNvbnRleHQgPSBudWxsKSB7XG4gICAgbGV0IG5vZGU7XG4gICAgaWYgKCF2bm9kZSkgcmV0dXJuIG5vZGU7IC8vIG5vIG5vZGU/IG5vIHRyZWUhXG5cbiAgICBpZiAoISh2bm9kZSBpbnN0YW5jZW9mIFZOb2RlKSkgcmV0dXJuIHZub2RlOyAvLyBqdXN0IHJldHVybiBhcy1pczsgaXQncyBhIHRleHQgbm9kZSBvciBzb21ldGhpbmdcblxuICAgIG5vZGUgPSBuZXcgVk5vZGUoKTtcblxuICAgIGlmICh0eXBlb2Ygdm5vZGUudGFnID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIC8vIHNpbXBsZSB0YWcsIHNvIGp1c3QgY29weSBldmVyeXRoaW5nIGV4Y2VwdCBjaGlsZHJlbiAod2UnbGwgZG8gdGhhdCBuZWFyZXIgdGhlIGVuZClcbiAgICAgICAgbm9kZS5jb3B5RnJvbSh2bm9kZSwgeyBleGNlcHRDaGlsZHJlbjogdHJ1ZSB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBpcyB0aGUgdGFnIGEgQ29tcG9uZW50IENvbnN0cnVjdG9yP1xuICAgICAgICBpZiAoaXNGdW5jdGlvbkNvbXBvbmVudEN0b3Iodm5vZGUudGFnKSkge1xuICAgICAgICAgICAgLy8gaXQgaXMhIENvbnN0cnVjdCBpdCBzbyB0aGF0IHdlIGNhbiByZW5kZXIgaXQgLS0gT1IgcmV1c2UgdGhlIGV4aXN0aW5nIGNvbXBvbmVudFxuICAgICAgICAgICAgbGV0IGNvbXBvbmVudCA9IHZub2RlLl9jb21wb25lbnQgPyB2bm9kZS5fY29tcG9uZW50IDogUmVmbGVjdC5jb25zdHJ1Y3Qodm5vZGUudGFnLCBbdm5vZGUucHJvcHMsIG51bGwsIGNvbnRleHRdKTtcbiAgICAgICAgICAgIC8vIGRvIGxpZmVjeWxjZSBldmVudHM7IGZpcnN0IGNoZWNraW5nIGlmIHdlIHNob3VsZCB1cGRhdGVcbiAgICAgICAgICAgIGlmIChjb21wb25lbnQuc2hvdWxkQ29tcG9uZW50VXBkYXRlKCkpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiB3ZSBjYW4gdXBkYXRlLCBzZW5kIGluIHRoZSBrbm93biBwcm9wc1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudC5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKGNvbXBvbmVudC5wcm9wcywgY29udGV4dCk7XG4gICAgICAgICAgICAgICAgLy8gbm90aWZ5IHRoYXQgdGhlIGNvbXBvbmVudCB3aWxsIGJlIHVwZGF0aW5nIChyZW5kZXJpbmcpXG4gICAgICAgICAgICAgICAgY29tcG9uZW50LmNvbXBvbmVudFdpbGxVcGRhdGUoY29tcG9uZW50LnByb3BzLCBjb21wb25lbnQuc3RhdGUsIGNvbnRleHQpO1xuICAgICAgICAgICAgICAgIC8vIHJlbmRlciEgLS0gYW5kIHNhdmUgdGhlIHJlc3VsdHMgaW4gY2FzZSB3ZSBkb24ndCB3YW50IHRvIHJlbmRlciBpbiB0aGUgZnV0dXJlXG4gICAgICAgICAgICAgICAgbm9kZSA9IGNvbXBvbmVudC5fcHJldmlvdXNSZW5kZXIgPSBleHBhbmRWTm9kZVRyZWUoY29tcG9uZW50LnJlbmRlcihjb21wb25lbnQucHJvcHMsIG51bGwsIGNvbnRleHQpLCBjb250ZXh0KTtcbiAgICAgICAgICAgICAgICAvLyBhbmQgbm90aWZ5IHRoZSBjb21wb25lbnQgdGhhdCBpdCBkaWQgcmVuZGVyICh3aXRoIHByZXZpb3VzIHByb3BzKVxuICAgICAgICAgICAgICAgIGNvbXBvbmVudC5jb21wb25lbnREaWRVcGRhdGUoY29tcG9uZW50LnByb3BzLCBjb21wb25lbnQuc3RhdGUsIGNvbnRleHQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBjb21wb25lbnQgZGlkbid0IHdhbnQgdG8gcmVuZGVyOyByZXR1cm4gcHJldmlvdXMgcmVuZGVyIHJlc3VsdHNcbiAgICAgICAgICAgICAgICBub2RlID0gY29tcG9uZW50Ll9wcmV2aW91c1JlbmRlciB8fCBub2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdm5vZGUuX2NvbXBvbmVudCA9IGNvbXBvbmVudDtcbiAgICAgICAgICAgIGlmIChub2RlKSBub2RlLl9jb21wb25lbnQgPSBjb21wb25lbnQ7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZub2RlLnRhZyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAvLyB0aGUgdGFnIGlzIGEgc3RhdGVsZXNzIGNvbXBvbmVudFxuICAgICAgICAgICAgbm9kZSA9IGV4cGFuZFZOb2RlVHJlZSh2bm9kZS50YWcodm5vZGUucHJvcHMsIG51bGwsIGNvbnRleHQpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHVoIG9oOyBzb21ldGhpbmcncyBnb25lIHdyb25nIGFuZCB3ZSBkb24ndCBrbm93IHdoYXQgdG8gZG8gd2l0aFxuICAgICAgICAgICAgLy8gdGhlIHRhZyB3ZSByZWNlaXZlZC4gQ29tcGxhaW4hXG4gICAgICAgICAgICB0aHJvdyBuZXcgVW5rbm93blRhZ0Vycm9yKGBVbmtub3duIHRhZyBlbmNvdW50ZXJlZDogJHt2bm9kZS50YWd9YCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobm9kZSAmJiB2bm9kZS5jaGlsZHJlbiAmJiB2bm9kZS5jaGlsZHJlbi5sZW5ndGggJiYgdm5vZGUuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAvLyB3ZSBoYXZlIGNoaWxkcmVuLCBzbyB3ZSBuZWVkIHRvIGV4cGFuZCB0aGVtIHRvb1xuICAgICAgICBmb3IgKGxldCBjaGlsZCBvZiB2bm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgbm9kZS5jaGlsZHJlbi5wdXNoKGV4cGFuZFZOb2RlVHJlZShjaGlsZCwgY29udGV4dCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdGhlIHZub2RlIGhhcyBhIGtleSAtLSBtYWtlIHN1cmUgdGhlIG5vZGUgaGFzIGl0IHRvby5cbiAgICBpZiAodm5vZGUua2V5ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICBub2RlLmtleSA9IHZub2RlLmtleTtcbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9leHBhbmRWTm9kZVRyZWUuanMiLCJpbXBvcnQgVk5vZGUgZnJvbSBcIi4vVk5vZGUuanNcIjtcbmltcG9ydCBjdnRWTm9kZTJET00gZnJvbSBcIi4vY3Z0Vk5vZGUyRE9NLmpzXCI7XG5pbXBvcnQgY29weVByb3BzVG9FbGVtZW50IGZyb20gXCIuL3V0aWxzL2NvcHlQcm9wc1RvRWxlbWVudC5qc1wiO1xuaW1wb3J0IHJlbW92ZVByb3BzRnJvbUVsZW1lbnQgZnJvbSBcIi4vdXRpbHMvcmVtb3ZlUHJvcHNGcm9tRWxlbWVudC5qc1wiO1xuXG5pbXBvcnQgeyBVbmF0dGFjaGVkT3JUb3BMZXZlbERPTVJvb3RFcnJvciB9IGZyb20gXCIuL2Vycm9ycy5qc1wiO1xuXG4vKipcbiAqIENhbGwgYW55IHVuc3Vic2NyaWJlIGZ1bmN0aW9uc1xuICpcbiAqIEBwYXJhbSB7Vk5vZGV9IHZub2RlXG4gKi9cbmZ1bmN0aW9uIHVuU3ViKHZub2RlKSB7XG4gICAgaWYgKHZub2RlLl91bnN1YnNjcmliZXJzKSB7XG4gICAgICAgIGZvciAoY29uc3QgdW5TdWJGbiBvZiB2bm9kZS5fdW5zdWJzY3JpYmVycykge1xuICAgICAgICAgICAgdW5TdWJGbigpO1xuICAgICAgICB9XG4gICAgICAgIHZub2RlLl91bnN1YnNjcmliZXJzID0gbnVsbDtcbiAgICB9XG59XG5cbi8qKlxuICogUGVyZm9ybSBhIGRpZmYgb24gdGhlIG9sZCBhbmQgbmV3IHRyZWVzXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHtWTm9kZX0gb2xkUm9vdE5vZGVcbiAqIEBwYXJhbSB7Vk5vZGV9IG5ld1Jvb3ROb2RlXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50IHwgTm9kZX0gZG9tUm9vdFxuICogQHBhcmFtIHthbnl9IFtjb250ZXh0XVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkaWZmKG9sZFJvb3ROb2RlLCBuZXdSb290Tm9kZSwgZG9tUm9vdCwgY29udGV4dCkge1xuICAgIC8vIGlmIG9sZCBhbmQgbmV3IHRyZWVzIGFyZSB0aGUgc2FtZSByZWZlcmVuY2UsIGRvIG5vdGhpbmdcbiAgICBpZiAob2xkUm9vdE5vZGUgPT09IG5ld1Jvb3ROb2RlKSByZXR1cm47XG5cbiAgICBjb25zdCBkb21Sb290UGFyZW50ID0gZG9tUm9vdC5wYXJlbnROb2RlO1xuXG4gICAgLy8gaXQncyBwb3NzaWJsZSB3ZSB3b24ndCBiZSBhIHZub2RlIGF0IGFsbFxuICAgIGlmICghKG9sZFJvb3ROb2RlIGluc3RhbmNlb2YgVk5vZGUgJiYgbmV3Um9vdE5vZGUgaW5zdGFuY2VvZiBWTm9kZSkpIHtcbiAgICAgICAgaWYgKGRvbVJvb3RQYXJlbnQgJiYgb2xkUm9vdE5vZGUgIT09IG5ld1Jvb3ROb2RlKSB7XG4gICAgICAgICAgICBpZiAob2xkUm9vdE5vZGUuX2NvbXBvbmVudCAhPT0gbmV3Um9vdE5vZGUuX2NvbXBvbmVudCAmJiBvbGRSb290Tm9kZS5fY29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgb2xkUm9vdE5vZGUuX2NvbXBvbmVudC5jb21wb25lbnRXaWxsVW5tb3VudCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRvbVJvb3QgaW5zdGFuY2VvZiBUZXh0ICYmICEob2xkUm9vdE5vZGUgaW5zdGFuY2VvZiBWTm9kZSB8fCBuZXdSb290Tm9kZSBpbnN0YW5jZW9mIFZOb2RlKSkge1xuICAgICAgICAgICAgICAgIGRvbVJvb3QudGV4dENvbnRlbnQgPSBuZXdSb290Tm9kZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZG9tUm9vdFBhcmVudC5yZXBsYWNlQ2hpbGQoY3Z0Vk5vZGUyRE9NKG5ld1Jvb3ROb2RlKSwgZG9tUm9vdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBtZXJnZSA9IHRydWUsXG4gICAgICAgIG1lcmdlUHJvcHMgPSBmYWxzZTtcblxuICAgIC8vIHRhZ3MgYXJlIGRpZmZlcmVudCwgZG9uJ3QgYm90aGVyIG1lcmdpbmchXG4gICAgaWYgKG9sZFJvb3ROb2RlLnRhZyAhPT0gbmV3Um9vdE5vZGUudGFnKSBtZXJnZSA9IGZhbHNlO1xuXG4gICAgLy8gY29tcG9uZW50cyBhcmUgZGlmZmVyZW50LCBkb24ndCBtZXJnZVxuICAgIGlmIChvbGRSb290Tm9kZS5fY29tcG9uZW50ICE9PSBuZXdSb290Tm9kZS5fY29tcG9uZW50KSBtZXJnZSA9IGZhbHNlO1xuXG4gICAgLy8ga2V5cyBhcmUgZGlmZmVyZW50LCBkb24ndCBib3RoZXIgbWVyZ2luZyFcbiAgICAvLyBUT0RPOiB0aGlzIGlzbid0IGFjdHVhbGx5IHJpZ2h0LCBidXQgaXQnbGwgd29yayBmb3IgdGhlIGRpZmYgY2FzZSBmb3Igbm93XG4gICAgaWYgKG9sZFJvb3ROb2RlLmtleSAhPT0gbmV3Um9vdE5vZGUua2V5KSBtZXJnZSA9IGZhbHNlO1xuXG4gICAgLy8gZGV0ZWN0IGlmIGFueSBwcm9wcyBhcmUgZGlmZmVyZW50IGFjcm9zcyBib3RoIG5vZGVzIGFuZCBmbGFnIGlmIHdlIG5lZWRcbiAgICAvLyB0byBtZXJnZSBwcm9wc1xuICAgIGZvciAoY29uc3QgW25vZGVBLCBub2RlQl0gb2YgW1tvbGRSb290Tm9kZSwgbmV3Um9vdE5vZGVdLCBbbmV3Um9vdE5vZGUsIG9sZFJvb3ROb2RlXV0pIHtcbiAgICAgICAgZm9yIChjb25zdCBbaywgdl0gb2YgT2JqZWN0LmVudHJpZXMobm9kZUEucHJvcHMgfHwge30pKSB7XG4gICAgICAgICAgICBpZiAobm9kZUJba10gIT09IHYpIHtcbiAgICAgICAgICAgICAgICBtZXJnZVByb3BzID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmICghbWVyZ2UpIHtcbiAgICAgICAgLy8gZWFzeSEgcmVuZGVyIHRoZSBuZXcgcm9vdCBub2RlIGFuZCByZXBsYWNlIGl0IGluIHRoZSBET01cbiAgICAgICAgY29uc3QgZWwgPSBjdnRWTm9kZTJET00obmV3Um9vdE5vZGUpO1xuXG4gICAgICAgIGlmIChvbGRSb290Tm9kZS5fY29tcG9uZW50ICE9PSBuZXdSb290Tm9kZS5fY29tcG9uZW50ICYmIG9sZFJvb3ROb2RlLl9jb21wb25lbnQpIHtcbiAgICAgICAgICAgIG9sZFJvb3ROb2RlLl9jb21wb25lbnQuY29tcG9uZW50V2lsbFVubW91bnQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHVuU3ViKG9sZFJvb3ROb2RlKTtcblxuICAgICAgICBuZXdSb290Tm9kZS5fZG9tTm9kZSA9IGVsO1xuICAgICAgICBpZiAobmV3Um9vdE5vZGUuX2NvbXBvbmVudCkge1xuICAgICAgICAgICAgbmV3Um9vdE5vZGUuX2NvbXBvbmVudC5fZG9tTm9kZSA9IGVsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRvbVJvb3RQYXJlbnQpIHtcbiAgICAgICAgICAgIGRvbVJvb3RQYXJlbnQucmVwbGFjZUNoaWxkKGVsLCBkb21Sb290KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGVpdGhlciBpc24ndCBhdHRhY2hlZCB0byB0aGUgRE9NIE9SIGlzIGEgdG9wLWxldmVsIERPTVxuICAgICAgICAgICAgLy8gZWxlbWVudCwgd2hpY2ggd2UgZG9uJ3Qgc3VwcG9ydFxuICAgICAgICAgICAgdGhyb3cgbmV3IFVuYXR0YWNoZWRPclRvcExldmVsRE9NUm9vdEVycm9yKFwiVW5hdHRhY2hlZCBvciBUb3AgTGV2ZWwgRE9NIFJvb3QgLS0gY2FuJ3QgZmluZCBhIHBhcmVudCBub2RlLlwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGJ1dCB3ZSBhbHNvIG5lZWQgdG8gdW5zdWIgYW55IGV2ZW50IGxpc3RlbmVyc1xuICAgICAgICB1blN1YihvbGRSb290Tm9kZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZGYgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgIC8vIHRoZSBlbGVtZW50cyBhcmUgbWVyZ2VhYmxlLCBzbyBtZXJnZSB3aGF0IHdlIGNhbiBhbmQgdGhlbiB0cmF2ZXJzZSB0aGUgY2hpbGRyZW4uXG4gICAgICAgIGlmIChtZXJnZVByb3BzKSB7XG4gICAgICAgICAgICAvLyB1bndpcmUgYW55IGV2ZW50IGxpc3RlbmVycyBvbiB0aGUgb2xkIG5vZGVcbiAgICAgICAgICAgIHVuU3ViKG9sZFJvb3ROb2RlKTtcblxuICAgICAgICAgICAgLy8gdGhlbiwgd2UgbmVlZCB0byBzZWUgd2hhdCBwcm9wcyBuZWVkIHRvIGJlIHJlbW92ZWRcbiAgICAgICAgICAgIGNvbnN0IHByb3BzVG9CZVJlbW92ZWQgPSB7fTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgW2ssIHZdIG9mIE9iamVjdC5lbnRyaWVzKG5ld1Jvb3ROb2RlLnByb3BzIHx8IHt9KSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb2xkUm9vdE5vZGVba10gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvcHNUb0JlUmVtb3ZlZFtrXSA9IHY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRvbVJvb3QgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHJlbW92ZVByb3BzRnJvbUVsZW1lbnQoZG9tUm9vdCwgcHJvcHNUb0JlUmVtb3ZlZCk7XG4gICAgICAgICAgICAgICAgLy8gbmV4dCwgY29weSBpbiBuZXcgYW5kIG1vZGlmaWVkIHByb3BzXG4gICAgICAgICAgICAgICAgbmV3Um9vdE5vZGUuX3Vuc3Vic2NyaWJlcnMgPSBjb3B5UHJvcHNUb0VsZW1lbnQoZG9tUm9vdCwgbmV3Um9vdE5vZGUucHJvcHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9sZFJvb3ROb2RlLl9jb21wb25lbnQgPT09IG5ld1Jvb3ROb2RlLl9jb21wb25lbnQgJiYgbWVyZ2VQcm9wcyAmJiBuZXdSb290Tm9kZS5fY29tcG9uZW50KSB7XG4gICAgICAgICAgICBuZXdSb290Tm9kZS5fY29tcG9uZW50LmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV3Um9vdE5vZGUucHJvcHMsIGNvbnRleHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbWFrZSBzdXJlIHRoZSBuZXcgdm5vZGUgaGFzIHRoZSBpbi1ET00gZWxlbWVudFxuICAgICAgICBuZXdSb290Tm9kZS5fZG9tTm9kZSA9IGRvbVJvb3Q7XG5cbiAgICAgICAgLy8gYW5kIGNvbnRpbnVlIHdpdGggb3VyIGNoaWxkcmVuXG4gICAgICAgIC8vIFRPRE86IHdpbGwgd2UgYmUgdGhyYXNoaW5nIHRoZSBET00gYSBsb3Q/XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gTWF0aC5taW4ob2xkUm9vdE5vZGUuY2hpbGRyZW4ubGVuZ3RoLCBuZXdSb290Tm9kZS5jaGlsZHJlbi5sZW5ndGgpOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBkaWZmKG9sZFJvb3ROb2RlLmNoaWxkcmVuW2ldLCBuZXdSb290Tm9kZS5jaGlsZHJlbltpXSwgZG9tUm9vdC5jaGlsZE5vZGVzLml0ZW0oaSksIGNvbnRleHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYWRkIG5ldyBjaGlsZHJlblxuICAgICAgICBmb3IgKGxldCBpID0gb2xkUm9vdE5vZGUuY2hpbGRyZW4ubGVuZ3RoLCBsID0gbmV3Um9vdE5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBkZi5hcHBlbmRDaGlsZChjdnRWTm9kZTJET00obmV3Um9vdE5vZGUuY2hpbGRyZW5baV0pKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGYuaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgICAgICAgICBkb21Sb290LmFwcGVuZENoaWxkKGRmKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFuZCByZW1vdmUgYW55IGNoaWxkcmVuIHRoYXQgc2hvdWxkbid0IGV4aXN0XG4gICAgICAgIGZvciAobGV0IGkgPSBuZXdSb290Tm9kZS5jaGlsZHJlbi5sZW5ndGgsIGwgPSBvbGRSb290Tm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkID0gb2xkUm9vdE5vZGUuY2hpbGRyZW5baV07XG4gICAgICAgICAgICBpZiAoY2hpbGQuX2NvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgIGNoaWxkLl9jb21wb25lbnQuY29tcG9uZW50V2lsbFVubW91bnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHVuU3ViKGNoaWxkKTtcbiAgICAgICAgICAgIGRvbVJvb3QucmVtb3ZlQ2hpbGQoY2hpbGQuX2RvbU5vZGUpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2RpZmYuanMiLCJpbXBvcnQgaXNBdHRyaWJ1dGUgZnJvbSBcIi4vaXNBdHRyaWJ1dGUuanNcIjtcbmltcG9ydCBpc09uRXZlbnQgZnJvbSBcIi4vaXNPbkV2ZW50LmpzXCI7XG5cbmZ1bmN0aW9uIGRlZXBDb3B5UHJvcHMob2JqLCBwcm9wcykge1xuICAgIGZvciAoY29uc3QgW2ssIHZdIG9mIE9iamVjdC5lbnRyaWVzKHByb3BzKSkge1xuICAgICAgICBpZiAob2JqW2tdICYmIG9ialtrXSBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICAgICAgZGVlcENvcHlQcm9wcyhvYmpba10sIHYpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb2JqW2tdID0gdjtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBjb3BpZXMgdGhlIHByb3BlcnRpZXMgaW4gcHJvcHMgdG8gdGhlIG5vZGUgYW5kIHJldHVybnMgdW5zdWJzY3JpYmVyIGZ1bmN0aW9uc1xuICogZm9yIGFueSBldmVudCBoYW5kbGVycyB0aGF0IHdlcmUgY3JlYXRlZFxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKiBAcGFyYW0ge2FueX0gW3Byb3BzPXt9XVxuICogQHJldHVybnMge2Z1bmN0aW9uW119XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvcHlQcm9wc1RvRWxlbWVudChlbCwgcHJvcHMgPSB7fSkge1xuICAgIGNvbnN0IGV2ZW50VW5zdWJzY3JpYmVycyA9IFtdO1xuXG4gICAgaWYgKCFlbCkgcmV0dXJuIGV2ZW50VW5zdWJzY3JpYmVycztcblxuICAgIGlmICghcHJvcHMpIHJldHVybiBldmVudFVuc3Vic2NyaWJlcnM7XG5cbiAgICBmb3IgKGNvbnN0IFtrLCB2XSBvZiBPYmplY3QuZW50cmllcyhwcm9wcykpIHtcbiAgICAgICAgaWYgKGsgPT09IFwia2V5XCIpIHtcbiAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZShcImRhdGEta2V5XCIsIHYpO1xuICAgICAgICB9IGVsc2UgaWYgKGsgPT09IFwic3R5bGVcIikge1xuICAgICAgICAgICAgLy8gc3R5bGVzIGFyZSBzcGVjaWFsIVxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgLy8gdHJlYXQgaXQgbGlrZSBzZXR0aW5nIGFuIGF0dHJpYnV0ZVxuICAgICAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZShrLCB2KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gY29weSBpbiB0aGUgc3R5bGUgdmFsdWVzXG4gICAgICAgICAgICAgICAgZGVlcENvcHlQcm9wcyhlbC5zdHlsZSwgdik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoaXNPbkV2ZW50KGspKSB7XG4gICAgICAgICAgICAvLyBldmVudCBoYW5kbGVyXG4gICAgICAgICAgICBjb25zdCBldmVudE5hbWUgPSBrLnN1YnN0cigyKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIHYpO1xuICAgICAgICAgICAgZXZlbnRVbnN1YnNjcmliZXJzLnB1c2goKCkgPT4gZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIHYpKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0F0dHJpYnV0ZShrKSkge1xuICAgICAgICAgICAgLy8gYXR0cmlidXRlXG4gICAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoaywgdik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBvYmplY3QgcHJvcGVydHlcbiAgICAgICAgICAgIGVsW2tdID0gdjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBldmVudFVuc3Vic2NyaWJlcnM7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbHMvY29weVByb3BzVG9FbGVtZW50LmpzIiwiaW1wb3J0IEFUVFJJQlVURVMgZnJvbSBcIi4uL2NvbnN0YW50cy9hdHRyaWJ1dGVzLmpzXCI7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgc3RyaW5nIHZhbHVlLCBjLCBpcyBhbiBIVE1MIGF0dHJpYnV0ZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBbYz1cIlwiXVxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzQXR0cmlidXRlKGMgPSBcIlwiKSB7XG4gICAgbGV0IGxvd2VyQyA9IGMudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAobG93ZXJDLnN1YnN0cigwLCA1KSA9PT0gXCJkYXRhLVwiKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gQVRUUklCVVRFUy5pbmRleE9mKGxvd2VyQykgPiAtMTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlscy9pc0F0dHJpYnV0ZS5qcyIsImltcG9ydCBpc0V2ZW50IGZyb20gXCIuL2lzRXZlbnQuanNcIjtcblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIHRoZSBjYW5kaWRhdGUgc3RyaW5nIHJlcHJlc2VudHMgYW4gb24gZXZlbnQsIGFzIGluIFwib250b3VjaHN0YXJ0XCJcbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0ge3N0cmluZ30gW2M9XCJcIl1cbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc09uRXZlbnQoYyA9IFwiXCIpIHtcbiAgICBpZiAoY1swXSA9PT0gXCJvXCIgJiYgY1sxXSA9PT0gXCJuXCIpIHtcbiAgICAgICAgLy8gaXQncyBnb3QgY2hhbmNlIVxuICAgICAgICAvLyB3ZSBuZWVkIHRvIHN1cHBvcnQgb25DbGljayBieSB0cmFuc2Zvcm1pbmcgdG8gb25jbGlja1xuICAgICAgICAvLyBidXQgd2UgYWxzbyBuZWVkIG9uRE9NQ29udGVudExvYWRlZCB0byB3b3JrLCBzbyB0ZXN0IHdpdGhvdXQgdGhlIGxvd2VyY2FzZSBhcyB3ZWxsXG4gICAgICAgIC8vIHllcywgaGFja3khXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBpc0V2ZW50KGNbMl0udG9Mb3dlckNhc2UoKSArIGMuc3Vic3RyKDMpKSB8fCBpc0V2ZW50KGMuc3Vic3RyKDIpKVxuICAgICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbHMvaXNPbkV2ZW50LmpzIiwiZXhwb3J0IGNsYXNzIEFic3RyYWN0TWV0aG9kRXJyb3IgZXh0ZW5kcyBFcnJvciB7fVxuZXhwb3J0IGNsYXNzIFVua25vd25UYWdFcnJvciBleHRlbmRzIEVycm9yIHt9XG5leHBvcnQgY2xhc3MgVW5hdHRhY2hlZE9yVG9wTGV2ZWxET01Sb290RXJyb3IgZXh0ZW5kcyBFcnJvciB7fVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Vycm9ycy5qcyIsImltcG9ydCBDb21wb25lbnQgZnJvbSBcIi4vc3JjL0NvbXBvbmVudC5qc1wiO1xuaW1wb3J0IGNyZWF0ZUVsZW1lbnQgZnJvbSBcIi4vc3JjL2NyZWF0ZUVsZW1lbnQuanNcIjtcbmltcG9ydCBjdnRWTm9kZTJET00gZnJvbSBcIi4vc3JjL2N2dFZOb2RlMkRPTS5qc1wiO1xuaW1wb3J0IGV4cGFuZFZOb2RlVHJlZSBmcm9tIFwiLi9zcmMvZXhwYW5kVk5vZGVUcmVlLmpzXCI7XG5pbXBvcnQgZGlmZiBmcm9tIFwiLi9zcmMvZGlmZi5qc1wiO1xuaW1wb3J0IHJlbmRlciBmcm9tIFwiLi9zcmMvcmVuZGVyLmpzXCI7XG5cbmV4cG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIGNyZWF0ZUVsZW1lbnQsXG4gICAgcmVuZGVyLFxuICAgIC8qIHRoaW5ncyB0aGF0IGFyZSBzdXBwb3NlZCB0byBiZSB0ZW1wb3JhcnkgZm9yIG5vdyAqL1xuICAgIGV4cGFuZFZOb2RlVHJlZSxcbiAgICBjdnRWTm9kZTJET00sXG4gICAgZGlmZixcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9pbmRleC5qcyIsImltcG9ydCBkaWZmIGZyb20gXCIuL2RpZmYuanNcIjtcbmltcG9ydCBWTm9kZSBmcm9tIFwiLi9WTm9kZS5qc1wiO1xuaW1wb3J0IGV4cGFuZFZOb2RlVHJlZSBmcm9tIFwiLi9leHBhbmRWTm9kZVRyZWUuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyA9IHt9LCBjb250ZXh0ID0ge30pIHtcbiAgICAgICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgICAgICB0aGlzLnN0YXRlID0ge307XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG5cbiAgICAgICAgLyogcHJpdmF0ZS1pc2ggcHJvcGVydGllcyAqL1xuICAgICAgICB0aGlzLl9kaXJ0eSA9IHRydWU7XG4gICAgICAgIHRoaXMuX21vdW50ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZG9tTm9kZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX3ByZXZpb3VzUmVuZGVyID0gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7YW55fSBbcHJvcHNdXG4gICAgICogQHBhcmFtIHthbnl9IFtzdGF0ZV1cbiAgICAgKiBAcGFyYW0ge2FueX0gW2NvbnRleHRdXG4gICAgICogQHJldHVybnMge1ZOb2RlfVxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRcbiAgICAgKi9cbiAgICByZW5kZXIocHJvcHMsIHN0YXRlLCBjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiBuZXcgVk5vZGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzZXRzIHRoZSBjb21wb25lbnQncyBuZXcgc3RhdGUgYW5kIGVucXVldWVzIGEgcmVuZGVyaW5nIHBhc3NcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7YW55fGZ1bmN0aW9ufSBuZXdTdGF0ZVxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRcbiAgICAgKi9cbiAgICBzZXRTdGF0ZShuZXdTdGF0ZSkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZSA9PT0gbmV3U3RhdGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2RpcnR5ID0gdHJ1ZTtcblxuICAgICAgICBsZXQgbmV4dFN0YXRlID0gbmV3U3RhdGU7XG4gICAgICAgIGNvbnN0IHByZXZTdGF0ZSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc3RhdGUpLFxuICAgICAgICAgICAgcHJldlByb3BzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wcm9wcyksXG4gICAgICAgICAgICBwcmV2Q29udGV4dCA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuY29udGV4dCk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBuZXdTdGF0ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBuZXh0U3RhdGUgPSBuZXdTdGF0ZShwcmV2U3RhdGUsIHRoaXMucHJvcHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc3RhdGUsIG5leHRTdGF0ZSk7XG5cbiAgICAgICAgLy8gdHJpZ2dlciBhIHJlbmRlciBhdCB0aGUgbmV4dCBmcmFtZVxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICAgIGxldCByZW5kZXJpbmcgPSB0aGlzLl9wcmV2aW91c1JlbmRlcjtcbiAgICAgICAgICAgIGlmICh0aGlzLnNob3VsZENvbXBvbmVudFVwZGF0ZSh0aGlzLnByb3BzLCB0aGlzLnN0YXRlLCB0aGlzLmNvbnRleHQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21wb25lbnRXaWxsVXBkYXRlKHRoaXMucHJvcHMsIHRoaXMuc3RhdGUsIHRoaXMuY29udGV4dCk7XG4gICAgICAgICAgICAgICAgcmVuZGVyaW5nID0gZXhwYW5kVk5vZGVUcmVlKHRoaXMucmVuZGVyKHRoaXMucHJvcHMsIHRoaXMuc3RhdGUsIHRoaXMuY29udGV4dCksIHRoaXMuY29udGV4dCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUsIHByZXZDb250ZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlbmRlcmluZy5fY29tcG9uZW50ID0gdGhpcztcbiAgICAgICAgICAgIGRpZmYodGhpcy5fcHJldmlvdXNSZW5kZXIsIHJlbmRlcmluZywgdGhpcy5fZG9tTm9kZSwgdGhpcy5jb250ZXh0KTtcbiAgICAgICAgICAgIHRoaXMuX3ByZXZpb3VzUmVuZGVyID0gcmVuZGVyaW5nO1xuICAgICAgICAgICAgdGhpcy5fZGlydHkgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lIHdoZXRoZXIgb3Igbm90IHRoZSBjb21wb25lbnQgc2hvdWxkIHVwZGF0ZS4gSWYgYGZhbHNlYCBpc1xuICAgICAqIHJldHVybmVkLCB0aGUgY29tcG9uZW50IG1heSBub3QgYmUgdXBkYXRlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7YW55fSBuZXh0UHJvcHNcbiAgICAgKiBAcGFyYW0ge2FueX0gbmV4dFN0YXRlXG4gICAgICogQHBhcmFtIHthbnl9IG5leHRDb250ZXh0XG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50XG4gICAgICovXG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlLCBuZXh0Q29udGV4dCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlydHk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmlyZXMgYmVmb3JlIHRoZSBjb21wb25lbnQgaXMgb2ZmaWNpYWxseSBhZGRlZCB0byB0aGUgRE9NLiAoSW4gb3VyIGNhc2UsXG4gICAgICogaXQncyBhbHJlYWR5IHRoZXJlLCBidXQgdGhlIGNvbXBvbmVudCBkb2Vzbid0IGtub3cgdGhhdClcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBDb21wb25lbnRcbiAgICAgKi9cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7fVxuXG4gICAgLyoqXG4gICAgICogRmlyZXMgYWZ0ZXIgdGhlIGNvbXBvbmVudCBpcyBvZmZpY2lhbGx5IGFkZGVkIHRvIHRoZSBET00uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50XG4gICAgICovXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7fVxuXG4gICAgLyoqXG4gICAgICogRmlyZXMgYmVmb3JlIGEgY29tcG9uZW50IGlzIHJlbW92ZWQgZnJvbSB0aGUgRE9NLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudFxuICAgICAqL1xuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge31cblxuICAgIC8qKlxuICAgICAqIEZpcmVzIHdoZW4gYSBjb21wb25lbnQgcmVjZWl2ZXMgbmV3IHByb3BzXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2FueX0gbmV4dFByb3BzXG4gICAgICogQHBhcmFtIHthbnl9IG5leHRDb250ZXh0XG4gICAgICogQG1lbWJlcm9mIENvbXBvbmVudFxuICAgICAqL1xuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzLCBuZXh0Q29udGV4dCkge1xuICAgICAgICB0aGlzLnByb3BzID0gbmV4dFByb3BzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxlZCBiZWZvcmUgdGhlIGNvbXBvbmVudCBpcyBhYm91dCB0byBiZSByZW5kZXJlZFxuICAgICAqXG4gICAgICogQHBhcmFtIHthbnl9IG5leHRQcm9wc1xuICAgICAqIEBwYXJhbSB7YW55fSBuZXh0U3RhdGVcbiAgICAgKiBAcGFyYW0ge2FueX0gbmV4dENvbnRleHRcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50XG4gICAgICovXG4gICAgY29tcG9uZW50V2lsbFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSwgbmV4dENvbnRleHQpIHt9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgYWZ0ZXIgdGhlIGNvbXBvbmVudCBoYXMgYmVlbiByZW5kZXJlZFxuICAgICAqXG4gICAgICogQHBhcmFtIHthbnl9IHByZXZQcm9wc1xuICAgICAqIEBwYXJhbSB7YW55fSBwcmV2U3RhdGVcbiAgICAgKiBAcGFyYW0ge2FueX0gcHJldkNvbnRleHRcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50XG4gICAgICovXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlLCBwcmV2Q29udGV4dCkge31cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9Db21wb25lbnQuanMiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmbGF0dGVuKC4uLml0ZW1zKSB7XG4gICAgbGV0IGFyciA9IFtdO1xuICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGlmIChpdGVtIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIGFyciA9IGFyci5jb25jYXQoZmxhdHRlbiguLi5pdGVtKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhcnIucHVzaChpdGVtKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBhcnI7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbHMvZmxhdHRlbi5qcyIsIi8qIGZyb206IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0hUTUwvQXR0cmlidXRlcyAqL1xuZXhwb3J0IGRlZmF1bHQgW1xuICAgIFwiYWNjZXB0XCIsXG4gICAgXCJhY2NlcHQtY2hhcnNldFwiLFxuICAgIFwiYWNjZXNza2V5XCIsXG4gICAgXCJhY3Rpb25cIixcbiAgICBcImFsaWduXCIsXG4gICAgXCJhbHRcIixcbiAgICBcImFzeW5jXCIsXG4gICAgXCJhdXRvY29tcGxldGVcIixcbiAgICBcImF1dG9mb2N1c1wiLFxuICAgIFwiYXV0b3BsYXlcIixcbiAgICBcImF1dG9zYXZlXCIsXG4gICAgXCJiZ2NvbG9yXCIsXG4gICAgXCJib3JkZXJcIixcbiAgICBcImJ1ZmZlcmVkXCIsXG4gICAgXCJjaGFsbGVuZ2VcIixcbiAgICBcImNoYXJzZXRcIixcbiAgICBcImNoZWNrZWRcIixcbiAgICBcImNpdGVcIixcbiAgICBcImNsYXNzXCIsXG4gICAgXCJjb2RlXCIsXG4gICAgXCJjb2RlYmFzZVwiLFxuICAgIFwiY29sb3JcIixcbiAgICBcImNvbHNcIixcbiAgICBcImNvbHNwYW5cIixcbiAgICBcImNvbnRlbnRcIixcbiAgICBcImNvbnRlbnRlZGl0YWJsZVwiLFxuICAgIFwiY29udGV4dG1lbnVcIixcbiAgICBcImNvbnRyb2xzXCIsXG4gICAgXCJjb29yZHNcIixcbiAgICBcImNyb3Nzb3JpZ2luXCIsXG4gICAgXCJkYXRhXCIsXG4gICAgXCJkYXRldGltZVwiLFxuICAgIFwiZGVmYXVsdFwiLFxuICAgIFwiZGVmZXJcIixcbiAgICBcImRpclwiLFxuICAgIFwiZGlybmFtZVwiLFxuICAgIFwiZGlzYWJsZWRcIixcbiAgICBcImRvd25sb2FkXCIsXG4gICAgXCJkcmFnZ2FibGVcIixcbiAgICBcImRyb3B6b25lXCIsXG4gICAgXCJlbmN0eXBlXCIsXG4gICAgXCJmb3JcIixcbiAgICBcImZvcm1cIixcbiAgICBcImZvcm1hY3Rpb25cIixcbiAgICBcImhlYWRlcnNcIixcbiAgICBcImhlaWdodFwiLFxuICAgIFwiaGlkZGVuXCIsXG4gICAgXCJoaWdoXCIsXG4gICAgXCJocmVmXCIsXG4gICAgXCJocmVmbGFuZ1wiLFxuICAgIFwiaHR0cC1lcXVpdlwiLFxuICAgIFwiaWNvblwiLFxuICAgIFwiaWRcIixcbiAgICBcImludGVncml0eVwiLFxuICAgIFwiaXNtYXBcIixcbiAgICBcIml0ZW1wcm9wXCIsXG4gICAgXCJrZXl0eXBlXCIsXG4gICAgXCJraW5kXCIsXG4gICAgXCJsYWJlbFwiLFxuICAgIFwibGFuZ1wiLFxuICAgIFwibGFuZ3VhZ2VcIixcbiAgICBcImxpc3RcIixcbiAgICBcImxvb3BcIixcbiAgICBcImxvd1wiLFxuICAgIFwibWFuaWZlc3RcIixcbiAgICBcIm1heFwiLFxuICAgIFwibWF4bGVuZ3RoXCIsXG4gICAgXCJtaW5sZW5ndGhcIixcbiAgICBcIm1lZGlhXCIsXG4gICAgXCJtZXRob2RcIixcbiAgICBcIm1pblwiLFxuICAgIFwibXVsdGlwbGVcIixcbiAgICBcIm11dGVkXCIsXG4gICAgXCJuYW1lXCIsXG4gICAgXCJub3ZhbGlkYXRlXCIsXG4gICAgXCJvcGVuXCIsXG4gICAgXCJvcHRpbXVtXCIsXG4gICAgXCJwYXR0ZXJuXCIsXG4gICAgXCJwaW5nXCIsXG4gICAgXCJwbGFjZWhvbGRlclwiLFxuICAgIFwicG9zdGVyXCIsXG4gICAgXCJwcmVsb2FkXCIsXG4gICAgXCJyYWRpb2dyb3VwXCIsXG4gICAgXCJyZWFkb25seVwiLFxuICAgIFwicmVsXCIsXG4gICAgXCJyZXF1aXJlZFwiLFxuICAgIFwicmV2ZXJzZWRcIixcbiAgICBcInJvd3NcIixcbiAgICBcInJvd3NwYW5cIixcbiAgICBcInNhbmRib3hcIixcbiAgICBcInNjb3BlXCIsXG4gICAgXCJzY29wZWRcIixcbiAgICBcInNlYW1sZXNzXCIsXG4gICAgXCJzZWxlY3RlZFwiLFxuICAgIFwic2hhcGVcIixcbiAgICBcInNpemVcIixcbiAgICBcInNpemVzXCIsXG4gICAgXCJzbG90XCIsXG4gICAgXCJzcGFuXCIsXG4gICAgXCJzcGVsbGNoZWNrXCIsXG4gICAgXCJzcmNcIixcbiAgICBcInNyY2RvY1wiLFxuICAgIFwic3JjbGFuZ1wiLFxuICAgIFwic3Jjc2V0XCIsXG4gICAgXCJzdGFydFwiLFxuICAgIFwic3RlcFwiLFxuICAgIFwic3R5bGVcIixcbiAgICBcInN1bW1hcnlcIixcbiAgICBcInRhYmluZGV4XCIsXG4gICAgXCJ0YXJnZXRcIixcbiAgICBcInRpdGxlXCIsXG4gICAgXCJ0eXBlXCIsXG4gICAgXCJ1c2VtYXBcIixcbiAgICBcInZhbHVlXCIsXG4gICAgXCJ3aWR0aFwiLFxuICAgIFwid3JhcFwiLFxuXTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb25zdGFudHMvYXR0cmlidXRlcy5qcyIsImltcG9ydCBFVkVOVFMgZnJvbSBcIi4uL2NvbnN0YW50cy9ldmVudHMuanNcIjtcblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIHRoZSBjYW5kaWRhdGUgaXMgYW4gSFRNTCBldmVudFxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBbYz1cIlwiXVxuICogQHJldHVybnMgIHtib29sZWFufVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc0V2ZW50KGMgPSBcIlwiKSB7XG4gICAgcmV0dXJuIEVWRU5UUy5pbmRleE9mKGMpID4gLTE7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbHMvaXNFdmVudC5qcyIsIi8qIGZyb20gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvRXZlbnRzICovXG5leHBvcnQgZGVmYXVsdCBbXG4gICAgXCJhYm9ydFwiLFxuICAgIFwiYWZ0ZXJwcmludFwiLFxuICAgIFwiYW5pbWF0aW9uZW5kXCIsXG4gICAgXCJhbmltYXRpb25pdGVyYXRpb25cIixcbiAgICBcImFuaW1hdGlvbnN0YXJ0XCIsXG4gICAgXCJhcHBpbnN0YWxsZWRcIixcbiAgICBcImF1ZGlvcHJvY2Vzc1wiLFxuICAgIFwiYXVkaW9lbmRcIixcbiAgICBcImF1ZGlvc3RhcnRcIixcbiAgICBcImJlZm9yZXByaW50XCIsXG4gICAgXCJiZWZvcmV1bmxvYWRcIixcbiAgICBcImJlZ2luRXZlbnRcIixcbiAgICBcImJsb2NrZWRcIixcbiAgICBcImJsdXJcIixcbiAgICBcImJvdW5kYXJ5XCIsXG4gICAgXCJjYWNoZWRcIixcbiAgICBcImNhbnBsYXlcIixcbiAgICBcImNhbnBsYXl0aHJvdWdoXCIsXG4gICAgXCJjaGFuZ2VcIixcbiAgICBcImNoYXJnaW5nY2hhbmdlXCIsXG4gICAgXCJjaGFyZ2luZ3RpbWVjaGFuZ2VcIixcbiAgICBcImNoZWNraW5nXCIsXG4gICAgXCJjbGlja1wiLFxuICAgIFwiY2xvc2VcIixcbiAgICBcImNvbXBsZXRlXCIsXG4gICAgXCJjb21wb3NpdGlvbmVuZFwiLFxuICAgIFwiY29tcG9zaXRpb25zdGFydFwiLFxuICAgIFwiY29tcG9zaXRpb251cGRhdGVcIixcbiAgICBcImNvbnRleHRtZW51XCIsXG4gICAgXCJjb3B5XCIsXG4gICAgXCJjdXRcIixcbiAgICBcImRibGNsaWNrXCIsXG4gICAgXCJkZXZpY2VjaGFuZ2VcIixcbiAgICBcImRldmljZWxpZ2h0XCIsXG4gICAgXCJkZXZpY2Vtb3Rpb25cIixcbiAgICBcImRldmljZW9yaWVudGF0aW9uXCIsXG4gICAgXCJkZXZpY2Vwcm94aW1pdHlcIixcbiAgICBcImRpc2NoYXJnaW5ndGltZVwiLFxuICAgIFwiRE9NQWN0aXZhdGVcIixcbiAgICBcIkRPTUF0dHJpYnV0ZU5hbWVDaGFuZ2VkXCIsXG4gICAgXCJET01BdHRyTW9kaWZpZWRcIixcbiAgICBcIkRPTUNoYXJhY3RlckRhdGFNb2RpZmllZFwiLFxuICAgIFwiRE9NQ29udGVudExvYWRlZFwiLFxuICAgIFwiRE9NRWxlbWVudE5hbWVDaGFuZ2VkXCIsXG4gICAgXCJET01Gb2N1c0luXCIsXG4gICAgXCJET01Gb2N1c091dFwiLFxuICAgIFwiRE9NTm9kZUluc2VydGVkXCIsXG4gICAgXCJET01Ob2RlSW5zZXJ0ZWRJbnRvRG9jdW1lbnRcIixcbiAgICBcIkRPTU5vZGVSZW1vdmVkXCIsXG4gICAgXCJET01Ob2RlUmVtb3ZlZEZyb21Eb2N1bWVudFwiLFxuICAgIFwiRE9NU3VidHJlZU1vZGlmaWVkXCIsXG4gICAgXCJkb3dubG9hZGluZ1wiLFxuICAgIFwiZHJhZ1wiLFxuICAgIFwiZHJhZ2VuZFwiLFxuICAgIFwiZHJhZ2VudGVyXCIsXG4gICAgXCJkcmFnbGVhdmVcIixcbiAgICBcImRyYWdvdmVyXCIsXG4gICAgXCJkcmFnc3RhcnRcIixcbiAgICBcImRyb3BcIixcbiAgICBcImR1cmF0aW9uY2hhbmdlXCIsXG4gICAgXCJlbXB0aWVkXCIsXG4gICAgXCJlbmRcIixcbiAgICBcImVuZGVkXCIsXG4gICAgXCJlbmRFdmVudFwiLFxuICAgIFwiZXJyb3JcIixcbiAgICBcImZvY3VzXCIsXG4gICAgXCJmb2N1c2luXCIsXG4gICAgXCJmb2N1c291dFwiLFxuICAgIFwiZnVsbHNjcmVlbmNoYW5nZVwiLFxuICAgIFwiZnVsbHNjcmVlbmVycm9yXCIsXG4gICAgXCJnYW1lcGFkY29ubmVjdGVkXCIsXG4gICAgXCJnYW1lcGFkZGlzY29ubmVjdGVkXCIsXG4gICAgXCJnb3Rwb2ludGVyY2FwdHVyZVwiLFxuICAgIFwiaGFzaGNoYW5nZVwiLFxuICAgIFwibG9zdHBvaW50ZXJjYXB0dXJlXCIsXG4gICAgXCJpbnB1dFwiLFxuICAgIFwiaW52YWxpZFwiLFxuICAgIFwia2V5ZG93blwiLFxuICAgIFwia2V5cHJlc3NcIixcbiAgICBcImtleXVwXCIsXG4gICAgXCJsYW5ndWFnZWNoYW5nZVwiLFxuICAgIFwibGV2ZWxjaGFuZ2VcIixcbiAgICBcImxvYWRcIixcbiAgICBcImxvYWRlZGRhdGFcIixcbiAgICBcImxvYWRlZG1ldGFkYXRhXCIsXG4gICAgXCJsb2FkZW5kXCIsXG4gICAgXCJsb2Fkc3RhcnRcIixcbiAgICBcIm1hcmtcIixcbiAgICBcIm1lc3NhZ2VcIixcbiAgICBcIm1vdXNlZG93blwiLFxuICAgIFwibW91c2VlbnRlclwiLFxuICAgIFwibW91c2VsZWF2ZVwiLFxuICAgIFwibW91c2Vtb3ZlXCIsXG4gICAgXCJtb3VzZW91dFwiLFxuICAgIFwibW91c2VvdmVyXCIsXG4gICAgXCJtb3VzZXVwXCIsXG4gICAgXCJub21hdGNoXCIsXG4gICAgXCJub3RpZmljYXRpb25jbGlja1wiLFxuICAgIFwibm91cGRhdGVcIixcbiAgICBcIm9ic29sZXRlXCIsXG4gICAgXCJvZmZsaW5lXCIsXG4gICAgXCJvbmxpbmVcIixcbiAgICBcIm9wZW5cIixcbiAgICBcIm9yaWVudGF0aW9uY2hhbmdlXCIsXG4gICAgXCJwYWdlaGlkZVwiLFxuICAgIFwicGFnZXNob3dcIixcbiAgICBcInBhc3RlXCIsXG4gICAgXCJwYXVzZVwiLFxuICAgIFwicG9pbnRlcmNhbmNlbFwiLFxuICAgIFwicG9pbnRlcmRvd25cIixcbiAgICBcInBvaW50ZXJlbnRlclwiLFxuICAgIFwicG9pbnRlcmxlYXZlXCIsXG4gICAgXCJwaW50ZXJsb2NrY2hhbmdlXCIsXG4gICAgXCJwb2ludGVybG9ja2Vycm9yXCIsXG4gICAgXCJwb2ludGVybW92ZVwiLFxuICAgIFwicG9pbnRlcm91dFwiLFxuICAgIFwicG9pbnRlcm92ZXJcIixcbiAgICBcInBvaW50ZXJ1cFwiLFxuICAgIFwicGxheVwiLFxuICAgIFwicGxheWluZ1wiLFxuICAgIFwicG9wc3RhdGVcIixcbiAgICBcInByb2dyZXNzXCIsXG4gICAgXCJwdXNoXCIsXG4gICAgXCJwdXNoc3Vic2NyaXB0aW9uY2hhbmdlXCIsXG4gICAgXCJyYXRlY2hhbmdlXCIsXG4gICAgXCJyZWFkeXN0YXRlY2hhbmdlXCIsXG4gICAgXCJyZXBlYXRFdmVudFwiLFxuICAgIFwicmVzZXRcIixcbiAgICBcInJlc2l6ZVwiLFxuICAgIFwicmVzb3VyY2V0aW1pbmdidWZmZXJmdWxsXCIsXG4gICAgXCJyZXN1bHRcIixcbiAgICBcInJlc3VtZVwiLFxuICAgIFwic2Nyb2xsXCIsXG4gICAgXCJzZWVrZWRcIixcbiAgICBcInNlZWtpbmdcIixcbiAgICBcInNlbGVjdFwiLFxuICAgIFwic2VsZWN0c3RhcnRcIixcbiAgICBcInNlbGVjdGlvbmNoYW5nZVwiLFxuICAgIFwic2hvd1wiLFxuICAgIFwic291bmRlbmRcIixcbiAgICBcInNvdW5kc3RhcnRcIixcbiAgICBcInNwZWVjaGVuZFwiLFxuICAgIFwic3BlZWNoc3RhcnRcIixcbiAgICBcInN0YWxsZWRcIixcbiAgICBcInN0YXJ0XCIsXG4gICAgXCJzdG9yYWdlXCIsXG4gICAgXCJzdWJtaXRcIixcbiAgICBcInN1Y2Nlc3NcIixcbiAgICBcInN1c3BlbmRcIixcbiAgICBcIlNWR0Fib3J0XCIsXG4gICAgXCJTVkdFcnJvclwiLFxuICAgIFwiU1ZHTG9hZFwiLFxuICAgIFwiU1ZHUmVzaXplXCIsXG4gICAgXCJTVkdTY3JvbGxcIixcbiAgICBcIlNWR1VubG9hZFwiLFxuICAgIFwiU1ZHWm9vbVwiLFxuICAgIFwidGltZW91dFwiLFxuICAgIFwidGltZXVwZGF0ZVwiLFxuICAgIFwidG91Y2hjYW5jZWxcIixcbiAgICBcInRvdWNoZW5kXCIsXG4gICAgXCJ0b3VjaG1vdmVcIixcbiAgICBcInRvdWNoc3RhcnRcIixcbiAgICBcInRyYW5zaXRpb25lbmRcIixcbiAgICBcInVubG9hZFwiLFxuICAgIFwidXBkYXRlcmVhZHlcIixcbiAgICBcInVwZ3JhZGVuZWVkZWRcIixcbiAgICBcInVzZXJwcm94aW1pdHlcIixcbiAgICBcInZvaWNlc2NoYW5nZWRcIixcbiAgICBcInZlcnNpb25jaGFuZ2VcIixcbiAgICBcInZpc2liaWxpdHljaGFuZ2VcIixcbiAgICBcInZvbHVtZWNoYW5nZVwiLFxuICAgIFwid2FpdGluZ1wiLFxuICAgIFwid2hlZWxcIixcbl07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29uc3RhbnRzL2V2ZW50cy5qcyIsImltcG9ydCBpc0F0dHJpYnV0ZSBmcm9tIFwiLi9pc0F0dHJpYnV0ZS5qc1wiO1xuaW1wb3J0IGlzT25FdmVudCBmcm9tIFwiLi9pc09uRXZlbnQuanNcIjtcblxuLyoqXG4gKiByZW1vdmVzIHRoZSBwcm9wZXJ0aWVzIGluIHByb3BzIGZyb20gdGhlIG5vZGVcbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICogQHBhcmFtIHthbnl9IFtwcm9wcz17fV1cbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW1vdmVQcm9wc0Zyb21FbGVtZW50KGVsLCBwcm9wcyA9IHt9KSB7XG4gICAgaWYgKCFlbCkgcmV0dXJuO1xuXG4gICAgaWYgKCFwcm9wcykgcmV0dXJuO1xuXG4gICAgZm9yIChjb25zdCBbaywgdl0gb2YgT2JqZWN0LmVudHJpZXMocHJvcHMpKSB7XG4gICAgICAgIGlmIChrID09PSBcImtleVwiKSB7XG4gICAgICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoXCJkYXRhLWtleVwiKTtcbiAgICAgICAgfSBlbHNlIGlmIChrID09PSBcInN0eWxlXCIpIHtcbiAgICAgICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShcInN0eWxlXCIpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzT25FdmVudChrKSkge1xuICAgICAgICAgICAgLy8gZXZlbnQgaGFuZGxlclxuICAgICAgICAgICAgY29uc3QgZXZlbnROYW1lID0gay5zdWJzdHIoMikudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCB2KTtcbiAgICAgICAgICAgIC8vIHRoZXJlIG1heSBzdGlsbCBiZSB1bnN1YiBmbnMgbGF5aW5nIGFyb3VuZCwgYnV0IHRoYXQncyBPS1xuICAgICAgICAgICAgLy8gcmVtb3ZlRXZlbnRMaXN0ZW5lciB3b24ndCBmYWlsIGlmIHRoZXJlIGlzIG5vIGxpc3RlbmVyIGFueW1vcmVcbiAgICAgICAgfSBlbHNlIGlmIChpc0F0dHJpYnV0ZShrKSkge1xuICAgICAgICAgICAgLy8gYXR0cmlidXRlXG4gICAgICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoayk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBvYmplY3QgcHJvcGVydHlcbiAgICAgICAgICAgIFJlZmxlY3QuZGVsZXRlUHJvcGVydHkoZWwsIGspO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWxzL3JlbW92ZVByb3BzRnJvbUVsZW1lbnQuanMiLCIvKipcbiAqIERldGVybWluZXMgaWYgYW4gZnVuY3Rpb24gaXMgYSBDb21wb25lbnQgQ29uc3RydWN0b3IuIFRoaXMgaXMgYSBkdWNrLXR5cGVcbiAqIHRlc3QgaW4gdGhhdCB3ZSByZXR1cm4gdHJ1ZSBpZiB0aGUgcHJvdG90eXBlIGhhcyBhIHJlbmRlciBtZXRob2QuXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm4gICAgICAgICAgICAgICAgIHRoZSBmdW5jdGlvbiB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gICAgICAgICAgICAgICAgICAgd2hldGhlciB0aGUgZnVuY3Rpb24gaXMgYSBDb21wb25lbnQgQ29uc3RydWN0b3JcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNGdW5jdGlvbkNvbXBvbmVudEN0b3IoZm4pIHtcbiAgICByZXR1cm4gKFxuICAgICAgICBmbiAmJlxuICAgICAgICBmbi5wcm90b3R5cGUgJiZcbiAgICAgICAgZm4ucHJvdG90eXBlLnJlbmRlciAmJlxuICAgICAgICB0eXBlb2YgZm4ucHJvdG90eXBlLnJlbmRlciA9PT0gXCJmdW5jdGlvblwiXG4gICAgKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlscy9pc0Z1bmN0aW9uQ29tcG9uZW50Q3Rvci5qcyIsImltcG9ydCBWTm9kZSBmcm9tIFwiLi9WTm9kZS5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0YWcsIHByb3BzLCAuLi5jaGlsZHJlbikge1xuICAgIHJldHVybiBuZXcgVk5vZGUodGFnLCBwcm9wcywgLi4uY2hpbGRyZW4pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NyZWF0ZUVsZW1lbnQuanMiLCJpbXBvcnQgY3Z0Vk5vZGUyRE9NIGZyb20gXCIuL2N2dFZOb2RlMkRPTS5qc1wiO1xuaW1wb3J0IGV4cGFuZFZOb2RlVHJlZSBmcm9tIFwiLi9leHBhbmRWTm9kZVRyZWUuanNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlcihub2RlLCBkb21Sb290LCBjb250ZXh0KSB7XG4gICAgZG9tUm9vdC5hcHBlbmRDaGlsZChjdnRWTm9kZTJET00oZXhwYW5kVk5vZGVUcmVlKG5vZGUsIGNvbnRleHQpKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHJlbmRlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9yZW5kZXIuanMiXSwic291cmNlUm9vdCI6IiJ9