import { Component, Input } from '@angular/core';
import { ITagModel } from './parts/tag/tag.model';

@Component({
  selector: 'sfc-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent {

  @Input()
  tags: ITagModel[] = [];

}
