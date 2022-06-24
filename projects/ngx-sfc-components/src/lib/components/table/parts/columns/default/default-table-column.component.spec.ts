import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonConstants, SortingDirection, UIClass } from 'ngx-sfc-common';
import { DefaultTableColumnComponent } from './default-table-column.component';
import { faTShirt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('Component: DefaultTableColumn', () => {
  let component: DefaultTableColumnComponent;
  let fixture: ComponentFixture<DefaultTableColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
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
      expect(fixture.nativeElement.querySelector('div.icon fa-icon')).toBeNull();
    });

    fit('Should exist', () => {
      component.model = { name: 'column_1', field: '', icon: faTShirt };
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.icon fa-icon')).toBeTruthy();
    });

    fit('Should have provided icon', () => {
      component.model = { name: 'column_1', field: '', icon: faTShirt };
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.icon fa-icon svg').classList).toContain('fa-shirt');
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
