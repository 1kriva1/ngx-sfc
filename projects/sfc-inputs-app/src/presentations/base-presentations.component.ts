import { Directive } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { ComponentSize, Theme } from 'ngx-sfc-common';

@Directive()
export abstract class BasePresentationComponent {
    public ComponentSize = ComponentSize;
    public theme: Theme = Theme.Default;
    public formGroup!: UntypedFormGroup;
    public faUser = faUser;

    constructor(protected router: Router, protected activatedRoute: ActivatedRoute, protected formBuilder: UntypedFormBuilder) {
        this.activatedRoute.queryParams.subscribe(params => {
            this.theme = params['theme'] ? params['theme'] : Theme.Default;
        });
    }
}
