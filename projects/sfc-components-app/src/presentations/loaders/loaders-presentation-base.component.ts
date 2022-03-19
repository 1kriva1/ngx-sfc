import { Directive } from "@angular/core";
import { LoaderService } from "ngx-sfc-common";

@Directive()
export abstract class LoadesPresentationBase {

    constructor(private loaderService: LoaderService) { }

    public showLoader(id?: string): void {
        this.loaderService.showLoader(id);

        // hide global loader after 3 sec
        if (!id) {
            setTimeout(() => {
                this.hideLoader()
            }, 3000);
        }
    }
    public hideLoader(id?: string): void {
        this.loaderService.hideLoader(id);
    }
}