import { Directive } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { ComponentSize, Theme } from 'ngx-sfc-common';

@Directive()
export abstract class BasePresentationComponent {
    public ComponentSize = ComponentSize;
    public theme: Theme = Theme.Default;
    public formGroup!: FormGroup;
    public faUser = faUser;

    constructor(protected router: Router, protected activatedRoute: ActivatedRoute, protected formBuilder: FormBuilder) {
        this.activatedRoute.queryParams.subscribe(params => {
            this.theme = params['theme'] ? params['theme'] : Theme.Default;
        });
    }
}
