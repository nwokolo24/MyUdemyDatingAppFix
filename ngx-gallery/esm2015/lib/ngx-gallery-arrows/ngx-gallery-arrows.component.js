import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
let NgxGalleryArrowsComponent = class NgxGalleryArrowsComponent {
    constructor() {
        this.prevClick = new EventEmitter();
        this.nextClick = new EventEmitter();
    }
    ngOnInit() {
    }
    handlePrevClick() {
        this.prevClick.emit();
    }
    handleNextClick() {
        this.nextClick.emit();
    }
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
export { NgxGalleryArrowsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWdhbGxlcnktYXJyb3dzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brb2xrb3Yvbmd4LWdhbGxlcnkvIiwic291cmNlcyI6WyJsaWIvbmd4LWdhbGxlcnktYXJyb3dzL25neC1nYWxsZXJ5LWFycm93cy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFRdEcsSUFBYSx5QkFBeUIsR0FBdEMsTUFBYSx5QkFBeUI7SUFTcEM7UUFIVSxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUMvQixjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUV6QixDQUFDO0lBRWpCLFFBQVE7SUFDUixDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3hCLENBQUM7Q0FDRixDQUFBO0FBcEJVO0lBQVIsS0FBSyxFQUFFOytEQUF1QjtBQUN0QjtJQUFSLEtBQUssRUFBRTsrREFBdUI7QUFDdEI7SUFBUixLQUFLLEVBQUU7Z0VBQXVCO0FBQ3RCO0lBQVIsS0FBSyxFQUFFO2dFQUF1QjtBQUVyQjtJQUFULE1BQU0sRUFBRTs0REFBZ0M7QUFDL0I7SUFBVCxNQUFNLEVBQUU7NERBQWdDO0FBUDlCLHlCQUF5QjtJQU5yQyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsb0JBQW9CO1FBQzlCLHltQkFBa0Q7UUFFbEQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O0tBQ2hELENBQUM7R0FDVyx5QkFBeUIsQ0FxQnJDO1NBckJZLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtZ2FsbGVyeS1hcnJvd3MnLFxuICB0ZW1wbGF0ZVVybDogJy4vbmd4LWdhbGxlcnktYXJyb3dzLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbmd4LWdhbGxlcnktYXJyb3dzLmNvbXBvbmVudC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE5neEdhbGxlcnlBcnJvd3NDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBwcmV2RGlzYWJsZWQ6IGJvb2xlYW47XG4gIEBJbnB1dCgpIG5leHREaXNhYmxlZDogYm9vbGVhbjtcbiAgQElucHV0KCkgYXJyb3dQcmV2SWNvbjogc3RyaW5nO1xuICBASW5wdXQoKSBhcnJvd05leHRJY29uOiBzdHJpbmc7XG5cbiAgQE91dHB1dCgpIHByZXZDbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG5leHRDbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgaGFuZGxlUHJldkNsaWNrKCk6IHZvaWQge1xuICAgIHRoaXMucHJldkNsaWNrLmVtaXQoKTtcbiAgfVxuXG4gIGhhbmRsZU5leHRDbGljaygpOiB2b2lkIHtcbiAgICB0aGlzLm5leHRDbGljay5lbWl0KCk7XG4gIH1cbn1cbiJdfQ==