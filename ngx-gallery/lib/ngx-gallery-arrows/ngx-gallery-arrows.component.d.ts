import { EventEmitter, OnInit } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
export declare class NgxGalleryArrowsComponent implements OnInit {
    prevDisabled: boolean;
    nextDisabled: boolean;
    arrowPrevIcon: string;
    arrowNextIcon: string;
    prevClick: EventEmitter<any>;
    nextClick: EventEmitter<any>;
    constructor();
    ngOnInit(): void;
    handlePrevClick(): void;
    handleNextClick(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NgxGalleryArrowsComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NgxGalleryArrowsComponent, "ngx-gallery-arrows", never, { "prevDisabled": "prevDisabled"; "nextDisabled": "nextDisabled"; "arrowPrevIcon": "arrowPrevIcon"; "arrowNextIcon": "arrowNextIcon"; }, { "prevClick": "prevClick"; "nextClick": "nextClick"; }, never, never>;
}

//# sourceMappingURL=ngx-gallery-arrows.component.d.ts.map