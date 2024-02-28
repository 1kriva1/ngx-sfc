import { Component, HostBinding, Input } from '@angular/core';
import { UIClass } from 'ngx-sfc-common';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { StarsState } from '../../stars.enum';

@Component({
  selector: 'sfc-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss']
})
export class StarComponent {

  @Input()
  id!: string;

  @Input()
  value!: number;

  @Input()
  @HostBinding('class')
  state: StarsState = StarsState.None;

  @Input()
  @HostBinding(`class.${UIClass.Disabled}`)
  disabled: boolean = false;

  get starId(): string {
    return `${this.id}-${this.value}`;
  }

  get icon(): any {
    return this.state != StarsState.None
      ? fasStar : farStar;
  }
}
