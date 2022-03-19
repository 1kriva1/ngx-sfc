import { Component } from '@angular/core';
import { ComponentSize } from 'ngx-sfc-common';
import { LoadesPresentationBase } from '../loaders-presentation-base.component';

@Component({
    templateUrl: './loaders-bounce-presentation.component.html',
    styleUrls: [
        '../../../shared/styles/shared.component.scss',
        '../loaders-presentation-base.component.scss'
    ]
})
export class LoadersBouncePresentationComponent extends LoadesPresentationBase {
    public ComponentSize = ComponentSize;
}
