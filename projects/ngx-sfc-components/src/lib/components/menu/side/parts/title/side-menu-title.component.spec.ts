import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonConstants, DelimeterComponent, UIClass } from 'ngx-sfc-common';
import { SideMenuTitleComponent } from './side-menu-title.component';

describe('Component: SideMenuTitleComponent', () => {
  let component: SideMenuTitleComponent;
  let fixture: ComponentFixture<SideMenuTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DelimeterComponent, SideMenuTitleComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideMenuTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create component', () => {
      expect(component).toBeTruthy();
    });

    fit('Should create main elements', () => {
      expect(fixture.nativeElement.querySelector('li')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('li span')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('sfc-delimeter')).toBeTruthy();
    });
  });

  describe('Label', () => {
    fit('Should have default text', () => {
      expect(fixture.nativeElement.querySelector('li span').innerText).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit('Should have defined text', () => {
      component.label = 'Test label';
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('li span').innerText).toEqual(component.label.toUpperCase());
    });
  });

  describe('Open', () => {
    fit('Should not have open class', () => {
      expect(fixture.debugElement.nativeElement.className).not.toContain(UIClass.Open);
    });

    fit('Should have open class', () => {
      component.open = true;
      fixture.detectChanges();

      expect(fixture.debugElement.nativeElement.className).toContain(UIClass.Open);
    });
  });
});
