import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { UIClass } from 'ngx-sfc-common';

@Component({
  selector: 'sfc-tags-chip',
  templateUrl: './tags-chip.component.html',
  styleUrls: ['./tags-chip.component.scss']
})
export class TagsChipComponent {

  @Input()
  label!: string;

  @Input()
  imageSrc?: string;

  @Input()
  @HostBinding(`class.${UIClass.Disabled}`)
  disabled: boolean = false;

  @Output()
  remove = new EventEmitter<string>();
}
