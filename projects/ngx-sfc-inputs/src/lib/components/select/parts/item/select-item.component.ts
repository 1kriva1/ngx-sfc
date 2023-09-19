import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { isDefined, UIClass } from 'ngx-sfc-common';
import { ISelectGroupItemModel } from './models/select-group-item.model';
import { SelectItemConstants } from './select-item.constants';
import { ISelectItemModel } from './models/select-item.model';
export type SelectItemModel = ISelectItemModel | ISelectGroupItemModel;

@Component({
  selector: 'sfc-select-item',
  templateUrl: './select-item.component.html',
  styleUrls: ['./select-item.component.scss']
})
export class SelectItemComponent {

  @Input()
  item!: SelectItemModel;

  @Input()
  @HostBinding(`class.${UIClass.Active}`)
  active: boolean = false;

  @Input()
  @HostBinding(`class.${SelectItemConstants.MULTIPLE_CLASS}`)
  multiple: boolean = false;

  @Input()
  @HostBinding(`class.${SelectItemConstants.HAS_GROUP_CLASS}`)
  hasGroup: boolean = false;

  @Output()
  selected: EventEmitter<SelectItemModel> = new EventEmitter<SelectItemModel>();

  @HostBinding(`class.${SelectItemConstants.GROUP_CLASS}`)
  get group(): boolean { return (this.item as ISelectGroupItemModel)?.group || false; }

  @HostBinding(`class.${UIClass.Default}`)
  get default(): boolean { return !isDefined(this.item?.key) && !this.group }  

  onSelect(item: SelectItemModel, event: MouseEvent): void {
    if ((this.multiple && !this.default) || this.group)
      event.preventDefault();

    if (this.group)
      return;

    this.selected.emit(item);
  }
}
