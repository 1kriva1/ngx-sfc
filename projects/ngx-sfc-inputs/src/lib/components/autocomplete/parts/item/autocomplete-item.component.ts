import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IAutoCompleteItemModel } from '../../models/autocomplete-item.model';

@Component({
  selector: 'sfc-autocomplete-item',
  templateUrl: './autocomplete-item.component.html',
  styleUrls: ['./autocomplete-item.component.scss']
})
export class AutoCompleteItemComponent {

  @Input()
  item!: IAutoCompleteItemModel;

  @Output()
  selected: EventEmitter<IAutoCompleteItemModel> = new EventEmitter<IAutoCompleteItemModel>();
}
