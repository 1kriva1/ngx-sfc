import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonConstants, SortingDirection, UIClass } from 'ngx-sfc-common';
import { DefaultTableColumnComponent } from './default-table-column.component';

describe('Component: DefaultTableColumn', () => {
  let component: DefaultTableColumnComponent;
  let fixture: ComponentFixture<DefaultTableColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DefaultTableColumnComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultTableColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create component', () => {
      expect(component).toBeTruthy();
    });

    fit('Should have main elements', () => {
      expect(fixture.nativeElement.querySelector('div.container')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.container div span')).toBeTruthy();
    });

    fit("Should not have active class", () => {
      component.model.sorting = { direction: SortingDirection.Ascending, enabled: true };
      fixture.detectChanges();

      expect(fixture.nativeElement.className).not.toContain(UIClass.Active);
    });

    fit("Should have enabled class", () => {
      component.model.sorting = { active: true, direction: SortingDirection.Ascending, enabled: true };
      fixture.detectChanges();

      expect(fixture.nativeElement.className).toContain(UIClass.Active);
    });
  });

  describe('Icon', () => {
    fit('Should not exist by default', () => {
      expect(fixture.nativeElement.querySelector('div.icon i')).toBeNull();
    });

    fit('Should exist', () => {
      component.model = { name: 'column_1', field: '', icon: 'fa fa-test' };
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.icon i')).toBeTruthy();
    });

    fit('Should have provided icon', () => {
      component.model = { name: 'column_1', field: '', icon: 'fa fa-test' };
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.icon i').className).toEqual('fa fa-test');
    });
  });

  describe('Label', () => {
    fit('Should be empty by default', () => {
      expect(fixture.nativeElement.querySelector('div.container div span').innerText).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit('Should have value', () => {
      component.model = { name: 'column_1', field: '' };
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.container div span').innerText).toEqual(component.model.name.toLocaleUpperCase());
    });
  });
});
