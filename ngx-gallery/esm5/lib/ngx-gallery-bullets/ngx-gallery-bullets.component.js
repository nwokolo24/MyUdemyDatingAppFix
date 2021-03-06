import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
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
export { NgxGalleryBulletsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWdhbGxlcnktYnVsbGV0cy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa29sa292L25neC1nYWxsZXJ5LyIsInNvdXJjZXMiOlsibGliL25neC1nYWxsZXJ5LWJ1bGxldHMvbmd4LWdhbGxlcnktYnVsbGV0cy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFRdEc7SUFNRTtRQUpTLFdBQU0sR0FBRyxDQUFDLENBQUM7UUFFVixpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFFNUIsQ0FBQztJQUVqQiw2Q0FBUSxHQUFSO0lBQ0EsQ0FBQztJQUVELCtDQUFVLEdBQVY7UUFDRSxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVELGlEQUFZLEdBQVosVUFBYSxLQUFZLEVBQUUsS0FBYTtRQUN0QyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBaEJRO1FBQVIsS0FBSyxFQUFFOzZEQUFlO0lBQ2Q7UUFBUixLQUFLLEVBQUU7OERBQVk7SUFFVjtRQUFULE1BQU0sRUFBRTtvRUFBbUM7SUFKakMsMEJBQTBCO1FBTnRDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxxQkFBcUI7WUFDL0IsME1BQW1EO1lBRW5ELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztTQUNoRCxDQUFDO09BQ1csMEJBQTBCLENBa0J0QztJQUFELGlDQUFDO0NBQUEsQUFsQkQsSUFrQkM7U0FsQlksMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC1nYWxsZXJ5LWJ1bGxldHMnLFxuICB0ZW1wbGF0ZVVybDogJy4vbmd4LWdhbGxlcnktYnVsbGV0cy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL25neC1nYWxsZXJ5LWJ1bGxldHMuY29tcG9uZW50LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTmd4R2FsbGVyeUJ1bGxldHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBjb3VudDogbnVtYmVyO1xuICBASW5wdXQoKSBhY3RpdmUgPSAwO1xuXG4gIEBPdXRwdXQoKSBidWxsZXRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIGdldEJ1bGxldHMoKTogbnVtYmVyW10ge1xuICAgIHJldHVybiBBcnJheSh0aGlzLmNvdW50KTtcbiAgfVxuXG4gIGhhbmRsZUNoYW5nZShldmVudDogRXZlbnQsIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmJ1bGxldENoYW5nZS5lbWl0KGluZGV4KTtcbiAgfVxufVxuIl19