import { Component } from '@angular/core';
import { ComponentSize } from 'ngx-sfc-common';
import { ITagModel } from 'ngx-sfc-components';
import { BasePresentationComponent } from '../base-presentations.component';
import { faCar } from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: './tags-presentation.component.html',
  styleUrls: ['../../shared/styles/shared.component.scss']
})
export class TagsPresentationComponent extends BasePresentationComponent {

  ComponentSize = ComponentSize;

  tags: ITagModel[] = [
    { label: 'tag 1' },
    { label: 'Card & Board Game', icon: faCar },
    { label: '', icon: faCar },
    { label: 'tag 4', icon: faCar },
    { label: 'tag 5', icon: faCar },
    { label: 'tag 6', icon: faCar },
    { label: 'tag 7', icon: faCar }
  ]
}
