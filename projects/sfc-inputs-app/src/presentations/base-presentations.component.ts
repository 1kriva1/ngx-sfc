import { Directive } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Theme } from 'ngx-sfc-common';

@Directive()
export abstract class BasePresentationComponent {
    public theme: Theme = Theme.Default;
    public formGroup!: FormGroup;

    constructor(protected router: Router, protected activatedRoute: ActivatedRoute, protected formBuilder: FormBuilder) {
        this.activatedRoute.queryParams.subscribe(params => {
            this.theme = params['theme'] ? params['theme'] : Theme.Default;
        });
    }
}
