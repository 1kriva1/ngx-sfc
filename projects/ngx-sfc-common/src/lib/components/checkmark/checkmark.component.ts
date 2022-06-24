import { Component, HostBinding, HostListener, Input } from '@angular/core';
import { UIClass } from '../../enums';
import { faCheck, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'sfc-checkmark',
  templateUrl: './checkmark.component.html',
  styleUrls: ['./checkmark.component.scss']
})
export class CheckmarkComponent {

  @Input()
  @HostBinding('class.' + UIClass.Active)
  active: boolean = false;

  @Input()
  icon: IconDefinition = faCheck;

  @HostListener('click')
  onClick = () => this.active = !this.active;

}
