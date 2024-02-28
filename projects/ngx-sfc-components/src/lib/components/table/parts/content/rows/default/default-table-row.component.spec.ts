import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CheckmarkType, getCalcValue, ShowHideElementDirective, UIClass } from 'ngx-sfc-common';
import { CheckmarkComponent, Position, UIConstants } from 'ngx-sfc-common';
import { TableSelectService } from '../../../../service/select/table-select.service';
import { TableColumnType } from '../../../columns/table-column-type.enum';
import { DefaultTableRowComponent } from './default-table-row.component';

describe('Component: DefaultTableRow', () => {
  let component: DefaultTableRowComponent;
  let fixture: ComponentFixture<DefaultTableRowComponent>;
  let tableSelectServiceSpy: jasmine.SpyObj<TableSelectService>;

  beforeEach(async () => {
    tableSelectServiceSpy = jasmine.createSpyObj('TableSelectService', ['select']);

    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [ShowHideElementDirective, CheckmarkComponent, DefaultTableRowComponent],
      providers: [{ provide: TableSelectService, useValue: tableSelectServiceSpy }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create component', () => {
      expect(component).toBeTruthy();
    });

    fit('Should have main elements', () => {
      expect(fixture.nativeElement.querySelector('div.container')).toBeTruthy();
    });

    fit('Should not be even by default', () => {
      expect(fixture.nativeElement.classList.contains(UIClass.Even)).toBeFalse();
    });

    fit('Should be even, if index is even', () => {
      component.model.index = 1;
      fixture.detectChanges();

      expect(fixture.nativeElement.classList.contains(UIClass.Even)).toBeTrue();
    });

    fit('Should not be even, if index is not even', () => {
      component.model.index = 0;
      fixture.detectChanges();

      expect(fixture.nativeElement.classList.contains(UIClass.Even)).toBeFalse();
    });

    fit('Should not have pointer class by default', () => {
      expect(fixture.nativeElement.classList.contains(UIClass.Pointer)).toBeFalse();
    });

    fit('Should have pointer class', () => {
      component.selectOnClick = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.classList.contains(UIClass.Pointer)).toBeTrue();
    });

    fit('Should not have pointer class', () => {
      component.selectOnClick = false;
      fixture.detectChanges();

      expect(fixture.nativeElement.classList.contains(UIClass.Pointer)).toBeFalse();
    });

    fit('Should emit selected', () => {
      component.selectOnClick = true;
      fixture.detectChanges();

      selectRow();

      expect(tableSelectServiceSpy.select).toHaveBeenCalledTimes(1);
    });

    fit('Should not emit selected', () => {
      component.selectOnClick = false;
      fixture.detectChanges();

      selectRow();

      expect(tableSelectServiceSpy.select).not.toHaveBeenCalled();
    });

    fit('Should emit selected for unselected row', () => {
      component.selectOnClick = true;
      component.model.index = 10;
      fixture.detectChanges();

      selectRow();

      expect(tableSelectServiceSpy.select).toHaveBeenCalledOnceWith(component.model.sequence, true);
    });

    fit('Should emit selected for selected row', () => {
      component.model = { data: {}, index: 0, sequence: 1, selected: true };
      component.selectOnClick = true;
      fixture.detectChanges();

      selectRow();

      expect(tableSelectServiceSpy.select).toHaveBeenCalledOnceWith(component.model.sequence, false);
    });

    fit('Should toggle selected', () => {
      component.selectOnClick = true;
      component.model = { data: {}, index: 0, sequence: 1, selected: true };
      fixture.detectChanges();

      selectRow();

      expect(tableSelectServiceSpy.select).toHaveBeenCalledOnceWith(component.model.sequence, false);

      selectRow();

      expect((tableSelectServiceSpy.select as any).calls.allArgs()).toEqual([
        [1, false],
        [1, true]
      ]);

      expect(tableSelectServiceSpy.select).toHaveBeenCalledTimes(2);
    });

    fit("Should call unsubscribe on checkmark subscription, when directive destroyed", () => {
      component.model = { data: { field: 1 }, index: 10, sequence: 1 };
      component.columns = [{ name: 'column', field: 'field', type: TableColumnType.Selectable }];
      fixture.detectChanges();

      component.ngAfterViewInit();

      const unsubscribeSpy = spyOn(
        (component as any)._columnCheckmarkSubscription,
        'unsubscribe'
      ).and.callThrough();

      component.ngOnDestroy();

      expect(unsubscribeSpy).toHaveBeenCalled();
    });
  });

  describe('Columns', () => {
    fit('Should not exist columns container', () => {
      expect(fixture.nativeElement.querySelector('div.content-container')).toBeNull();
    });

    fit('Should exist columns container', () => {
      component.model = { data: { field: 1 }, index: 10, sequence: 1 };;
      component.columns = [{ name: 'column', field: 'field' }];
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.content-container')).toBeDefined();
    });

    fit('Should have columns content as columns count', () => {
      component.model = { data: { field: 1 }, index: 10, sequence: 1 };;
      component.columns = [{ name: 'column', field: 'field' }, { name: 'column1', field: 'field1' }];
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('div.content-container').length).toEqual(component.columns.length);
    });

    fit('Should have default width, if column width not provided', () => {
      component.model = { data: { field: 1 }, index: 10, sequence: 1 };
      component.columns = [{ name: 'column', field: 'field', calculatedWidth: getCalcValue(1) }];
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('div.content-container')).styles['width']).toEqual(`calc(100%)`);
    });

    fit('Should have width that provideed for columnWidth', () => {
      component.model = { data: { field: 1 }, index: 10, sequence: 1 };
      component.columns = [{ name: 'column', field: 'field', calculatedWidth: getCalcValue(44) }];
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('div.content-container')).styles['width']).toEqual('calc(2.27273%)');
    });

    fit('Should have column position by default', () => {
      component.model = { data: { field: 1 }, index: 10, sequence: 1 };;
      component.columns = [{ name: 'column', field: 'field' }];
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('div.content-container')).styles['text-align']).toEqual(Position.Left);
    });

    fit('Should have column position by defined value', () => {
      component.position = Position.Right;
      component.model = { data: { field: 1 }, index: 10, sequence: 1 };;
      component.columns = [{ name: 'column', field: 'field' }];
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('div.content-container')).styles['text-align']).toEqual(Position.Right);
    });

    fit('Should have content position by default', () => {
      component.model = { data: { field: 1 }, index: 10, sequence: 1 };;
      component.columns = [{ name: 'column', field: 'field' }];
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('div.content')).styles['align-items']).toEqual(UIConstants.CSS_START);
    });

    fit('Should have content position by defined value (right)', () => {
      component.position = Position.Right;
      component.model = { data: { field: 1 }, index: 10, sequence: 1 };;
      component.columns = [{ name: 'column', field: 'field' }];
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('div.content')).styles['align-items']).toEqual((UIConstants.CSS_END));
    });

    fit('Should have content position by defined value (center)', () => {
      component.position = Position.Center;
      component.model = { data: { field: 1 }, index: 10, sequence: 1 };;
      component.columns = [{ name: 'column', field: 'field' }];
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('div.content')).styles['align-items']).toEqual((UIConstants.CSS_CENTER));
    });

    fit('Should be created checkmark column', () => {
      component.model = { data: { field: 1 }, index: 10, sequence: 1 };;
      component.columns = [{ name: 'column', field: 'field', type: TableColumnType.Selectable }];
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('sfc-checkmark'))).toBeTruthy();
      expect(fixture.debugElement.queryAll(By.css('span.name')).length).toEqual(0);
    });

    fit('Should be created sequence column', () => {
      component.model = { data: { field: 1 }, index: 10, sequence: 1 };;
      component.columns = [{ name: '', field: '', type: TableColumnType.Sequence }];
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('sfc-checkmark'))).toBeNull();
      expect(fixture.debugElement.queryAll(By.css('span.name')).length).toEqual(1);
    });

    fit('Should be created data column', () => {
      component.model = { data: { field: 1 }, index: 10, sequence: 1 };;
      component.columns = [{ name: '', field: '', type: TableColumnType.Data }];
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('sfc-checkmark'))).toBeNull();
      expect(fixture.debugElement.queryAll(By.css('span.name')).length).toEqual(1);
    });

    describe('Checkmark', () => {
      fit('Should not be checked', () => {
        component.model = { data: { field: 1 }, index: 10, sequence: 1 };;
        component.columns = [{ name: '', field: '', type: TableColumnType.Selectable }];
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('sfc-checkmark')).attributes['ng-reflect-active']).toEqual('false');
      });

      fit('Should be checked', () => {
        component.model = { data: { field: 1 }, selected: true, index: 10, sequence: 1 };
        component.columns = [{ name: '', field: '', type: TableColumnType.Selectable }];
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('sfc-checkmark')).attributes['ng-reflect-active']).toEqual('true');
      });

      fit('Should be checked after click on component', () => {
        component.selectOnClick = true;
        component.model = { data: { field: 1 }, index: 10, sequence: 1 };;
        component.columns = [{ name: '', field: '', type: TableColumnType.Selectable }];
        fixture.detectChanges();

        selectRow();

        expect(fixture.debugElement.query(By.css('sfc-checkmark')).attributes['ng-reflect-active']).toEqual('true');
      });

      fit('Should have constant type', () => {
        component.model = { data: { field: 1 }, index: 10, sequence: 1 };
        component.columns = [{ name: '', field: '', type: TableColumnType.Selectable }];
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('sfc-checkmark')).componentInstance.type)
          .toEqual(CheckmarkType.Circle);
      });

      fit('Should emit selected', () => {
        component.model = { data: { field: 1 }, index: 10, sequence: 1 };;
        component.columns = [{ name: '', field: '', type: TableColumnType.Selectable }];
        fixture.detectChanges();

        component.ngAfterViewInit();
        fixture.detectChanges();

        selectRowByCheckmark();

        expect(tableSelectServiceSpy.select).toHaveBeenCalledTimes(1);
      });

      fit('Should selected emit for unselected row', () => {
        component.model = { data: { field: 1 }, index: 10, sequence: 1 };
        component.columns = [{ name: '', field: '', type: TableColumnType.Selectable }];
        fixture.detectChanges();

        component.ngAfterViewInit();
        fixture.detectChanges();

        selectRowByCheckmark();

        expect(tableSelectServiceSpy.select).toHaveBeenCalledOnceWith(component.model.sequence, true);
      });

      fit('Should selected emit for selected row', () => {
        component.model = { data: { field: 1 }, selected: true, index: 10, sequence: 1 };
        component.columns = [{ name: '', field: '', type: TableColumnType.Selectable }];
        fixture.detectChanges();

        component.ngAfterViewInit();
        fixture.detectChanges();

        selectRowByCheckmark();

        expect(tableSelectServiceSpy.select).toHaveBeenCalledOnceWith(component.model.sequence, false);
      });

      fit('Should toggle selected', () => {
        component.model = { data: { field: 1 }, selected: true, index: 10, sequence: 1 };
        component.columns = [{ name: '', field: '', type: TableColumnType.Selectable }];
        fixture.detectChanges();

        component.ngAfterViewInit();
        fixture.detectChanges();

        selectRowByCheckmark();

        expect(tableSelectServiceSpy.select).toHaveBeenCalledOnceWith(component.model.sequence, false);

        selectRowByCheckmark();

        expect((tableSelectServiceSpy.select as any).calls.allArgs()).toEqual([
          [1, false],
          [1, true]
        ]);

        expect(tableSelectServiceSpy.select).toHaveBeenCalledTimes(2);
      });
    });

    describe('Sequence', () => {
      fit('Should have appropriate values by default', () => {
        component.model = { data: { field: 1 }, index: 10, sequence: 1 };
        component.columns = [{ name: '', field: '', type: TableColumnType.Sequence }];
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.name').innerText).toEqual('');
        expect(fixture.nativeElement.querySelector('span.name ~ span').innerText).toEqual('1');
      });

      fit('Should have defined value', () => {
        component.model = { data: { field: 1 }, index: 10, sequence: 100 };
        component.columns = [{ name: 'Sequence column', field: '', type: TableColumnType.Sequence }];
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.name').innerText.toUpperCase()).toEqual('SEQUENCE COLUMN');
        expect(fixture.nativeElement.querySelector('span.name ~ span').innerText).toEqual('100');
      });
    });

    describe('Data', () => {
      fit('Should have appropriate values when default state', () => {
        component.model = { data: { field: 1 }, index: 10, sequence: 1 };;
        component.columns = [{ name: '', field: '', type: TableColumnType.Data }];
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.name').innerText).toEqual('');
        expect(fixture.nativeElement.querySelector('span.name ~ span').innerText).toEqual('');
      });

      fit('Should have appropriate values', () => {
        component.model = { data: { field: 'test-data' }, index: 10, sequence: 1 };
        component.columns = [{ name: 'Column name', field: 'field', type: TableColumnType.Data }];
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.name').innerText.toUpperCase()).toEqual('COLUMN NAME');
        expect(fixture.nativeElement.querySelector('span.name ~ span').innerText).toEqual('test-data');
      });
    });
  });

  function selectRow() {
    fixture.nativeElement.dispatchEvent(new MouseEvent('click', {}));
    fixture.detectChanges();
  }

  function selectRowByCheckmark() {
    fixture.nativeElement.querySelector('div.content div').dispatchEvent(new MouseEvent('click', {}));
    fixture.detectChanges();
  }
});
