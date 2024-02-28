import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CheckmarkComponent, CheckmarkType, ShowHideElementDirective, UIClass } from 'ngx-sfc-common';
import { TableSelectService } from '../../../../service/select/table-select.service';
import { TableColumnType } from '../../../columns/table-column-type.enum';
import { DefaultTableCardComponent } from './default-table-card.component';

describe('Component: DefaultTableCard', () => {
  let component: DefaultTableCardComponent;
  let fixture: ComponentFixture<DefaultTableCardComponent>;
  let tableSelectServiceSpy: jasmine.SpyObj<TableSelectService>;

  beforeEach(async () => {
    tableSelectServiceSpy = jasmine.createSpyObj('TableSelectService', ['select']);

    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [ShowHideElementDirective, CheckmarkComponent, DefaultTableCardComponent],
      providers: [{ provide: TableSelectService, useValue: tableSelectServiceSpy }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultTableCardComponent);
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
      component.model = { data: {}, index: 0, sequence: 1, selected: false };
      component.selectOnClick = true;
      fixture.detectChanges();

      selectCard();

      expect(tableSelectServiceSpy.select).toHaveBeenCalledTimes(1);
    });

    fit('Should not emit selected', () => {
      component.selectOnClick = false;
      fixture.detectChanges();

      selectCard();

      expect(tableSelectServiceSpy.select).not.toHaveBeenCalled();
    });

    fit('Should emit selected for unselected card', () => {
      component.model = { data: {}, index: 0, sequence: 1, selected: false };
      component.selectOnClick = true;
      fixture.detectChanges();

      selectCard();

      expect(tableSelectServiceSpy.select).toHaveBeenCalledOnceWith(component.model.sequence, true);
    });

    fit('Should emit selected for selected card', () => {
      component.model = { data: {}, index: 0, sequence: 1, selected: true };
      component.selectOnClick = true;
      fixture.detectChanges();

      selectCard();

      expect(tableSelectServiceSpy.select).toHaveBeenCalledOnceWith(component.model.sequence, false);
    });

    fit('Should toggle selected', () => {
      component.selectOnClick = true;
      component.model = { data: {}, index: 0, sequence: 1, selected: true };
      fixture.detectChanges();

      selectCard();

      expect(tableSelectServiceSpy.select).toHaveBeenCalledOnceWith(component.model.sequence, false);

      selectCard();

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
      component.model = { data: { field: 1 }, index: 10, sequence: 1 };
      component.columns = [{ name: 'column', field: 'field' }];
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.content-container')).toBeDefined();
    });

    fit('Should have columns content as columns count', () => {
      component.model = { data: { field: 1 }, index: 10, sequence: 1 };
      component.columns = [{ name: 'column', field: 'field' }, { name: 'column1', field: 'field1' }];
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('div.content-container').length).toEqual(component.columns.length);
    });

    fit('Should be created checkmark column', () => {
      component.model = { data: { field: 1 }, index: 10, sequence: 1 };
      component.columns = [{ name: 'column', field: 'field', type: TableColumnType.Selectable }];
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('sfc-checkmark'))).toBeTruthy();
      expect(fixture.debugElement.queryAll(By.css('span.name')).length).toEqual(0);
    });

    fit('Should be created sequence column', () => {
      component.model = { data: { field: 1 }, index: 10, sequence: 1 };
      component.columns = [{ name: '', field: '', type: TableColumnType.Sequence }];
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('sfc-checkmark'))).toBeNull();
      expect(fixture.debugElement.queryAll(By.css('span.name')).length).toEqual(1);
    });

    fit('Should be created data column', () => {
      component.model = { data: { field: 1 }, index: 10, sequence: 1 };
      component.columns = [{ name: '', field: '', type: TableColumnType.Data }];
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('sfc-checkmark'))).toBeNull();
      expect(fixture.debugElement.queryAll(By.css('span.name')).length).toEqual(1);
    });

    describe('Checkmark', () => {
      fit('Should not be checked', () => {
        component.model = { data: { field: 1 }, index: 10, sequence: 1 };
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
        component.model = { data: { field: 1 }, index: 10, sequence: 1 };
        component.columns = [{ name: '', field: '', type: TableColumnType.Selectable }];
        fixture.detectChanges();

        selectCard();

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
        component.model = { data: { field: 1 }, index: 10, sequence: 1 };
        component.columns = [{ name: '', field: '', type: TableColumnType.Selectable }];
        fixture.detectChanges();

        component.ngAfterViewInit();
        fixture.detectChanges();

        selectCardByCheckmark();

        expect(tableSelectServiceSpy.select).toHaveBeenCalledTimes(1);
      });

      fit('Should selected emit for unselected card', () => {
        component.model = { data: { field: 1 }, index: 10, sequence: 1 };
        component.columns = [{ name: '', field: '', type: TableColumnType.Selectable }];
        fixture.detectChanges();

        component.ngAfterViewInit();
        fixture.detectChanges();

        selectCardByCheckmark();

        expect(tableSelectServiceSpy.select).toHaveBeenCalledOnceWith(component.model.sequence, true);
      });

      fit('Should selected emit for selected card', () => {
        component.model = { data: { field: 1 }, selected: true, index: 10, sequence: 1 };
        component.columns = [{ name: '', field: '', type: TableColumnType.Selectable }];
        fixture.detectChanges();

        component.ngAfterViewInit();
        fixture.detectChanges();

        selectCardByCheckmark();

        expect(tableSelectServiceSpy.select).toHaveBeenCalledOnceWith(component.model.sequence, false);
      });

      fit('Should toggle selected', () => {
        component.model = { data: { field: 1 }, selected: true, index: 10, sequence: 1 };
        component.columns = [{ name: '', field: '', type: TableColumnType.Selectable }];
        fixture.detectChanges();

        component.ngAfterViewInit();
        fixture.detectChanges();

        selectCardByCheckmark();

        expect(tableSelectServiceSpy.select).toHaveBeenCalledOnceWith(component.model.sequence, false);

        selectCardByCheckmark();

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

        expect(fixture.nativeElement.querySelector('span.name').innerText).toEqual('SEQUENCE COLUMN');
        expect(fixture.nativeElement.querySelector('span.name ~ span').innerText).toEqual('100');
      });
    });

    describe('Data', () => {
      fit('Should have appropriate values when default state', () => {
        component.model = { data: { field: 1 }, index: 10, sequence: 1 };
        component.columns = [{ name: '', field: '', type: TableColumnType.Data }];
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.name').innerText).toEqual('');
        expect(fixture.nativeElement.querySelector('span.name ~ span').innerText).toEqual('');
      });

      fit('Should have appropriate values', () => {
        component.model = { data: { field: 'test-data' }, index: 10, sequence: 1 };
        component.columns = [{ name: 'Column name', field: 'field', type: TableColumnType.Data }];
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.name').innerText).toEqual('COLUMN NAME');
        expect(fixture.nativeElement.querySelector('span.name ~ span').innerText).toEqual('test-data');
      });
    });
  });

  function selectCard() {
    fixture.nativeElement.dispatchEvent(new MouseEvent('click', {}));
    fixture.detectChanges();
  }

  function selectCardByCheckmark() {
    fixture.nativeElement.querySelector('div.content div').dispatchEvent(new MouseEvent('click', {}));
    fixture.detectChanges();
  }
});
