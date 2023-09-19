import { Component, Directive, OnInit } from '@angular/core';
import {
  hasItemBy, ILoadMoreModel, ILoadMoreParameters,
  LoadChangesSource, LoaderFunction, skip, where
} from 'ngx-sfc-common';
import { equalOrInclude, IAutoCompleteItemModel } from 'ngx-sfc-inputs';
import { BehaviorSubject, map, Observable, of, delay } from 'rxjs';
import { BasePresentationComponent } from '../base-presentations.component';

@Directive()
export abstract class BaseAutoCompletePresentationComponent extends BasePresentationComponent
  implements OnInit {

  public data: IAutoCompleteItemModel[] = [
    {
      key: 1,
      value: 'andrii 1',
      image: '../assets/argentina_messi.png'
    },
    {
      key: 3,
      value: "anita 3"
    },
    {
      key: 4,
      value: "anton 4",
      image: '../assets/costa_rica_ruis.png'
    },
    {
      key: 5,
      value: "noa 5"
    },
    {
      key: 6,
      value: "nina 6"
    },
    {
      key: 7,
      value: "nikita 7"
    },
    {
      key: 8,
      value: "nazar 8"
    },
    {
      key: 9,
      value: "leo 9"
    },
    {
      key: 10,
      value: "apa 10"
    },
    {
      key: 11,
      value: "vova 11"
    }
  ];

  public dataModification: IAutoCompleteItemModel[] = [
    {
      key: 1,
      value: 'abc 1'
    },
    {
      key: 2,
      value: 'abc 2'
    },
    {
      key: 3,
      value: 'abc 3'
    },
    {
      key: 4,
      value: 'abc 4'
    },
    {
      key: 5,
      value: 'abc 5'
    },
    {
      key: 6,
      value: 'abc 6'
    },
    {
      key: 7,
      value: 'abc 7'
    },
    {
      key: 8,
      value: 'abc 8'
    },
    {
      key: 9,
      value: 'abc 9'
    },
    {
      key: 10,
      value: 'abc 10'
    },
    {
      key: 11,
      value: 'abc 11'
    },
    {
      key: 12,
      value: 'abc 12'
    }
  ];

  public data$ = of(this.data);

  private dataModificationAsync: IAutoCompleteItemModel[] = Array.from(this.dataModification);
  private dataSubject = new BehaviorSubject(this.dataModificationAsync);
  public dataModification$: Observable<IAutoCompleteItemModel[]> = this.dataSubject.asObservable();

  public loader!: LoaderFunction;
  private loaderData$ = of(this.data);

  public loaderModification!: LoaderFunction;
  private dataModificationLoader: IAutoCompleteItemModel[] = Array.from(this.dataModification);
  private dataLoaderSubject = new BehaviorSubject(this.dataModificationLoader);
  private loaderDataModification$: Observable<IAutoCompleteItemModel[]> = this.dataLoaderSubject.asObservable();

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group(
      {
        inputAutoCompleteNull: [null],
        inputAutoCompleteLabel: [null],
        inputAutoCompletePlaceholder: [null],
        inputAutoCompleteLabelPlaceholder: [null],
        inputAutoCompleteIcon: [null],
        inputAutoCompleteLabelPlaceholderIcon: [null],
        inputAutoCompleteHelper: [null],
        inputAutoCompleteHelperIcon: [null],
        inputAutoCompleteHelperLabelPlaceholder: [null],
        inputAutoCompleteDisabled: [{
          value: { key: 1, value: 'andrii 1' },
          disabled: true
        }],
        inputAutoCompleteDisabledLabel: [{
          value: null,
          disabled: true
        }],
        inputAutoCompleteDisabledAll: [{
          value: null,
          disabled: true
        }],
        inputAutoCompleteValidation: [null, {
          validators: [equalOrInclude([{
            key: 3,
            value: "anita 3"
          }])]
        }],
        inputAutoCompleteValidationSuccess: [{
          key: 3,
          value: "anita 3"
        }, {
          validators: [equalOrInclude([{
            key: 3,
            value: "anita 3"
          }])]
        }],
        inputAutoCompleteValidationFailed: [{
          key: 1,
          value: "vova 11"
        }, {
          validators: [equalOrInclude([{
            key: 3,
            value: "anita 3"
          }])]
        }],
        inputAutoCompleteValidationMessage: [null, {
          validators: [equalOrInclude([{
            key: 3,
            value: "anita 3"
          }])]
        }],
        inputAutoCompleteValidationSuccessMessage: [{
          key: 3,
          value: "anita 3"
        }, {
          validators: [equalOrInclude([{
            key: 3,
            value: "anita 3"
          }])]
        }],
        inputAutoCompleteValidationFailedMessage: [{
          key: 3,
          value: "anita 3"
        }, {
          validators: [equalOrInclude([{
            key: 3,
            value: "anita 3"
          }])]
        }],
        inputAutoCompleteScroll: [null],
        inputAutoCompleteModification: [null],
        inputAutoCompleteSmall: [null],
        inputAutoCompleteLarge: [null],
        inputAutoCompleteCustom: [null],
        // observable
        inputAutoCompleteObservableHelperIcon: [null],
        inputAutoCompleteObservableValidationMessage: [null, {
          validators: [equalOrInclude([{
            key: 3,
            value: "anita 3"
          }])]
        }],
        inputAutoCompleteObservableModification: [null],
        // loader
        inputAutoCompleteLoaderHelperIcon: [null],
        inputAutoCompleteLoaderValidationMessage: [null, {
          validators: [equalOrInclude([{
            key: 3,
            value: "anita 3"
          }])]
        }],
        inputAutoCompleteLoaderModification: [null]
      }
    );

    this.loader = this.getLoaderFynction(this.loaderData$);
    this.loaderModification = this.getLoaderFynction(this.loaderDataModification$);
  }

  // SYNC DATA ACTIONS

  addItemSync() {
    this.dataModification.push({
      key: 13,
      value: 'abc 13'
    });
  }

  removeItemSync() {
    this.dataModification.shift();
  }

  // END SYNC DATA ACTIONS

  // ASYNC DATA ACTIONS

  addItemAsync() {
    this.dataModificationAsync.push({
      key: 13,
      value: 'abc 13'
    });
    this.dataSubject.next(this.dataModificationAsync);
  }

  removeItemAsync() {
    this.dataModificationAsync.splice(-1);
    this.dataSubject.next(this.dataModificationAsync);
  }

  // END ASYNC DATA ACTIONS

  // LOADER DATA ACTIONS

  addItemLoader() {
    this.dataModificationLoader.push({
      key: 13,
      value: 'abc 13'
    });
    this.dataLoaderSubject.next(this.dataModificationLoader);
  }

  removeItemLoader() {
    this.dataModificationLoader.splice(-1);
    this.dataLoaderSubject.next(this.dataModificationLoader);
  }

  // END LOADER DATA ACTIONS

  private getLoaderFynction(data$: Observable<IAutoCompleteItemModel[]>) {
    return ((parameters: ILoadMoreParameters, source: LoadChangesSource): Observable<ILoadMoreModel<any>> => {
      return data$.pipe(
        delay(1000),
        map(items => {
          const reset = source == LoadChangesSource.Data;

          if (reset) {
            parameters = { params: parameters.params, page: 1 };
          }

          const filtered = where(items, (item: IAutoCompleteItemModel) => {
            const itemParts = item.value.trim().split(' ');
            return item.value.includes(parameters.params.value) || hasItemBy(itemParts, part => part.includes(parameters.params.value));
          });

          const data: ILoadMoreModel<any> = filtered
            ? {
              items: skip(filtered, parameters.page, 3),
              next: parameters.page < Math.ceil(filtered.length / 3),
              reset: reset
            }
            : { items: [], next: false, reset: reset };

          source = LoadChangesSource.Data;

          return data;
        })
      );
    });
  }
}
