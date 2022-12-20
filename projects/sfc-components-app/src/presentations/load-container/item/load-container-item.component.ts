import { Component, Input } from '@angular/core';

@Component({
  selector: 'load-container-item',
  templateUrl: './load-container-item.component.html',
  styleUrls: ['./load-container-item.component.scss']
})
export class LoadContainerItemComponent {

  @Input()
  value!: number;
}