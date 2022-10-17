import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { removeItem, trim, UIClass } from 'ngx-sfc-common';
import { CommonConstants } from 'ngx-sfc-common';
import { any, isNullOrEmptyString } from 'ngx-sfc-common';
import { ValidationConstants } from '../../constants/validation.constants';
import { InputUIClass } from '../../enums/input-ui.enum';
import { IInnerValidation } from '../../validators/inner-validation.model';
import { BaseInputComponent } from '../base/base-input.component';
import { TagsInputConstants } from './tags-input.constants';

@Component({
  selector: 'sfc-tags-input',
  templateUrl: './tags-input.component.html',
  styleUrls: ['../../styles/input.component.scss', './tags-input.component.scss']
})
export class TagsInputComponent extends BaseInputComponent<string[]> implements OnInit {

  @Input()
  newTagPlaceholder: string = TagsInputConstants.DEFAULT_NEW_TAG_PLACEHOLDER;

  newTagValue: string | null = null;

  ngOnInit(): void {
    this.validations = { ...this.validations, ...ValidationConstants.DUPLICATE_VALIDATION, ...ValidationConstants.EMPTY_VALIDATION };
    this.value = this.value || [];
  }

  @HostBinding(`class.${InputUIClass.HasValue}`)
  override get hasValue() {
    return any(this.value as string[]);
  }

  override innerValidations: IInnerValidation[] = TagsInputConstants.INNER_VALIDATIONS;

  override get placeholderValue(): string {
    return any(this.value)
      ? this.newTagPlaceholder && !this.isFocused ? this.newTagPlaceholder : this.placeholder
      : this.placeholder;
  }

  override get labelClass(): string {
    return this.placeholder || this.isFocused || any(this.value) || !isNullOrEmptyString(this.newTagValue)
      ? UIClass.Active : CommonConstants.EMPTY_STRING;
  }

  override onBlur(): void {
    this.clearInnerErrors();
    super.onBlur();
  }

  onEnter(): void {
    const newValue = trim(this.newTagValue as string);
    this.checkeInnerValidation(newValue);

    if (!this.isInnerInvalid)
      this.addNewTag();
  }

  onRemove(removeValue: string): void {
    removeItem(this.value as string[], (item: string) => item === removeValue);
    this.onChange(this.value);
  }

  private addNewTag(): void {
    // add new tag
    this.value?.push(this.newTagValue as string);

    // update component value with new value
    this.onChange(this.value);

    // clear new tag input
    this.newTagValue = null;
  }
}
