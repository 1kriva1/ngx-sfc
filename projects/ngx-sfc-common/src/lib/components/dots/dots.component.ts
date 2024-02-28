import { Component, HostBinding, HostListener, Input } from '@angular/core';
import { Direction, UIClass } from '../../enums';

@Component({
  selector: 'sfc-dots',
  templateUrl: './dots.component.html',
  styleUrls: ['./dots.component.scss']
})
export class DotsComponent {

  @Input()
  @HostBinding('class.' + UIClass.Open)
  open: boolean = false;

  @Input()
  @HostBinding('class')
  direction: Direction = Direction.Horizontal;

  @HostListener('click')
  onClick = () => this.open = !this.open;
}