import { AfterViewInit, Component, HostBinding, Input } from '@angular/core';
import {
  any, CommonConstants, hasItemBy, ILoadMoreModel,
  ILoadMoreParameters, ILoadMorePredicateParameters, isDefined, isNullOrEmptyString, UIClass, where
} from 'ngx-sfc-common';
import { fromEvent, map, debounceTime, tap, filter, Observable, distinctUntilChanged } from 'rxjs';
import { ValidationConstants } from '../../constants/validation.constants';
import { IAutoCompleteItemModel } from './parts/item/autocomplete-item.model';
import { IAutoCompleteValue } from './autocomplete-input-value.model';
import { AutoCompleteInputConstants } from './autocomplete-input.constants';
import { BaseDataInputComponent } from '../base/data/data-input.component';

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

  public get displayValue(): string { return this.value?.value || CommonConstants.EMPTY_STRING; }

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

  private newValue: boolean = false;
  private searchValue: string | undefined;

  override ngAfterViewInit(): void {
    const predicate$: Observable<ILoadMorePredicateParameters> = fromEvent<InputEvent>(this.inputElementRef.nativeElement, 'input').pipe(
      // get value
      map(event => (event.target as any).value),

      // time in milliseconds between key events
      debounceTime(this.debounceTime),

      tap(value => {
        if (isNullOrEmptyString(value)) {
          this.items = [];
          this.loadMore = this.showEmpty = false;
        }
      }),

      distinctUntilChanged((_, current) => this.searchValue === current),

      tap(value => {
        this.searchValue = value;
        this.newValue = true;

        if (this.hasValue)
          this.onChange({ key: undefined, value: value })
      }),

      // if character length greater then 1
      filter(value => value.length >= this.chars),

      map(value => { return { value } })
    );

    this.loadModel = {
      predicate$,
      data$: this.data$,
      loader: this.loader,
      filter: this.filter
    };

    super.ngAfterViewInit();
  }

  public onSelect(value: IAutoCompleteItemModel): void {
    this.items = [];
    this.loadMore = false;
    this.searchValue = value?.value;
    this.onChange({ key: value.key, value: value.value });
  }

  public handleSuccess(result: ILoadMoreModel<IAutoCompleteItemModel>): void {
    this.toggleInnerErrors(ValidationConstants.DATA_VALIDATOR_KEY, true);

    if (this.newValue || result.reset)
      this.items = result.items;
    else
      this.items = this.items.concat(result.items);

    if (!this.isFocused)
      this.inputElementRef.nativeElement.focus();

    this.newValue = false;
    this.loadMore = this.showEmpty = true;
  }

  public handleError(): void {
    this.toggleInnerErrors(ValidationConstants.DATA_VALIDATOR_KEY, false);
  }

  public handleLoading(value: boolean): void {
    this.loading = value;
  }

  private filter(items: IAutoCompleteItemModel[], parameters: ILoadMoreParameters): IAutoCompleteItemModel[] {
    const valueParts: string[] = parameters.params.value.trim().split(' '),
      filtered = where(items, (item: IAutoCompleteItemModel) => {
        const itemParts = item.value.trim().split(' ');
        return item.value.includes(parameters.params.value)
          || hasItemBy(valueParts, value => hasItemBy(itemParts, part => part.includes(value)));
      });

    return filtered || [];
  }
}
