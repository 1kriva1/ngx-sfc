import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CheckmarkComponent, UIClass } from 'ngx-sfc-common';
import { TableSelectService } from '../../../service/select/table-select.service';
import { SelectableTableColumnComponent } from './selectable-table-column.component';

describe('Component: SelectableTableColumn', () => {
  let component: SelectableTableColumnComponent;
  let fixture: ComponentFixture<SelectableTableColumnComponent>;
  let tableSelectServiceMock: TableSelectService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [CheckmarkComponent, SelectableTableColumnComponent],
      providers: [
        { provide: TableSelectService, useValue: jasmine.createSpyObj('TableSelectService', ['selectAll']) }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectableTableColumnComponent);
    component = fixture.componentInstance;
    tableSelectServiceMock = TestBed.inject(TableSelectService);
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create component', () => {
      expect(component).toBeTruthy();
    });

    fit('Should have main elements', () => {
      expect(fixture.nativeElement.querySelector('div.container')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('sfc-checkmark')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.container sfc-checkmark ~ span')).toBeTruthy();
    });

    fit("Should not have active class", () => {
      expect(fixture.nativeElement.className).not.toContain(UIClass.Active);
    });

    fit("Should have enabled class", () => {
      component.selected = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.className).toContain(UIClass.Active);
    });
  });

  describe('Checkmark', () => {
    fit('Should be not checked by default', () => {
      expect(fixture.debugElement.query(By.css('sfc-checkmark')).attributes['ng-reflect-active']).toEqual('false');
    });

    fit('Should be checked, if component selected value equal true', () => {
      component.selected = true;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('sfc-checkmark')).attributes['ng-reflect-active']).toEqual('true');
    });
  });

  describe('Label', () => {
    fit('Should have constant value', () => {
      expect(fixture.nativeElement.querySelector('div.container sfc-checkmark ~ span').innerText).toEqual('ALL');
    });
  });

  describe('Selecting', () => {
    fit('Should call selectAll on click', () => {
      toggleSelection();

      expect(tableSelectServiceMock.selectAll).toHaveBeenCalledTimes(1);
    });

    fit('Should pass True', () => {
      toggleSelection();

      expect(tableSelectServiceMock.selectAll).toHaveBeenCalledWith(true);
    });

    fit('Should pass False', () => {
      component.selected = true;
      fixture.detectChanges();

      toggleSelection();

      expect(tableSelectServiceMock.selectAll).toHaveBeenCalledWith(false);
    });

    fit('Should pass inverted values on each click', () => {
      toggleSelection();

      expect(tableSelectServiceMock.selectAll).toHaveBeenCalledWith(true);

      toggleSelection();

      expect((tableSelectServiceMock.selectAll as any).calls.allArgs()).toEqual([[true], [false]]);

      expect(tableSelectServiceMock.selectAll).toHaveBeenCalledTimes(2);
    });

    function toggleSelection() {
      fixture.nativeElement.dispatchEvent(new MouseEvent('click', {}));
      fixture.detectChanges();
    }
  });
});
