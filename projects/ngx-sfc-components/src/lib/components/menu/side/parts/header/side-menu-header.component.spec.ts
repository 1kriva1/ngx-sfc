import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HamburgerComponent, UIClass } from 'ngx-sfc-common';
import { SideMenuHeaderComponent } from './side-menu-header.component';

describe('Component: SideMenuHeaderComponent', () => {
  let component: SideMenuHeaderComponent;
  let fixture: ComponentFixture<SideMenuHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HamburgerComponent, SideMenuHeaderComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideMenuHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create component', () => {
      expect(component).toBeTruthy();
    });

    fit('Should create main elements', () => {
      expect(fixture.nativeElement.querySelector('li')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('span')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('sfc-hamburger')).toBeTruthy();
    });
  });

  describe('Label', () => {
    fit('Should have default text', () => {
      expect(fixture.nativeElement.querySelector('span').innerText).toEqual('Menu');
    });

    fit('Should have defined text', () => {
      component.label = 'Test label';
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('span').innerText).toEqual(component.label);
    });
  });

  describe('Hamburger', () => {
    fit('Should have open attribute', () => {
      const hamburger = fixture.debugElement.query(By.css('sfc-hamburger'));

      expect(hamburger.attributes['ng-reflect-open']).toEqual('false');
      expect(hamburger.componentInstance.open).toBeFalse();
    });

    fit('Should emit toggle event', () => {
      spyOn(component.toggle, 'emit');

      fixture.debugElement.query(By.css('sfc-hamburger'))
        .nativeElement.dispatchEvent(new MouseEvent('click'));

      expect(component.toggle.emit).toHaveBeenCalledTimes(1);
    });
  });

  describe('Open', () => {
    fit('Should not have opan class', () => {
      expect(fixture.debugElement.nativeElement.className).not.toContain(UIClass.Open);
    });

    fit('Should have opan class', () => {
      component.open = true;
      fixture.detectChanges();

      expect(fixture.debugElement.nativeElement.className).toContain(UIClass.Open);
    });
  });
});
