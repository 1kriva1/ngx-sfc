import { Component } from '@angular/core';
import { ComponentSize } from 'ngx-sfc-common';
import { LoadersPresentationBase } from '../loaders-presentation-base.component';

@Component({
    templateUrl: './loaders-bounce-presentation.component.html',
    styleUrls: [
        '../../../shared/styles/shared.component.scss',
        '../loaders-presentation-base.component.scss'
    ]
})
export class LoadersBouncePresentationComponent extends LoadersPresentationBase {
    public ComponentSize = ComponentSize;
}
