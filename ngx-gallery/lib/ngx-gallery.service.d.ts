import { ElementRef, Renderer2 } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
export declare class NgxGalleryService {
    private renderer;
    private swipeHandlers;
    constructor(renderer: Renderer2);
    manageSwipe(status: boolean, element: ElementRef, id: string, nextHandler: () => void, prevHandler: () => void): void;
    validateUrl(url: string): string;
    getBackgroundUrl(image: string): string;
    getFileType(fileSource: string): string;
    private getSwipeHandlers;
    private removeSwipeHandlers;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NgxGalleryService, never>;
}

//# sourceMappingURL=ngx-gallery.service.d.ts.map