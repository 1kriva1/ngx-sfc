import { Component, Input } from '@angular/core';
import { CommonConstants } from 'ngx-sfc-common';
import { ITagModel } from './tag.model';

@Component({
  selector: 'sfc-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent {

  @Input()
  model: ITagModel = { label: CommonConstants.EMPTY_STRING };

}
