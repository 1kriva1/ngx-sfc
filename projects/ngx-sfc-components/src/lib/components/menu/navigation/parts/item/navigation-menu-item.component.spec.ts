import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UIClass } from 'ngx-sfc-common';
import { CommonConstants } from 'ngx-sfc-common';
import { NavigationMenuItemComponent } from './navigation-menu-item.component';
import { faTShirt } from '@fortawesome/free-solid-svg-icons';

describe('Component: NavigationMenuItemComponent', () => {
  let component: NavigationMenuItemComponent;
  let fixture: ComponentFixture<NavigationMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [NavigationMenuItemComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create component', () => {
      expect(component).toBeTruthy();
    });

    fit('Should create main elements', () => {
      expect(fixture.nativeElement.querySelector('div.container')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('span')).toBeTruthy();
    });

    fit('Should be default item value', () => {
      expect(component.item).toEqual({ label: CommonConstants.EMPTY_STRING, active: false });
    });

    fit('Should be defined item value', () => {
      component.item = { label: 'Test label', icon: faTShirt, active: true };
      fixture.detectChanges();

      expect(component.item).toEqual({ label: 'Test label', icon: faTShirt, active: true });
    });

    fit('Should call item click action', () => {
      component.item = { label: 'Test label', active: true, click: () => { } };
      fixture.detectChanges();

      spyOn<any>(component.item, 'click');

      fixture.debugElement.nativeElement.dispatchEvent(new MouseEvent('click'));

      expect(component.item.click).toHaveBeenCalledOnceWith(component.item);
    });
  });

  describe('Active', () => {
    fit('Should not have open class', () => {
      expect(fixture.debugElement.nativeElement.className).not.toContain(UIClass.Active);
    });

    fit('Should have open class', () => {
      component.item.active = true;
      fixture.detectChanges();

      expect(fixture.debugElement.nativeElement.className).toContain(UIClass.Active);
    });
  });

  describe('Label', () => {
    fit('Should have default value', () => {
      expect(fixture.nativeElement.querySelector('span').innerText).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit('Should have defined value', () => {
      component.item.label = 'Test label';
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('span').innerText).toEqual(component.item.label);
    });
  });

  describe('Icon', () => {
    fit('Should not exist', () => {
      expect(fixture.nativeElement.querySelector('fa-icon')).toBeNull();
    });

    fit('Should exist', () => {
      component.item.icon = faTShirt;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('fa-icon svg.fa-shirt')).toBeTruthy();
    });
  });
});
