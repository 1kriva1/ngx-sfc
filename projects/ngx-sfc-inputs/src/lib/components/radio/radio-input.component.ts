import { Component, HostBinding, Input } from '@angular/core';
import { Direction } from 'ngx-sfc-common';
import { BaseInputComponent } from '../base/base-input.component';
import { RadioItemType } from './radio-input.enum';
import { IRadioItemModel } from './radio-item.model';

@Component({
  selector: 'sfc-radio-input',
  templateUrl: './radio-input.component.html',
  styleUrls: ['../../styles/input.component.scss', './radio-input.component.scss']
})
export class RadioInputComponent extends BaseInputComponent<any> {

  RadioItemType = RadioItemType;

  @Input()
  @HostBinding('class')
  direction: Direction = Direction.Vertical;

  @Input()
  items: IRadioItemModel[] = [];

  override bordered: boolean = false;

  public isChecked(item: IRadioItemModel): boolean {
    return this.hasValue ? this.value === item.value : item.default || false;
  }
}
