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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var flatten_js_1 = __webpack_require__(5);
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
        this._el = null; /* attached DOM element */
        this._component = null; /* attached component instance, if any */
    }
    return VNode;
}());
exports.default = VNode;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Component_js_1 = __webpack_require__(3);
var createElement_js_1 = __webpack_require__(4);
var render_js_1 = __webpack_require__(6);
exports.default = {
    Component: Component_js_1.default,
    createElement: createElement_js_1.default,
    render: render_js_1.default,
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Component = (function () {
    function Component(props, context) {
        if (props === void 0) { props = {}; }
        if (context === void 0) { context = {}; }
        this.props = props;
        this.state = {};
        this.context = context;
        /* private-ish properties */
        this._dirty = true;
        this._domNode = null;
    }
    Component.prototype.render = function (props, state, context) { };
    /**
     * sets the component's new state and enqueues a rendering pass
     *
     * @param {any|function} newState
     * @memberof Component
     */
    Component.prototype.setState = function (newState) {
        var state = newState;
        var prevState = Object.assign({}, this.state);
        if (typeof newState === "function") {
            state = newState(this.state, this.props);
        }
        this.state = Object.assign({}, this.state, newState);
        // TODO: trigger lifecycle events?
        // TODO: trigger render pass
    };
    Component.prototype.shouldComponentUpdate = function (nextProps, nextState, nextContext) {
        return this._dirty;
    };
    Component.prototype.componentWillMount = function () { };
    Component.prototype.componentDidMount = function () { };
    Component.prototype.componentWillUnmount = function () { };
    Component.prototype.componentWillReceiveProps = function (nextProps, nextContext) { };
    Component.prototype.componentWillUpdate = function (nextProps, nextState, nextContext) { };
    Component.prototype.componentDidUpdate = function (prevProps, prevState, prevContext) { };
    return Component;
}());
exports.default = Component;


/***/ }),
/* 4 */
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
/* 5 */
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var VNode_js_1 = __webpack_require__(0);
function render(vdomRoot, domRoot, context) {
    if (vdomRoot === void 0) { vdomRoot = {}; }
    if (domRoot === void 0) { domRoot = null; }
    if (context === void 0) { context = {}; }
    var tag = vdomRoot.tag, _a = vdomRoot.props, props = _a === void 0 ? {} : _a, _b = vdomRoot.children, children = _b === void 0 ? [] : _b;
    var el;
    if (typeof tag === "string") {
        el = document.createElement(tag);
        if (props !== null) {
            for (var _i = 0, _c = Object.entries(props); _i < _c.length; _i++) {
                var _d = _c[_i], prop = _d[0], val = _d[1];
                if (typeof el[prop] !== undefined &&
                    el[prop] instanceof Object) {
                    for (var _e = 0, _f = Object.entries(val); _e < _f.length; _e++) {
                        var _g = _f[_e], oKey = _g[0], oVal = _g[1];
                        el[prop][oKey] = oVal;
                    }
                }
                else {
                    el[prop] = val;
                }
            }
        }
    }
    else if (tag.prototype && tag.prototype.render) {
        var component = Reflect.construct(tag, [props]);
        el = render(component.render(props, component.state, context), null, context);
        el._component = component;
        component._domNode = el;
    }
    else {
        el = render(tag(props, null, context), null, context);
    }
    for (var _h = 0, children_1 = children; _h < children_1.length; _h++) {
        var child = children_1[_h];
        if (child instanceof VNode_js_1.default) {
            el.appendChild(render(child, null, context));
        }
        else {
            el.appendChild(document.createTextNode(child));
        }
    }
    if (domRoot) {
        domRoot.appendChild(el);
    }
    return el;
}
exports.default = render;


/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA5N2QxZjFjNmMxYTkwNjEzN2QyMSIsIndlYnBhY2s6Ly8vLi9zcmMvVk5vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY3JlYXRlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvZmxhdHRlbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVuZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUM3REEsMENBQXlDO0FBRXpDO0lBQ0ksZUFBWSxHQUFHLEVBQUUsS0FBVTtRQUFWLGtDQUFVO1FBQUUsa0JBQVc7YUFBWCxVQUFXLEVBQVgscUJBQVcsRUFBWCxJQUFXO1lBQVgsaUNBQVc7O1FBQ3BDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsa0NBQWtDO1FBQ2xELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FB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QUksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ2pELENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLEVBQUUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ25ELENBQUM7S0FDSjtJQUVELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDVixPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCxNQUFNLENBQUMsRUFBRSxDQUFDO0FBQ2QsQ0FBQztBQTlDRCx5QkE4Q0MiLCJmaWxlIjoidW5kZXItcmVhY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcInVuZGVyLXJlYWN0XCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInVuZGVyLXJlYWN0XCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcInVuZGVyLXJlYWN0XCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDk3ZDFmMWM2YzFhOTA2MTM3ZDIxIiwiaW1wb3J0IGZsYXR0ZW4gZnJvbSBcIi4vdXRpbHMvZmxhdHRlbi5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWTm9kZSB7XG4gICAgY29uc3RydWN0b3IodGFnLCBwcm9wcyA9IHt9LCAuLi5jaGlsZHJlbikge1xuICAgICAgICB0aGlzLnRhZyA9IHRhZzsgLyogdGFnIG9yIENvbXBvbmVudCBjb25zdHJ1Y3RvciAqL1xuICAgICAgICB0aGlzLnByb3BzID0gcHJvcHM7IC8qIHN0eWxlcywgYXR0cmlidXRlcywgcHJvcGVydGllcyAqL1xuICAgICAgICB0aGlzLmtleSA9IHByb3BzICYmIHByb3BzLmtleTsgLyogdW5pcXVlIGtleSBmb3IgdGhpbmdzIGxpa2UgbGlzdHMgKi9cbiAgICAgICAgdGhpcy5jaGlsZHJlbiA9IGZsYXR0ZW4oY2hpbGRyZW4pOyAvKiBmbGF0dGVuZWQgY2hpbGRyZW4gYXJyYXkgKi9cblxuICAgICAgICB0aGlzLl9lbCA9IG51bGw7IC8qIGF0dGFjaGVkIERPTSBlbGVtZW50ICovXG4gICAgICAgIHRoaXMuX2NvbXBvbmVudCA9IG51bGw7IC8qIGF0dGFjaGVkIGNvbXBvbmVudCBpbnN0YW5jZSwgaWYgYW55ICovXG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1ZOb2RlLmpzIiwiaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiLi9zcmMvQ29tcG9uZW50LmpzXCI7XG5pbXBvcnQgY3JlYXRlRWxlbWVudCBmcm9tIFwiLi9zcmMvY3JlYXRlRWxlbWVudC5qc1wiO1xuaW1wb3J0IHJlbmRlciBmcm9tIFwiLi9zcmMvcmVuZGVyLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBDb21wb25lbnQsXG4gICAgY3JlYXRlRWxlbWVudCxcbiAgICByZW5kZXIsXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vaW5kZXguanMiLCJpbXBvcnQgeyBBYnN0cmFjdE1ldGhvZEVycm9yIH0gZnJvbSBcIi4vZXJyb3JzLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMgPSB7fSwgY29udGV4dCA9IHt9KSB7XG4gICAgICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHt9O1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuXG4gICAgICAgIC8qIHByaXZhdGUtaXNoIHByb3BlcnRpZXMgKi9cbiAgICAgICAgdGhpcy5fZGlydHkgPSB0cnVlO1xuICAgICAgICB0aGlzLl9kb21Ob2RlID0gbnVsbDtcbiAgICB9XG5cbiAgICByZW5kZXIocHJvcHMsIHN0YXRlLCBjb250ZXh0KSB7fVxuXG4gICAgLyoqXG4gICAgICogc2V0cyB0aGUgY29tcG9uZW50J3MgbmV3IHN0YXRlIGFuZCBlbnF1ZXVlcyBhIHJlbmRlcmluZyBwYXNzXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2FueXxmdW5jdGlvbn0gbmV3U3RhdGVcbiAgICAgKiBAbWVtYmVyb2YgQ29tcG9uZW50XG4gICAgICovXG4gICAgc2V0U3RhdGUobmV3U3RhdGUpIHtcbiAgICAgICAgbGV0IHN0YXRlID0gbmV3U3RhdGU7XG4gICAgICAgIGNvbnN0IHByZXZTdGF0ZSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc3RhdGUpO1xuICAgICAgICBpZiAodHlwZW9mIG5ld1N0YXRlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHN0YXRlID0gbmV3U3RhdGUodGhpcy5zdGF0ZSwgdGhpcy5wcm9wcyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdGF0ZSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc3RhdGUsIG5ld1N0YXRlKTtcbiAgICAgICAgLy8gVE9ETzogdHJpZ2dlciBsaWZlY3ljbGUgZXZlbnRzP1xuICAgICAgICAvLyBUT0RPOiB0cmlnZ2VyIHJlbmRlciBwYXNzXG4gICAgfVxuXG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlLCBuZXh0Q29udGV4dCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlydHk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge31cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHt9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHt9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcywgbmV4dENvbnRleHQpIHt9XG5cbiAgICBjb21wb25lbnRXaWxsVXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlLCBuZXh0Q29udGV4dCkge31cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUsIHByZXZDb250ZXh0KSB7fVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0NvbXBvbmVudC5qcyIsImltcG9ydCBWTm9kZSBmcm9tIFwiLi9WTm9kZS5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0YWcsIHByb3BzLCAuLi5jaGlsZHJlbikge1xuICAgIHJldHVybiBuZXcgVk5vZGUodGFnLCBwcm9wcywgLi4uY2hpbGRyZW4pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NyZWF0ZUVsZW1lbnQuanMiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmbGF0dGVuKC4uLml0ZW1zKSB7XG4gICAgbGV0IGFyciA9IFtdO1xuICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGlmIChpdGVtIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIGFyciA9IGFyci5jb25jYXQoZmxhdHRlbiguLi5pdGVtKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhcnIucHVzaChpdGVtKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBhcnI7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbHMvZmxhdHRlbi5qcyIsImltcG9ydCBWTm9kZSBmcm9tIFwiLi9WTm9kZS5qc1wiO1xuaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiLi9Db21wb25lbnQuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVuZGVyKHZkb21Sb290ID0ge30sIGRvbVJvb3QgPSBudWxsLCBjb250ZXh0ID0ge30pIHtcbiAgICBjb25zdCB7IHRhZywgcHJvcHMgPSB7fSwgY2hpbGRyZW4gPSBbXSB9ID0gdmRvbVJvb3Q7XG4gICAgbGV0IGVsO1xuXG4gICAgaWYgKHR5cGVvZiB0YWcgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG4gICAgICAgIGlmIChwcm9wcyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBbcHJvcCwgdmFsXSBvZiBPYmplY3QuZW50cmllcyhwcm9wcykpIHtcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIHR5cGVvZiBlbFtwcm9wXSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICAgICAgICAgIGVsW3Byb3BdIGluc3RhbmNlb2YgT2JqZWN0XG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgW29LZXksIG9WYWxdIG9mIE9iamVjdC5lbnRyaWVzKHZhbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsW3Byb3BdW29LZXldID0gb1ZhbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVsW3Byb3BdID0gdmFsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGFnLnByb3RvdHlwZSAmJiB0YWcucHJvdG90eXBlLnJlbmRlcikge1xuICAgICAgICBjb25zdCBjb21wb25lbnQgPSBSZWZsZWN0LmNvbnN0cnVjdCh0YWcsIFtwcm9wc10pO1xuICAgICAgICBlbCA9IHJlbmRlcihcbiAgICAgICAgICAgIGNvbXBvbmVudC5yZW5kZXIocHJvcHMsIGNvbXBvbmVudC5zdGF0ZSwgY29udGV4dCksXG4gICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgY29udGV4dFxuICAgICAgICApO1xuICAgICAgICBlbC5fY29tcG9uZW50ID0gY29tcG9uZW50O1xuICAgICAgICBjb21wb25lbnQuX2RvbU5vZGUgPSBlbDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBlbCA9IHJlbmRlcih0YWcocHJvcHMsIG51bGwsIGNvbnRleHQpLCBudWxsLCBjb250ZXh0KTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIGNoaWxkcmVuKSB7XG4gICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIFZOb2RlKSB7XG4gICAgICAgICAgICBlbC5hcHBlbmRDaGlsZChyZW5kZXIoY2hpbGQsIG51bGwsIGNvbnRleHQpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNoaWxkKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZG9tUm9vdCkge1xuICAgICAgICBkb21Sb290LmFwcGVuZENoaWxkKGVsKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWw7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcmVuZGVyLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==