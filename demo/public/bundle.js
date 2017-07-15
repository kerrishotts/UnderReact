webpackJsonp([0],{

/***/ 121:
/*!*************************!*\
  !*** multi ./index.jsx ***!
  \*************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./index.jsx */122);


/***/ }),

/***/ 122:
/*!*******************!*\
  !*** ./index.jsx ***!
  \*******************/
/*! exports provided:  */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_under_react__ = __webpack_require__(/*! under-react */ 30);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_App_jsx__ = __webpack_require__(/*! ./components/App.jsx */ 137);\n\n\nvar app = __WEBPACK_IMPORTED_MODULE_0_under_react__[\"createElement\"](__WEBPACK_IMPORTED_MODULE_1__components_App_jsx__[\"a\" /* default */], null), expandedVnode = __WEBPACK_IMPORTED_MODULE_0_under_react__[\"expandVNodeTree\"](app), initialRendering = __WEBPACK_IMPORTED_MODULE_0_under_react__[\"cvtVNode2DOM\"](expandedVnode);\nconsole.log(expandedVnode);\nconsole.log(initialRendering);\ndocument.getElementById(\"root\").appendChild(initialRendering);\n//React.render(<App />, document.getElementById(\"root\"));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTIyLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vaW5kZXguanN4PzkwMGQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgY3Z0Vk5vZGUyRE9NLCBleHBhbmRWTm9kZVRyZWUgfSBmcm9tIFwidW5kZXItcmVhY3RcIjtcblxuaW1wb3J0IEFwcCBmcm9tIFwiLi9jb21wb25lbnRzL0FwcC5qc3hcIjtcblxuY29uc3QgYXBwID0gPEFwcCAvPixcbiAgICBleHBhbmRlZFZub2RlID0gZXhwYW5kVk5vZGVUcmVlKGFwcCksXG4gICAgaW5pdGlhbFJlbmRlcmluZyA9IGN2dFZOb2RlMkRPTShleHBhbmRlZFZub2RlKTtcblxuY29uc29sZS5sb2coZXhwYW5kZWRWbm9kZSk7XG5jb25zb2xlLmxvZyhpbml0aWFsUmVuZGVyaW5nKTtcblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpLmFwcGVuZENoaWxkKGluaXRpYWxSZW5kZXJpbmcpO1xuXG4vL1JlYWN0LnJlbmRlcig8QXBwIC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIikpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vaW5kZXguanN4Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBRUE7QUFJQTtBQUNBO0FBRUE7QUFFQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///122\n");

/***/ }),

/***/ 137:
/*!****************************!*\
  !*** ./components/App.jsx ***!
  \****************************/
/*! exports provided: App, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* unused harmony export App */\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_under_react__ = __webpack_require__(/*! under-react */ 30);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ExtendedForecast_jsx__ = __webpack_require__(/*! ./ExtendedForecast.jsx */ 138);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Clock_jsx__ = __webpack_require__(/*! ./Clock.jsx */ 142);\n\n\n\nvar App = function () {\n    return __WEBPACK_IMPORTED_MODULE_0_under_react__[\"createElement\"](\"div\", null,\n        __WEBPACK_IMPORTED_MODULE_0_under_react__[\"createElement\"](__WEBPACK_IMPORTED_MODULE_1__ExtendedForecast_jsx__[\"a\" /* default */], { days: [\n                {\n                    key: 1,\n                    high: { temperature: 90, unit: \"F\" },\n                    low: { temperature: 67, unit: \"F\" },\n                },\n                {\n                    key: 2,\n                    high: { temperature: 92, unit: \"F\" },\n                    low: { temperature: 72, unit: \"F\" },\n                },\n                {\n                    key: 3,\n                    high: { temperature: 88, unit: \"F\" },\n                    low: { temperature: 65, unit: \"F\" },\n                },\n                {\n                    key: 4,\n                    high: { temperature: 85, unit: \"F\" },\n                    low: { temperature: 70, unit: \"F\" },\n                },\n            ] }),\n        __WEBPACK_IMPORTED_MODULE_0_under_react__[\"createElement\"](__WEBPACK_IMPORTED_MODULE_2__Clock_jsx__[\"a\" /* default */], null));\n};\n/* harmony default export */ __webpack_exports__[\"a\"] = (App);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTM3LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9BcHAuanN4PzliY2MiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gXCJ1bmRlci1yZWFjdFwiO1xuaW1wb3J0IEV4dGVuZGVkRm9yZWNhc3QgZnJvbSBcIi4vRXh0ZW5kZWRGb3JlY2FzdC5qc3hcIjtcbmltcG9ydCBDbG9jayBmcm9tIFwiLi9DbG9jay5qc3hcIjtcblxuZXhwb3J0IGNvbnN0IEFwcCA9ICgpID0+XG4gICAgPGRpdj5cbiAgICAgICAgPEV4dGVuZGVkRm9yZWNhc3RcbiAgICAgICAgICAgIGRheXM9e1tcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGtleTogMSxcbiAgICAgICAgICAgICAgICAgICAgaGlnaDogeyB0ZW1wZXJhdHVyZTogOTAsIHVuaXQ6IFwiRlwiIH0sXG4gICAgICAgICAgICAgICAgICAgIGxvdzogeyB0ZW1wZXJhdHVyZTogNjcsIHVuaXQ6IFwiRlwiIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGtleTogMixcbiAgICAgICAgICAgICAgICAgICAgaGlnaDogeyB0ZW1wZXJhdHVyZTogOTIsIHVuaXQ6IFwiRlwiIH0sXG4gICAgICAgICAgICAgICAgICAgIGxvdzogeyB0ZW1wZXJhdHVyZTogNzIsIHVuaXQ6IFwiRlwiIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGtleTogMyxcbiAgICAgICAgICAgICAgICAgICAgaGlnaDogeyB0ZW1wZXJhdHVyZTogODgsIHVuaXQ6IFwiRlwiIH0sXG4gICAgICAgICAgICAgICAgICAgIGxvdzogeyB0ZW1wZXJhdHVyZTogNjUsIHVuaXQ6IFwiRlwiIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGtleTogNCxcbiAgICAgICAgICAgICAgICAgICAgaGlnaDogeyB0ZW1wZXJhdHVyZTogODUsIHVuaXQ6IFwiRlwiIH0sXG4gICAgICAgICAgICAgICAgICAgIGxvdzogeyB0ZW1wZXJhdHVyZTogNzAsIHVuaXQ6IFwiRlwiIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF19XG4gICAgICAgIC8+XG4gICAgICAgIDxDbG9jayAvPlxuICAgIDwvZGl2PjtcblxuZXhwb3J0IGRlZmF1bHQgQXBwO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29tcG9uZW50cy9BcHAuanN4Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBekJBO0FBNEJBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///137\n");

/***/ }),

/***/ 138:
/*!*****************************************!*\
  !*** ./components/ExtendedForecast.jsx ***!
  \*****************************************/
/*! exports provided: ExtendedForecast, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* unused harmony export ExtendedForecast */\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_under_react__ = __webpack_require__(/*! under-react */ 30);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DayForecast_jsx__ = __webpack_require__(/*! ./DayForecast.jsx */ 139);\nvar __assign = (this && this.__assign) || Object.assign || function(t) {\n    for (var s, i = 1, n = arguments.length; i < n; i++) {\n        s = arguments[i];\n        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n            t[p] = s[p];\n    }\n    return t;\n};\n\n\nvar ExtendedForecast = function (_a) {\n    var _b = (_a === void 0 ? {} : _a).days, days = _b === void 0 ? [] : _b;\n    return __WEBPACK_IMPORTED_MODULE_0_under_react__[\"createElement\"](\"div\", null, days.map(function (day) { return __WEBPACK_IMPORTED_MODULE_0_under_react__[\"createElement\"](__WEBPACK_IMPORTED_MODULE_1__DayForecast_jsx__[\"a\" /* default */], __assign({}, day)); }));\n};\n/* harmony default export */ __webpack_exports__[\"a\"] = (ExtendedForecast);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTM4LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9FeHRlbmRlZEZvcmVjYXN0LmpzeD84OGY0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tIFwidW5kZXItcmVhY3RcIjtcbmltcG9ydCBEYXlGb3JlY2FzdCBmcm9tIFwiLi9EYXlGb3JlY2FzdC5qc3hcIjtcblxuZXhwb3J0IGNvbnN0IEV4dGVuZGVkRm9yZWNhc3QgPSAoeyBkYXlzID0gW10gfSA9IHt9KSA9PlxuICAgIDxkaXY+XG4gICAgICAgIHtkYXlzLm1hcChkYXkgPT4gPERheUZvcmVjYXN0IHsuLi5kYXl9IC8+KX1cbiAgICA8L2Rpdj47XG5cbmV4cG9ydCBkZWZhdWx0IEV4dGVuZGVkRm9yZWNhc3Q7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL0V4dGVuZGVkRm9yZWNhc3QuanN4Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUlBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///138\n");

/***/ }),

/***/ 139:
/*!************************************!*\
  !*** ./components/DayForecast.jsx ***!
  \************************************/
/*! exports provided: DayForecast, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* unused harmony export DayForecast */\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_under_react__ = __webpack_require__(/*! under-react */ 30);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Temperature_jsx__ = __webpack_require__(/*! ./Temperature.jsx */ 140);\nvar __assign = (this && this.__assign) || Object.assign || function(t) {\n    for (var s, i = 1, n = arguments.length; i < n; i++) {\n        s = arguments[i];\n        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n            t[p] = s[p];\n    }\n    return t;\n};\n\n\nvar DayForecast = function (_a) {\n    var _b = _a === void 0 ? {} : _a, _c = _b.high, high = _c === void 0 ? undefined : _c, _d = _b.low, low = _d === void 0 ? undefined : _d;\n    return __WEBPACK_IMPORTED_MODULE_0_under_react__[\"createElement\"](\"div\", null,\n        __WEBPACK_IMPORTED_MODULE_0_under_react__[\"createElement\"](\"div\", { className: \"forecast-high\" },\n            __WEBPACK_IMPORTED_MODULE_0_under_react__[\"createElement\"](\"span\", null, \"High:\"),\n            __WEBPACK_IMPORTED_MODULE_0_under_react__[\"createElement\"](__WEBPACK_IMPORTED_MODULE_1__Temperature_jsx__[\"a\" /* default */], __assign({}, high))),\n        __WEBPACK_IMPORTED_MODULE_0_under_react__[\"createElement\"](\"div\", { className: \"forecast-low\" },\n            __WEBPACK_IMPORTED_MODULE_0_under_react__[\"createElement\"](\"span\", null, \"Low:\"),\n            __WEBPACK_IMPORTED_MODULE_0_under_react__[\"createElement\"](__WEBPACK_IMPORTED_MODULE_1__Temperature_jsx__[\"a\" /* default */], __assign({}, low))));\n};\n/* harmony default export */ __webpack_exports__[\"a\"] = (DayForecast);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTM5LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9EYXlGb3JlY2FzdC5qc3g/MjBkNiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSBcInVuZGVyLXJlYWN0XCI7XG5pbXBvcnQgVGVtcGVyYXR1cmUgZnJvbSBcIi4vVGVtcGVyYXR1cmUuanN4XCI7XG5cbmV4cG9ydCBjb25zdCBEYXlGb3JlY2FzdCA9ICh7IGhpZ2ggPSB1bmRlZmluZWQsIGxvdyA9IHVuZGVmaW5lZCB9ID0ge30pID0+XG4gICAgPGRpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JlY2FzdC1oaWdoXCI+XG4gICAgICAgICAgICA8c3Bhbj5IaWdoOjwvc3Bhbj5cbiAgICAgICAgICAgIDxUZW1wZXJhdHVyZSB7Li4uaGlnaH0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9yZWNhc3QtbG93XCI+XG4gICAgICAgICAgICA8c3Bhbj5Mb3c6PC9zcGFuPlxuICAgICAgICAgICAgPFRlbXBlcmF0dXJlIHsuLi5sb3d9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PjtcblxuZXhwb3J0IGRlZmF1bHQgRGF5Rm9yZWNhc3Q7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL0RheUZvcmVjYXN0LmpzeCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBUEE7QUFXQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///139\n");

/***/ }),

/***/ 140:
/*!************************************!*\
  !*** ./components/Temperature.jsx ***!
  \************************************/
/*! exports provided: Temperature, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* unused harmony export Temperature */\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_under_react__ = __webpack_require__(/*! under-react */ 30);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__TempUnit_jsx__ = __webpack_require__(/*! ./TempUnit.jsx */ 141);\n\n\nvar Temperature = function (_a) {\n    var _b = _a === void 0 ? {} : _a, _c = _b.temperature, temperature = _c === void 0 ? undefined : _c, _d = _b.unit, unit = _d === void 0 ? \"F\" : _d;\n    return __WEBPACK_IMPORTED_MODULE_0_under_react__[\"createElement\"](\"span\", { className: \"temperature\" },\n        temperature,\n        __WEBPACK_IMPORTED_MODULE_0_under_react__[\"createElement\"](__WEBPACK_IMPORTED_MODULE_1__TempUnit_jsx__[\"a\" /* default */], { unit: unit }));\n};\n/* harmony default export */ __webpack_exports__[\"a\"] = (Temperature);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTQwLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9UZW1wZXJhdHVyZS5qc3g/ZmMzNiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSBcInVuZGVyLXJlYWN0XCI7XG5cbmltcG9ydCBUZW1wVW5pdCBmcm9tIFwiLi9UZW1wVW5pdC5qc3hcIjtcblxuZXhwb3J0IGNvbnN0IFRlbXBlcmF0dXJlID0gKHsgdGVtcGVyYXR1cmUgPSB1bmRlZmluZWQsIHVuaXQgPSBcIkZcIiB9ID0ge30pID0+XG4gICAgPHNwYW4gY2xhc3NOYW1lPVwidGVtcGVyYXR1cmVcIj5cbiAgICAgICAge3RlbXBlcmF0dXJlfVxuICAgICAgICA8VGVtcFVuaXQgdW5pdD17dW5pdH0gLz5cbiAgICA8L3NwYW4+O1xuXG5leHBvcnQgZGVmYXVsdCBUZW1wZXJhdHVyZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvVGVtcGVyYXR1cmUuanN4Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBS0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///140\n");

/***/ }),

/***/ 141:
/*!*********************************!*\
  !*** ./components/TempUnit.jsx ***!
  \*********************************/
/*! exports provided: TempUnit, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* unused harmony export TempUnit */\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_under_react__ = __webpack_require__(/*! under-react */ 30);\n\nvar TempUnit = function (_a) {\n    var _b = (_a === void 0 ? {} : _a).unit, unit = _b === void 0 ? \"F\" : _b;\n    return __WEBPACK_IMPORTED_MODULE_0_under_react__[\"createElement\"](\"span\", { className: \"unit\", style: { opacity: 0.4 } },\n        \"\\u00B0\",\n        unit);\n};\n/* harmony default export */ __webpack_exports__[\"a\"] = (TempUnit);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTQxLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9UZW1wVW5pdC5qc3g/OTRmZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSBcInVuZGVyLXJlYWN0XCI7XG5cbmV4cG9ydCBjb25zdCBUZW1wVW5pdCA9ICh7IHVuaXQgPSBcIkZcIiB9ID0ge30pID0+XG4gICAgPHNwYW4gY2xhc3NOYW1lPVwidW5pdFwiIHN0eWxlPXt7IG9wYWNpdHk6IDAuNCB9fT5cbiAgICAgICAgJmRlZzt7dW5pdH1cbiAgICA8L3NwYW4+O1xuXG5leHBvcnQgZGVmYXVsdCBUZW1wVW5pdDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvVGVtcFVuaXQuanN4Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBQ0E7O0FBQ0E7QUFEQTtBQUlBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///141\n");

/***/ }),

/***/ 142:
/*!******************************!*\
  !*** ./components/Clock.jsx ***!
  \******************************/
/*! exports provided: Clock, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* unused harmony export Clock */\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_under_react__ = __webpack_require__(/*! under-react */ 30);\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = Object.setPrototypeOf ||\n        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\nvar Clock = (function (_super) {\n    __extends(Clock, _super);\n    function Clock(props) {\n        var _this = _super.call(this, props) || this;\n        _this.state = { date: new Date() };\n        return _this;\n    }\n    Clock.prototype.componentDidMount = function () {\n        var _this = this;\n        this.timerID = setInterval(function () { return _this.tick(); }, 1000);\n    };\n    Clock.prototype.componentWillUnmount = function () {\n        clearInterval(this.timerID);\n    };\n    Clock.prototype.tick = function () {\n        this.setState({\n            date: new Date(),\n        });\n    };\n    Clock.prototype.render = function () {\n        return (__WEBPACK_IMPORTED_MODULE_0_under_react__[\"createElement\"](\"div\", { onClick: function () { return alert(\"hi\"); } },\n            __WEBPACK_IMPORTED_MODULE_0_under_react__[\"createElement\"](\"h1\", null, \"Hello, world!\"),\n            __WEBPACK_IMPORTED_MODULE_0_under_react__[\"createElement\"](\"h2\", null,\n                \"It is \",\n                this.state.date.toLocaleTimeString(),\n                \".\")));\n    };\n    return Clock;\n}(__WEBPACK_IMPORTED_MODULE_0_under_react__[\"Component\"]));\n\n/* harmony default export */ __webpack_exports__[\"a\"] = (Clock);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTQyLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9DbG9jay5qc3g/MWFkNCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVFbGVtZW50LCBDb21wb25lbnQgfSBmcm9tIFwidW5kZXItcmVhY3RcIjtcblxuZXhwb3J0IGNsYXNzIENsb2NrIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7IGRhdGU6IG5ldyBEYXRlKCkgfTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy50aW1lcklEID0gc2V0SW50ZXJ2YWwoKCkgPT4gdGhpcy50aWNrKCksIDEwMDApO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICBjbGVhckludGVydmFsKHRoaXMudGltZXJJRCk7XG4gICAgfVxuXG4gICAgdGljaygpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBkYXRlOiBuZXcgRGF0ZSgpLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBvbkNsaWNrPXsoKSA9PiBhbGVydChcImhpXCIpfT5cbiAgICAgICAgICAgICAgICA8aDE+SGVsbG8sIHdvcmxkITwvaDE+XG4gICAgICAgICAgICAgICAgPGgyPlxuICAgICAgICAgICAgICAgICAgICBJdCBpcyB7dGhpcy5zdGF0ZS5kYXRlLnRvTG9jYWxlVGltZVN0cmluZygpfS5cbiAgICAgICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDbG9jaztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvQ2xvY2suanN4Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTtBQUVBO0FBQUE7QUFDQTtBQUFBO0FBRUE7O0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTs7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUFBOztBQUVBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///142\n");

/***/ })

},[121]);