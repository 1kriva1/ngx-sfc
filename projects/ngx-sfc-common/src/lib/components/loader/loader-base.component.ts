import { Directive, Input, OnInit } from "@angular/core";
import { EMPTY, map, Observable } from "rxjs";
import { UIClass } from "../../enums";
import { LoaderConstants } from "./loader.constants";
import { ILoaderEvent } from "./loader.event";
import { LoaderService } from "./service/loader.service";

@Directive()
export abstract class LoaderBaseComponent implements OnInit {

    UIClass = UIClass;

    /**
    * Loader identificator (global by default)
    */
    @Input()
    id: string = LoaderConstants.GLOBAL_LOADER_ID;

    /**
     * Is start on init (loader register with show = True)
     */
    @Input()
    start: boolean = false;

    /**
     * Loader when active(show) has background(low opacity)
     */
    @Input()
    background: boolean = true;

    constructor(protected loaderService: LoaderService) {
    }

    public show$: Observable<boolean> = EMPTY;

    public ngOnInit(): void {
        // register new loader
        this.show$ = this.loaderService.registerLoader({ id: this.id, status: this.start })
            .pipe(
                map((event: ILoaderEvent) => this.id === event.id && event.status)
            );
    }

    get preLoaderClasses() {
        let classes: any = {};

        if (this.id === LoaderConstants.GLOBAL_LOADER_ID)
            classes[LoaderConstants.GLOBAL_LOADER_ID] = true;
        else
            classes[LoaderConstants.LOCAL_LOADER_ID] = true;

        classes[LoaderConstants.CSS_CLASS_BACKGROUND] = this.background;

        return classes;
    }
}
