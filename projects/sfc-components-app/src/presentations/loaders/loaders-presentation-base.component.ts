import { Directive } from "@angular/core";
import { LoaderService } from "ngx-sfc-common";

@Directive()
export abstract class LoadersPresentationBase {

    constructor(private loaderService: LoaderService) { }

    public showLoader(id?: string): void {
        this.loaderService.show(id);

        // hide global loader after 3 sec
        if (!id) {
            setTimeout(() => {
                this.loaderService.hide()
            }, 3000);
        }
    }
    public hideLoader(id?: string): void {
        this.loaderService.hide(id);
    }
}