import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { addItem, all, any, firstOrDefault, hasItem, isDefined, removeItem } from 'ngx-sfc-common';
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
  extends BaseInputComponent<number | number[]>
  implements OnInit, OnDestroy {

  @Input()
  items: IBubbleModel[] = [];

  @Input()
  multiple: boolean = true;

  protected override get hasValue(): boolean { return this.multiple ? any(this.multipleValue) : super.hasValue; }

  public bubbles: IBubbleInnerModel[] = [];

  private get multipleValue(): number[] | null { return this.multiple ? this.value as number[] : null }

  private _subscription!: Subscription;

  ngOnInit(): void {
    if (this.multiple) {
      this.value = this.value || [];
    }

    this.bubbles = this.items.map(model => ({
      key: model.key,
      label: model.label,
      icon: model.icon,
      imageSrc: model.imageSrc,
      active: this.getIsActive(this.value!, model),
      disabled: this.disabled
    }));

    this._subscription = this.value$.subscribe(value =>
      this.bubbles.forEach(bubble => bubble.active = this.getIsActive(value, bubble)));
  }

  ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }

  public onCheck(model: IBubbleInnerModel): void {
    if (this.multiple) {
      this.onMultipleCheck(model);
    } else {
      this.onSingleCheck(model);
    }
  }

  public onLabelClick(): void {
    if (this.multiple) {
      const allSelected = all(this.bubbles, bubble => bubble.active);
      this.value = allSelected ? [] : this.bubbles.map(item => item.key);
      this.bubbles.forEach(item => item.active = !allSelected);
      this.onChange(this.value);
    }
  }

  private onSingleCheck(model: IBubbleInnerModel): void {
    if (this.value !== model.key) {
      this.bubbles.forEach(item => item.active = false);
      model.active = !model.active;
      this.value = model.key;
    } else {
      this.bubbles.forEach(item => item.active = false);
      this.value = null;
    }

    this.onChange(this.value);
  }

  private onMultipleCheck(model: IBubbleInnerModel): void {
    const bubble: number | undefined = firstOrDefault(this.multipleValue, value => value === model.key);

    model.active = !isDefined(bubble);

    if (model.active)
      addItem(this.multipleValue!, model.key);
    else
      removeItem(this.multipleValue!, bubble);

    this.onChange(this.value);
  }

  private getIsActive(value: number | number[], model: IBubbleModel): boolean {
    return this.multiple
      ? hasItem(value as number[], model.key)
      : value === model.key;
  }
}