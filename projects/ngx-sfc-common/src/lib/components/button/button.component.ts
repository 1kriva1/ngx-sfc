import { Component, HostBinding, Input } from '@angular/core';
import { UIClass } from '../../enums';
import { distinct, isDefined, isNullOrEmptyString } from '../../utils';
import { ButtonType } from './button-type.enum';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { IClassModel } from '../../models';

@Component({
  selector: 'sfc-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  private readonly BUTTON_DEFAULT_TEXT: string = 'Button';

  @Input()
  text?: string;

  @Input()
  iconBefore?: IconDefinition;

  @Input()
  iconAfter?: IconDefinition;

  @Input()
  @HostBinding(`class.${UIClass.Disabled}`)
  disabled: boolean = false;

  @Input()
  types: Array<ButtonType> = [ButtonType.Bordered];

  public get label(): string | undefined {
    return isNullOrEmptyString(this.text) && !isDefined(this.iconBefore) && !isDefined(this.iconAfter)
      ? this.BUTTON_DEFAULT_TEXT
      : this.text;
  }

  public get classes(): IClassModel {
    const classes: any = {};

    distinct(this.types).forEach(type => classes[type] = true);

    return classes;
  }
}
