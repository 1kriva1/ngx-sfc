import { AfterViewInit, ChangeDetectorRef, Component, DoCheck, ElementRef, HostBinding, Input, IterableDiffer, IterableDiffers, OnInit, Optional, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';
import {
  any, CommonConstants, ComponentSizeDirective, hasItemBy, ILoadContainerModel, ILoadMoreModel,
  ILoadMoreParameters, isDefined, isNullOrEmptyString, LoaderFunction, UIClass, where
} from 'ngx-sfc-common';
import { fromEvent, map, debounceTime, tap, filter, Observable, BehaviorSubject, distinctUntilChanged } from 'rxjs';
import { ValidationConstants } from '../../constants/validation.constants';
import { BaseInputComponent } from '../base/base-input.component';
import { IAutoCompleteItemModel } from './models/autocomplete-item.model';
import { IAutoCompleteValue } from './models/autocomplete-value.model';
import { AutoCompleteInputConstants } from './autocomplete-input.constants';

@Component({
  selector: 'sfc-autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['../../styles/input.component.scss', './autocomplete-input.component.scss']
})
export class AutoCompleteInputComponent
  extends BaseInputComponent<IAutoCompleteValue>
  implements OnInit, AfterViewInit, DoCheck {

  @Input()
  debounceTime: number = AutoCompleteInputConstants.DEFAULT_DEBOUNCE_TIME;

  @Input()
  chars: number = AutoCompleteInputConstants.DEFAULT_CHARS;

  @Input()
  data: IAutoCompleteItemModel[] = [];

  @Input()
  data$!: Observable<IAutoCompleteItemModel[]>;

  @Input()
  loader!: LoaderFunction;

  @Input()
  showLoadMoreButton: boolean = true;

  public loadModel!: ILoadContainerModel;

  public items: IAutoCompleteItemModel[] = [];

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

  private dataDiffer!: IterableDiffer<any>;
  private dataSubject!: BehaviorSubject<IAutoCompleteItemModel[]>;
  private newValue: boolean = false;
  private searchValue: string | undefined;

  constructor(
    @Optional() ngControl: NgControl,
    @Optional() componentSize: ComponentSizeDirective,
    changeDetector: ChangeDetectorRef,
    renderer: Renderer2,
    elementRef: ElementRef,
    private iterableDiffers: IterableDiffers) {
    super(ngControl, componentSize, changeDetector, renderer, elementRef);
    this.dataDiffer = iterableDiffers.find([]).create<IterableDiffer<IAutoCompleteItemModel>>(undefined);
  }

  ngOnInit(): void {
    this.validations = { ...this.validations, ...ValidationConstants.DATA_VALIDATION };

    // if data is static, make it observable
    if (!isDefined(this.data$)) {
      this.dataSubject = new BehaviorSubject(this.data);
      this.data$ = this.dataSubject.asObservable();
    }
  }

  override ngAfterViewInit(): void {
    const predicate$: Observable<string> = fromEvent<InputEvent>(this.inputElementRef.nativeElement, 'input').pipe(
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
      filter(value => value.length >= this.chars)
    );

    this.loadModel = {
      predicate$,
      data$: this.data$,
      loader: this.loader,
      filter: this.filter
    };

    super.ngAfterViewInit();
  }

  ngDoCheck(): void {
    if (this.dataDiffer.diff(this.data)) {
      this.dataSubject.next(this.data);
    }
  }

  override onChange(value: IAutoCompleteValue | null): void {
    this.items = [];
    this.loadMore = false;
    this.searchValue = value?.value;
    super.onChange(value);
  }

  public handleSuccess(result: ILoadMoreModel<IAutoCompleteItemModel>): void {
    this.toggleInnerErrors(ValidationConstants.DATA_VALIDATOR_KEY, true);

    if (this.newValue)
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
    const valueParts: string[] = parameters.params.trim().split(' '),
      filtered = where(items, (item: IAutoCompleteItemModel) => {
        const itemParts = item.value.trim().split(' ');
        return item.value.includes(parameters.params)
          || hasItemBy(valueParts, value => hasItemBy(itemParts, part => part.includes(value)));
      });

    return filtered || [];
  }
}
