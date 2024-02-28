import { Component } from '@angular/core';
import { Position, UIConstants } from 'ngx-sfc-common';
import { BaseDefaultTableContentComponent } from '../../base-default-table-content.component';

@Component({
  selector: 'sfc-default-table-row',
  templateUrl: './default-table-row.component.html',
  styleUrls: ['./default-table-row.component.scss']  
})
export class DefaultTableRowComponent extends BaseDefaultTableContentComponent {
  get contentPosition(): string {
    switch (this.position) {
      case Position.Left:
        return UIConstants.CSS_START;
      case Position.Right:
        return UIConstants.CSS_END;
      default:
        return UIConstants.CSS_CENTER;
    }
  }
}
