"use strict";
var Slider = /** @class */ (function () {
    var SLIDE_ID_SEPARATOR = "-";
    var SLIDE_ID_PREFIX = "slide" + SLIDE_ID_SEPARATOR;

    function Slider() {
        var sliderContainer = document.getElementsByClassName('ngw-slider-container').item(0);

        this.init(sliderContainer);
        this.setupListeners();
    }

    Slider.prototype.init = function (sliderContainer) {
        this.sliderNavigatorContainer = sliderContainer.getElementsByClassName('ngw-slider-navigator-container').item(0);
        this.slidesContainer = sliderContainer.getElementsByClassName('ngw-slides-container').item(0);
        this.sliderNavigators = this.sliderNavigatorContainer.getElementsByTagName('a');
        this.currentSlideId = this.sliderNavigators.length > 0 ? this.sliderNavigators.item(0).hash : '';
        this.cycleNavigation = false;
    }

    Slider.prototype.setupListeners = function () {
        this.sliderNavigatorContainer
            .querySelectorAll('.ngw-slider-next, .ngw-slider-previous')
            .forEach(paginator => {
                paginator.addEventListener('click', this.paginationClick.bind(this));
            });

        for (let i = 0; i < this.sliderNavigators.length; i++) {
            const sliderNavigator = this.sliderNavigators.item(i);
            sliderNavigator.addEventListener('click', this.navigatorClick.bind(this));
        }
    }

    Slider.prototype.navigatorClick = function (event) {
        event.preventDefault();
        this.navigate(event.target);
    }

    Slider.prototype.paginationClick = function (event) {
        event.preventDefault();

        var paginationButton = event.target;
        
        if (paginationButton.classList.contains('ngw-slider-next')) {
            this.next();
        } else if (paginationButton.classList.contains('ngw-slider-previous')) {
            this.previous();
        } else {
            throw new Error('The target element is not pagination button to perform this action.')
        }
    }

    Slider.prototype.enableCycleNavigation = function () {
        this.cycleNavigation = true;

        this.visibleAndEnablePaginator('ngw-slider-next');
        this.visibleAndEnablePaginator('ngw-slider-previous');
    }

    Slider.prototype.disableCycleNavigation = function () {
        this.cycleNavigation = false;

        if(this.currentSlideIsFirst()) {
            this.hideAndDisablePaginator('ngw-slider-previous');
        } else if (this.currentSlideIsLast()) {
            this.hideAndDisablePaginator('ngw-slider-next');
        }
    }

    Slider.prototype.hideNavigators = function() {
        for (let i = 0; i < this.sliderNavigators.length; i++) {
            const sliderNavigator = this.sliderNavigators.item(i);
            sliderNavigator.style.display = 'none';
        }
    }

    Slider.prototype.hideAndDisablePaginator = function(paginatorClassName) {
        var paginator = this.sliderNavigatorContainer.getElementsByClassName(paginatorClassName).item(0);

        if (!paginator) {
            throw new Error('Paginator button not found with class name: ', paginatorClassName);
        }

        paginator.style.visibility = 'hidden';
        paginator.disable = true;
    }

    Slider.prototype.visibleAndEnablePaginator = function(paginatorClassName) {
        var paginator = this.sliderNavigatorContainer.getElementsByClassName(paginatorClassName).item(0);

        if (!paginator) {
            throw new Error('Paginator button not found with class name: ', paginatorClassName);
        }
        
        paginator.style.visibility = 'visible';
        paginator.disable = false;
    }

    Slider.prototype.navigate = function (slideNavigator) {
        this.deactiveAllSlides();
        this.currentSlideId = slideNavigator.hash;
        this.activateSlide(this.currentSlideId, slideNavigator);
    }

    Slider.prototype.activateSlide = function(slideId, slideNavigator) {
        var slide = this.slidesContainer.querySelector(slideId);
        if(!!slide) {
            slide.classList.add('active');
        }
        slideNavigator.classList.add('active');
        location.hash = slideNavigator.hash;
    }

    Slider.prototype.deactiveAllSlides = function () {
        for (var i = 0; i < this.sliderNavigators.length; i++) {
            var sliderNavigator = this.sliderNavigators.item(i);
            var slide = this.slidesContainer.querySelector(sliderNavigator.hash);
            if(!!slide) slide.classList.remove('active');
            sliderNavigator.classList.remove('active');
        }
    }

    Slider.prototype.next = function () {
        if(this.sliderNavigators.length === 0) {
            throw new Error('ٔNo Slides in the slider container.');
        }
        
        this.currentSlideId = this.getNextSlideId();
        var sliderNavigator = this.getSliderNavigatorBySlideId(this.currentSlideId);
        this.deactiveAllSlides();
        this.activateSlide(this.currentSlideId, sliderNavigator);

        if (!this.cycleNavigation && this.currentSlideIsLast()) {
            this.hideAndDisablePaginator('ngw-slider-next');
        } else if (!this.cycleNavigation) {
            this.visibleAndEnablePaginator('ngw-slider-previous');
        }
    }

    Slider.prototype.previous = function () {
        if(this.sliderNavigators.length === 0) {
            throw new Error('ٔNo Slides in the slider container.');
        }

        this.currentSlideId = this.getPreviousSlideId();
        var sliderNavigator = this.getSliderNavigatorBySlideId(this.currentSlideId);
        this.deactiveAllSlides();
        this.activateSlide(this.currentSlideId, sliderNavigator);

        if(!this.cycleNavigation && this.currentSlideIsFirst()) {
            this.hideAndDisablePaginator('ngw-slider-previous');
        } else if (!this.cycleNavigation) {
            this.visibleAndEnablePaginator('ngw-slider-next');
        }
    }

    Slider.prototype.getSliderNavigatorBySlideId = function (slideId) {
        for (let i = 0; i < this.sliderNavigators.length; i++) {
            const sliderNavigator = this.sliderNavigators.item(i);
            if (sliderNavigator.hash == (slideId)) {
                return sliderNavigator;
            }
        }

        return null;
    }

    Slider.prototype.getNextSlideId = function () {
        var nextIdIndicator = this.getCurrentIdIndicator() + 1;

        if (!this.cycleNavigation && nextIdIndicator > this.sliderNavigators.length) {
            return this.currentSlideId;
        } else if (nextIdIndicator > this.sliderNavigators.length) {
            nextIdIndicator = 1;
        }
        
        return '#' + SLIDE_ID_PREFIX + nextIdIndicator;
    }

    Slider.prototype.getPreviousSlideId = function () {
        var previousIdIndicator = this.getCurrentIdIndicator() - 1;

        if (!this.cycleNavigation && previousIdIndicator < 1) {
            return this.currentSlideId;
        } else if (previousIdIndicator < 1) {
            previousIdIndicator = this.sliderNavigators.length;
        }
        
        return '#' + SLIDE_ID_PREFIX + previousIdIndicator;
    }

    Slider.prototype.getCurrentIdIndicator = function () {
        var currentSlideIdParts = this.currentSlideId.split(SLIDE_ID_SEPARATOR);
        var lastSlideIndex = currentSlideIdParts.length - 1;
        return parseInt(currentSlideIdParts[lastSlideIndex], 10);
    }

    Slider.prototype.currentSlideIsLast = function () {
        if(this.sliderNavigators.length === 0) {
            throw new Error('ٔNo Slides in the slider container.');
        }

        var lastsliderNavigator = this.sliderNavigators.item(this.sliderNavigators.length - 1);
        return lastsliderNavigator.hash === this.currentSlideId;
    }

    Slider.prototype.currentSlideIsFirst = function () {
        if(this.sliderNavigators.length === 0) {
            throw new Error('ٔNo Slides in the slider container.');
        }

        var firstSliderNavigator = this.sliderNavigators.item(0);
        return firstSliderNavigator.hash === this.currentSlideId;
    }
    
    return Slider;
}());
