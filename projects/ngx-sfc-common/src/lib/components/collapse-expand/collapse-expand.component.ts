import { Component, Input } from '@angular/core';
import { faChevronDown, faChevronUp, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { CollapseExpandConstants } from './collapse-expand.constants';

@Component({
  selector: 'sfc-collapse-expand',
  templateUrl: './collapse-expand.component.html',
  styleUrls: ['./collapse-expand.component.scss']
})
export class CollapseExpandComponent {

  @Input()
  expand: boolean = false;

  @Input()
  labelExpand: string = CollapseExpandConstants.LABEL_EXPAND_DEFAULT;

  @Input()
  labelCollapse: string = CollapseExpandConstants.LABEL_COLLAPSE_DEFAULT;

  public get label(): string {
    return this.expand ? this.labelCollapse : this.labelExpand;
  }

  public get icon(): IconDefinition {
    return this.expand ? faChevronUp : faChevronDown;
  }
}
