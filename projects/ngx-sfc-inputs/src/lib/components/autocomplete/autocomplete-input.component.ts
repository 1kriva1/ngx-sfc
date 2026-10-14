import { AfterViewInit, Component, HostBinding, Input } from '@angular/core';
import {
  any, CommonConstants, hasItemBy, ILoadContainerParameters,
  ILoadContainerPredicateParameters, ILoadContainerResultModel, isDefined, isNullOrEmptyString,
  LoadContainerLoadType, PaginationConstants, UIClass, where
} from 'ngx-sfc-common';
import { EMPTY, fromEvent, map, debounceTime, tap, Observable, distinctUntilChanged, merge, of } from 'rxjs';
import { IAutoCompleteItemModel } from './parts/item/autocomplete-item.model';
import { IAutoCompleteValue } from './autocomplete-input-value.model';
import { AutoCompleteInputConstants } from './autocomplete-input.constants';
import { BaseDataInputComponent } from '../base/data/data-input.component';
import { CommonValidator } from '../../validators';
import { IAutoCompleteInputEvent } from './autocomplete-input-event.model';
import { AutoCompleteInputEventType } from './autocomplete-input-event-type.enum';

@Component({
  selector: 'sfc-autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['../../styles/input.component.scss', './autocomplete-input.component.scss',
    './autocomplete-input-bordered.component.scss']
})
export class AutoCompleteInputComponent
  extends BaseDataInputComponent<IAutoCompleteItemModel, IAutoCompleteValue>
  implements AfterViewInit {

  @Input()
  debounceTime: number = AutoCompleteInputConstants.DEFAULT_DEBOUNCE_TIME;

  @Input()
  chars: number = AutoCompleteInputConstants.DEFAULT_CHARS;

  @Input()
  loadOnStart: boolean = false;

  public get displayValue(): string { return this.searchValue || CommonConstants.EMPTY_STRING; }

  public loadMore: boolean = true;

  public showEmpty: boolean = true;

  @HostBinding(`class.${UIClass.Loading}`)
  public loading: boolean = false;

  @HostBinding(`class.${AutoCompleteInputConstants.HAS_ANY_ITEMS_CLASS}`)
  public get anyItems(): boolean { return any(this.items); }

  override get labelClass(): string {
    return this.placeholder || this.isFocused || this.value || this.inputValue ? UIClass.Active : CommonConstants.EMPTY_STRING;
  }

  override get hasValue(): boolean {
    return super.hasValue && isDefined(this.value?.key);
  }

  private get loadType(): LoadContainerLoadType {
    return this.showLoadMoreButton
      ? LoadContainerLoadType.Button
      : LoadContainerLoadType.Scroll;
  }

  private searchValue: string | undefined;

  private firstLoadOnStart: boolean = false;

  override ngAfterViewInit(): void {
    const input$ = fromEvent<InputEvent>(this.inputElementRef.nativeElement, 'input').pipe(
      map(event => ({ type: AutoCompleteInputEventType.Input, value: (event.target as HTMLInputElement).value })),
      debounceTime(this.debounceTime)
    );

    const focus$ = fromEvent<FocusEvent>(this.inputElementRef.nativeElement, 'focus').pipe(
      map(() => ({ type: AutoCompleteInputEventType.Focus, value: this.inputElementRef.nativeElement.value }))
    );

    const init$ = this.loadOnStart
      ? of({ type: AutoCompleteInputEventType.Start, value: this.inputElementRef.nativeElement.value })
      : EMPTY;

    const predicate$: Observable<ILoadContainerPredicateParameters> = merge(init$, input$, focus$).pipe(
      tap((event: IAutoCompleteInputEvent) => {
        if (isNullOrEmptyString(event.value)) {
          this.items = [];
          this.loadMore = this.showEmpty = false;
        }
      }),

      distinctUntilChanged((previous, current) =>
        current.type === AutoCompleteInputEventType.Input && previous.value === current.value
      ),

      tap((event: IAutoCompleteInputEvent) => {
        this.searchValue = event.value;

        if (event.type === AutoCompleteInputEventType.Input && this.hasValue) {
          this.onChange(null);
        }
      }),

      map((event: IAutoCompleteInputEvent) => ({ value: event.value }))
    );

    this.loadModel = {
      predicate$,
      data$: this.data$,
      loader: this.loader,
      filter: this.filter,
      loadType: this.loadType,
      pagination: PaginationConstants.DEFAULT_PAGINATION
    };

    super.ngAfterViewInit();
  }

  public onSelect(value: IAutoCompleteItemModel): void {
    this.items = [];
    this.loadMore = false;
    this.searchValue = value?.value;
    this.onChange({ key: value.key, value: value.value });
  }

  public handleSuccess(result: ILoadContainerResultModel<IAutoCompleteItemModel>): void {
    this.toggleInnerErrors(CommonValidator.Data, true);

    if (result.reset)
      this.items = result.items;
    else
      this.items = this.items.concat(result.items);

    this.loadMore = this.showEmpty = true;

    if (this.loadOnStart) {
      if (!this.firstLoadOnStart && this.items.length) {
        this.onSelect(this.items[0]);
      }

      this.firstLoadOnStart = true;
    } else {
      if (!this.isFocused) {
        this.inputElementRef.nativeElement.focus();
      }
    }
  }

  public handleError(): void {
    this.toggleInnerErrors(CommonValidator.Data, false);
  }

  public handleLoading(value: boolean): void {
    this.loading = value;
  }

  private filter(items: IAutoCompleteItemModel[], parameters: ILoadContainerParameters): IAutoCompleteItemModel[] {
    const valueParts: string[] = parameters.params.value.trim().split(' '),
      filtered = where(items, (item: IAutoCompleteItemModel) => {
        const itemParts = item.value.trim().split(' ');
        return item.value.includes(parameters.params.value)
          || hasItemBy(valueParts, value => hasItemBy(itemParts, part => part.includes(value)));
      });

    return filtered || [];
  }
}
