import { Component, Input, OnInit } from '@angular/core';
import { addItem, all, firstOrDefault, hasItem, isDefined, removeItem } from 'ngx-sfc-common';
import { BaseInputComponent } from '../base/base-input.component';
import { IBubbleInnerModel, IBubbleModel } from './parts/bubble/bubble.model';

@Component({
  selector: 'sfc-bubbles-input',
  templateUrl: './bubbles-input.component.html',
  styleUrls: [
    '../../styles/input.component.scss',
    '../../styles/vertical-input.component.scss',
    './bubbles-input.component.scss'
  ]
})
export class BubblesInputComponent
  extends BaseInputComponent<number[]>
  implements OnInit {

  @Input()
  items: IBubbleModel[] = [];

  public bubbles: IBubbleInnerModel[] = [];

  ngOnInit(): void {
    this.value = this.value || [];
    this.bubbles = this.items.map(model => ({
      key: model.key,
      label: model.label,
      icon: model.icon,
      imageSrc: model.imageSrc,
      active: hasItem(this.value!, model.key),
      disabled: this.disabled
    }))
  }

  public onCheck(model: IBubbleInnerModel): void {
    const bubble: number | undefined = firstOrDefault(this.value!, item => item === model.key);
    model.active = !isDefined(bubble);

    if (model.active)
      addItem(this.value!, model.key);
    else
      removeItem(this.value!, bubble);

    this.onChange(this.value);
  }

  public onLabelClick(): void {
    const allSelected = all(this.bubbles, bubble => bubble.active);
    this.value = allSelected ? [] : this.bubbles.map(item => item.key);
    this.bubbles.forEach(item => item.active = !allSelected);
    this.onChange(this.value);
  }
}