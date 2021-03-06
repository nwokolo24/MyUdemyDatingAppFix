import { EventEmitter, OnInit } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
export declare class NgxGalleryBulletsComponent implements OnInit {
    count: number;
    active: number;
    bulletChange: EventEmitter<any>;
    constructor();
    ngOnInit(): void;
    getBullets(): number[];
    handleChange(event: Event, index: number): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NgxGalleryBulletsComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NgxGalleryBulletsComponent, "ngx-gallery-bullets", never, { "active": "active"; "count": "count"; }, { "bulletChange": "bulletChange"; }, never, never>;
}

//# sourceMappingURL=ngx-gallery-bullets.component.d.ts.map