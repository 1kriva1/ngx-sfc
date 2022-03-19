import { Component } from '@angular/core';
import { CircleLoaderType, ComponentSize } from 'ngx-sfc-common';
import { LoadesPresentationBase } from '../loaders-presentation-base.component';

@Component({
    templateUrl: './loaders-circle-fading-presentation.component.html',
    styleUrls: [
        '../../../shared/styles/shared.component.scss',
        '../loaders-presentation-base.component.scss'
    ]
})
export class LoadersCircleFadingPresentationComponent extends LoadesPresentationBase {
    public ComponentSize = ComponentSize;
    public CircleLoaderType = CircleLoaderType;
}
