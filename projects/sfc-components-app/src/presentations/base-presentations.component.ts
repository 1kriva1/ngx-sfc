import { Directive } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ThemeType } from '../shared/enums/theme-type.enum';

@Directive()
export abstract class BasePresentationComponent {
    public theme: ThemeType = ThemeType.Default;

    constructor(protected router: Router, protected activatedRoute: ActivatedRoute) {
        this.activatedRoute.queryParams.subscribe(params => {
            this.theme = params['theme'] ? params['theme'] : ThemeType.Default;
        });
    }
}
