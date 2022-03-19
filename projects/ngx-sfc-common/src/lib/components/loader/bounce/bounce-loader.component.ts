import { Component } from '@angular/core';
import { LoaderBaseComponent } from '../loader-base.component';

@Component({
  selector: 'sfc-bounce-loader',
  templateUrl: './bounce-loader.component.html',
  styleUrls: ['../styles/loader-base.component.scss', './bounce-loader.component.scss']
})
export class BounceLoaderComponent extends LoaderBaseComponent {
}
