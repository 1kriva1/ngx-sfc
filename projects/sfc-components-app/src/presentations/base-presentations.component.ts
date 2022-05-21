import { Directive } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Theme } from 'ngx-sfc-common';

@Directive()
export abstract class BasePresentationComponent {
    public theme: Theme = Theme.Default;

    constructor(protected router: Router, protected activatedRoute: ActivatedRoute) {
        this.activatedRoute.queryParams.subscribe(params => {
            this.theme = params['theme'] ? params['theme'] : Theme.Default;
        });
    }
}
