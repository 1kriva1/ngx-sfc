import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UIClass } from 'ngx-sfc-common';
import { CheckmarkComponent, Position, UIConstants } from 'ngx-sfc-common';
import { TableColumnType } from '../../../columns/table-column-type.enum';
import { DefaultTableRowComponent } from './default-table-row.component';

describe('Component: DefaultTableRow', () => {
  let component: DefaultTableRowComponent;
  let fixture: ComponentFixture<DefaultTableRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [CheckmarkComponent, DefaultTableRowComponent]
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
      spyOn(component.selected, 'emit');
      component.selectOnClick = true;
      fixture.detectChanges();

      selectRow();

      expect(component.selected.emit).toHaveBeenCalled();
    });

    fit('Should not emit selected', () => {
      spyOn(component.selected, 'emit');
      component.selectOnClick = false;
      fixture.detectChanges();

      selectRow();

      expect(component.selected.emit).not.toHaveBeenCalled();
    });

    fit('Should emit selected for unselected row', () => {
      spyOn(component.selected, 'emit');
      component.selectOnClick = true;
      component.model.index = 10;
      fixture.detectChanges();

      selectRow();

      expect(component.selected.emit).toHaveBeenCalledWith({ index: component.model.index, selected: true });
    });

    fit('Should emit selected for selected row', () => {
      spyOn(component.selected, 'emit');
      component.selectOnClick = true;
      component.model.index = 10;
      component.model.dataModel.selected = true;
      fixture.detectChanges();

      selectRow();

      expect(component.selected.emit).toHaveBeenCalledWith({ index: component.model.index, selected: false });
    });

    fit('Should toggle selected', () => {
      // fake selected call
      spyOn(component.selected, 'emit').and.callFake(() => component.model.dataModel.selected = !component.model.dataModel.selected);
      component.selectOnClick = true;
      component.model.index = 10;
      component.model.dataModel.selected = true;
      fixture.detectChanges();

      selectRow();

      expect(component.selected.emit).toHaveBeenCalledWith({ index: component.model.index, selected: false });

      selectRow();

      expect((component.selected.emit as any).calls.allArgs()).toEqual([
        [{ index: component.model.index, selected: false }],
        [{ index: component.model.index, selected: true }]
      ]);

      expect(component.selected.emit).toHaveBeenCalledTimes(2);
    });

    fit("Should call unsubscribe on checkmark subscription, when directive destroyed", () => {
      component.model = { dataModel: { data: { field: 1 } }, index: 10 };
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
      component.model = { dataModel: { data: { field: 1 } }, index: 10 };
      component.columns = [{ name: 'column', field: 'field' }];
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.content-container')).toBeDefined();
    });

    fit('Should have columns content as columns count', () => {
      component.model = { dataModel: { data: { field: 1 } }, index: 10 };
      component.columns = [{ name: 'column', field: 'field' }, { name: 'column1', field: 'field1' }];
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('div.content-container').length).toEqual(component.columns.length);
    });

    fit('Should have default width, if column width not provided', () => {
      component.model = { dataModel: { data: { field: 1 } }, index: 10 };
      component.columns = [{ name: 'column', field: 'field' }];
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('div.content-container')).styles['width']).toEqual(`calc(100%)`);
    });

    fit('Should have width that provideed for columnWidth', () => {
      component.model = { dataModel: { data: { field: 1 } }, index: 10 };
      component.columns = [{ name: 'column', field: 'field' }];
      component.columnWidth = 44;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('div.content-container')).styles['width']).toEqual('calc(2.27273%)');
    });

    fit('Should have column position by default', () => {
      component.model = { dataModel: { data: { field: 1 } }, index: 10 };
      component.columns = [{ name: 'column', field: 'field' }];
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('div.content-container')).styles['text-align']).toEqual(Position.Left);
    });

    fit('Should have column position by defined value', () => {
      component.position = Position.Right;
      component.model = { dataModel: { data: { field: 1 } }, index: 10 };
      component.columns = [{ name: 'column', field: 'field' }];
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('div.content-container')).styles['text-align']).toEqual(Position.Right);
    });

    fit('Should have content position by default', () => {
      component.model = { dataModel: { data: { field: 1 } }, index: 10 };
      component.columns = [{ name: 'column', field: 'field' }];
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('div.content')).styles['align-items']).toEqual(UIConstants.CSS_START);
    });

    fit('Should have content position by defined value (right)', () => {
      component.position = Position.Right;
      component.model = { dataModel: { data: { field: 1 } }, index: 10 };
      component.columns = [{ name: 'column', field: 'field' }];
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('div.content')).styles['align-items']).toEqual((UIConstants.CSS_END));
    });
    
    fit('Should have content position by defined value (center)', () => {
      component.position = Position.Center;
      component.model = { dataModel: { data: { field: 1 } }, index: 10 };
      component.columns = [{ name: 'column', field: 'field' }];
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('div.content')).styles['align-items']).toEqual((UIConstants.CSS_CENTER));
    });

    fit('Should be created checkmark column', () => {
      component.model = { dataModel: { data: { field: 1 } }, index: 10 };
      component.columns = [{ name: 'column', field: 'field', type: TableColumnType.Selectable }];
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('sfc-checkmark'))).toBeTruthy();
      expect(fixture.debugElement.queryAll(By.css('span.name')).length).toEqual(0);
    });

    fit('Should be created sequence column', () => {
      component.model = { dataModel: { data: { field: 1 } }, index: 10 };
      component.columns = [{ name: '', field: '', type: TableColumnType.Sequence }];
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('sfc-checkmark'))).toBeNull();
      expect(fixture.debugElement.queryAll(By.css('span.name')).length).toEqual(1);
    });

    fit('Should be created data column', () => {
      component.model = { dataModel: { data: { field: 1 } }, index: 10 };
      component.columns = [{ name: '', field: '', type: TableColumnType.Data }];
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('sfc-checkmark'))).toBeNull();
      expect(fixture.debugElement.queryAll(By.css('span.name')).length).toEqual(1);
    });

    describe('Checkmark', () => {
      fit('Should not be checked', () => {
        component.model = { dataModel: { data: { field: 1 } }, index: 10 };
        component.columns = [{ name: '', field: '', type: TableColumnType.Selectable }];
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('sfc-checkmark')).attributes['ng-reflect-active']).toEqual('false');
      });

      fit('Should be checked', () => {
        component.model = { dataModel: { data: { field: 1 }, selected: true }, index: 10 };
        component.columns = [{ name: '', field: '', type: TableColumnType.Selectable }];
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('sfc-checkmark')).attributes['ng-reflect-active']).toEqual('true');
      });

      fit('Should be checked after click on component', () => {
        // fake selected call
        spyOn(component.selected, 'emit').and.callFake(() => component.model.dataModel.selected = !component.model.dataModel.selected);
        component.selectOnClick = true;
        component.model = { dataModel: { data: { field: 1 } }, index: 10 };
        component.columns = [{ name: '', field: '', type: TableColumnType.Selectable }];
        fixture.detectChanges();

        selectRow();

        expect(fixture.debugElement.query(By.css('sfc-checkmark')).attributes['ng-reflect-active']).toEqual('true');
      });

      fit('Should emit selected', () => {
        spyOn(component.selected, 'emit');
        component.model = { dataModel: { data: { field: 1 } }, index: 10 };
        component.columns = [{ name: '', field: '', type: TableColumnType.Selectable }];
        fixture.detectChanges();

        component.ngAfterViewInit();
        fixture.detectChanges();

        selectRowByCheckmark();

        expect(component.selected.emit).toHaveBeenCalled();
      });

      fit('Should selected emit for unselected row', () => {
        spyOn(component.selected, 'emit');
        component.model = { dataModel: { data: { field: 1 } }, index: 10 };
        component.columns = [{ name: '', field: '', type: TableColumnType.Selectable }];
        fixture.detectChanges();

        component.ngAfterViewInit();
        fixture.detectChanges();

        selectRowByCheckmark();

        expect(component.selected.emit).toHaveBeenCalledWith({ index: component.model.index, selected: true });
      });

      fit('Should selected emit for selected row', () => {
        spyOn(component.selected, 'emit');
        component.model = { dataModel: { data: { field: 1 }, selected: true }, index: 10 };
        component.columns = [{ name: '', field: '', type: TableColumnType.Selectable }];
        fixture.detectChanges();

        component.ngAfterViewInit();
        fixture.detectChanges();

        selectRowByCheckmark();

        expect(component.selected.emit).toHaveBeenCalledWith({ index: component.model.index, selected: false });
      });

      fit('Should toggle selected', () => {
        // fake selected call
        spyOn(component.selected, 'emit').and.callFake(() => component.model.dataModel.selected = !component.model.dataModel.selected);
        component.model = { dataModel: { data: { field: 1 }, selected: true }, index: 10 };
        component.columns = [{ name: '', field: '', type: TableColumnType.Selectable }];
        fixture.detectChanges();

        component.ngAfterViewInit();
        fixture.detectChanges();

        selectRowByCheckmark();

        expect(component.selected.emit).toHaveBeenCalledWith({ index: component.model.index, selected: false });

        selectRowByCheckmark();

        expect((component.selected.emit as any).calls.allArgs()).toEqual([
          [{ index: component.model.index, selected: false }],
          [{ index: component.model.index, selected: true }]
        ]);

        expect(component.selected.emit).toHaveBeenCalledTimes(2);
      });
    });

    describe('Sequence', () => {
      fit('Should have appropriate values by default', () => {
        component.model = { dataModel: { data: { field: 1 } }, index: 10 };
        component.columns = [{ name: '', field: '', type: TableColumnType.Sequence }];
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.name').innerText).toEqual('');
        expect(fixture.nativeElement.querySelector('span.name ~ span').innerText).toEqual('');
      });

      fit('Should have defined value', () => {
        component.model = { dataModel: { data: { field: 1 } }, index: 10, sequence: 100 };
        component.columns = [{ name: 'Sequence column', field: '', type: TableColumnType.Sequence }];
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.name').innerText.toUpperCase()).toEqual('SEQUENCE COLUMN');
        expect(fixture.nativeElement.querySelector('span.name ~ span').innerText).toEqual('100');
      });
    });

    describe('Data', () => {
      fit('Should have appropriate values when default state', () => {
        component.model = { dataModel: { data: { field: 1 } }, index: 10 };
        component.columns = [{ name: '', field: '', type: TableColumnType.Data }];
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.name').innerText).toEqual('');
        expect(fixture.nativeElement.querySelector('span.name ~ span').innerText).toEqual('');
      });

      fit('Should have appropriate values', () => {
        component.model = { dataModel: { data: { field: 'test-data' } }, index: 10 };
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
