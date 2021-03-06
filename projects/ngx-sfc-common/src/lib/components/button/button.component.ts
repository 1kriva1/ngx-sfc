import { Component, Input } from '@angular/core';
import { UIClass } from '../../enums';
import { distinct } from '../../utils';
import { ButtonType } from './button-type.enum';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'sfc-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  private readonly BUTTON_DEFAULT_TEXT: string = 'Button';

  @Input()
  text: string = this.BUTTON_DEFAULT_TEXT;

  @Input()
  iconBefore?: IconDefinition;

  @Input()
  iconAfter?: IconDefinition;

  @Input()
  disabled: boolean = false;

  @Input()
  types: Array<ButtonType> = [ButtonType.Bordered];

  get classes() {
    const classes: any = {}

    if (this.disabled)
      classes[UIClass.Disabled] = true;

    distinct(this.types).forEach(type => classes[type] = true);

    return classes;
  }
}
