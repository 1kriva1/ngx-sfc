import { Component } from '@angular/core';
import { ComponentSize } from 'ngx-sfc-common';
import { ITagModel } from 'ngx-sfc-components';
import { BasePresentationComponent } from '../base-presentations.component';

@Component({
  templateUrl: './tags-presentation.component.html',
  styleUrls: ['../../shared/styles/shared.component.scss']
})
export class TagsPresentationComponent extends BasePresentationComponent {

  ComponentSize = ComponentSize;

  tags: ITagModel[] = [
    { label: 'tag 1' },
    { label: 'Card & Board Game', icon: 'fa fa-car' },
    { label: '', icon: 'fa fa-car' },
    { label: 'tag 4', icon: 'fa fa-car' },
    { label: 'tag 5', icon: 'fa fa-car' },
    { label: 'tag 6', icon: 'fa fa-car' },
    { label: 'tag 7', icon: 'fa fa-car' }
  ]
}
