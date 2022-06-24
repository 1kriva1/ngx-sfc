import { Component, HostBinding, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { CommonConstants } from '../../constants';
import { SortingDirection, UIClass } from '../../enums';
import { firstOrDefault, isDefined } from '../../utils';
import { SortingService } from './service/sorting.service';
import { SortingConstants } from './sorting.constants';
import { ISortingModel } from './sorting.model';

@Component({
  selector: 'sfc-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss']
})
export class SortingComponent implements OnInit, OnDestroy {

  SortingDirection = SortingDirection;

  @Input()
  id: string = CommonConstants.EMPTY_STRING;

  @Input()
  model: ISortingModel = { active: false, enabled: false, direction: SortingDirection.Ascending };

  @HostBinding(`class.${UIClass.Enabled}`)
  get enabled(): boolean {
    return this.model.enabled;
  }

  @HostBinding(`class.${UIClass.Active}`)
  get active(): boolean {
    return this.model.active || false;
  }

  @HostListener('click')
  sort() {
    if (this.enabled) {

      if (this.active) {
        this.model.direction = this.model.direction === SortingDirection.Ascending
          ? SortingDirection.Descending
          : SortingDirection.Ascending;
      }

      this.service.sort({ id: this.id, direction: this.model.direction });
    }
  }

  get icon(): IconDefinition {
    const modelIcon = firstOrDefault(this.model.icons, i => i.direction == this.model.direction);
    return modelIcon ? modelIcon.icon : this.model.direction === SortingDirection.Ascending
      ? SortingConstants.DEFAULT_ASCENDING_ICON : SortingConstants.DEFAULT_DESCENDING_ICON;
  }

  private _subscription!: Subscription;

  constructor(private service: SortingService) { }

  ngOnInit(): void {
    if (!isDefined(this.model))
      this.model = { active: false, enabled: false, direction: SortingDirection.Ascending };

    // subscribe to sort changes so we can react when other columns are sorted
    this._subscription = this.service.sorting$.subscribe(event => {
      // reset this column's sort direction to hide the sort icons
      if (this.id != event.id)
        this.model.direction = SortingDirection.Ascending;
    });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
