import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { hasItem, isDefined, ITagModel, removeItemBy, trim, UIClass } from 'ngx-sfc-common';
import { CommonConstants } from 'ngx-sfc-common';
import { any, isNullOrEmptyString } from 'ngx-sfc-common';
import { ValidationConstants } from '../../constants/validation.constants';
import { InputUIClass } from '../../enums/input-ui.enum';
import { CommonValidator } from '../../validators';
import { IInnerValidation } from '../../validators/inner-validation.model';
import { BaseTextInputComponent } from '../base/text/base-text-input.component';
import { TagsInputConstants } from './tags-input.constants';

@Component({
  selector: 'sfc-tags-input',
  templateUrl: './tags-input.component.html',
  styleUrls: ['../../styles/input.component.scss', './tags-input.component.scss',
    './tags-input-bordered.component.scss']
})
export class TagsInputComponent extends BaseTextInputComponent<string[]> implements OnInit {

  @Input()
  newTagPlaceholder: string = TagsInputConstants.DEFAULT_NEW_TAG_PLACEHOLDER;

  @Input()
  get maxTagLength(): number | null {
    return this._maxTagLength;
  }
  set maxTagLength(value: number | null) {
    this._maxTagLength = value;
    this.updateInnerLengthValidation();
  }
  _maxTagLength: number | null = null;

  @Input()
  get minTagLength(): number | null {
    return this._minTagLength;
  }
  set minTagLength(value: number | null) {
    this._minTagLength = value;
    this.updateInnerLengthValidation();
  }
  _minTagLength: number | null = null;

  newTagValue: string | null = null;

  ngOnInit(): void {
    this.validations = {
      ...ValidationConstants.DUPLICATE_VALIDATION,
      ...ValidationConstants.EMPTY_VALIDATION,
      ...TagsInputConstants.LENGTH_VALIDATION(this.maxTagLength, this.minTagLength),
      ...this.validations
    };
    this.value = this.value || [];
  }

  override set value(value: string[] | null) {
    this._value = value;
  }
  override get value(): string[] | null {
    if (!this._value)
      this._value = [];
    return this._value || [];
  }

  @HostBinding(`class.${InputUIClass.HasValue}`)
  override get hasValue() {
    return any(this.value as string[]);
  }

  override innerValidations: IInnerValidation[] = [
    {
      key: CommonValidator.Duplicate,
      validate: (value: any | null, newValue: string) => !hasItem(value || [], newValue)
    },
    {
      key: CommonValidator.Empty,
      validate: (_: any | null, newValue: string) => !isNullOrEmptyString(newValue)
    },
    {
      key: TagsInputConstants.LENGTH_VALIDATOR_KEY,
      validate: (_: any | null, newValue: string) => (!isDefined(this.maxTagLength)
        || newValue?.length <= this.maxTagLength!) && (!isDefined(this.minTagLength)
          || newValue?.length >= this.minTagLength!)
    }
  ]

  override get placeholderValue(): string {
    return any(this.value)
      ? this.newTagPlaceholder && !this.isFocused ? this.newTagPlaceholder : this.placeholder
      : this.placeholder;
  }

  override get labelClass(): string {
    return this.placeholder || this.isFocused || any(this.value) || !isNullOrEmptyString(this.newTagValue)
      ? UIClass.Active : CommonConstants.EMPTY_STRING;
  }

  override get requiredLengthValue(): number | null {
    let requiredLength = null;

    if (this.validationErrors) {
      const minLengthError = this.validationErrors[ValidationConstants.MIN_ARRAY_LENGTH_VALIDATOR_KEY],
        maxLengthError = this.validationErrors[ValidationConstants.MAX_ARRAY_LENGTH_VALIDATOR_KEY];

      if (minLengthError) {
        requiredLength = minLengthError.requiredLength;
      }

      if (maxLengthError) {
        requiredLength = maxLengthError.requiredLength;
      }
    }

    return requiredLength;
  }

  override onBlur(): void {
    this.clearInnerErrors();
    super.onBlur();
  }

  onEnter(): void {
    this.checkeInnerValidation(trim(this.newTagValue as string));

    if (!this.isInnerInvalid)
      this.addNewTag();
  }

  onRemove(model: ITagModel): void {
    removeItemBy(this.value as string[], (item: string) => item === model.label);
    this.onChange(this.value);
  }

  private addNewTag(): void {
    // add new tag
    this.value!.push(this.newTagValue as string);

    // update component value with new value
    this.onChange(this.value);

    // clear new tag input
    this.newTagValue = null;
  }

  private updateInnerLengthValidation(): void {
    this.validations = {
      ...this.validations,
      ...TagsInputConstants.LENGTH_VALIDATION(this.maxTagLength, this.minTagLength)
    };
  }
}
