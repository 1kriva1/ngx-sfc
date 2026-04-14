import { Component, HostBinding, HostListener, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ButtonType, empty, isDefined, UIClass } from 'ngx-sfc-common';
import { markFormTouchedAndDirty } from '../../utils/form.utils';

@Component({
  selector: 'sfc-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.scss']
})
export class SubmitButtonComponent {

  /* Inputs */

  @Input()
  text?: string;

  @Input()
  iconBefore?: IconDefinition | empty;

  @Input()
  iconAfter?: IconDefinition | empty;

  @Input()
  types: Array<ButtonType> = [ButtonType.Bordered];

  @Input()
  form!: FormGroup;

  @Input()
  disabled: boolean = false;

  /* End Inputs */

  /* Properties */

  @HostBinding(`class.${UIClass.Disabled}`)
  public get isDisabled(): boolean {
    if (!isDefined(this.form))
      return this.disabled;

    return this.disabled || (this.form.invalid && this.submitted);
  }

  private submitted: boolean = false;

  /* End Properties */

  /* Host listeners */

  @HostListener('click')
  onClick = () => {
    this.submitted = !this.form.valid;
    markFormTouchedAndDirty(this.form);
  }

  /* End Host listeners */
}