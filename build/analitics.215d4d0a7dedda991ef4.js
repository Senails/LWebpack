/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./analitics.js":
/*!**********************!*\
  !*** ./analitics.js ***!
  \**********************/
/***/ (() => {

eval("function createanalytics() {\r\n    let counter = 0;\r\n    let flag = false;\r\n\r\n    let clickhand = () => {\r\n        counter++;\r\n        console.log(counter)\r\n    }\r\n\r\n    document.addEventListener('click', clickhand);\r\n\r\n    return {\r\n        destoy() {\r\n            document.removeEventListener('click', clickhand);\r\n            flag = true;\r\n        },\r\n        getclicks() {\r\n            return !flag ? counter : 'Analitycs is destroyd !!!!!!!!!!!';\r\n        }\r\n    }\r\n}\r\n\r\nwindow.analytics = createanalytics();\n\n//# sourceURL=webpack:///./analitics.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./analitics.js"]();
/******/ 	
/******/ })()
;