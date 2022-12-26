import { Component, ElementRef, HostBinding, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import {
  any, CommonConstants, firstOrDefault, hasItemBy, hasObjectItem, ILoadMoreModel,
  isDefined, nameof, remove, removeItemBy, where
} from 'ngx-sfc-common';
import { Subject } from 'rxjs';
import { ValidationConstants } from '../../constants/validation.constants';
import { ISelectValue } from './models/select-value.model';
import { ISelectItemModel } from './parts/item/models/select-item.model';
import { SelectInputConstants } from './select-input.constants';
import { SelectItemComponent } from './parts/item/select-item.component';
import { UIClass } from 'ngx-sfc-common';
import { BaseDataInputComponent } from '../base/data/data-input.component';
import { ISelectGroupItemModel } from './parts/item/models/select-group-item.model';
import { ISelectGroupValue } from './models/select-group-value.model';
import { SelectItemModel } from './parts/item/select-item.component';

@Component({
  selector: 'sfc-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['../../styles/input.component.scss', './select-input.component.scss']
})
export class SelectInputComponent
  extends BaseDataInputComponent<SelectItemModel, ISelectValue | ISelectValue[] | ISelectGroupValue>
  implements OnInit {

  @Input()
  loadOnInit: boolean = true;

  @Input()
  showDefaultItem: boolean = true;

  @Input()
  defaultItemLabel: string = SelectInputConstants.DEFAULT_ITEM_VALUE;

  @Input()
  multiple: boolean = false;

  @ViewChildren(SelectItemComponent, { read: ElementRef })
  private itemsRef!: QueryList<ElementRef>;

  public get displayValue(): string {
    if (this.multiple)
      return (this.multipleValue).map(v => v.value).join(SelectInputConstants.VALUE_SPLITTER);
    else if (this.hasGroup)
      return this.groupValue?.value || CommonConstants.EMPTY_STRING;
    else
      return this.singleValue?.value || CommonConstants.EMPTY_STRING;
  }

  public get hasGroup(): boolean {
    return hasObjectItem(this.items, nameof<ISelectGroupItemModel>('group'), true);
  }

  public selectedItem!: HTMLElement;

  override get placeholderValue(): string {
    return this.placeholder ? this.placeholder : CommonConstants.EMPTY_STRING;
  }

  private initSubject!: Subject<void>;
  private _initialized: boolean = false;
  @HostBinding(`class.${UIClass.Initialization}`)
  private get needInitialization(): boolean {
    return !this.loadOnInit && !this._initialized;
  }

  private get singleValue(): ISelectValue {
    return this.value as ISelectValue;
  }

  private get multipleValue(): ISelectValue[] {
    return where((this.value as ISelectValue[]), item => isDefined(item)) || [];
  }

  private get groupValue(): ISelectGroupValue {
    return this.value as ISelectGroupValue;
  }

  private get defaultItem(): SelectItemModel | null | undefined {
    return firstOrDefault(this.items, item => !isDefined(item.key) && !(item as ISelectGroupItemModel).group);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.loadModel = {
      data$: this.data$,
      loader: this.loader
    };

    if (!this.loadOnInit) {
      this.initSubject = new Subject<void>();
      this.loadModel.predicate$ = this.initSubject.asObservable();
    }
  }

  public onFocus(): void {
    if (this.needInitialization)
      this.initSubject.next();

    if (this.hasValue)
      this.selectedItem = this.itemsRef.find(itemRef => itemRef.nativeElement.className.includes(UIClass.Active))?.nativeElement;
  }

  public onSelect(item: SelectItemModel): void {
    if (this.multiple)
      this.onMultipleChange(item as ISelectItemModel);
    else if (this.hasGroup)
      this.onGroupChange(item as ISelectGroupItemModel);
    else {
      const itemModel = item as ISelectItemModel;
      this.onChange({ key: itemModel.key, value: itemModel.value });
    }
  }

  public handleSuccess(result: ILoadMoreModel<SelectItemModel>): void {
    this.toggleInnerErrors(ValidationConstants.DATA_VALIDATOR_KEY, true);
    if (this.needInitialization)
      this._initialized = true;

    this.items = this.items.concat(result.items);

    if (this.hasGroup)
      this.items = this.prepareGroupItems(this.items as ISelectGroupItemModel[]);

    if (this.showDefaultItem && !isDefined(this.defaultItem))
      this.items.unshift({ key: null, value: this.defaultItemLabel });
  }

  public handleError(): void {
    this.toggleInnerErrors(ValidationConstants.DATA_VALIDATOR_KEY, false);
  }

  public isSelected(item: SelectItemModel): boolean {
    if (this.multiple)
      return hasItemBy(this.multipleValue, value => value.key === item.key);
    else if (this.hasGroup)
      return this.groupValue?.key === item.key
        && this.groupValue?.groupKey == (item as ISelectGroupItemModel).groupKey;
    else
      return this.singleValue?.key === item.key;
  }

  private onMultipleChange(item: ISelectItemModel): void {
    let newValue = Object.assign([] as (ISelectValue[] | ISelectGroupItemModel[]), this.multipleValue);
    const isDefaultItem = item.key === null;

    if (firstOrDefault(newValue, value => value.key === item.key)) {
      if (!isDefaultItem)
        remove(newValue, value => value.key === item.key);
    } else {
      if (isDefaultItem)
        newValue = [];
      else {
        if (isDefined(this.defaultItem))
          removeItemBy(newValue, value => value.key === null);
      }

      newValue.push({ key: item.key, value: item.value });
    }

    this.onChange(newValue);
  }

  private onGroupChange(item: ISelectGroupItemModel): void {
    const groupValue: ISelectGroupValue = {
      key: item.key as number,
      value: item.value, groupKey:
        item.groupKey as number
    };

    this.onChange(groupValue);
  }

  private prepareGroupItems(items: ISelectGroupItemModel[]): ISelectGroupItemModel[] {
    const groupItems = items as ISelectGroupItemModel[],
      groups = where(groupItems, item => item.group || false);

    let preparedGroups: ISelectGroupItemModel[] = [];

    if (any(groups)) {
      groups?.forEach(group => {
        preparedGroups.push(group);
        const groupItemModels = where(groupItems, item => item.groupKey === group.groupKey && !item.group) as ISelectGroupItemModel[];

        if (any(groupItemModels))
          preparedGroups = preparedGroups.concat(groupItemModels);
      });
    }

    return preparedGroups;
  }
}