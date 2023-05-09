import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterContentInit, Component, EventEmitter, HostBinding, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ClickOutsideEvent, isDefined, isNullOrEmptyString, MediaLimits, Position, ResizeService, UIClass, WINDOW } from 'ngx-sfc-common';
import { filter, startWith, Subscription } from 'rxjs';
import { IDropdownMenuItemModel } from './parts/item/dropdown-menu-item.model';

@Component({
  selector: 'sfc-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
  animations: [
    trigger(
      'openClose', 
      [
        state('true', style({
          opacity: 1
        })),
        state('false', style({
          opacity: 0,
        })),
        transition('true <=> false', [
          animate('0.5s')
        ])
      ]
    )
  ]
})
export class DropdownMenuComponent implements OnDestroy, OnInit, AfterContentInit {

  @Input()
  items: IDropdownMenuItemModel[] = [];

  @Input()
  icon?: IconDefinition;

  @Input()
  defaultDots: boolean = true;

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

  @Input()
  autoResize: boolean = true;

  @Output()
  selected: EventEmitter<IDropdownMenuItemModel> = new EventEmitter<IDropdownMenuItemModel>();

  // preserved position
  private _position = [Position.Left];

  private _resizeSubscription?: Subscription;

  get showDots(): boolean {
    return this.defaultDots && isNullOrEmptyString(this.label) && !isDefined(this.icon);
  }

  constructor(private resizeService: ResizeService, @Inject(WINDOW) private window: Window) { }

  ngOnInit(): void {
    this._position = this.position;
  }

  ngAfterContentInit(): void {
    this._resizeSubscription = this.resizeService.onResize$
      .pipe(
        startWith(this.window),
        filter(_ => this.autoResize)
      )
      .subscribe(window => {
        this.position = window.innerWidth <= MediaLimits.Tablet
          ? [Position.Bottom, Position.Center] : this._position
      });
  }

  ngOnDestroy(): void {
    this._resizeSubscription?.unsubscribe();
  }

  onClick(item: IDropdownMenuItemModel) {
    if (this.hideOnClick)
      this.open = false;

    this.items.forEach(item => item.active = false);
    item.active = true;

    this.selected.emit(item);
  }

  onClickOutside(event: ClickOutsideEvent) {
    if (event.value && this.open) {
      this.open = false;
    }
  }
}
