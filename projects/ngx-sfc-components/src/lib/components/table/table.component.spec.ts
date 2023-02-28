import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Position, SortingComponent, TemplateReferenceDirective } from 'ngx-sfc-common';
import { CheckmarkComponent } from 'ngx-sfc-common';
import { MediaLimits, ShowHideElementDirective } from 'ngx-sfc-common';
import { DelimeterComponent, PaginationComponent, WINDOW } from 'ngx-sfc-common';
import { SortingDirection, TemplateContentComponent } from 'ngx-sfc-common';
import { ToggleSwitcherComponent } from 'ngx-sfc-common';
import { BehaviorSubject } from 'rxjs';
import { TableDataType } from './enums/table-data-type.enum';
import { TableTemplate } from './enums/table-template.enum';
import { ITableDataModel } from './models/table.model';
import { DefaultTableColumnComponent } from './parts/columns/default/default-table-column.component';
import { SelectableTableColumnComponent } from './parts/columns/selectable/selectable-table-column.component';
import { DefaultTableCardComponent } from './parts/content/cards/default/default-table-card.component';
import { DefaultTableRowComponent } from './parts/content/rows/default/default-table-row.component';
import { ColumnsToggleComponent } from './parts/toggle/columns-toggle.component';
import { TableComponent } from './table.component';
import { TableConstants } from './table.constants';

describe('Component: Table', () => {
    let component: TableComponent;
    let fixture: ComponentFixture<TableComponent>;
    let windowMock: any = <any>{};

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FontAwesomeModule],
            declarations: [ShowHideElementDirective, ColumnsToggleComponent, ToggleSwitcherComponent, PaginationComponent, ShowHideElementDirective,
                DelimeterComponent, SortingComponent, TemplateContentComponent, DefaultTableColumnComponent, SelectableTableColumnComponent,
                CheckmarkComponent, DefaultTableRowComponent, DefaultTableCardComponent, TableComponent],
            providers: [
                { provide: WINDOW, useFactory: (() => { return windowMock; }) }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TableComponent);
        component = fixture.componentInstance;
        windowMock.innerWidth = MediaLimits.Tablet;
        fixture.detectChanges();
    });

    describe('General', () => {
        fit('Should create component', () => {
            expect(component).toBeTruthy();
        });

        fit('Should have main elements', () => {
            expect(fixture.nativeElement.querySelector('div.container')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('div.columns-container')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('div.columns-actions')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('div.columns')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('div.rows-container')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('div.pagination-container')).toBeTruthy();
        });
    });

    describe('Delimeter', () => {
        fit('Should not exist column delimeter by default', () => {
            component.pagination.enabled = false;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('div.container > sfc-delimeter')).toBeNull();
        });

        fit('Should exist column delimeter', () => {
            component.pagination.enabled = false;
            component.delimeter = true;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('sfc-delimeter')).toBeTruthy();
        });

        fit('Should not exist column delimeter', () => {
            component.pagination.enabled = false;
            component.delimeter = false;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('sfc-delimeter')).toBeNull();
        });
    });

    describe('Actions', () => {
        describe('Columns toggle', () => {
            fit('Should exist', () => {
                expect(fixture.nativeElement.querySelector('sfc-columns-toggle')).toBeTruthy();
            });

            fit('Should not exist', () => {
                component.showColumns = false;
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('sfc-columns-toggle')).toBeNull();
            });

        });

        describe('Data type toggle', () => {
            fit('Should exist', () => {
                expect(fixture.nativeElement.querySelector('sfc-toggle-switcher')).toBeDefined();
            });

            fit('Should not exist', () => {
                component.dataToggle = false;
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('sfc-toggle-switcher')).toBeNull();
            });

            fit('Should not be active', () => {
                const toggleEl = fixture.debugElement.query(By.css('sfc-toggle-switcher'));

                expect(toggleEl.attributes['ng-reflect-active']).toEqual('false');
                expect(toggleEl.componentInstance.active).toBeFalsy();
            });

            fit('Should be active', () => {
                component.dataType = TableDataType.Cards;
                fixture.detectChanges();

                const toggleEl = fixture.debugElement.query(By.css('sfc-toggle-switcher'));

                expect(toggleEl.attributes['ng-reflect-active']).toEqual('true');
                expect(toggleEl.componentInstance.active).toBeTruthy();
            });

            fit('Should have static models', () => {
                const toggleEl = fixture.debugElement.query(By.css('sfc-toggle-switcher'));

                expect(toggleEl.componentInstance.leftModel).toEqual(TableConstants.TOGGLE_SWITCHER_LEFT_MODEL);
                expect(toggleEl.componentInstance.rightModel).toEqual(TableConstants.TOGGLE_SWITCHER_RIGHT_MODEL);
            });

            fit('Should toggle data type', () => {
                expect(component.dataType).toEqual(TableDataType.Rows);

                const toggleSwitcherEl = fixture.nativeElement.querySelector('sfc-toggle-switcher');

                toggleSwitcherEl.dispatchEvent(new MouseEvent('click', {}));
                fixture.detectChanges();

                expect(component.dataType).toEqual(TableDataType.Cards);

                toggleSwitcherEl.dispatchEvent(new MouseEvent('click', {}));
                fixture.detectChanges();

                expect(component.dataType).toEqual(TableDataType.Rows);
            });
        });
    });

    describe('Pagination', () => {
        fit('Should exist', () => {
            expect(fixture.nativeElement.querySelector('sfc-pagination')).toBeTruthy();
        });

        fit('Should not exist', () => {
            component.data = [{ data: {} }, { data: {} }];
            component.pagination.enabled = false;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('sfc-pagination')).toBeNull();
        });

        fit('Should have static attributes', () => {
            const paginationEl = fixture.debugElement.query(By.css('sfc-pagination'));

            expect(paginationEl.attributes['ng-reflect-limits']).toEqual('false');
            expect(paginationEl.attributes['ng-reflect-full']).toEqual('false');
            expect(paginationEl.componentInstance.limits).toBeFalsy();
            expect(paginationEl.componentInstance.full).toBeFalsy();
        });
    });

    describe('Columns', () => {
        fit('Should show columns by default', () => {
            expect(fixture.nativeElement.querySelector('div.columns')).toBeTruthy();
        });

        fit('Should hide columns, when show column input is false', () => {
            component.showColumns = false;
            fixture.detectChanges();

            window.dispatchEvent(new Event('resize'));
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('div.columns')).toBeNull();
        });

        fit('Should show columns, when windows size is more than constant value', () => {
            windowMock.innerWidth = MediaLimits.Tablet + 1;
            fixture.detectChanges();

            window.dispatchEvent(new Event('resize'));
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('div.columns')).toBeTruthy();
        });

        fit('Should show columns, when windows size is equal to constant value', () => {
            windowMock.innerWidth = MediaLimits.Tablet;
            fixture.detectChanges();

            window.dispatchEvent(new Event('resize'));
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('div.columns')).toBeTruthy();
        });

        fit('Should hide columns, when windows size is less than constant value', () => {
            windowMock.innerWidth = MediaLimits.Tablet - 1;
            fixture.detectChanges();

            window.dispatchEvent(new Event('resize'));
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('div.columns')).toBeNull();
        });

        fit('Should have default column position', () => {
            component.columns = [{ name: '', field: '' }];
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('div.columns > div.column').style.justifyContent).toEqual(Position.Center);
        });

        fit('Should have defined column position', () => {
            component.columns = [{ name: '', field: '' }];
            component.position = Position.Left;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('.columns > div.column').style.justifyContent).toEqual(Position.Left);
        });

        fit('Should have column width for desktop', () => {
            component.columns = [{ name: '', field: '' }, { name: '', field: '' }];
            fixture.detectChanges();

            windowMock.innerWidth = MediaLimits.Laptop;
            fixture.detectChanges();

            window.dispatchEvent(new Event('resize'));
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('div.columns > div.column').style.width).toEqual('calc(50%)');
        });

        fit('Should have column width for tablet', () => {
            component.columns = [{ name: '', field: '' }, { name: '', field: '' }];
            fixture.detectChanges();

            windowMock.innerWidth = MediaLimits.Tablet;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('div.columns > div.column').style.width).toEqual('calc(100%)');
        });

        fit('Should have column width for phone', () => {
            component.columns = [{ name: '', field: '' }, { name: '', field: '' }];
            fixture.detectChanges();

            windowMock.innerWidth = MediaLimits.MobileLarge;
            fixture.detectChanges();

            window.dispatchEvent(new Event('resize'));
            fixture.detectChanges();

            // need toggle columns, because for mobile they will be hiden
            fixture.nativeElement.querySelector('sfc-columns-toggle').dispatchEvent(new MouseEvent('click', {}));
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('div.columns > div.column').style.width).toEqual('calc(100%)');
        });

        fit('Should have valid count', () => {
            component.columns = [{ name: '', field: '' }, { name: '', field: '' }, { name: '', field: '' }];
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelectorAll('div.columns > div.column').length).toEqual(component.columns.length);
        });

        fit('Should columns count change', () => {
            component.columns = [{ name: '', field: '' }, { name: '', field: '' }, { name: '', field: '' }];
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelectorAll('div.columns > div.column').length).toEqual(component.columns.length);

            component.columns.push({ name: '', field: '' });
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelectorAll('div.columns > div.column').length).toEqual(component.columns.length);

            component.columns.shift();
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelectorAll('div.columns > div.column').length).toEqual(component.columns.length);
        });

        describe('Selectable', () => {
            fit('Should not exist by default', () => {
                component.columns = [{ name: '', field: '' }];
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('sfc-selectable-table-column')).toBeNull();
            });

            fit('Should not exist, if table not selectable', () => {
                component.columns = [{ name: '', field: '' }];
                component.selectable = false;
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('sfc-selectable-table-column')).toBeNull();
            });

            fit('Should exist, if table is selectable', () => {
                component.columns = [{ name: '', field: '' }];
                component.selectable = true;
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('sfc-selectable-table-column')).toBeDefined();
            });

            fit('Should not be selected, if all rows not checked', () => {
                component.columns = [{ name: '', field: '' }];
                component.selectable = true;
                component.data = [{ data: {}, selected: false }, { data: {}, selected: false }];
                fixture.detectChanges();

                const selectAllColumnEl = fixture.debugElement.query(By.css('sfc-selectable-table-column'));

                expect(selectAllColumnEl.attributes['ng-reflect-selected']).toEqual('false');
                expect(selectAllColumnEl.componentInstance.selected).toBeFalsy();
            });

            fit('Should not be selected, if one of the rows not selected', () => {
                component.columns = [{ name: '', field: '' }];
                component.data = [{ data: {}, selected: true }, { data: {}, selected: false }];
                component.selectable = true;
                fixture.detectChanges();

                const selectAllColumnEl = fixture.debugElement.query(By.css('sfc-selectable-table-column'));

                expect(selectAllColumnEl.attributes['ng-reflect-selected']).toEqual('false');
                expect(selectAllColumnEl.componentInstance.selected).toBeFalsy();
            });

            fit('Should be selected, if all rows selected', () => {
                component.columns = [{ name: '', field: '' }];
                component.data = [{ data: {}, selected: true }, { data: {}, selected: true }];
                component.selectable = true;
                fixture.detectChanges();

                const selectAllColumnEl = fixture.debugElement.query(By.css('sfc-selectable-table-column'));

                expect(selectAllColumnEl.attributes['ng-reflect-selected']).toEqual('true');
                expect(selectAllColumnEl.componentInstance.selected).toBeTruthy();
            });

            fit('Should be selected all rows', () => {
                component.columns = [{ name: '', field: '' }];
                component.data = [{ data: {}, selected: false }, { data: {}, selected: false }];
                component.selectable = true;
                fixture.detectChanges();

                fixture.nativeElement.querySelector('sfc-selectable-table-column').dispatchEvent(new MouseEvent('click', {}));
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelectorAll('div.checkmark sfc-checkmark.active').length).toEqual(2);
            });
        });

        describe('Sequence', () => {
            fit('Should not exist be default', () => {
                component.columns = [{ name: '', field: '' }, { name: '', field: '' }, { name: '', field: '' }];
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelectorAll('sfc-sorting').length).toEqual(component.columns.length);
            });

            fit('Should exist if show sequence column is TRUE', () => {
                component.columns = [{ name: '', field: '' }, { name: '', field: '' }, { name: '', field: '' }];
                component.sequence = true;
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelectorAll('sfc-sorting').length).toEqual(component.columns.length + 1);
            });
        });

        describe('Expanded', () => {
            fit('Should not exist be default', () => {
                component.columns = [{ name: '', field: '' }, { name: '', field: '' }, { name: '', field: '' }];
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelectorAll('sfc-sorting').length).toEqual(component.columns.length);
            });

            fit('Should exist if expanded is TRUE', () => {
                component.columns = [{ name: '', field: '' }, { name: '', field: '' }, { name: '', field: '' }];
                component.expanded = true;
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelectorAll('sfc-sorting').length).toEqual(component.columns.length + 1);
            });
        });

        describe('Sorting', () => {
            fit('Should be same as columns', () => {
                component.columns = [{ name: '', field: '' }, { name: '', field: '' }, { name: '', field: '' }];
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelectorAll('sfc-sorting').length).toEqual(component.columns.length);
            });

            fit('Should have default model', () => {
                component.columns = [{ name: '', field: '' }];
                fixture.detectChanges();

                expect(fixture.debugElement.query(By.css('sfc-sorting')).componentInstance.model)
                    .toEqual({ active: false, enabled: false, direction: SortingDirection.Ascending });
            });

            fit('Should have defined model', () => {
                const sortingAssertValue = { active: true, enabled: true, direction: SortingDirection.Descending };
                component.columns = [{ name: '', field: '', sorting: sortingAssertValue }];
                fixture.detectChanges();

                expect(fixture.debugElement.query(By.css('sfc-sorting')).componentInstance.model).toEqual(sortingAssertValue);
            });

            fit('Should id value be equal to columns field', () => {
                component.columns = [{ name: '', field: 'test-id' }];
                fixture.detectChanges();

                const sortingEl = fixture.debugElement.query(By.css('sfc-sorting'));

                expect(sortingEl.attributes['ng-reflect-id']).toEqual('test-id');
                expect(sortingEl.componentInstance.id).toEqual('test-id');
            });
        });

        describe('Content', () => {
            fit("Should created default", () => {
                component.columns = [{ name: '', field: '' }];
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('sfc-default-table-column')).toBeDefined();
            });

            fit("Should have defined model", () => {
                component.columns = [{ name: '', field: '' }];
                fixture.detectChanges();

                expect(fixture.debugElement.query(By.css('sfc-default-table-column')).componentInstance.model).toEqual({ name: '', field: '' });
            });
        });
    });

    describe('Rows', () => {
        fit("Should created default", () => {
            component.columns = [{ name: '', field: '' }];
            component.data = [{ data: {} }, { data: {} }];
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelectorAll('sfc-default-table-row').length).toEqual(2);
        });

        fit("Should have default attributes", () => {
            component.columns = [{ name: '', field: '' }];
            component.data = [{ data: { field: 1 } }, { data: { field: 2 } }];
            fixture.detectChanges();

            const defaultRowEls = fixture.debugElement.queryAll(By.css('sfc-default-table-row'));

            defaultRowEls.forEach((row, index) => {
                expect(row.attributes['ng-reflect-position']).toEqual(component.position);
                expect(row.attributes['ng-reflect-column-width']).toEqual('1');
                expect(row.attributes['ng-reflect-select-on-click']).toEqual('false');
                expect(row.componentInstance.columns).toEqual(component.columns);
                expect(row.componentInstance.model).toEqual({ index: index, dataModel: { data: { field: index == 0 ? 1 : 2 } } });
            });
        });
    });

    describe('Cards', () => {
        fit("Should created default", () => {
            component.columns = [{ name: '', field: '' }];
            component.data = [{ data: {} }, { data: {} }];
            component.dataType = TableDataType.Cards;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelectorAll('sfc-default-table-card').length).toEqual(2);
        });

        fit("Should have default attributes", () => {
            component.columns = [{ name: '', field: '' }];
            component.data = [{ data: { field: 1 } }, { data: { field: 2 } }];
            component.selectOnClick = true;
            component.dataType = TableDataType.Cards;
            fixture.detectChanges();

            const deafultCardEls = fixture.debugElement.queryAll(By.css('sfc-default-table-card'));

            deafultCardEls.forEach((card, index) => {
                expect(card.attributes['ng-reflect-select-on-click']).toEqual('true');
                expect(card.componentInstance.columns).toEqual(component.columns);
                expect(card.componentInstance.model).toEqual({ index: index, dataModel: { data: { field: index == 0 ? 1 : 2 } } });
            });
        });
    });

    describe('Data', () => {
        fit("Should have valid rows count for sync data", () => {
            component.data = [{ data: {} }, { data: {} }];
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelectorAll('sfc-default-table-row').length).toEqual(2);
        });

        fit("Should sync data change", () => {
            component.data = [{ data: {} }, { data: {} }];
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelectorAll('sfc-default-table-row').length).toEqual(2);

            component.data.push({ data: {} });
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelectorAll('sfc-default-table-row').length).toEqual(3);

            component.data.shift();
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelectorAll('sfc-default-table-row').length).toEqual(2);
        });

        fit("Should have valid rows count for async data", () => {
            const dataSubject = new BehaviorSubject<ITableDataModel[]>([{ data: {} }, { data: {} }]);
            component.columns = [{ name: '', field: 'field' }];
            component.data$ = dataSubject.asObservable();
            fixture.detectChanges();

            component.ngOnInit();
            fixture.detectChanges();

            component.ngAfterViewInit();
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelectorAll('sfc-default-table-row').length).toEqual(2);
        });

        fit("Should async data change", () => {
            const dataSubject = new BehaviorSubject<ITableDataModel[]>([{ data: {} }, { data: {} }]);
            component.columns = [{ name: '', field: 'field' }];
            component.data$ = dataSubject.asObservable();
            fixture.detectChanges();

            component.ngOnInit();
            fixture.detectChanges();

            component.ngAfterViewInit();
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelectorAll('sfc-default-table-row').length).toEqual(2);

            dataSubject.next([{ data: {} }]);
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelectorAll('sfc-default-table-row').length).toEqual(1);

            dataSubject.next([{ data: {} }, { data: {} }, { data: {} }]);
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelectorAll('sfc-default-table-row').length).toEqual(3);
        });

        fit("Should not be data sorted", () => {
            component.columns = [{ name: '', field: 'field' }];
            component.data = [{ data: { field: 2 } }, { data: { field: 1 } }, { data: { field: 3 } }];
            fixture.detectChanges();

            fixture.nativeElement.querySelector('sfc-sorting').dispatchEvent(new MouseEvent('click', {}));
            fixture.detectChanges();

            const defaultRowsEls = fixture.debugElement.queryAll(By.css('sfc-default-table-row'));

            defaultRowsEls.forEach((row, index) => {
                const dataContainer = row.queryAll(By.css('div.content > div > span'))[1];
                if (index == 0)
                    expect(dataContainer.nativeElement.innerText).toEqual('2');
                else if (index == 1)
                    expect(dataContainer.nativeElement.innerText).toEqual('1');
                else {
                    expect(dataContainer.nativeElement.innerText).toEqual('3');
                }
            });
        });

        fit("Should be data sorted", () => {
            component.columns = [{ name: '', field: 'field', sorting: { enabled: true, active: true, direction: SortingDirection.Ascending } }];
            component.data = [{ data: { field: 2 } }, { data: { field: 1 } }, { data: { field: 3 } }];
            fixture.detectChanges();

            component.ngOnInit();
            fixture.detectChanges();

            fixture.nativeElement.querySelector('sfc-sorting').dispatchEvent(new MouseEvent('click', {}));
            fixture.detectChanges();

            let defaultRowsEls = fixture.debugElement.queryAll(By.css('sfc-default-table-row'));

            defaultRowsEls.forEach((row, index) => {
                const dataContainer = row.queryAll(By.css('div.content > div > span'))[1];
                if (index == 0)
                    expect(dataContainer.nativeElement.innerText).toEqual('1');
                else if (index == 1)
                    expect(dataContainer.nativeElement.innerText).toEqual('2');
                else {
                    expect(dataContainer.nativeElement.innerText).toEqual('3');
                }
            });

            fixture.nativeElement.querySelector('sfc-sorting').dispatchEvent(new MouseEvent('click', {}));
            fixture.detectChanges();

            defaultRowsEls = fixture.debugElement.queryAll(By.css('sfc-default-table-row'));

            defaultRowsEls.forEach((row, index) => {
                const dataContainer = row.queryAll(By.css('div.content > div > span'))[1];
                if (index == 0)
                    expect(dataContainer.nativeElement.innerText).toEqual('3');
                else if (index == 1)
                    expect(dataContainer.nativeElement.innerText).toEqual('2');
                else {
                    expect(dataContainer.nativeElement.innerText).toEqual('1');
                }
            });
        });

        fit("Should data be paginated by default", () => {
            component.columns = [{ name: '', field: 'field' }];
            component.data = [{ data: { field: 2 } }, { data: { field: 1 } }, { data: { field: 3 } },
            { data: { field: 3 } }, { data: { field: 3 } }, { data: { field: 3 } }];
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelectorAll('sfc-default-table-row').length).toEqual(5);
        });

        fit("Should data be paginated", () => {
            component.columns = [{ name: '', field: 'field' }];
            component.pagination.page = 2;
            component.pagination.size = 2;
            const dataSubject = new BehaviorSubject<ITableDataModel[]>([
                { data: { field: 2 } }, { data: { field: 1 } }, { data: { field: 3 } },
                { data: { field: 3 } }, { data: { field: 3 } }
            ]);
            component.data$ = dataSubject.asObservable();
            component.ngOnInit();
            fixture.detectChanges();

            fixture.debugElement.query(By.css('sfc-pagination')).componentInstance.ngOnInit();

            component.ngAfterViewInit();
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelectorAll('sfc-default-table-row').length).toEqual(2);

            fixture.nativeElement.querySelectorAll('sfc-pagination li')[3].dispatchEvent(new MouseEvent('click', {}));
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelectorAll('sfc-default-table-row').length).toEqual(1);
        });

        fit('Should have valid sequence', () => {
            component.columns = [{ name: '', field: '' }, { name: '', field: '' }, { name: '', field: '' }];
            component.data = [{ data: { field: 2 } }, { data: { field: 1 } }, { data: { field: 3 } },
            { data: { field: 3 } }, { data: { field: 3 } }];
            component.sequence = true;
            fixture.detectChanges();

            fixture.debugElement.queryAll(By.css('sfc-default-table-row')).forEach((row, index) => {
                expect(row.queryAll(By.css('div.content > div > span'))[1].nativeElement.innerText).toEqual(`${index + 1}`);
            });
        });

        fit('Should have valid sequence with pagination', () => {
            component.columns = [{ name: '', field: '' }, { name: '', field: '' }, { name: '', field: '' }];
            component.sequence = true;
            component.pagination.size = 2;
            const dataSubject = new BehaviorSubject<ITableDataModel[]>([
                { data: { field: 2 } }, { data: { field: 1 } }, { data: { field: 3 } },
                { data: { field: 3 } }, { data: { field: 3 } }
            ]);
            component.data$ = dataSubject.asObservable();
            component.ngOnInit();
            fixture.detectChanges();

            fixture.debugElement.query(By.css('sfc-pagination')).componentInstance.ngOnInit();

            component.ngAfterViewInit();
            fixture.detectChanges();

            fixture.nativeElement.querySelectorAll('sfc-pagination li')[2].dispatchEvent(new MouseEvent('click', {}));
            fixture.detectChanges();

            fixture.debugElement.queryAll(By.css('sfc-default-table-row')).forEach((row, index) => {
                expect(row.queryAll(By.css('div.content > div > span'))[1].nativeElement.innerText).toEqual(`${index == 0 ? 3 : 4}`);
            });
        });

        fit('Should rows be selected', () => {
            component.columns = [{ name: '', field: '' }];
            component.data = [{ data: {}, selected: true }, { data: {}, selected: true }];
            component.selectable = true;
            fixture.detectChanges();

            let deafultRowsEls = fixture.debugElement.queryAll(By.css('sfc-default-table-row'));

            deafultRowsEls.forEach(row => {
                expect(row.query(By.css('sfc-checkmark.active'))).toBeTruthy();
            });
        });

        fit('Should rows selected change', () => {
            component.columns = [{ name: '', field: '' }];
            component.data = [{ data: {}, selected: true }, { data: {}, selected: true }];
            component.selectable = true;
            fixture.detectChanges();

            fixture.nativeElement.querySelectorAll('.checkmark')[0].dispatchEvent(new MouseEvent('click', {}));
            fixture.detectChanges();

            let deafultRowsEls = fixture.debugElement.queryAll(By.css('sfc-default-table-row'));

            deafultRowsEls.forEach((row, index) => {
                if (index == 0)
                    expect(row.query(By.css('sfc-checkmark.active'))).toBeNull();
                else
                    expect(row.query(By.css('sfc-checkmark.active'))).toBeTruthy();
            });
        });
    });
});

@Component({
    template: `<ng-template #columnRef let-column>
                  <h1 class="column-ref">{{column.name}}</h1>
              </ng-template>  
              
              <ng-template #rowRef let-data>
                <div class="row-ref">
                  <h1 class="data">{{data.model.dataModel.data.field}}</h1>
                  <span class="column-width">{{data.columnWidth}}</span>
                  <span class="column-position">{{data.position}}</span>
                </div>
              </ng-template>  
              
              <ng-template #cardRef let-data>
                <div class="card-ref">
                  <h1 class="data">{{data.model.dataModel.data.field}}</h1>
                </div>
              </ng-template>
  
             <sfc-table>

             <ng-template *ngIf="showContent" [sfcTemplateReference]="TableTemplate.Column" let-column>
                <h2 class="column-content">{{column.name}}</h2>
               </ng-template>

               <ng-template *ngIf="showContent" [sfcTemplateReference]="TableTemplate.Row" let-data>
                <div class="row-content">
                  <h2 class="data">{{data.model.dataModel.data.field}}</h2>
                  <span class="column-width">{{data.columnWidth}}</span>
                  <span class="column-position">{{data.position}}</span>
                </div>
               </ng-template>

               <ng-template *ngIf="showContent" [sfcTemplateReference]="TableTemplate.Card" let-data>
                <div class="card-content">
                  <h2 class="data">{{data.model.dataModel.data.field}}</h2>
                </div>
               </ng-template>

             </sfc-table>`
})
class TestTableComponent {

    TableTemplate = TableTemplate;

    @ViewChild(TableComponent, { static: false })
    table!: TableComponent;

    @ViewChild('columnRef', { static: false })
    columnTemplateRef!: TemplateRef<any>;

    @ViewChild('rowRef', { static: false })
    rowTemplateRef!: TemplateRef<any>;

    @ViewChild('cardRef', { static: false })
    cardTemplateRef!: TemplateRef<any>;

    showContent: boolean = false;
}

describe('Component: Table: Templates', () => {
    let component: TestTableComponent;
    let fixture: ComponentFixture<TestTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FontAwesomeModule],
            declarations: [ColumnsToggleComponent, ToggleSwitcherComponent, PaginationComponent, ShowHideElementDirective,
                DelimeterComponent, SortingComponent, TableComponent, TemplateContentComponent, DefaultTableColumnComponent,
                TemplateReferenceDirective, TestTableComponent],
            providers: [
                { provide: WINDOW, useFactory: (() => { return { innerWidth: MediaLimits.Tablet } }) }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('Column', () => {
        fit("Should add column from template reference", () => {
            component.table.columns = [{ name: 'column-name-reference', field: '' }];
            (component.table as any).columnContent = component.columnTemplateRef;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('h1.column-ref').innerText).toEqual(component.table.columns[0].name);
            expect(fixture.nativeElement.querySelector('h2.column-content')).toBeNull();
            expect(fixture.nativeElement.querySelector('sfc-default-table-column')).toBeNull();
        });

        fit("Should add column from template content", () => {
            component.table.columns = [{ name: 'column-name-content', field: '' }];
            component.showContent = true;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('h1.column-ref')).toBeNull();
            expect(fixture.nativeElement.querySelector('h2.column-content').innerText).toEqual(component.table.columns[0].name);
            expect(fixture.nativeElement.querySelector('sfc-default-table-column')).toBeNull();
        });
    });

    describe('Row', () => {
        fit("Should add row from template reference", () => {
            component.table.columns = [{ name: '', field: '' }];
            component.table.data = [{ data: { field: 1 } }, { data: { field: 2 } }];
            (component.table as any).rowContent = component.rowTemplateRef;
            fixture.detectChanges();

            const rowsEls = fixture.nativeElement.querySelectorAll('div.row-ref');

            rowsEls.forEach((row: any, index: number) => {
                expect(row.querySelector('h1.data').innerText).toEqual(component.table.data[index].data.field.toString());
                expect(row.querySelector('span.column-width').innerText).toEqual('1');
                expect(row.querySelector('span.column-position').innerText).toEqual(Position.Center);
            });

            expect(fixture.nativeElement.querySelector('div.row-content')).toBeNull();
            expect(fixture.nativeElement.querySelector('sfc-default-table-row')).toBeNull();
        });

        fit("Should add row from template content", () => {
            component.table.columns = [{ name: '', field: '' }];
            component.table.data = [{ data: { field: 1 } }, { data: { field: 2 } }];
            component.showContent = true;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('div.row-ref')).toBeNull();

            const rowsEls = fixture.nativeElement.querySelectorAll('div.row-content');

            rowsEls.forEach((row: any, index: number) => {
                expect(row.querySelector('h2.data').innerText).toEqual(component.table.data[index].data.field.toString());
                expect(row.querySelector('span.column-width').innerText).toEqual('1');
                expect(row.querySelector('span.column-position').innerText).toEqual(Position.Center);
            });

            expect(fixture.nativeElement.querySelector('sfc-default-table-row')).toBeNull();
        });
    });

    describe('Card', () => {
        fit("Should add card from template reference", () => {
            component.table.columns = [{ name: '', field: '' }];
            component.table.data = [{ data: { field: 1 } }, { data: { field: 2 } }];
            component.table.dataType = TableDataType.Cards;
            (component.table as any).cardContent = component.cardTemplateRef;
            fixture.detectChanges();

            const cardsEls = fixture.nativeElement.querySelectorAll('div.card-ref');

            cardsEls.forEach((card: any, index: number) => {
                expect(card.querySelector('h1.data').innerText).toEqual(component.table.data[index].data.field.toString());
            });

            expect(fixture.nativeElement.querySelector('div.card-content')).toBeNull();
            expect(fixture.nativeElement.querySelector('sfc-default-table-card')).toBeNull();
        });

        fit("Should add card from template content", () => {
            component.table.columns = [{ name: '', field: '' }];
            component.table.data = [{ data: { field: 1 } }, { data: { field: 2 } }];
            component.table.dataType = TableDataType.Cards;
            component.showContent = true;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('div.card-ref')).toBeNull();

            const cardsEls = fixture.nativeElement.querySelectorAll('div.card-content');

            cardsEls.forEach((card: any, index: number) => {
                expect(card.querySelector('h2.data').innerText).toEqual(component.table.data[index].data.field.toString());
            });

            expect(fixture.nativeElement.querySelector('sfc-default-table-card')).toBeNull();
        });
    });
});