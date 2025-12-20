import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITagModel } from 'ngx-sfc-common';

@Component({
  selector: 'sfc-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent {

  @Input()
  tags: any[] = [];

  @Output()
  remove = new EventEmitter<ITagModel>();

  public onRemove(model: ITagModel): void {
    this.remove.emit(model);
  }
}
