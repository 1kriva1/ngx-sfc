import { Component, Input } from '@angular/core';
import { LoaderBaseComponent } from '../loader-base.component';
import { CircleLoaderType } from './circle-loader-type.enum';

@Component({
  selector: 'sfc-circle-loader',
  templateUrl: './circle-loader.component.html',
  styleUrls: ['../styles/loader-base.component.scss', './circle-loader.component.scss']
})
export class CircleLoaderComponent extends LoaderBaseComponent {
  
  @Input()
  type: CircleLoaderType = CircleLoaderType.Default;
}
