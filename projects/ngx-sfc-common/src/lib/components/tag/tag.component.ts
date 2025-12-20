import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { CommonConstants } from '../../constants';
import { UIClass } from '../../enums';
import { TagConstants } from './tag.constants';
import { ITagModel } from './tag.model';

@Component({
  selector: 'sfc-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent {

  @Input()
  model: ITagModel = {
    key: CommonConstants.DEFAULT_KEY_VALUE,
    label: TagConstants.DEFAULT_LABEL
  };

  // eslint-disable-next-line @angular-eslint/no-output-rename
  @Output('remove')
  removeAction = new EventEmitter<ITagModel>();

  @Input()
  @HostBinding(`class.${UIClass.Disabled}`)
  disabled: boolean = false;

  @HostListener('click')
  private _onClick(): void { if (this.model.click) this.model.click(this.model); }

  public onRemove(): void {
    this.removeAction.emit(this.model);
  }
}
