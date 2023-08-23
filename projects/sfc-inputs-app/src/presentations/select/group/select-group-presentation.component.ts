import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ILoadMoreModel, ILoadMoreParameters, LoaderFunction, skip } from 'ngx-sfc-common';
import { equalOrInclude, SelectItemModel } from 'ngx-sfc-inputs';
import { of, BehaviorSubject, Observable, map, delay } from 'rxjs';
import { BasePresentationComponent } from '../../base-presentations.component';

@Component({
  templateUrl: './select-group-presentation.component.html',
  styleUrls: ['../../../shared/styles/shared.component.scss']
})
export class GroupSelectPresentationComponent extends BasePresentationComponent
  implements OnInit {

  public data: SelectItemModel[] = [
    {
      value: 'group one',
      group: true,
      groupKey: 1
    },
    {
      value: 'group two',
      group: true,
      groupKey: 2
    },
    {
      key: 1,
      value: 'option 1',
      groupKey: 1,
      image: '../assets/argentina_messi.png'
    },
    {
      key: 2,
      value: "option 2",
      groupKey: 1,
      image: '../assets/costa_rica_ruis.png'
    },
    {
      key: 3,
      value: "option 3",
      groupKey: 1
    },
    {
      key: 4,
      value: "option 4",
      groupKey: 1
    },
    {
      key: 5,
      value: "option 5",
      groupKey: 1
    },
    {
      key: 1,
      value: "option 1 2",
      image: '../assets/costa_rica_ruis.png',
      groupKey: 2
    },
    {
      key: 2,
      value: "option 2 2",
      image: '../assets/argentina_messi.png',
      groupKey: 2
    },
    {
      key: 3,
      value: "option 3 2",
      groupKey: 2
    },
    {
      key: 4,
      value: "option 4 2",
      groupKey: 2
    },
    {
      key: 5,
      value: "option 5 2",
      groupKey: 2
    }
  ];

  public dataModification: SelectItemModel[] = [
    {
      value: 'group one',
      group: true,
      groupKey: 1
    },
    {
      key: 1,
      value: 'abc 1',
      groupKey: 1
    },
    {
      key: 2,
      value: 'abc 2',
      groupKey: 1
    },
    {
      key: 3,
      value: 'abc 3',
      groupKey: 1
    },
    {
      key: 4,
      value: 'abc 4',
      groupKey: 1
    },
    {
      key: 5,
      value: 'abc 5',
      groupKey: 1
    },
    {
      key: 6,
      value: 'abc 6',
      groupKey: 1
    },
    {
      key: 7,
      value: 'abc 7',
      groupKey: 1
    },
    {
      key: 8,
      value: 'abc 8',
      groupKey: 1
    },
    {
      key: 9,
      value: 'abc 9',
      groupKey: 1
    },
    {
      key: 10,
      value: 'abc 10',
      groupKey: 1
    },
    {
      key: 11,
      value: 'abc 11',
      groupKey: 1
    },
    {
      key: 12,
      value: 'abc 12',
      groupKey: 1
    },
    {
      value: 'group two',
      group: true,
      groupKey: 2
    },
    {
      key: 1,
      value: 'abc 1',
      groupKey: 2
    },
    {
      key: 2,
      value: 'abc 2',
      groupKey: 2
    },
    {
      key: 3,
      value: 'abc 3',
      groupKey: 2
    },
    {
      key: 4,
      value: 'abc 4',
      groupKey: 2
    },
    {
      key: 5,
      value: 'abc 5',
      groupKey: 2
    },
    {
      key: 6,
      value: 'abc 6',
      groupKey: 2
    },
    {
      key: 7,
      value: 'abc 7',
      groupKey: 2
    },
    {
      key: 8,
      value: 'abc 8',
      groupKey: 2
    },
    {
      key: 9,
      value: 'abc 9',
      groupKey: 2
    },
    {
      key: 10,
      value: 'abc 10',
      groupKey: 2
    },
    {
      key: 11,
      value: 'abc 11',
      groupKey: 2
    },
    {
      key: 12,
      value: 'abc 12',
      groupKey: 2
    },
  ];

  public data$ = of(this.data);

  private dataModificationAsync: SelectItemModel[] = Array.from(this.dataModification);
  private dataSubject = new BehaviorSubject(this.dataModificationAsync);
  public dataModification$: Observable<SelectItemModel[]> = this.dataSubject.asObservable();

  public loader!: LoaderFunction;
  private loaderData$ = of(this.data);

  public loaderModification!: LoaderFunction;
  private dataModificationLoader: SelectItemModel[] = Array.from(this.dataModification);
  private dataLoaderSubject = new BehaviorSubject(this.dataModificationLoader);
  private loaderDataModification$: Observable<SelectItemModel[]> = this.dataLoaderSubject.asObservable();

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group(
      {
        inputSelectOptGroupEmpty: [null],
        inputSelectOptGroupWithValue: [{
          key: 2,
          groupKey: 1,
          value: "option 2"
        }],
        inputSelectOptGroupWithoutDefault: [null],
        inputSelectOptGroupValiation: [null, {
          validators: [Validators.required, equalOrInclude([{
            key: 1,
            value: "option 1",
            groupKey: 1
          }])]
        }],
        inputSelectOptGroupValiationRange: [null, {
          validators: [Validators.required, equalOrInclude([{
            key: 1,
            value: "option 1",
            groupKey: 1
          }, {
            key: 1,
            value: "option 1 2",
            groupKey: 2
          }])]
        }],
        inputSelectOptGroupValiationText: [{
          key: 2,
          value: "option 2",
          groupKey: 1
        }, {
          validators: [Validators.required, equalOrInclude([{
            key: 1,
            value: "option 1",
            groupKey: 1
          }, {
            key: 1,
            value: "option 1 2",
            groupKey: 2
          }])]
        }],
        inputSelectGroupSmall: [null],
        inputSelectGroupLarge: [null],
        inputSelectGroupCustom: [null],
        inputSelectGroupScroll: [null],
        inputSelectGroupModification: [null],
        // observable
        inputSelectGroupObservableHelperIcon: [null],
        inputSelectGroupObservableValidationMessage: [null, {
          validators: [equalOrInclude([{
            key: 1,
            value: "option 1",
            groupKey: 1
          }])]
        }],
        inputSelectGroupObservableModification: [null],
        // loader
        inputSelectGroupLoaderHelperIcon: [null],
        inputSelectGroupLoaderValidationMessage: [null, {
          validators: [equalOrInclude([{
            key: 1,
            value: "option 1",
            groupKey: 1
          }])]
        }],
        inputSelectGroupLoaderModification: [null]
      }
    );

    this.loader = this.getLoaderFynction(this.loaderData$);
    this.loaderModification = this.getLoaderFynction(this.loaderDataModification$);
  }

  // SYNC DATA ACTIONS

  addItemSync() {
    this.dataModification.push({
      key: 13,
      value: 'abc 13',
      groupKey: 1
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
      value: 'abc 13',
      groupKey: 1
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
      value: 'abc 13',
      groupKey: 1
    });
    this.dataLoaderSubject.next(this.dataModificationLoader);
  }

  removeItemLoader() {
    this.dataModificationLoader.splice(-1);
    this.dataLoaderSubject.next(this.dataModificationLoader);
  }

  // END LOADER DATA ACTIONS

  private getLoaderFynction(data$: Observable<SelectItemModel[]>) {
    return ((parameters: ILoadMoreParameters): Observable<ILoadMoreModel<any>> => {
      return data$.pipe(
        delay(1000),
        map(items => {
          const data: ILoadMoreModel<any> = items
            ? {
              items: skip(items, parameters.page, 3),
              next: parameters.page < Math.ceil(items.length / 3),
              reset: false
            }
            : { items: [], next: false, reset: false };

          return data;
        })
      );
    });
  }
}
