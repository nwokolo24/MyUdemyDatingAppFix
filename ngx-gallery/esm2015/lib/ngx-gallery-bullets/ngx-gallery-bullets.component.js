import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
let NgxGalleryBulletsComponent = class NgxGalleryBulletsComponent {
    constructor() {
        this.active = 0;
        this.bulletChange = new EventEmitter();
    }
    ngOnInit() {
    }
    getBullets() {
        return Array(this.count);
    }
    handleChange(event, index) {
        this.bulletChange.emit(index);
    }
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
export { NgxGalleryBulletsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWdhbGxlcnktYnVsbGV0cy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa29sa292L25neC1nYWxsZXJ5LyIsInNvdXJjZXMiOlsibGliL25neC1nYWxsZXJ5LWJ1bGxldHMvbmd4LWdhbGxlcnktYnVsbGV0cy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFRdEcsSUFBYSwwQkFBMEIsR0FBdkMsTUFBYSwwQkFBMEI7SUFNckM7UUFKUyxXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBRVYsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBRTVCLENBQUM7SUFFakIsUUFBUTtJQUNSLENBQUM7SUFFRCxVQUFVO1FBQ1IsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCxZQUFZLENBQUMsS0FBWSxFQUFFLEtBQWE7UUFDdEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsQ0FBQztDQUNGLENBQUE7QUFqQlU7SUFBUixLQUFLLEVBQUU7eURBQWU7QUFDZDtJQUFSLEtBQUssRUFBRTswREFBWTtBQUVWO0lBQVQsTUFBTSxFQUFFO2dFQUFtQztBQUpqQywwQkFBMEI7SUFOdEMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQiwwTUFBbUQ7UUFFbkQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O0tBQ2hELENBQUM7R0FDVywwQkFBMEIsQ0FrQnRDO1NBbEJZLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtZ2FsbGVyeS1idWxsZXRzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL25neC1nYWxsZXJ5LWJ1bGxldHMuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9uZ3gtZ2FsbGVyeS1idWxsZXRzLmNvbXBvbmVudC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE5neEdhbGxlcnlCdWxsZXRzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgY291bnQ6IG51bWJlcjtcbiAgQElucHV0KCkgYWN0aXZlID0gMDtcblxuICBAT3V0cHV0KCkgYnVsbGV0Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBnZXRCdWxsZXRzKCk6IG51bWJlcltdIHtcbiAgICByZXR1cm4gQXJyYXkodGhpcy5jb3VudCk7XG4gIH1cblxuICBoYW5kbGVDaGFuZ2UoZXZlbnQ6IEV2ZW50LCBpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5idWxsZXRDaGFuZ2UuZW1pdChpbmRleCk7XG4gIH1cbn1cbiJdfQ==