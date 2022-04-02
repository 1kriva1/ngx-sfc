import { AfterContentInit, Component, EventEmitter, HostBinding, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ClickOutsideEvent, isNullOrEmptyString, MediaLimits, Position, ResizeService, UIClass, WINDOW } from 'ngx-sfc-common';
import { startWith, Subscription } from 'rxjs';
import { IDropdownMenuItemModel } from './parts/item/dropdown-menu-item.model';

@Component({
  selector: 'sfc-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent implements OnDestroy, OnInit, AfterContentInit {

  @Input()
  items: IDropdownMenuItemModel[] = [];

  @Input()
  icon?: string;

  @Input()
  label?: string;

  @Input()
  hideOnClick: boolean = true;

  @Input()
  hideOnClickOutside: boolean = true;

  @Input()
  @HostBinding('class.' + UIClass.Bordered)
  bordered: boolean = false;

  @Input()
  @HostBinding('class')
  position: Position[] = [Position.Left];

  @Input()
  @HostBinding('class.' + UIClass.Open)
  open: boolean = false;

  @Output()
  selected: EventEmitter<IDropdownMenuItemModel> = new EventEmitter<IDropdownMenuItemModel>();

  // preserved position
  private _position = [Position.Left];

  private _resizeSubscription?: Subscription;

  get showDots(): boolean {
    return isNullOrEmptyString(this.label) && isNullOrEmptyString(this.icon);
  }

  constructor(private resizeService: ResizeService, @Inject(WINDOW) private window: Window) { }

  ngOnInit(): void {
    this._position = this.position;
  }

  ngAfterContentInit(): void {
    this._resizeSubscription = this.resizeService.onResize$
      .pipe(startWith(this.window))
      .subscribe(window => {
        this.position = window.innerWidth <= MediaLimits.Tablet
          ? [Position.Left, Position.Top] : this._position
      });
  }

  ngOnDestroy(): void {
    this._resizeSubscription?.unsubscribe();
  }

  onClick(item: IDropdownMenuItemModel) {
    if (this.hideOnClick)
      this.open = false;

    this.selected.emit(item);
  }

  onClickOutside(event: ClickOutsideEvent) {
    if (event.value && this.open) {
      this.open = false;
    }
  }
}
