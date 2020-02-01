/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/slider.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/slider.js":
/*!***********************!*\
  !*** ./src/slider.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar Slider = /** @class */ (function () {\n    var SLIDE_ID_SEPARATOR = \"-\";\n    var SLIDE_ID_PREFIX = \"slide\" + SLIDE_ID_SEPARATOR;\n\n    function Slider() {\n        var sliderContainer = document.getElementsByClassName('ngw-slider-container').item(0);\n\n        this.init(sliderContainer);\n        this.setupListeners();\n    }\n\n    Slider.prototype.init = function (sliderContainer) {\n        this.sliderNavigatorContainer = sliderContainer.getElementsByClassName('ngw-slider-navigator-container').item(0);\n        this.slidesContainer = sliderContainer.getElementsByClassName('ngw-slides-container').item(0);\n        this.sliderNavigators = this.sliderNavigatorContainer.getElementsByTagName('a');\n        this.currentSlideId = this.sliderNavigators.length > 0 ? this.sliderNavigators.item(0).hash : '';\n        this.cycleNavigation = false;\n    }\n\n    Slider.prototype.setupListeners = function () {\n        this.sliderNavigatorContainer\n            .querySelectorAll('.ngw-next, .ngw-previous')\n            .forEach(paginator => {\n                paginator.addEventListener('click', this.paginationClick.bind(this));\n            });\n\n        for (let i = 0; i < this.sliderNavigators.length; i++) {\n            const sliderNavigator = this.sliderNavigators.item(i);\n            sliderNavigator.addEventListener('click', this.navigatorClick.bind(this));\n        }\n    }\n\n    Slider.prototype.navigatorClick = function (event) {\n        event.preventDefault();\n        this.navigate(event.target);\n    }\n\n    Slider.prototype.paginationClick = function (event) {\n        event.preventDefault();\n\n        var paginationButton = event.target;\n        \n        if (paginationButton.classList.contains('ngw-next')) {\n            this.next();\n        } else if (paginationButton.classList.contains('ngw-previous')) {\n            this.previous();\n        } else {\n            throw new Error('The target element is not pagination button to perform this action.')\n        }\n    }\n\n    Slider.prototype.enableCycleNavigation = function () {\n        this.cycleNavigation = true;\n\n        this.visibleAndEnablePaginator('ngw-next');\n        this.visibleAndEnablePaginator('ngw-previous');\n    }\n\n    Slider.prototype.disableCycleNavigation = function () {\n        this.cycleNavigation = false;\n\n        if(this.currentSlideIsFirst()) {\n            this.hideAndDisablePaginator('ngw-previous');\n        } else if (this.currentSlideIsLast()) {\n            this.hideAndDisablePaginator('ngw-next');\n        }\n    }\n\n    Slider.prototype.hideNavigators = function() {\n        for (let i = 0; i < this.sliderNavigators.length; i++) {\n            const sliderNavigator = this.sliderNavigators.item(i);\n            sliderNavigator.style.display = 'none';\n        }\n    }\n\n    Slider.prototype.hideAndDisablePaginator = function(paginatorClassName) {\n        var paginator = this.sliderNavigatorContainer.getElementsByClassName(paginatorClassName).item(0);\n\n        if (!paginator) {\n            throw new Error('Paginator button not found with class name: ', paginatorClassName);\n        }\n\n        paginator.style.visibility = 'hidden';\n        paginator.disable = true;\n    }\n\n    Slider.prototype.visibleAndEnablePaginator = function(paginatorClassName) {\n        var paginator = this.sliderNavigatorContainer.getElementsByClassName(paginatorClassName).item(0);\n\n        if (!paginator) {\n            throw new Error('Paginator button not found with class name: ', paginatorClassName);\n        }\n        \n        paginator.style.visibility = 'visible';\n        paginator.disable = false;\n    }\n\n    Slider.prototype.navigate = function (slideNavigator) {\n        this.deactiveAllSlides();\n        this.currentSlideId = slideNavigator.hash;\n        this.activateSlide(this.currentSlideId, slideNavigator);\n    }\n\n    Slider.prototype.activateSlide = function(slideId, slideNavigator) {\n        var slide = this.slidesContainer.querySelector(slideId);\n        if(!!slide) {\n            slide.classList.add('active');\n        }\n        slideNavigator.classList.add('active');\n        location.hash = slideNavigator.hash;\n    }\n\n    Slider.prototype.deactiveAllSlides = function () {\n        for (var i = 0; i < this.sliderNavigators.length; i++) {\n            var sliderNavigator = this.sliderNavigators.item(i);\n            var slide = this.slidesContainer.querySelector(sliderNavigator.hash);\n            if(!!slide) slide.classList.remove('active');\n            sliderNavigator.classList.remove('active');\n        }\n    }\n\n    Slider.prototype.next = function () {\n        if(this.sliderNavigators.length === 0) {\n            throw new Error('ٔNo Slides in the slider container.');\n        }\n        \n        this.currentSlideId = this.getNextSlideId();\n        var sliderNavigator = this.getSliderNavigatorBySlideId(this.currentSlideId);\n        this.deactiveAllSlides();\n        this.activateSlide(this.currentSlideId, sliderNavigator);\n\n        if (!this.cycleNavigation && this.currentSlideIsLast()) {\n            this.hideAndDisablePaginator('ngw-next');\n        } else if (!this.cycleNavigation) {\n            this.visibleAndEnablePaginator('ngw-previous');\n        }\n    }\n\n    Slider.prototype.previous = function () {\n        if(this.sliderNavigators.length === 0) {\n            throw new Error('ٔNo Slides in the slider container.');\n        }\n\n        this.currentSlideId = this.getPreviousSlideId();\n        var sliderNavigator = this.getSliderNavigatorBySlideId(this.currentSlideId);\n        this.deactiveAllSlides();\n        this.activateSlide(this.currentSlideId, sliderNavigator);\n\n        if(!this.cycleNavigation && this.currentSlideIsFirst()) {\n            this.hideAndDisablePaginator('ngw-previous');\n        } else if (!this.cycleNavigation) {\n            this.visibleAndEnablePaginator('ngw-next');\n        }\n    }\n\n    Slider.prototype.getSliderNavigatorBySlideId = function (slideId) {\n        for (let i = 0; i < this.sliderNavigators.length; i++) {\n            const sliderNavigator = this.sliderNavigators.item(i);\n            if (sliderNavigator.hash == (slideId)) {\n                return sliderNavigator;\n            }\n        }\n\n        return null;\n    }\n\n    Slider.prototype.getNextSlideId = function () {\n        var nextIdIndicator = this.getCurrentIdIndicator() + 1;\n\n        if (!this.cycleNavigation && nextIdIndicator > this.sliderNavigators.length) {\n            return this.currentSlideId;\n        } else if (nextIdIndicator > this.sliderNavigators.length) {\n            nextIdIndicator = 1;\n        }\n        \n        return '#' + SLIDE_ID_PREFIX + nextIdIndicator;\n    }\n\n    Slider.prototype.getPreviousSlideId = function () {\n        var previousIdIndicator = this.getCurrentIdIndicator() - 1;\n\n        if (!this.cycleNavigation && previousIdIndicator < 1) {\n            return this.currentSlideId;\n        } else if (previousIdIndicator < 1) {\n            previousIdIndicator = this.sliderNavigators.length;\n        }\n        \n        return '#' + SLIDE_ID_PREFIX + previousIdIndicator;\n    }\n\n    Slider.prototype.getCurrentIdIndicator = function () {\n        var currentSlideIdParts = this.currentSlideId.split(SLIDE_ID_SEPARATOR);\n        var lastSlideIndex = currentSlideIdParts.length - 1;\n        return parseInt(currentSlideIdParts[lastSlideIndex], 10);\n    }\n\n    Slider.prototype.currentSlideIsLast = function () {\n        if(this.sliderNavigators.length === 0) {\n            throw new Error('ٔNo Slides in the slider container.');\n        }\n\n        var lastsliderNavigator = this.sliderNavigators.item(this.sliderNavigators.length - 1);\n        return lastsliderNavigator.hash === this.currentSlideId;\n    }\n\n    Slider.prototype.currentSlideIsFirst = function () {\n        if(this.sliderNavigators.length === 0) {\n            throw new Error('ٔNo Slides in the slider container.');\n        }\n\n        var firstSliderNavigator = this.sliderNavigators.item(0);\n        return firstSliderNavigator.hash === this.currentSlideId;\n    }\n    \n    return Slider;\n}());\n\n\n//# sourceURL=webpack:///./src/slider.js?");

/***/ })

/******/ });