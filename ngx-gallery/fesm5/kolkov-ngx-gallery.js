import { __decorate, __spread, __extends } from 'tslib';
import { Renderer2, ɵɵdefineInjectable, ɵɵinject, Injectable, EventEmitter, ElementRef, ChangeDetectorRef, Input, Output, ViewChild, HostListener, Component, ChangeDetectionStrategy, HostBinding, ViewEncapsulation, NgModule } from '@angular/core';
import { DomSanitizer, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

var NgxGalleryService = /** @class */ (function () {
    function NgxGalleryService(renderer) {
        this.renderer = renderer;
        this.swipeHandlers = new Map();
    }
    NgxGalleryService.prototype.manageSwipe = function (status, element, id, nextHandler, prevHandler) {
        var handlers = this.getSwipeHandlers(id);
        // swipeleft and swiperight are available only if hammerjs is included
        try {
            if (status && !handlers) {
                this.swipeHandlers.set(id, [
                    this.renderer.listen(element.nativeElement, 'swipeleft', function () { return nextHandler(); }),
                    this.renderer.listen(element.nativeElement, 'swiperight', function () { return prevHandler(); })
                ]);
            }
            else if (!status && handlers) {
                handlers.map(function (handler) { return handler(); });
                this.removeSwipeHandlers(id);
            }
        }
        catch (e) {
        }
    };
    NgxGalleryService.prototype.validateUrl = function (url) {
        if (url.replace) {
            return url.replace(new RegExp(' ', 'g'), '%20')
                .replace(new RegExp('\'', 'g'), '%27');
        }
        else {
            return url;
        }
    };
    NgxGalleryService.prototype.getBackgroundUrl = function (image) {
        return 'url(\'' + this.validateUrl(image) + '\')';
    };
    NgxGalleryService.prototype.getFileType = function (fileSource) {
        var fileExtension = fileSource.split('.').pop().toLowerCase();
        if (fileExtension === 'avi' || fileExtension === 'flv'
            || fileExtension === 'wmv' || fileExtension === 'mov'
            || fileExtension === 'mp4') {
            return 'video';
        }
        return 'image';
    };
    NgxGalleryService.prototype.getSwipeHandlers = function (id) {
        return this.swipeHandlers.get(id);
    };
    NgxGalleryService.prototype.removeSwipeHandlers = function (id) {
        this.swipeHandlers.delete(id);
    };
    NgxGalleryService.ctorParameters = function () { return [
        { type: Renderer2 }
    ]; };
    NgxGalleryService.ɵprov = ɵɵdefineInjectable({ factory: function NgxGalleryService_Factory() { return new NgxGalleryService(ɵɵinject(Renderer2)); }, token: NgxGalleryService, providedIn: "root" });
    NgxGalleryService = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], NgxGalleryService);
    return NgxGalleryService;
}());

var NgxGalleryPreviewComponent = /** @class */ (function () {
    function NgxGalleryPreviewComponent(sanitization, elementRef, helperService, renderer, changeDetectorRef) {
        this.sanitization = sanitization;
        this.elementRef = elementRef;
        this.helperService = helperService;
        this.renderer = renderer;
        this.changeDetectorRef = changeDetectorRef;
        this.showSpinner = false;
        this.positionLeft = 0;
        this.positionTop = 0;
        this.zoomValue = 1;
        this.loading = false;
        this.rotateValue = 0;
        this.index = 0;
        this.previewOpen = new EventEmitter();
        this.previewClose = new EventEmitter();
        this.activeChange = new EventEmitter();
        this.isOpen = false;
        this.initialX = 0;
        this.initialY = 0;
        this.initialLeft = 0;
        this.initialTop = 0;
        this.isMove = false;
    }
    NgxGalleryPreviewComponent.prototype.ngOnInit = function () {
        if (this.arrows && this.arrowsAutoHide) {
            this.arrows = false;
        }
    };
    NgxGalleryPreviewComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes.swipe) {
            this.helperService.manageSwipe(this.swipe, this.elementRef, 'preview', function () { return _this.showNext(); }, function () { return _this.showPrev(); });
        }
    };
    NgxGalleryPreviewComponent.prototype.ngOnDestroy = function () {
        if (this.keyDownListener) {
            this.keyDownListener();
        }
    };
    NgxGalleryPreviewComponent.prototype.onMouseEnter = function () {
        if (this.arrowsAutoHide && !this.arrows) {
            this.arrows = true;
        }
    };
    NgxGalleryPreviewComponent.prototype.onMouseLeave = function () {
        if (this.arrowsAutoHide && this.arrows) {
            this.arrows = false;
        }
    };
    NgxGalleryPreviewComponent.prototype.onKeyDown = function (e) {
        if (this.isOpen) {
            if (this.keyboardNavigation) {
                if (this.isKeyboardPrev(e)) {
                    this.showPrev();
                }
                else if (this.isKeyboardNext(e)) {
                    this.showNext();
                }
            }
            if (this.closeOnEsc && this.isKeyboardEsc(e)) {
                this.close();
            }
        }
    };
    NgxGalleryPreviewComponent.prototype.open = function (index) {
        var _this = this;
        this.previewOpen.emit();
        this.index = index;
        this.isOpen = true;
        this.show(true);
        if (this.forceFullscreen) {
            this.manageFullscreen();
        }
        this.keyDownListener = this.renderer.listen('window', 'keydown', function (e) { return _this.onKeyDown(e); });
    };
    NgxGalleryPreviewComponent.prototype.close = function () {
        this.isOpen = false;
        this.closeFullscreen();
        this.previewClose.emit();
        this.stopAutoPlay();
        if (this.keyDownListener) {
            this.keyDownListener();
        }
    };
    NgxGalleryPreviewComponent.prototype.imageMouseEnter = function () {
        if (this.autoPlay && this.autoPlayPauseOnHover) {
            this.stopAutoPlay();
        }
    };
    NgxGalleryPreviewComponent.prototype.imageMouseLeave = function () {
        if (this.autoPlay && this.autoPlayPauseOnHover) {
            this.startAutoPlay();
        }
    };
    NgxGalleryPreviewComponent.prototype.startAutoPlay = function () {
        var _this = this;
        if (this.autoPlay) {
            this.stopAutoPlay();
            this.timer = setTimeout(function () {
                if (!_this.showNext()) {
                    _this.index = -1;
                    _this.showNext();
                }
            }, this.autoPlayInterval);
        }
    };
    NgxGalleryPreviewComponent.prototype.stopAutoPlay = function () {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    };
    NgxGalleryPreviewComponent.prototype.showAtIndex = function (index) {
        this.index = index;
        this.show();
    };
    NgxGalleryPreviewComponent.prototype.showNext = function () {
        if (this.canShowNext()) {
            this.index++;
            if (this.index === this.images.length) {
                this.index = 0;
            }
            this.show();
            return true;
        }
        else {
            return false;
        }
    };
    NgxGalleryPreviewComponent.prototype.showPrev = function () {
        if (this.canShowPrev()) {
            this.index--;
            if (this.index < 0) {
                this.index = this.images.length - 1;
            }
            this.show();
        }
    };
    NgxGalleryPreviewComponent.prototype.canShowNext = function () {
        if (this.loading) {
            return false;
        }
        else if (this.images) {
            return this.infinityMove || this.index < this.images.length - 1;
        }
        else {
            return false;
        }
    };
    NgxGalleryPreviewComponent.prototype.canShowPrev = function () {
        if (this.loading) {
            return false;
        }
        else if (this.images) {
            return this.infinityMove || this.index > 0;
        }
        else {
            return false;
        }
    };
    NgxGalleryPreviewComponent.prototype.manageFullscreen = function () {
        if (this.fullscreen || this.forceFullscreen) {
            var doc = document;
            if (!doc.fullscreenElement && !doc.mozFullScreenElement
                && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
                this.openFullscreen();
            }
            else {
                this.closeFullscreen();
            }
        }
    };
    NgxGalleryPreviewComponent.prototype.getSafeUrl = function (image) {
        return this.sanitization.bypassSecurityTrustUrl(image);
    };
    NgxGalleryPreviewComponent.prototype.getFileType = function (fileSource) {
        return this.helperService.getFileType(fileSource);
    };
    NgxGalleryPreviewComponent.prototype.zoomIn = function () {
        if (this.canZoomIn()) {
            this.zoomValue += this.zoomStep;
            if (this.zoomValue > this.zoomMax) {
                this.zoomValue = this.zoomMax;
            }
        }
    };
    NgxGalleryPreviewComponent.prototype.zoomOut = function () {
        if (this.canZoomOut()) {
            this.zoomValue -= this.zoomStep;
            if (this.zoomValue < this.zoomMin) {
                this.zoomValue = this.zoomMin;
            }
            if (this.zoomValue <= 1) {
                this.resetPosition();
            }
        }
    };
    NgxGalleryPreviewComponent.prototype.rotateLeft = function () {
        this.rotateValue -= 90;
    };
    NgxGalleryPreviewComponent.prototype.rotateRight = function () {
        this.rotateValue += 90;
    };
    NgxGalleryPreviewComponent.prototype.getTransform = function () {
        return this.sanitization.bypassSecurityTrustStyle('scale(' + this.zoomValue + ') rotate(' + this.rotateValue + 'deg)');
    };
    NgxGalleryPreviewComponent.prototype.canZoomIn = function () {
        return this.zoomValue < this.zoomMax;
    };
    NgxGalleryPreviewComponent.prototype.canZoomOut = function () {
        return this.zoomValue > this.zoomMin;
    };
    NgxGalleryPreviewComponent.prototype.canDragOnZoom = function () {
        return this.zoom && this.zoomValue > 1;
    };
    NgxGalleryPreviewComponent.prototype.mouseDownHandler = function (e) {
        if (this.canDragOnZoom()) {
            this.initialX = this.getClientX(e);
            this.initialY = this.getClientY(e);
            this.initialLeft = this.positionLeft;
            this.initialTop = this.positionTop;
            this.isMove = true;
            e.preventDefault();
        }
    };
    NgxGalleryPreviewComponent.prototype.mouseUpHandler = function (e) {
        this.isMove = false;
    };
    NgxGalleryPreviewComponent.prototype.mouseMoveHandler = function (e) {
        if (this.isMove) {
            this.positionLeft = this.initialLeft + (this.getClientX(e) - this.initialX);
            this.positionTop = this.initialTop + (this.getClientY(e) - this.initialY);
        }
    };
    NgxGalleryPreviewComponent.prototype.getClientX = function (e) {
        return e.touches && e.touches.length ? e.touches[0].clientX : e.clientX;
    };
    NgxGalleryPreviewComponent.prototype.getClientY = function (e) {
        return e.touches && e.touches.length ? e.touches[0].clientY : e.clientY;
    };
    NgxGalleryPreviewComponent.prototype.resetPosition = function () {
        if (this.zoom) {
            this.positionLeft = 0;
            this.positionTop = 0;
        }
    };
    NgxGalleryPreviewComponent.prototype.isKeyboardNext = function (e) {
        return e.keyCode === 39;
    };
    NgxGalleryPreviewComponent.prototype.isKeyboardPrev = function (e) {
        return e.keyCode === 37;
    };
    NgxGalleryPreviewComponent.prototype.isKeyboardEsc = function (e) {
        return e.keyCode === 27;
    };
    NgxGalleryPreviewComponent.prototype.openFullscreen = function () {
        var element = document.documentElement;
        if (element.requestFullscreen) {
            element.requestFullscreen();
        }
        else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
        else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        }
        else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        }
    };
    NgxGalleryPreviewComponent.prototype.closeFullscreen = function () {
        if (this.isFullscreen()) {
            var doc = document;
            if (doc.exitFullscreen) {
                doc.exitFullscreen();
            }
            else if (doc.msExitFullscreen) {
                doc.msExitFullscreen();
            }
            else if (doc.mozCancelFullScreen) {
                doc.mozCancelFullScreen();
            }
            else if (doc.webkitExitFullscreen) {
                doc.webkitExitFullscreen();
            }
        }
    };
    NgxGalleryPreviewComponent.prototype.isFullscreen = function () {
        var doc = document;
        return doc.fullscreenElement || doc.webkitFullscreenElement
            || doc.mozFullScreenElement || doc.msFullscreenElement;
    };
    NgxGalleryPreviewComponent.prototype.show = function (first) {
        var _this = this;
        if (first === void 0) { first = false; }
        this.loading = true;
        this.stopAutoPlay();
        this.activeChange.emit(this.index);
        if (first || !this.animation) {
            this._show();
        }
        else {
            setTimeout(function () { return _this._show(); }, 600);
        }
    };
    NgxGalleryPreviewComponent.prototype._show = function () {
        var _this = this;
        this.zoomValue = 1;
        this.rotateValue = 0;
        this.resetPosition();
        this.src = this.getSafeUrl(this.images[this.index]);
        this.type = this.getFileType(this.images[this.index]);
        this.srcIndex = this.index;
        this.description = this.descriptions[this.index];
        this.changeDetectorRef.markForCheck();
        setTimeout(function () {
            if (_this.isLoaded(_this.previewImage.nativeElement) || _this.type === 'video') {
                _this.loading = false;
                _this.startAutoPlay();
                _this.changeDetectorRef.markForCheck();
            }
            else if (_this.type === 'video') {
            }
            else {
                setTimeout(function () {
                    if (_this.loading) {
                        _this.showSpinner = true;
                        _this.changeDetectorRef.markForCheck();
                    }
                });
                _this.previewImage.nativeElement.onload = function () {
                    _this.loading = false;
                    _this.showSpinner = false;
                    _this.previewImage.nativeElement.onload = null;
                    _this.startAutoPlay();
                    _this.changeDetectorRef.markForCheck();
                };
            }
        });
    };
    NgxGalleryPreviewComponent.prototype.isLoaded = function (img) {
        if (!img.complete) {
            return false;
        }
        return !(typeof img.naturalWidth !== 'undefined' && img.naturalWidth === 0);
    };
    NgxGalleryPreviewComponent.ctorParameters = function () { return [
        { type: DomSanitizer },
        { type: ElementRef },
        { type: NgxGalleryService },
        { type: Renderer2 },
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input()
    ], NgxGalleryPreviewComponent.prototype, "images", void 0);
    __decorate([
        Input()
    ], NgxGalleryPreviewComponent.prototype, "descriptions", void 0);
    __decorate([
        Input()
    ], NgxGalleryPreviewComponent.prototype, "showDescription", void 0);
    __decorate([
        Input()
    ], NgxGalleryPreviewComponent.prototype, "arrows", void 0);
    __decorate([
        Input()
    ], NgxGalleryPreviewComponent.prototype, "arrowsAutoHide", void 0);
    __decorate([
        Input()
    ], NgxGalleryPreviewComponent.prototype, "swipe", void 0);
    __decorate([
        Input()
    ], NgxGalleryPreviewComponent.prototype, "fullscreen", void 0);
    __decorate([
        Input()
    ], NgxGalleryPreviewComponent.prototype, "forceFullscreen", void 0);
    __decorate([
        Input()
    ], NgxGalleryPreviewComponent.prototype, "closeOnClick", void 0);
    __decorate([
        Input()
    ], NgxGalleryPreviewComponent.prototype, "closeOnEsc", void 0);
    __decorate([
        Input()
    ], NgxGalleryPreviewComponent.prototype, "keyboardNavigation", void 0);
    __decorate([
        Input()
    ], NgxGalleryPreviewComponent.prototype, "arrowPrevIcon", void 0);
    __decorate([
        Input()
    ], NgxGalleryPreviewComponent.prototype, "arrowNextIcon", void 0);
    __decorate([
        Input()
    ], NgxGalleryPreviewComponent.prototype, "closeIcon", void 0);
    __decorate([
        Input()
    ], NgxGalleryPreviewComponent.prototype, "fullscreenIcon", void 0);
    __decorate([
        Input()
    ], NgxGalleryPreviewComponent.prototype, "spinnerIcon", void 0);
    __decorate([
        Input()
    ], NgxGalleryPreviewComponent.prototype, "autoPlay", void 0);
    __decorate([
        Input()
    ], NgxGalleryPreviewComponent.prototype, "autoPlayInterval", void 0);
    __decorate([
        Input()
    ], NgxGalleryPreviewComponent.prototype, "autoPlayPauseOnHover", void 0);
    __decorate([
        Input()
    ], NgxGalleryPreviewComponent.prototype, "infinityMove", void 0);
    __decorate([
        Input()
    ], NgxGalleryPreviewComponent.prototype, "zoom", void 0);
    __decorate([
        Input()
    ], NgxGalleryPreviewComponent.prototype, "zoomStep", void 0);
    __decorate([
        Input()
    ], NgxGalleryPreviewComponent.prototype, "zoomMax", void 0);
    __decorate([
        Input()
    ], NgxGalleryPreviewComponent.prototype, "zoomMin", void 0);
    __decorate([
        Input()
    ], NgxGalleryPreviewComponent.prototype, "zoomInIcon", void 0);
    __decorate([
        Input()
    ], NgxGalleryPreviewComponent.prototype, "zoomOutIcon", void 0);
    __decorate([
        Input()
    ], NgxGalleryPreviewComponent.prototype, "animation", void 0);
    __decorate([
        Input()
    ], NgxGalleryPreviewComponent.prototype, "actions", void 0);
    __decorate([
        Input()
    ], NgxGalleryPreviewComponent.prototype, "rotate", void 0);
    __decorate([
        Input()
    ], NgxGalleryPreviewComponent.prototype, "rotateLeftIcon", void 0);
    __decorate([
        Input()
    ], NgxGalleryPreviewComponent.prototype, "rotateRightIcon", void 0);
    __decorate([
        Input()
    ], NgxGalleryPreviewComponent.prototype, "download", void 0);
    __decorate([
        Input()
    ], NgxGalleryPreviewComponent.prototype, "downloadIcon", void 0);
    __decorate([
        Input()
    ], NgxGalleryPreviewComponent.prototype, "bullets", void 0);
    __decorate([
        Output()
    ], NgxGalleryPreviewComponent.prototype, "previewOpen", void 0);
    __decorate([
        Output()
    ], NgxGalleryPreviewComponent.prototype, "previewClose", void 0);
    __decorate([
        Output()
    ], NgxGalleryPreviewComponent.prototype, "activeChange", void 0);
    __decorate([
        ViewChild('previewImage')
    ], NgxGalleryPreviewComponent.prototype, "previewImage", void 0);
    __decorate([
        HostListener('mouseenter')
    ], NgxGalleryPreviewComponent.prototype, "onMouseEnter", null);
    __decorate([
        HostListener('mouseleave')
    ], NgxGalleryPreviewComponent.prototype, "onMouseLeave", null);
    NgxGalleryPreviewComponent = __decorate([
        Component({
            selector: 'ngx-gallery-preview',
            template: "<ngx-gallery-arrows *ngIf=\"arrows\" (prevClick)=\"showPrev()\" (nextClick)=\"showNext()\" [prevDisabled]=\"!canShowPrev()\"\n                    [nextDisabled]=\"!canShowNext()\" [arrowPrevIcon]=\"arrowPrevIcon\"\n                    [arrowNextIcon]=\"arrowNextIcon\"></ngx-gallery-arrows>\n<div class=\"ngx-gallery-preview-top\">\n  <div class=\"ngx-gallery-preview-icons\">\n    <ngx-gallery-action *ngFor=\"let action of actions\" [icon]=\"action.icon\" [disabled]=\"action.disabled\"\n                        [titleText]=\"action.titleText\" (closeClick)=\"action.onClick($event, index)\"></ngx-gallery-action>\n    <a *ngIf=\"download && src\" [href]=\"src\" class=\"ngx-gallery-icon\" aria-hidden=\"true\" download>\n      <i class=\"ngx-gallery-icon-content {{ downloadIcon }}\"></i>\n    </a>\n    <ngx-gallery-action *ngIf=\"zoom\" [icon]=\"zoomOutIcon\" [disabled]=\"!canZoomOut()\"\n                        (closeClick)=\"zoomOut()\"></ngx-gallery-action>\n    <ngx-gallery-action *ngIf=\"zoom\" [icon]=\"zoomInIcon\" [disabled]=\"!canZoomIn()\"\n                        (closeClick)=\"zoomIn()\"></ngx-gallery-action>\n    <ngx-gallery-action *ngIf=\"rotate\" [icon]=\"rotateLeftIcon\" (closeClick)=\"rotateLeft()\"></ngx-gallery-action>\n    <ngx-gallery-action *ngIf=\"rotate\" [icon]=\"rotateRightIcon\" (closeClick)=\"rotateRight()\"></ngx-gallery-action>\n    <ngx-gallery-action *ngIf=\"fullscreen\" [icon]=\"'ngx-gallery-fullscreen ' + fullscreenIcon\"\n                        (closeClick)=\"manageFullscreen()\"></ngx-gallery-action>\n    <ngx-gallery-action [icon]=\"'ngx-gallery-close ' + closeIcon\" (closeClick)=\"close()\"></ngx-gallery-action>\n  </div>\n</div>\n<div class=\"ngx-spinner-wrapper ngx-gallery-center\" [class.ngx-gallery-active]=\"showSpinner\">\n  <i class=\"ngx-gallery-icon ngx-gallery-spinner {{spinnerIcon}}\" aria-hidden=\"true\"></i>\n</div>\n<div class=\"ngx-gallery-preview-wrapper\" (click)=\"closeOnClick && close()\" (mouseup)=\"mouseUpHandler($event)\"\n     (mousemove)=\"mouseMoveHandler($event)\" (touchend)=\"mouseUpHandler($event)\" (touchmove)=\"mouseMoveHandler($event)\">\n  <div class=\"ngx-gallery-preview-img-wrapper\">\n    <img *ngIf=\"src && type == 'image'\" #previewImage class=\"ngx-gallery-preview-img ngx-gallery-center\" [src]=\"src\"\n         (click)=\"$event.stopPropagation()\" (mouseenter)=\"imageMouseEnter()\" (mouseleave)=\"imageMouseLeave()\"\n         (mousedown)=\"mouseDownHandler($event)\" (touchstart)=\"mouseDownHandler($event)\"\n         [class.ngx-gallery-active]=\"!loading\" [class.animation]=\"animation\" [class.ngx-gallery-grab]=\"canDragOnZoom()\"\n         [style.transform]=\"getTransform()\" [style.left]=\"positionLeft + 'px'\" [style.top]=\"positionTop + 'px'\"/>\n    <video *ngIf=\"src && type == 'video'\"  #previewImage controls style=\"width: 100%; height: 100%;\"\n    class=\"ngx-gallery-preview-img ngx-gallery-center\"\n    (click)=\"$event.stopPropagation()\" (mouseenter)=\"imageMouseEnter()\" (mouseleave)=\"imageMouseLeave()\" (mousedown)=\"mouseDownHandler($event)\" (touchstart)=\"mouseDownHandler($event)\"\n    [class.ngx-gallery-active]=\"!loading\" [class.animation]=\"animation\" [class.ngx-gallery-grab]=\"canDragOnZoom()\" [style.transform]=\"getTransform()\" [style.left]=\"positionLeft + 'px'\" [style.top]=\"positionTop + 'px'\">\n      <source [src]=\"src\">\n      Your browser does not support the video tag.\n    </video>\n    <ngx-gallery-bullets *ngIf=\"bullets\" [count]=\"images.length\" [active]=\"index\"\n                         (bulletChange)=\"showAtIndex($event)\"></ngx-gallery-bullets>\n  </div>\n  <div class=\"ngx-gallery-preview-text\" *ngIf=\"showDescription && description\" [innerHTML]=\"description\"\n       (click)=\"$event.stopPropagation()\"></div>\n</div>\n",
            // encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [":host.ngx-gallery-active{width:100%;height:100%;position:fixed;left:0;top:0;background:rgba(0,0,0,.7);z-index:10000;display:inline-block;font-size:50px!important}:host{display:none;font-size:50px!important}:host .ngx-gallery-arrow{font-size:50px!important}ngx-gallery-bullets{height:5%;align-items:center;padding:0}.ngx-gallery-preview-img{opacity:0;max-width:90%;max-height:90%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transition:transform .5s}.ngx-gallery-preview-img.animation{transition:opacity .5s linear,transform .5s}.ngx-gallery-preview-img.ngx-gallery-active{opacity:1}.ngx-gallery-preview-img.ngx-gallery-grab{cursor:-webkit-grab;cursor:grab}.ngx-gallery-icon.ngx-gallery-spinner{font-size:50px;left:0;display:inline-block}:host .ngx-gallery-preview-top{position:absolute;width:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;font-size:25px}.ngx-gallery-preview-icons{float:right}.ngx-gallery-preview-icons .ngx-gallery-icon{position:relative;margin-right:10px;margin-top:10px;font-size:25px;cursor:pointer;text-decoration:none}.ngx-gallery-preview-icons .ngx-gallery-icon.ngx-gallery-icon-disabled{cursor:default;opacity:.4}.ngx-spinner-wrapper{width:50px;height:50px;display:none}.ngx-spinner-wrapper.ngx-gallery-active{display:inline-block}.ngx-gallery-center{position:absolute;left:0;right:0;bottom:0;margin:auto;top:0}.ngx-gallery-preview-text{width:100%;background:rgba(0,0,0,.7);padding:10px;text-align:center;color:#fff;font-size:16px;flex:0 1 auto;z-index:10}.ngx-gallery-preview-wrapper{width:100%;height:100%;display:flex;flex-flow:column}.ngx-gallery-preview-img-wrapper{flex:1 1 auto;position:relative}"]
        })
    ], NgxGalleryPreviewComponent);
    return NgxGalleryPreviewComponent;
}());

var NgxGalleryAnimation = /** @class */ (function () {
    function NgxGalleryAnimation() {
    }
    NgxGalleryAnimation.Fade = 'fade';
    NgxGalleryAnimation.Slide = 'slide';
    NgxGalleryAnimation.Rotate = 'rotate';
    NgxGalleryAnimation.Zoom = 'zoom';
    return NgxGalleryAnimation;
}());

var NgxGalleryImageComponent = /** @class */ (function () {
    function NgxGalleryImageComponent(sanitization, elementRef, helperService) {
        this.sanitization = sanitization;
        this.elementRef = elementRef;
        this.helperService = helperService;
        this.imageClick = new EventEmitter();
        this.activeChange = new EventEmitter();
        this.canChangeImage = true;
    }
    // @HostBinding('style.display') public display = 'inline-block';
    // @HostBinding('style.background-color') public color = 'lime';
    NgxGalleryImageComponent.prototype.ngOnInit = function () {
        if (this.arrows && this.arrowsAutoHide) {
            this.arrows = false;
        }
        if (this.autoPlay) {
            this.startAutoPlay();
        }
    };
    NgxGalleryImageComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes.swipe) {
            this.helperService.manageSwipe(this.swipe, this.elementRef, 'image', function () { return _this.showNext(); }, function () { return _this.showPrev(); });
        }
    };
    NgxGalleryImageComponent.prototype.onMouseEnter = function () {
        if (this.arrowsAutoHide && !this.arrows) {
            this.arrows = true;
        }
        if (this.autoPlay && this.autoPlayPauseOnHover) {
            this.stopAutoPlay();
        }
    };
    NgxGalleryImageComponent.prototype.onMouseLeave = function () {
        if (this.arrowsAutoHide && this.arrows) {
            this.arrows = false;
        }
        if (this.autoPlay && this.autoPlayPauseOnHover) {
            this.startAutoPlay();
        }
    };
    NgxGalleryImageComponent.prototype.reset = function (index) {
        this.selectedIndex = index;
    };
    NgxGalleryImageComponent.prototype.getImages = function () {
        if (!this.images) {
            return [];
        }
        if (this.lazyLoading) {
            var indexes_1 = [this.selectedIndex];
            var prevIndex = this.selectedIndex - 1;
            if (prevIndex === -1 && this.infinityMove) {
                indexes_1.push(this.images.length - 1);
            }
            else if (prevIndex >= 0) {
                indexes_1.push(prevIndex);
            }
            var nextIndex = this.selectedIndex + 1;
            if (nextIndex === this.images.length && this.infinityMove) {
                indexes_1.push(0);
            }
            else if (nextIndex < this.images.length) {
                indexes_1.push(nextIndex);
            }
            return this.images.filter(function (img, i) { return indexes_1.indexOf(i) !== -1; });
        }
        else {
            return this.images;
        }
    };
    NgxGalleryImageComponent.prototype.startAutoPlay = function () {
        var _this = this;
        this.stopAutoPlay();
        this.timer = setInterval(function () {
            if (!_this.showNext()) {
                _this.selectedIndex = -1;
                _this.showNext();
            }
        }, this.autoPlayInterval);
    };
    NgxGalleryImageComponent.prototype.stopAutoPlay = function () {
        if (this.timer) {
            clearInterval(this.timer);
        }
    };
    NgxGalleryImageComponent.prototype.handleClick = function (event, index) {
        if (this.clickable) {
            this.imageClick.emit(index);
            event.stopPropagation();
            event.preventDefault();
        }
    };
    NgxGalleryImageComponent.prototype.show = function (index) {
        this.selectedIndex = index;
        this.activeChange.emit(this.selectedIndex);
        this.setChangeTimeout();
    };
    NgxGalleryImageComponent.prototype.showNext = function () {
        if (this.canShowNext() && this.canChangeImage) {
            this.selectedIndex++;
            if (this.selectedIndex === this.images.length) {
                this.selectedIndex = 0;
            }
            this.activeChange.emit(this.selectedIndex);
            this.setChangeTimeout();
            return true;
        }
        else {
            return false;
        }
    };
    NgxGalleryImageComponent.prototype.showPrev = function () {
        if (this.canShowPrev() && this.canChangeImage) {
            this.selectedIndex--;
            if (this.selectedIndex < 0) {
                this.selectedIndex = this.images.length - 1;
            }
            this.activeChange.emit(this.selectedIndex);
            this.setChangeTimeout();
        }
    };
    NgxGalleryImageComponent.prototype.setChangeTimeout = function () {
        var _this = this;
        this.canChangeImage = false;
        var timeout = 1000;
        if (this.animation === NgxGalleryAnimation.Slide
            || this.animation === NgxGalleryAnimation.Fade) {
            timeout = 500;
        }
        setTimeout(function () {
            _this.canChangeImage = true;
        }, timeout);
    };
    NgxGalleryImageComponent.prototype.canShowNext = function () {
        if (this.images) {
            return this.infinityMove || this.selectedIndex < this.images.length - 1;
        }
        else {
            return false;
        }
    };
    NgxGalleryImageComponent.prototype.canShowPrev = function () {
        if (this.images) {
            return this.infinityMove || this.selectedIndex > 0;
        }
        else {
            return false;
        }
    };
    NgxGalleryImageComponent.prototype.getSafeUrl = function (image) {
        return this.sanitization.bypassSecurityTrustStyle(this.helperService.getBackgroundUrl(image));
    };
    NgxGalleryImageComponent.prototype.getFileType = function (fileSource) {
        return this.helperService.getFileType(fileSource);
    };
    NgxGalleryImageComponent.ctorParameters = function () { return [
        { type: DomSanitizer },
        { type: ElementRef },
        { type: NgxGalleryService }
    ]; };
    __decorate([
        Input()
    ], NgxGalleryImageComponent.prototype, "images", void 0);
    __decorate([
        Input()
    ], NgxGalleryImageComponent.prototype, "clickable", void 0);
    __decorate([
        Input()
    ], NgxGalleryImageComponent.prototype, "selectedIndex", void 0);
    __decorate([
        Input()
    ], NgxGalleryImageComponent.prototype, "arrows", void 0);
    __decorate([
        Input()
    ], NgxGalleryImageComponent.prototype, "arrowsAutoHide", void 0);
    __decorate([
        Input()
    ], NgxGalleryImageComponent.prototype, "swipe", void 0);
    __decorate([
        Input()
    ], NgxGalleryImageComponent.prototype, "animation", void 0);
    __decorate([
        Input()
    ], NgxGalleryImageComponent.prototype, "size", void 0);
    __decorate([
        Input()
    ], NgxGalleryImageComponent.prototype, "arrowPrevIcon", void 0);
    __decorate([
        Input()
    ], NgxGalleryImageComponent.prototype, "arrowNextIcon", void 0);
    __decorate([
        Input()
    ], NgxGalleryImageComponent.prototype, "autoPlay", void 0);
    __decorate([
        Input()
    ], NgxGalleryImageComponent.prototype, "autoPlayInterval", void 0);
    __decorate([
        Input()
    ], NgxGalleryImageComponent.prototype, "autoPlayPauseOnHover", void 0);
    __decorate([
        Input()
    ], NgxGalleryImageComponent.prototype, "infinityMove", void 0);
    __decorate([
        Input()
    ], NgxGalleryImageComponent.prototype, "lazyLoading", void 0);
    __decorate([
        Input()
    ], NgxGalleryImageComponent.prototype, "actions", void 0);
    __decorate([
        Input()
    ], NgxGalleryImageComponent.prototype, "descriptions", void 0);
    __decorate([
        Input()
    ], NgxGalleryImageComponent.prototype, "showDescription", void 0);
    __decorate([
        Input()
    ], NgxGalleryImageComponent.prototype, "bullets", void 0);
    __decorate([
        Output()
    ], NgxGalleryImageComponent.prototype, "imageClick", void 0);
    __decorate([
        Output()
    ], NgxGalleryImageComponent.prototype, "activeChange", void 0);
    __decorate([
        HostListener('mouseenter')
    ], NgxGalleryImageComponent.prototype, "onMouseEnter", null);
    __decorate([
        HostListener('mouseleave')
    ], NgxGalleryImageComponent.prototype, "onMouseLeave", null);
    NgxGalleryImageComponent = __decorate([
        Component({
            selector: 'ngx-gallery-image',
            template: "<div class=\"ngx-gallery-image-wrapper ngx-gallery-animation-{{animation}} ngx-gallery-image-size-{{size}}\">\n  <div *ngFor=\"let image of getImages(); let i = index;\">\n\n    \n    <div *ngIf=\"image.type === 'image'\" class=\"ngx-gallery-image\"\n        [ngClass]=\"{ 'ngx-gallery-active': selectedIndex == image.index,\n          'ngx-gallery-inactive-left': selectedIndex > image.index,\n          'ngx-gallery-inactive-right': selectedIndex < image.index,\n            'ngx-gallery-clickable': clickable }\"\n        [style.background-image]=\"getSafeUrl(image.src)\" (click)=\"handleClick($event, image.index)\">\n      <div class=\"ngx-gallery-icons-wrapper\">\n        <ngx-gallery-action *ngFor=\"let action of actions\" [icon]=\"action.icon\" [disabled]=\"action.disabled\"\n                            [titleText]=\"action.titleText\"\n                            (closeClick)=\"action.onClick($event, image.index)\"></ngx-gallery-action>\n      </div>\n      <div class=\"ngx-gallery-image-text\" *ngIf=\"showDescription && descriptions[image.index]\"\n          [innerHTML]=\"descriptions[image.index]\" (click)=\"$event.stopPropagation()\"></div>\n    </div>\n  </div>\n  <div *ngFor=\"let image of getImages(); let i = index;\">\n    <div *ngIf=\"image.type === 'video'\" class=\"ngx-gallery-image\" \n    [ngClass]=\"{ 'ngx-gallery-active': selectedIndex == image.index,\n    'ngx-gallery-inactive-left': selectedIndex > image.index,\n      'ngx-gallery-inactive-right': selectedIndex < image.index,\n      'ngx-gallery-clickable': clickable }\"\n    (click)=\"handleClick($event, image.index)\">\n      <video controls style=\"width:100%; height:100%; background: #000;\">\n        <source [src]=\"image.src\">\n          Your browser does not support the video tag.\n      </video>\n      <div class=\"ngx-gallery-icons-wrapper\">\n      <ngx-gallery-action *ngFor=\"let action of actions\" [icon]=\"action.icon\" [disabled]=\"action.disabled\"\n                          [titleText]=\"action.titleText\"\n                          (closeClick)=\"action.onClick($event, image.index)\"></ngx-gallery-action>\n      </div>\n      <div class=\"ngx-gallery-image-text\" *ngIf=\"showDescription && descriptions[image.index]\"\n          [innerHTML]=\"descriptions[image.index]\" (click)=\"$event.stopPropagation()\"></div>\n      </div>\n    </div>\n  </div>\n<ngx-gallery-bullets *ngIf=\"bullets\" [count]=\"images.length\" [active]=\"selectedIndex\"\n                     (bulletChange)=\"show($event)\"></ngx-gallery-bullets>\n<ngx-gallery-arrows class=\"ngx-gallery-image-size-{{size}}\" *ngIf=\"arrows\" (prevClick)=\"showPrev()\"\n                    (nextClick)=\"showNext()\" [prevDisabled]=\"!canShowPrev()\" [nextDisabled]=\"!canShowNext()\"\n                    [arrowPrevIcon]=\"arrowPrevIcon\" [arrowNextIcon]=\"arrowNextIcon\"></ngx-gallery-arrows>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [":host{width:100%;display:inline-block;position:relative;font-size:25px}.ngx-gallery-image-wrapper{width:100%;height:100%;position:absolute;left:0;top:0;overflow:hidden}.ngx-gallery-image{background-position:center;background-repeat:no-repeat;height:100%;width:100%;position:absolute;top:0}.ngx-gallery-image-size-cover .ngx-gallery-image{background-size:cover}.ngx-gallery-image-size-contain .ngx-gallery-image{background-size:contain}.ngx-gallery-animation-fade .ngx-gallery-image{left:0;opacity:0;transition:.5s ease-in-out}.ngx-gallery-animation-fade .ngx-gallery-image.ngx-gallery-active{opacity:1}.ngx-gallery-animation-slide .ngx-gallery-image{transition:.5s ease-in-out}.ngx-gallery-animation-slide .ngx-gallery-image.ngx-gallery-active{transform:translateX(0)}.ngx-gallery-animation-slide .ngx-gallery-image.ngx-gallery-inactive-left{transform:translateX(-100%)}.ngx-gallery-animation-slide .ngx-gallery-image.ngx-gallery-inactive-right{transform:translateX(100%)}.ngx-gallery-animation-rotate .ngx-gallery-image{transition:1s;transform:scale(3.5,3.5) rotate(90deg);left:0;opacity:0}.ngx-gallery-animation-rotate .ngx-gallery-image.ngx-gallery-active{transform:scale(1,1) rotate(0);opacity:1}.ngx-gallery-animation-zoom .ngx-gallery-image{transition:1s;transform:scale(2.5,2.5);left:0;opacity:0}.ngx-gallery-animation-zoom .ngx-gallery-image.ngx-gallery-active{transform:scale(1,1);opacity:1}.ngx-gallery-image-text{width:100%;background:rgba(0,0,0,.7);padding:10px;text-align:center;color:#fff;font-size:16px;position:absolute;bottom:0;z-index:10}"]
        })
    ], NgxGalleryImageComponent);
    return NgxGalleryImageComponent;
}());

var NgxGalleryOrder = /** @class */ (function () {
    function NgxGalleryOrder() {
    }
    NgxGalleryOrder.Column = 1;
    NgxGalleryOrder.Row = 2;
    NgxGalleryOrder.Page = 3;
    return NgxGalleryOrder;
}());

var NgxGalleryThumbnailsComponent = /** @class */ (function () {
    function NgxGalleryThumbnailsComponent(sanitization, elementRef, helperService) {
        this.sanitization = sanitization;
        this.elementRef = elementRef;
        this.helperService = helperService;
        this.minStopIndex = 0;
        this.activeChange = new EventEmitter();
        this.index = 0;
    }
    NgxGalleryThumbnailsComponent.prototype.ngOnInit = function () {
    };
    NgxGalleryThumbnailsComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes.selectedIndex) {
            this.validateIndex();
        }
        if (changes.swipe) {
            this.helperService.manageSwipe(this.swipe, this.elementRef, 'thumbnails', function () { return _this.moveRight(); }, function () { return _this.moveLeft(); });
        }
        if (this.images) {
            this.remainingCountValue = this.images.length - (this.rows * this.columns);
        }
    };
    NgxGalleryThumbnailsComponent.prototype.onMouseEnter = function () {
        this.mouseenter = true;
    };
    NgxGalleryThumbnailsComponent.prototype.onMouseLeave = function () {
        this.mouseenter = false;
    };
    NgxGalleryThumbnailsComponent.prototype.reset = function (index) {
        this.selectedIndex = index;
        this.setDefaultPosition();
        this.index = 0;
        this.validateIndex();
    };
    NgxGalleryThumbnailsComponent.prototype.getImages = function () {
        if (!this.images) {
            return [];
        }
        if (this.remainingCount) {
            return this.images.slice(0, this.rows * this.columns);
        }
        else if (this.lazyLoading && this.order !== NgxGalleryOrder.Row) {
            var stopIndex = 0;
            if (this.order === NgxGalleryOrder.Column) {
                stopIndex = (this.index + this.columns + this.moveSize) * this.rows;
            }
            else if (this.order === NgxGalleryOrder.Page) {
                stopIndex = this.index + ((this.columns * this.rows) * 2);
            }
            if (stopIndex <= this.minStopIndex) {
                stopIndex = this.minStopIndex;
            }
            else {
                this.minStopIndex = stopIndex;
            }
            return this.images.slice(0, stopIndex);
        }
        else {
            return this.images;
        }
    };
    NgxGalleryThumbnailsComponent.prototype.handleClick = function (event, index) {
        if (!this.hasLink(index)) {
            this.selectedIndex = index;
            this.activeChange.emit(index);
            event.stopPropagation();
            event.preventDefault();
        }
    };
    NgxGalleryThumbnailsComponent.prototype.hasLink = function (index) {
        if (this.links && this.links.length && this.links[index]) {
            return true;
        }
    };
    NgxGalleryThumbnailsComponent.prototype.moveRight = function () {
        if (this.canMoveRight()) {
            this.index += this.moveSize;
            var maxIndex = this.getMaxIndex() - this.columns;
            if (this.index > maxIndex) {
                this.index = maxIndex;
            }
            this.setThumbnailsPosition();
        }
    };
    NgxGalleryThumbnailsComponent.prototype.moveLeft = function () {
        if (this.canMoveLeft()) {
            this.index -= this.moveSize;
            if (this.index < 0) {
                this.index = 0;
            }
            this.setThumbnailsPosition();
        }
    };
    NgxGalleryThumbnailsComponent.prototype.canMoveRight = function () {
        return this.index + this.columns < this.getMaxIndex();
    };
    NgxGalleryThumbnailsComponent.prototype.canMoveLeft = function () {
        return this.index !== 0;
    };
    NgxGalleryThumbnailsComponent.prototype.getThumbnailLeft = function (index) {
        var calculatedIndex;
        if (this.order === NgxGalleryOrder.Column) {
            calculatedIndex = Math.floor(index / this.rows);
        }
        else if (this.order === NgxGalleryOrder.Page) {
            calculatedIndex = (index % this.columns) + (Math.floor(index / (this.rows * this.columns)) * this.columns);
        }
        else if (this.order === NgxGalleryOrder.Row && this.remainingCount) {
            calculatedIndex = index % this.columns;
        }
        else {
            calculatedIndex = index % Math.ceil(this.images.length / this.rows);
        }
        return this.getThumbnailPosition(calculatedIndex, this.columns);
    };
    NgxGalleryThumbnailsComponent.prototype.getThumbnailTop = function (index) {
        var calculatedIndex;
        if (this.order === NgxGalleryOrder.Column) {
            calculatedIndex = index % this.rows;
        }
        else if (this.order === NgxGalleryOrder.Page) {
            calculatedIndex = Math.floor(index / this.columns) - (Math.floor(index / (this.rows * this.columns)) * this.rows);
        }
        else if (this.order === NgxGalleryOrder.Row && this.remainingCount) {
            calculatedIndex = Math.floor(index / this.columns);
        }
        else {
            calculatedIndex = Math.floor(index / Math.ceil(this.images.length / this.rows));
        }
        return this.getThumbnailPosition(calculatedIndex, this.rows);
    };
    NgxGalleryThumbnailsComponent.prototype.getThumbnailWidth = function () {
        return this.getThumbnailDimension(this.columns);
    };
    NgxGalleryThumbnailsComponent.prototype.getThumbnailHeight = function () {
        return this.getThumbnailDimension(this.rows);
    };
    NgxGalleryThumbnailsComponent.prototype.setThumbnailsPosition = function () {
        this.thumbnailsLeft = -((100 / this.columns) * this.index) + '%';
        this.thumbnailsMarginLeft = -((this.margin - (((this.columns - 1)
            * this.margin) / this.columns)) * this.index) + 'px';
    };
    NgxGalleryThumbnailsComponent.prototype.setDefaultPosition = function () {
        this.thumbnailsLeft = '0px';
        this.thumbnailsMarginLeft = '0px';
    };
    NgxGalleryThumbnailsComponent.prototype.canShowArrows = function () {
        if (this.remainingCount) {
            return false;
        }
        else {
            return this.arrows && this.images && this.images.length > this.getVisibleCount()
                && (!this.arrowsAutoHide || this.mouseenter);
        }
    };
    NgxGalleryThumbnailsComponent.prototype.validateIndex = function () {
        if (this.images) {
            var newIndex = void 0;
            if (this.order === NgxGalleryOrder.Column) {
                newIndex = Math.floor(this.selectedIndex / this.rows);
            }
            else {
                newIndex = this.selectedIndex % Math.ceil(this.images.length / this.rows);
            }
            if (this.remainingCount) {
                newIndex = 0;
            }
            if (newIndex < this.index || newIndex >= this.index + this.columns) {
                var maxIndex = this.getMaxIndex() - this.columns;
                this.index = newIndex > maxIndex ? maxIndex : newIndex;
                this.setThumbnailsPosition();
            }
        }
    };
    NgxGalleryThumbnailsComponent.prototype.getSafeUrl = function (image) {
        return this.sanitization.bypassSecurityTrustStyle(this.helperService.getBackgroundUrl(image));
    };
    NgxGalleryThumbnailsComponent.prototype.getFileType = function (fileSource) {
        return this.helperService.getFileType(fileSource);
    };
    NgxGalleryThumbnailsComponent.prototype.getThumbnailPosition = function (index, count) {
        return this.getSafeStyle('calc(' + ((100 / count) * index) + '% + '
            + ((this.margin - (((count - 1) * this.margin) / count)) * index) + 'px)');
    };
    NgxGalleryThumbnailsComponent.prototype.getThumbnailDimension = function (count) {
        if (this.margin !== 0) {
            return this.getSafeStyle('calc(' + (100 / count) + '% - '
                + (((count - 1) * this.margin) / count) + 'px)');
        }
        else {
            return this.getSafeStyle('calc(' + (100 / count) + '% + 1px)');
        }
    };
    NgxGalleryThumbnailsComponent.prototype.getMaxIndex = function () {
        if (this.order === NgxGalleryOrder.Page) {
            var maxIndex = (Math.floor(this.images.length / this.getVisibleCount()) * this.columns);
            if (this.images.length % this.getVisibleCount() > this.columns) {
                maxIndex += this.columns;
            }
            else {
                maxIndex += this.images.length % this.getVisibleCount();
            }
            return maxIndex;
        }
        else {
            return Math.ceil(this.images.length / this.rows);
        }
    };
    NgxGalleryThumbnailsComponent.prototype.getVisibleCount = function () {
        return this.columns * this.rows;
    };
    NgxGalleryThumbnailsComponent.prototype.getSafeStyle = function (value) {
        return this.sanitization.bypassSecurityTrustStyle(value);
    };
    NgxGalleryThumbnailsComponent.ctorParameters = function () { return [
        { type: DomSanitizer },
        { type: ElementRef },
        { type: NgxGalleryService }
    ]; };
    __decorate([
        Input()
    ], NgxGalleryThumbnailsComponent.prototype, "images", void 0);
    __decorate([
        Input()
    ], NgxGalleryThumbnailsComponent.prototype, "links", void 0);
    __decorate([
        Input()
    ], NgxGalleryThumbnailsComponent.prototype, "labels", void 0);
    __decorate([
        Input()
    ], NgxGalleryThumbnailsComponent.prototype, "linkTarget", void 0);
    __decorate([
        Input()
    ], NgxGalleryThumbnailsComponent.prototype, "columns", void 0);
    __decorate([
        Input()
    ], NgxGalleryThumbnailsComponent.prototype, "rows", void 0);
    __decorate([
        Input()
    ], NgxGalleryThumbnailsComponent.prototype, "arrows", void 0);
    __decorate([
        Input()
    ], NgxGalleryThumbnailsComponent.prototype, "arrowsAutoHide", void 0);
    __decorate([
        Input()
    ], NgxGalleryThumbnailsComponent.prototype, "margin", void 0);
    __decorate([
        Input()
    ], NgxGalleryThumbnailsComponent.prototype, "selectedIndex", void 0);
    __decorate([
        Input()
    ], NgxGalleryThumbnailsComponent.prototype, "clickable", void 0);
    __decorate([
        Input()
    ], NgxGalleryThumbnailsComponent.prototype, "swipe", void 0);
    __decorate([
        Input()
    ], NgxGalleryThumbnailsComponent.prototype, "size", void 0);
    __decorate([
        Input()
    ], NgxGalleryThumbnailsComponent.prototype, "arrowPrevIcon", void 0);
    __decorate([
        Input()
    ], NgxGalleryThumbnailsComponent.prototype, "arrowNextIcon", void 0);
    __decorate([
        Input()
    ], NgxGalleryThumbnailsComponent.prototype, "moveSize", void 0);
    __decorate([
        Input()
    ], NgxGalleryThumbnailsComponent.prototype, "order", void 0);
    __decorate([
        Input()
    ], NgxGalleryThumbnailsComponent.prototype, "remainingCount", void 0);
    __decorate([
        Input()
    ], NgxGalleryThumbnailsComponent.prototype, "lazyLoading", void 0);
    __decorate([
        Input()
    ], NgxGalleryThumbnailsComponent.prototype, "actions", void 0);
    __decorate([
        Output()
    ], NgxGalleryThumbnailsComponent.prototype, "activeChange", void 0);
    __decorate([
        HostListener('mouseenter')
    ], NgxGalleryThumbnailsComponent.prototype, "onMouseEnter", null);
    __decorate([
        HostListener('mouseleave')
    ], NgxGalleryThumbnailsComponent.prototype, "onMouseLeave", null);
    NgxGalleryThumbnailsComponent = __decorate([
        Component({
            selector: 'ngx-gallery-thumbnails',
            template: "<div class=\"ngx-gallery-thumbnails-wrapper ngx-gallery-thumbnail-size-{{size}}\">\n  <div class=\"ngx-gallery-thumbnails\" [style.transform]=\"'translateX(' + thumbnailsLeft + ')'\"\n       [style.marginLeft]=\"thumbnailsMarginLeft\">\n    <a [href]=\"hasLink(i) ? links[i] : '#'\" [target]=\"linkTarget\" class=\"ngx-gallery-thumbnail\"\n       *ngFor=\"let image of getImages(); let i = index;\"\n       (click)=\"handleClick($event, i)\" [style.width]=\"getThumbnailWidth()\" [style.height]=\"getThumbnailHeight()\"\n       [style.left]=\"getThumbnailLeft(i)\" [style.top]=\"getThumbnailTop(i)\"\n       [ngClass]=\"{ 'ngx-gallery-active': i == selectedIndex, 'ngx-gallery-clickable': clickable }\"\n       [attr.aria-label]=\"labels[i]\">\n       <div *ngIf=\"getFileType(image) == 'image'\" [style.background-image]=\"getSafeUrl(image)\" class=\"ngx-gallery-thumbnail\"\n       [ngClass]=\"{ 'ngx-gallery-active': i == selectedIndex, 'ngx-gallery-clickable': clickable }\"\n       style=\"width: 100%; height: 100%; position:absolute;\"></div>\n       <div *ngIf=\"getFileType(image) == 'video'\" class=\"ngx-gallery-thumbnail-video\">\n        <video  class=\"ngx-gallery-thumbnail\" [ngClass]=\"{ 'ngx-gallery-active': i == selectedIndex, 'ngx-gallery-clickable': clickable }\" \n        style=\"width: 100%; height: 100%; position:absolute; left:0; background:#000;\">\n        <source [src]=\"image\">\n          Your browser does not support the video tag.\n       </video>\n      </div>\n       <div class=\"ngx-gallery-icons-wrapper\">\n        <ngx-gallery-action *ngFor=\"let action of actions\" [icon]=\"action.icon\" [disabled]=\"action.disabled\"\n                            [titleText]=\"action.titleText\" (closeClick)=\"action.onClick($event, i)\"></ngx-gallery-action>\n      </div>\n      <div class=\"ngx-gallery-remaining-count-overlay\"\n           *ngIf=\"remainingCount && remainingCountValue && (i == (rows * columns) - 1)\">\n        <span class=\"ngx-gallery-remaining-count\">+{{remainingCountValue}}</span>\n      </div>\n    </a>\n  </div>\n</div>\n<ngx-gallery-arrows *ngIf=\"canShowArrows()\" (prevClick)=\"moveLeft()\" (nextClick)=\"moveRight()\"\n                    [prevDisabled]=\"!canMoveLeft()\" [nextDisabled]=\"!canMoveRight()\" [arrowPrevIcon]=\"arrowPrevIcon\"\n                    [arrowNextIcon]=\"arrowNextIcon\"></ngx-gallery-arrows>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: ["@charset \"UTF-8\";:host{width:100%;display:inline-block;position:relative;font-size:25px}.ngx-gallery-thumbnails-wrapper{width:100%;height:100%;position:absolute;overflow:hidden}.ngx-gallery-thumbnails{height:100%;width:100%;position:absolute;left:0;transform:translateX(0);transition:transform .5s ease-in-out;will-change:transform}.ngx-gallery-thumbnails .ngx-gallery-thumbnail{position:absolute;height:100%;background-position:center;background-repeat:no-repeat;text-decoration:none;border:1px double #000}.ngx-gallery-thumbnails .ngx-gallery-thumbnail .ngx-gallery-thumbnail-video::after{content:\"\uF144\";display:block;position:absolute;background:#0000;height:100%;width:100%;left:0;top:calc(50% - 20px);font-size:40px;color:#fff;margin:0;padding:0;font-family:fontawesome;text-shadow:0 4px 3px rgba(0,0,0,.4),0 8px 13px rgba(0,0,0,.1),0 18px 23px rgba(0,0,0,.1)}.ngx-gallery-thumbnails .ngx-gallery-thumbnail .img{background-size:cover;height:100%}.ngx-gallery-thumbnails .ngx-gallery-thumbnail.ngx-gallery-active{border:1px double #cc4548}.ngx-gallery-thumbnail-size-cover .ngx-gallery-thumbnails .ngx-gallery-thumbnail{background-size:cover}.ngx-gallery-thumbnail-size-contain .ngx-gallery-thumbnails .ngx-gallery-thumbnail{background-size:contain}.ngx-gallery-remaining-count-overlay{width:100%;height:100%;position:absolute;left:0;top:0;background-color:rgba(0,0,0,.4)}.ngx-gallery-remaining-count{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:#fff;font-size:30px}"]
        })
    ], NgxGalleryThumbnailsComponent);
    return NgxGalleryThumbnailsComponent;
}());

var NgxGalleryAction = /** @class */ (function () {
    function NgxGalleryAction(action) {
        this.icon = action.icon;
        this.disabled = action.disabled ? action.disabled : false;
        this.titleText = action.titleText ? action.titleText : '';
        this.onClick = action.onClick;
    }
    return NgxGalleryAction;
}());

var NgxGalleryLayout = /** @class */ (function () {
    function NgxGalleryLayout() {
    }
    NgxGalleryLayout.ThumbnailsTop = 'thumbnails-top';
    NgxGalleryLayout.ThumbnailsBottom = 'thumbnails-bottom';
    return NgxGalleryLayout;
}());

var NgxGalleryImageSize = /** @class */ (function () {
    function NgxGalleryImageSize() {
    }
    NgxGalleryImageSize.Cover = 'cover';
    NgxGalleryImageSize.Contain = 'contain';
    return NgxGalleryImageSize;
}());

var NgxGalleryOptions = /** @class */ (function () {
    function NgxGalleryOptions(obj) {
        var preventDefaults = obj.breakpoint === undefined ? false : true;
        function use(source, defaultValue) {
            return obj && (source !== undefined || preventDefaults) ? source : defaultValue;
        }
        this.breakpoint = use(obj.breakpoint, undefined);
        this.width = use(obj.width, '500px');
        this.height = use(obj.height, '400px');
        this.fullWidth = use(obj.fullWidth, false);
        this.layout = use(obj.layout, NgxGalleryLayout.ThumbnailsBottom);
        this.startIndex = use(obj.startIndex, 0);
        this.linkTarget = use(obj.linkTarget, '_blank');
        this.lazyLoading = use(obj.lazyLoading, true);
        this.image = use(obj.image, true);
        this.imagePercent = use(obj.imagePercent, 75);
        this.imageArrows = use(obj.imageArrows, true);
        this.imageArrowsAutoHide = use(obj.imageArrowsAutoHide, false);
        this.imageSwipe = use(obj.imageSwipe, false);
        this.imageAnimation = use(obj.imageAnimation, NgxGalleryAnimation.Fade);
        this.imageSize = use(obj.imageSize, NgxGalleryImageSize.Cover);
        this.imageAutoPlay = use(obj.imageAutoPlay, false);
        this.imageAutoPlayInterval = use(obj.imageAutoPlayInterval, 2000);
        this.imageAutoPlayPauseOnHover = use(obj.imageAutoPlayPauseOnHover, false);
        this.imageInfinityMove = use(obj.imageInfinityMove, false);
        if (obj && obj.imageActions && obj.imageActions.length) {
            obj.imageActions = obj.imageActions.map(function (action) { return new NgxGalleryAction(action); });
        }
        this.imageActions = use(obj.imageActions, []);
        this.imageDescription = use(obj.imageDescription, false);
        this.imageBullets = use(obj.imageBullets, false);
        this.thumbnails = use(obj.thumbnails, true);
        this.thumbnailsColumns = use(obj.thumbnailsColumns, 4);
        this.thumbnailsRows = use(obj.thumbnailsRows, 1);
        this.thumbnailsPercent = use(obj.thumbnailsPercent, 25);
        this.thumbnailsMargin = use(obj.thumbnailsMargin, 10);
        this.thumbnailsArrows = use(obj.thumbnailsArrows, true);
        this.thumbnailsArrowsAutoHide = use(obj.thumbnailsArrowsAutoHide, false);
        this.thumbnailsSwipe = use(obj.thumbnailsSwipe, false);
        this.thumbnailsMoveSize = use(obj.thumbnailsMoveSize, 1);
        this.thumbnailsOrder = use(obj.thumbnailsOrder, NgxGalleryOrder.Column);
        this.thumbnailsRemainingCount = use(obj.thumbnailsRemainingCount, false);
        this.thumbnailsAsLinks = use(obj.thumbnailsAsLinks, false);
        this.thumbnailsAutoHide = use(obj.thumbnailsAutoHide, false);
        this.thumbnailMargin = use(obj.thumbnailMargin, 10);
        this.thumbnailSize = use(obj.thumbnailSize, NgxGalleryImageSize.Cover);
        if (obj && obj.thumbnailActions && obj.thumbnailActions.length) {
            obj.thumbnailActions = obj.thumbnailActions.map(function (action) { return new NgxGalleryAction(action); });
        }
        this.thumbnailActions = use(obj.thumbnailActions, []);
        this.thumbnailClasses = use(obj.thumbnailClasses, []);
        this.preview = use(obj.preview, true);
        this.previewDescription = use(obj.previewDescription, true);
        this.previewArrows = use(obj.previewArrows, true);
        this.previewArrowsAutoHide = use(obj.previewArrowsAutoHide, false);
        this.previewSwipe = use(obj.previewSwipe, false);
        this.previewFullscreen = use(obj.previewFullscreen, false);
        this.previewForceFullscreen = use(obj.previewForceFullscreen, false);
        this.previewCloseOnClick = use(obj.previewCloseOnClick, false);
        this.previewCloseOnEsc = use(obj.previewCloseOnEsc, false);
        this.previewKeyboardNavigation = use(obj.previewKeyboardNavigation, false);
        this.previewAnimation = use(obj.previewAnimation, true);
        this.previewAutoPlay = use(obj.previewAutoPlay, false);
        this.previewAutoPlayInterval = use(obj.previewAutoPlayInterval, 2000);
        this.previewAutoPlayPauseOnHover = use(obj.previewAutoPlayPauseOnHover, false);
        this.previewInfinityMove = use(obj.previewInfinityMove, false);
        this.previewZoom = use(obj.previewZoom, false);
        this.previewZoomStep = use(obj.previewZoomStep, 0.1);
        this.previewZoomMax = use(obj.previewZoomMax, 2);
        this.previewZoomMin = use(obj.previewZoomMin, 0.5);
        this.previewRotate = use(obj.previewRotate, false);
        this.previewDownload = use(obj.previewDownload, false);
        this.previewCustom = use(obj.previewCustom, undefined);
        this.previewBullets = use(obj.previewBullets, false);
        this.arrowPrevIcon = use(obj.arrowPrevIcon, 'fa fa-arrow-circle-left');
        this.arrowNextIcon = use(obj.arrowNextIcon, 'fa fa-arrow-circle-right');
        this.closeIcon = use(obj.closeIcon, 'fa fa-times-circle');
        this.fullscreenIcon = use(obj.fullscreenIcon, 'fa fa-arrows-alt');
        this.spinnerIcon = use(obj.spinnerIcon, 'fa fa-spinner fa-pulse fa-3x fa-fw');
        this.zoomInIcon = use(obj.zoomInIcon, 'fa fa-search-plus');
        this.zoomOutIcon = use(obj.zoomOutIcon, 'fa fa-search-minus');
        this.rotateLeftIcon = use(obj.rotateLeftIcon, 'fa fa-undo');
        this.rotateRightIcon = use(obj.rotateRightIcon, 'fa fa-repeat');
        this.downloadIcon = use(obj.downloadIcon, 'fa fa-arrow-circle-down');
        if (obj && obj.actions && obj.actions.length) {
            obj.actions = obj.actions.map(function (action) { return new NgxGalleryAction(action); });
        }
        this.actions = use(obj.actions, []);
    }
    return NgxGalleryOptions;
}());

var NgxGalleryOrderedImage = /** @class */ (function () {
    function NgxGalleryOrderedImage(obj) {
        this.src = obj.src;
        this.type = obj.type;
        this.index = obj.index;
    }
    return NgxGalleryOrderedImage;
}());

var NgxGalleryComponent = /** @class */ (function () {
    function NgxGalleryComponent(myElement, helperService) {
        this.myElement = myElement;
        this.helperService = helperService;
        this.options = [{}];
        this.imagesReady = new EventEmitter();
        // tslint:disable-next-line:no-output-native
        this.change = new EventEmitter();
        this.previewOpen = new EventEmitter();
        this.previewClose = new EventEmitter();
        this.previewChange = new EventEmitter();
        this.oldImagesLength = 0;
        this.selectedIndex = 0;
        this.breakpoint = undefined;
        this.prevBreakpoint = undefined;
    }
    NgxGalleryComponent.prototype.ngOnInit = function () {
        this.options = this.options.map(function (opt) { return new NgxGalleryOptions(opt); });
        this.sortOptions();
        this.setBreakpoint();
        this.setOptions();
        this.checkFullWidth();
        if (this.currentOptions) {
            this.selectedIndex = this.currentOptions.startIndex;
        }
    };
    NgxGalleryComponent.prototype.ngDoCheck = function () {
        if (this.images !== undefined && (this.images.length !== this.oldImagesLength)
            || (this.images !== this.oldImages)) {
            this.oldImagesLength = this.images.length;
            this.oldImages = this.images;
            this.setOptions();
            this.setImages();
            if (this.images && this.images.length) {
                this.imagesReady.emit();
            }
            if (this.image) {
                this.image.reset(this.currentOptions.startIndex);
            }
            if (this.currentOptions.thumbnailsAutoHide && this.currentOptions.thumbnails
                && this.images.length <= 1) {
                this.currentOptions.thumbnails = false;
                this.currentOptions.imageArrows = false;
            }
            this.resetThumbnails();
        }
    };
    NgxGalleryComponent.prototype.ngAfterViewInit = function () {
        this.checkFullWidth();
    };
    NgxGalleryComponent.prototype.onResize = function () {
        var _this = this;
        this.setBreakpoint();
        if (this.prevBreakpoint !== this.breakpoint) {
            this.setOptions();
            this.resetThumbnails();
        }
        if (this.currentOptions && this.currentOptions.fullWidth) {
            if (this.fullWidthTimeout) {
                clearTimeout(this.fullWidthTimeout);
            }
            this.fullWidthTimeout = setTimeout(function () {
                _this.checkFullWidth();
            }, 200);
        }
    };
    NgxGalleryComponent.prototype.getImageHeight = function () {
        return (this.currentOptions && this.currentOptions.thumbnails) ?
            this.currentOptions.imagePercent + '%' : '100%';
    };
    NgxGalleryComponent.prototype.getThumbnailsHeight = function () {
        if (this.currentOptions && this.currentOptions.image) {
            return 'calc(' + this.currentOptions.thumbnailsPercent + '% - '
                + this.currentOptions.thumbnailsMargin + 'px)';
        }
        else {
            return '100%';
        }
    };
    NgxGalleryComponent.prototype.getThumbnailsMarginTop = function () {
        if (this.currentOptions && this.currentOptions.layout === NgxGalleryLayout.ThumbnailsBottom) {
            return this.currentOptions.thumbnailsMargin + 'px';
        }
        else {
            return '0px';
        }
    };
    NgxGalleryComponent.prototype.getThumbnailsMarginBottom = function () {
        if (this.currentOptions && this.currentOptions.layout === NgxGalleryLayout.ThumbnailsTop) {
            return this.currentOptions.thumbnailsMargin + 'px';
        }
        else {
            return '0px';
        }
    };
    NgxGalleryComponent.prototype.openPreview = function (index) {
        if (this.currentOptions.previewCustom) {
            this.currentOptions.previewCustom(index);
        }
        else {
            this.previewEnabled = true;
            this.preview.open(index);
        }
    };
    NgxGalleryComponent.prototype.onPreviewOpen = function () {
        this.previewOpen.emit();
        if (this.image && this.image.autoPlay) {
            this.image.stopAutoPlay();
        }
    };
    NgxGalleryComponent.prototype.onPreviewClose = function () {
        this.previewEnabled = false;
        this.previewClose.emit();
        if (this.image && this.image.autoPlay) {
            this.image.startAutoPlay();
        }
    };
    NgxGalleryComponent.prototype.selectFromImage = function (index) {
        this.select(index);
    };
    NgxGalleryComponent.prototype.selectFromThumbnails = function (index) {
        this.select(index);
        if (this.currentOptions && this.currentOptions.thumbnails && this.currentOptions.preview
            && (!this.currentOptions.image || this.currentOptions.thumbnailsRemainingCount)) {
            this.openPreview(this.selectedIndex);
        }
    };
    NgxGalleryComponent.prototype.show = function (index) {
        this.select(index);
    };
    NgxGalleryComponent.prototype.showNext = function () {
        this.image.showNext();
    };
    NgxGalleryComponent.prototype.showPrev = function () {
        this.image.showPrev();
    };
    NgxGalleryComponent.prototype.canShowNext = function () {
        if (this.images && this.currentOptions) {
            return !!(this.currentOptions.imageInfinityMove || this.selectedIndex < this.images.length - 1);
        }
        else {
            return false;
        }
    };
    NgxGalleryComponent.prototype.canShowPrev = function () {
        if (this.images && this.currentOptions) {
            return !!(this.currentOptions.imageInfinityMove || this.selectedIndex > 0);
        }
        else {
            return false;
        }
    };
    NgxGalleryComponent.prototype.previewSelect = function (index) {
        this.previewChange.emit({ index: index, image: this.images[index] });
    };
    NgxGalleryComponent.prototype.moveThumbnailsRight = function () {
        this.thumbnails.moveRight();
    };
    NgxGalleryComponent.prototype.moveThumbnailsLeft = function () {
        this.thumbnails.moveLeft();
    };
    NgxGalleryComponent.prototype.canMoveThumbnailsRight = function () {
        return this.thumbnails.canMoveRight();
    };
    NgxGalleryComponent.prototype.canMoveThumbnailsLeft = function () {
        return this.thumbnails.canMoveLeft();
    };
    NgxGalleryComponent.prototype.resetThumbnails = function () {
        if (this.thumbnails) {
            this.thumbnails.reset(this.currentOptions.startIndex);
        }
    };
    NgxGalleryComponent.prototype.select = function (index) {
        this.selectedIndex = index;
        this.change.emit({
            index: index,
            image: this.images[index]
        });
    };
    NgxGalleryComponent.prototype.checkFullWidth = function () {
        if (this.currentOptions && this.currentOptions.fullWidth) {
            this.width = document.body.clientWidth + 'px';
            this.left = 'translateX(' + (-(document.body.clientWidth -
                this.myElement.nativeElement.parentNode.innerWidth) / 2) + 'px)';
        }
    };
    NgxGalleryComponent.prototype.setImages = function () {
        var _this = this;
        this.images.forEach(function (img) {
            return img.type = _this.helperService.getFileType(img.url || img.big || img.medium || img.small || '');
        });
        this.smallImages = this.images.map(function (img) { return img.small; });
        this.mediumImages = this.images.map(function (img, i) { return new NgxGalleryOrderedImage({
            src: img.medium,
            type: img.type,
            index: i
        }); });
        this.bigImages = this.images.map(function (img) { return img.big; });
        this.descriptions = this.images.map(function (img) { return img.description; });
        this.links = this.images.map(function (img) { return img.url; });
        this.labels = this.images.map(function (img) { return img.label; });
    };
    NgxGalleryComponent.prototype.setBreakpoint = function () {
        this.prevBreakpoint = this.breakpoint;
        var breakpoints;
        if (typeof window !== 'undefined') {
            breakpoints = this.options.filter(function (opt) { return opt.breakpoint >= window.innerWidth; })
                .map(function (opt) { return opt.breakpoint; });
        }
        if (breakpoints && breakpoints.length) {
            this.breakpoint = breakpoints.pop();
        }
        else {
            this.breakpoint = undefined;
        }
    };
    NgxGalleryComponent.prototype.sortOptions = function () {
        this.options = __spread(this.options.filter(function (a) { return a.breakpoint === undefined; }), this.options
            .filter(function (a) { return a.breakpoint !== undefined; })
            .sort(function (a, b) { return b.breakpoint - a.breakpoint; }));
    };
    NgxGalleryComponent.prototype.setOptions = function () {
        var _this = this;
        this.currentOptions = new NgxGalleryOptions({});
        this.options
            .filter(function (opt) { return opt.breakpoint === undefined || opt.breakpoint >= _this.breakpoint; })
            .map(function (opt) { return _this.combineOptions(_this.currentOptions, opt); });
        this.width = this.currentOptions.width;
        this.height = this.currentOptions.height;
    };
    NgxGalleryComponent.prototype.combineOptions = function (first, second) {
        Object.keys(second).map(function (val) { return first[val] = second[val] !== undefined ? second[val] : first[val]; });
    };
    NgxGalleryComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgxGalleryService }
    ]; };
    __decorate([
        Input()
    ], NgxGalleryComponent.prototype, "options", void 0);
    __decorate([
        Input()
    ], NgxGalleryComponent.prototype, "images", void 0);
    __decorate([
        Output()
    ], NgxGalleryComponent.prototype, "imagesReady", void 0);
    __decorate([
        Output()
    ], NgxGalleryComponent.prototype, "change", void 0);
    __decorate([
        Output()
    ], NgxGalleryComponent.prototype, "previewOpen", void 0);
    __decorate([
        Output()
    ], NgxGalleryComponent.prototype, "previewClose", void 0);
    __decorate([
        Output()
    ], NgxGalleryComponent.prototype, "previewChange", void 0);
    __decorate([
        ViewChild(NgxGalleryPreviewComponent)
    ], NgxGalleryComponent.prototype, "preview", void 0);
    __decorate([
        ViewChild(NgxGalleryImageComponent)
    ], NgxGalleryComponent.prototype, "image", void 0);
    __decorate([
        ViewChild(NgxGalleryThumbnailsComponent)
    ], NgxGalleryComponent.prototype, "thumbnails", void 0);
    __decorate([
        HostBinding('style.width')
    ], NgxGalleryComponent.prototype, "width", void 0);
    __decorate([
        HostBinding('style.height')
    ], NgxGalleryComponent.prototype, "height", void 0);
    __decorate([
        HostBinding('style.transform')
    ], NgxGalleryComponent.prototype, "left", void 0);
    __decorate([
        HostListener('window:resize')
    ], NgxGalleryComponent.prototype, "onResize", null);
    NgxGalleryComponent = __decorate([
        Component({
            selector: 'ngx-gallery',
            template: "<div class=\"ngx-gallery-layout {{currentOptions?.layout}}\">\n  <ngx-gallery-image *ngIf=\"currentOptions?.image\" [style.height]=\"getImageHeight()\" [images]=\"mediumImages\"\n                     [clickable]=\"currentOptions?.preview\" [selectedIndex]=\"selectedIndex\"\n                     [arrows]=\"currentOptions?.imageArrows\" [arrowsAutoHide]=\"currentOptions?.imageArrowsAutoHide\"\n                     [arrowPrevIcon]=\"currentOptions?.arrowPrevIcon\" [arrowNextIcon]=\"currentOptions?.arrowNextIcon\"\n                     [swipe]=\"currentOptions?.imageSwipe\" [animation]=\"currentOptions?.imageAnimation\"\n                     [size]=\"currentOptions?.imageSize\" [autoPlay]=\"currentOptions?.imageAutoPlay\"\n                     [autoPlayInterval]=\"currentOptions?.imageAutoPlayInterval\"\n                     [autoPlayPauseOnHover]=\"currentOptions?.imageAutoPlayPauseOnHover\"\n                     [infinityMove]=\"currentOptions?.imageInfinityMove\" [lazyLoading]=\"currentOptions?.lazyLoading\"\n                     [actions]=\"currentOptions?.imageActions\" [descriptions]=\"descriptions\"\n                     [showDescription]=\"currentOptions?.imageDescription\" [bullets]=\"currentOptions?.imageBullets\"\n                     (imageClick)=\"openPreview($event)\" (activeChange)=\"selectFromImage($event)\"></ngx-gallery-image>\n\n  <ngx-gallery-thumbnails *ngIf=\"currentOptions?.thumbnails\" [style.marginTop]=\"getThumbnailsMarginTop()\"\n                          [style.marginBottom]=\"getThumbnailsMarginBottom()\" [style.height]=\"getThumbnailsHeight()\"\n                          [images]=\"smallImages\" [links]=\"currentOptions?.thumbnailsAsLinks ? links : []\"\n                          [labels]=\"labels\" [linkTarget]=\"currentOptions?.linkTarget\" [selectedIndex]=\"selectedIndex\"\n                          [columns]=\"currentOptions?.thumbnailsColumns\" [rows]=\"currentOptions?.thumbnailsRows\"\n                          [margin]=\"currentOptions?.thumbnailMargin\" [arrows]=\"currentOptions?.thumbnailsArrows\"\n                          [arrowsAutoHide]=\"currentOptions?.thumbnailsArrowsAutoHide\"\n                          [arrowPrevIcon]=\"currentOptions?.arrowPrevIcon\"\n                          [arrowNextIcon]=\"currentOptions?.arrowNextIcon\"\n                          [clickable]=\"currentOptions?.image || currentOptions?.preview\"\n                          [swipe]=\"currentOptions?.thumbnailsSwipe\" [size]=\"currentOptions?.thumbnailSize\"\n                          [moveSize]=\"currentOptions?.thumbnailsMoveSize\" [order]=\"currentOptions?.thumbnailsOrder\"\n                          [remainingCount]=\"currentOptions?.thumbnailsRemainingCount\"\n                          [lazyLoading]=\"currentOptions?.lazyLoading\" [actions]=\"currentOptions?.thumbnailActions\"\n                          (activeChange)=\"selectFromThumbnails($event)\" [ngClass]=\"currentOptions?.thumbnailClasses\"></ngx-gallery-thumbnails>\n\n  <ngx-gallery-preview [images]=\"bigImages\" [descriptions]=\"descriptions\"\n                       [showDescription]=\"currentOptions?.previewDescription\"\n                       [arrowPrevIcon]=\"currentOptions?.arrowPrevIcon\" [arrowNextIcon]=\"currentOptions?.arrowNextIcon\"\n                       [closeIcon]=\"currentOptions?.closeIcon\" [fullscreenIcon]=\"currentOptions?.fullscreenIcon\"\n                       [spinnerIcon]=\"currentOptions?.spinnerIcon\" [arrows]=\"currentOptions?.previewArrows\"\n                       [arrowsAutoHide]=\"currentOptions?.previewArrowsAutoHide\" [swipe]=\"currentOptions?.previewSwipe\"\n                       [fullscreen]=\"currentOptions?.previewFullscreen\"\n                       [forceFullscreen]=\"currentOptions?.previewForceFullscreen\"\n                       [closeOnClick]=\"currentOptions?.previewCloseOnClick\"\n                       [closeOnEsc]=\"currentOptions?.previewCloseOnEsc\"\n                       [keyboardNavigation]=\"currentOptions?.previewKeyboardNavigation\"\n                       [animation]=\"currentOptions?.previewAnimation\" [autoPlay]=\"currentOptions?.previewAutoPlay\"\n                       [autoPlayInterval]=\"currentOptions?.previewAutoPlayInterval\"\n                       [autoPlayPauseOnHover]=\"currentOptions?.previewAutoPlayPauseOnHover\"\n                       [infinityMove]=\"currentOptions?.previewInfinityMove\" [zoom]=\"currentOptions?.previewZoom\"\n                       [zoomStep]=\"currentOptions?.previewZoomStep\" [zoomMax]=\"currentOptions?.previewZoomMax\"\n                       [zoomMin]=\"currentOptions?.previewZoomMin\" [zoomInIcon]=\"currentOptions?.zoomInIcon\"\n                       [zoomOutIcon]=\"currentOptions?.zoomOutIcon\" [actions]=\"currentOptions?.actions\"\n                       [rotate]=\"currentOptions?.previewRotate\" [rotateLeftIcon]=\"currentOptions?.rotateLeftIcon\"\n                       [rotateRightIcon]=\"currentOptions?.rotateRightIcon\" [download]=\"currentOptions?.previewDownload\"\n                       [downloadIcon]=\"currentOptions?.downloadIcon\" [bullets]=\"currentOptions?.previewBullets\"\n                       (previewClose)=\"onPreviewClose()\" (previewOpen)=\"onPreviewOpen()\"\n                       (activeChange)=\"previewSelect($event)\"\n                       [class.ngx-gallery-active]=\"previewEnabled\"></ngx-gallery-preview>\n</div>\n",
            encapsulation: ViewEncapsulation.None,
            providers: [NgxGalleryService],
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [":host{display:inline-block}:host>*{float:left}.ngx-gallery-layout{width:100%;height:100%;display:flex;flex-direction:column}.ngx-gallery-layout.thumbnails-top ngx-gallery-image{order:2}.ngx-gallery-layout.thumbnails-bottom ngx-gallery-image,.ngx-gallery-layout.thumbnails-top ngx-gallery-thumbnails{order:1}.ngx-gallery-layout.thumbnails-bottom ngx-gallery-thumbnails{order:2}*{box-sizing:border-box}.ngx-gallery-icon{color:#fff;position:absolute;display:inline-block}.ngx-gallery-icon .ngx-gallery-icon-content{display:block}ngx-gallery-preview{font-size:25px}ngx-gallery-preview .ngx-gallery-icon{z-index:2000}.ngx-gallery-clickable{cursor:pointer}.ngx-gallery-icons-wrapper .ngx-gallery-icon{position:relative;margin-right:5px;margin-top:5px;font-size:20px;cursor:pointer}.ngx-gallery-icons-wrapper{float:right}"]
        })
    ], NgxGalleryComponent);
    return NgxGalleryComponent;
}());

var NgxGalleryArrowsComponent = /** @class */ (function () {
    function NgxGalleryArrowsComponent() {
        this.prevClick = new EventEmitter();
        this.nextClick = new EventEmitter();
    }
    NgxGalleryArrowsComponent.prototype.ngOnInit = function () {
    };
    NgxGalleryArrowsComponent.prototype.handlePrevClick = function () {
        this.prevClick.emit();
    };
    NgxGalleryArrowsComponent.prototype.handleNextClick = function () {
        this.nextClick.emit();
    };
    __decorate([
        Input()
    ], NgxGalleryArrowsComponent.prototype, "prevDisabled", void 0);
    __decorate([
        Input()
    ], NgxGalleryArrowsComponent.prototype, "nextDisabled", void 0);
    __decorate([
        Input()
    ], NgxGalleryArrowsComponent.prototype, "arrowPrevIcon", void 0);
    __decorate([
        Input()
    ], NgxGalleryArrowsComponent.prototype, "arrowNextIcon", void 0);
    __decorate([
        Output()
    ], NgxGalleryArrowsComponent.prototype, "prevClick", void 0);
    __decorate([
        Output()
    ], NgxGalleryArrowsComponent.prototype, "nextClick", void 0);
    NgxGalleryArrowsComponent = __decorate([
        Component({
            selector: 'ngx-gallery-arrows',
            template: "<div class=\"ngx-gallery-arrows-wrapper ngx-gallery-arrow-left\">\n  <div class=\"ngx-gallery-icon ngx-gallery-arrow\" aria-hidden=\"true\" (click)=\"handlePrevClick()\" [class.ngx-gallery-disabled]=\"prevDisabled\">\n    <i class=\"ngx-gallery-icon-content {{arrowPrevIcon}}\"></i>\n  </div>\n</div>\n<div class=\"ngx-gallery-arrows-wrapper ngx-gallery-arrow-right\">\n  <div class=\"ngx-gallery-icon ngx-gallery-arrow\" aria-hidden=\"true\" (click)=\"handleNextClick()\" [class.ngx-gallery-disabled]=\"nextDisabled\">\n    <i class=\"ngx-gallery-icon-content {{arrowNextIcon}}\"></i>\n  </div>\n</div>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".ngx-gallery-arrow-wrapper{position:absolute;height:100%;width:1px;display:table;table-layout:fixed}.ngx-gallery-preview-img-wrapper .ngx-gallery-arrow-wrapper{z-index:10001}.ngx-gallery-arrow-left{left:0}.ngx-gallery-arrow-right{right:0}.ngx-gallery-arrow{top:50%;transform:translateY(-50%);cursor:pointer}.ngx-gallery-arrow.ngx-gallery-disabled{opacity:.6;cursor:default}.ngx-gallery-arrow-left .ngx-gallery-arrow{left:10px}.ngx-gallery-arrow-right .ngx-gallery-arrow{right:10px}"]
        })
    ], NgxGalleryArrowsComponent);
    return NgxGalleryArrowsComponent;
}());

var NgxGalleryActionComponent = /** @class */ (function () {
    function NgxGalleryActionComponent() {
        this.disabled = false;
        this.titleText = '';
        this.closeClick = new EventEmitter();
    }
    NgxGalleryActionComponent.prototype.ngOnInit = function () {
    };
    NgxGalleryActionComponent.prototype.handleClick = function (event) {
        if (!this.disabled) {
            this.closeClick.emit(event);
        }
        event.stopPropagation();
        event.preventDefault();
    };
    __decorate([
        Input()
    ], NgxGalleryActionComponent.prototype, "icon", void 0);
    __decorate([
        Input()
    ], NgxGalleryActionComponent.prototype, "disabled", void 0);
    __decorate([
        Input()
    ], NgxGalleryActionComponent.prototype, "titleText", void 0);
    __decorate([
        Output()
    ], NgxGalleryActionComponent.prototype, "closeClick", void 0);
    NgxGalleryActionComponent = __decorate([
        Component({
            selector: 'ngx-gallery-action',
            template: "<div class=\"ngx-gallery-icon\" [class.ngx-gallery-icon-disabled]=\"disabled\"\n     aria-hidden=\"true\"\n     title=\"{{ titleText }}\"\n     (click)=\"handleClick($event)\">\n  <i class=\"ngx-gallery-icon-content {{ icon }}\"></i>\n</div>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".ngx-gallery-icon{color:#fff;z-index:2000;display:inline-block;position:relative;margin-right:10px;margin-top:10px;font-size:25px;cursor:pointer;text-decoration:none}.ngx-gallery-icon .ngx-gallery-icon-content{display:block}"]
        })
    ], NgxGalleryActionComponent);
    return NgxGalleryActionComponent;
}());

var NgxGalleryBulletsComponent = /** @class */ (function () {
    function NgxGalleryBulletsComponent() {
        this.active = 0;
        this.bulletChange = new EventEmitter();
    }
    NgxGalleryBulletsComponent.prototype.ngOnInit = function () {
    };
    NgxGalleryBulletsComponent.prototype.getBullets = function () {
        return Array(this.count);
    };
    NgxGalleryBulletsComponent.prototype.handleChange = function (event, index) {
        this.bulletChange.emit(index);
    };
    __decorate([
        Input()
    ], NgxGalleryBulletsComponent.prototype, "count", void 0);
    __decorate([
        Input()
    ], NgxGalleryBulletsComponent.prototype, "active", void 0);
    __decorate([
        Output()
    ], NgxGalleryBulletsComponent.prototype, "bulletChange", void 0);
    NgxGalleryBulletsComponent = __decorate([
        Component({
            selector: 'ngx-gallery-bullets',
            template: "<div class=\"ngx-gallery-bullet\" *ngFor=\"let bullet of getBullets(); let i = index;\" (click)=\"handleChange($event, i)\"\n     [ngClass]=\"{ 'ngx-gallery-active': i == active }\"></div>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [":host{position:absolute;z-index:2000;display:inline-flex;left:50%;transform:translateX(-50%);bottom:0;padding:10px}.ngx-gallery-bullet{width:10px;height:10px;border-radius:50%;cursor:pointer;background:#fff}.ngx-gallery-bullet:not(:first-child){margin-left:5px}.ngx-gallery-bullet.ngx-gallery-active,.ngx-gallery-bullet:hover{background:#000}"]
        })
    ], NgxGalleryBulletsComponent);
    return NgxGalleryBulletsComponent;
}());

var CustomHammerConfig = /** @class */ (function (_super) {
    __extends(CustomHammerConfig, _super);
    function CustomHammerConfig() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.overrides = {
            pinch: { enable: false },
            rotate: { enable: false }
        };
        return _this;
    }
    CustomHammerConfig = __decorate([
        Injectable()
    ], CustomHammerConfig);
    return CustomHammerConfig;
}(HammerGestureConfig));
var NgxGalleryModule = /** @class */ (function () {
    function NgxGalleryModule() {
    }
    NgxGalleryModule = __decorate([
        NgModule({
            declarations: [
                NgxGalleryComponent,
                NgxGalleryImageComponent,
                NgxGalleryArrowsComponent,
                NgxGalleryThumbnailsComponent,
                NgxGalleryPreviewComponent,
                NgxGalleryActionComponent,
                NgxGalleryBulletsComponent
            ],
            imports: [CommonModule],
            exports: [NgxGalleryComponent],
            providers: [
                { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }
            ]
        })
    ], NgxGalleryModule);
    return NgxGalleryModule;
}());

var NgxGalleryImage = /** @class */ (function () {
    function NgxGalleryImage(obj) {
        this.small = obj.small;
        this.medium = obj.medium;
        this.big = obj.big;
        this.description = obj.description;
        this.url = obj.url;
        this.type = obj.type;
        this.label = obj.label;
    }
    return NgxGalleryImage;
}());

/*
 * Public API Surface of ngx-gallery
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CustomHammerConfig, NgxGalleryAction, NgxGalleryAnimation, NgxGalleryArrowsComponent, NgxGalleryBulletsComponent, NgxGalleryComponent, NgxGalleryImage, NgxGalleryImageSize, NgxGalleryLayout, NgxGalleryModule, NgxGalleryOptions, NgxGalleryOrder, NgxGalleryOrderedImage, NgxGalleryPreviewComponent, NgxGalleryService, NgxGalleryThumbnailsComponent, NgxGalleryImageComponent as ɵa, NgxGalleryActionComponent as ɵb };
//# sourceMappingURL=kolkov-ngx-gallery.js.map
