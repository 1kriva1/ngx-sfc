import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NavigationMenuComponent } from './navigation-menu.component';
import { NavigationMenuItemComponent } from './parts/item/navigation-menu-item.component';

describe('Component: NavigationMenuComponent', () => {
  let component: NavigationMenuComponent;
  let fixture: ComponentFixture<NavigationMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigationMenuItemComponent, NavigationMenuComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create component', () => {
      expect(component).toBeTruthy();
    });

    fit('Should create main elements', () => {
      expect(fixture.nativeElement.querySelector('div.container')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.items')).toBeTruthy();
    });
  });

  describe('Items', () => {
    fit('Should not exist any items', () => {
      expect(fixture.nativeElement.querySelectorAll('sfc-navigation-menu-item').length).toEqual(0);
    });

    fit('Should exist items', () => {
      component.items.push({ label: 'Test label1', active: false });
      component.items.push({ label: 'Test label2', active: false });
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('sfc-navigation-menu-item').length).toEqual(component.items.length);
    });

    fit('Should have defined attributes', () => {
      component.items.push({ label: 'Test label1', active: false });
      fixture.detectChanges();

      const itemEl = fixture.debugElement.query(By.css('sfc-navigation-menu-item'));

      expect(itemEl.componentInstance.item).toEqual(component.items[0]);
    });

    fit('Should emit selected event', () => {
      spyOn(component.selected, 'emit');
      component.items.push({ label: 'Test label1', active: false });
      fixture.detectChanges();

      fixture.nativeElement.querySelector('sfc-navigation-menu-item').dispatchEvent(new MouseEvent('click'));

      expect(component.selected.emit).toHaveBeenCalledOnceWith(component.items[0]);
    });

    fit('Should set active state', () => {
      component.items.push({ label: 'Test label1', active: true });
      component.items.push({ label: 'Test label2', active: false });
      component.items.push({ label: 'Test label3', active: false });
      fixture.detectChanges();


      fixture.debugElement.queryAll(By.css('sfc-navigation-menu-item'))[1].nativeElement
        .dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();

      expect(component.items[0].active).toBeFalse();
      expect(component.items[1].active).toBeTrue();
      expect(component.items[2].active).toBeFalse();
    });
  });
});
