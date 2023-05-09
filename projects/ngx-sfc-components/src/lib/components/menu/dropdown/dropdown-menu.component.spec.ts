import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ClickOutsideDirective, DOCUMENT, DotsComponent, IconComponent, MediaLimits, nameof, Position, UIClass, WINDOW } from 'ngx-sfc-common';
import { DropdownMenuComponent } from './dropdown-menu.component';
import { DropdownMenuItemComponent } from './parts/item/dropdown-menu-item.component';
import { faTShirt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Component: DropdownMenuComponent', () => {
  let component: DropdownMenuComponent;
  let fixture: ComponentFixture<DropdownMenuComponent>;
  let windowMock: any = <any>{};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, FontAwesomeModule],
      declarations: [ClickOutsideDirective, IconComponent, DropdownMenuItemComponent, DotsComponent, DropdownMenuComponent],
      providers: [
        { provide: DOCUMENT, useValue: document },
        { provide: WINDOW, useFactory: (() => { return windowMock; }) }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create component', () => {
      expect(component).toBeTruthy();
    });

    fit('Should create main elements', () => {
      expect(fixture.nativeElement.querySelector('ul')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('li')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.container')).toBeTruthy();
    });

    fit('Should toggle open state', () => {
      expect(component.open).toBeFalse();

      fixture.nativeElement.querySelector('div.container').dispatchEvent(new MouseEvent('click'));

      expect(component.open).toBeTrue();

      fixture.nativeElement.querySelector('div.container').dispatchEvent(new MouseEvent('click'));

      expect(component.open).toBeFalse();
    });

    fit('Should exist dropdown container', () => {
      component.items.push({ label: 'Test label' });
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('ul.dropdown-container')).toBeTruthy();
    });

    fit('Should not exist dropdown container', () => {
      expect(fixture.nativeElement.querySelector('ul.dropdown-container')).toBeNull();
    });

    fit("Should call unsubscribe on resize subscription, when component destroyed", () => {
      const unsubscribeSpy = spyOn(
        (component as any)._resizeSubscription,
        'unsubscribe'
      ).and.callThrough();

      component.ngOnDestroy();

      expect(unsubscribeSpy).toHaveBeenCalled();
    });
  });

  describe('Label', () => {
    fit('Should exist', () => {
      component.label = 'Test label';
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.container span')).toBeTruthy();
    });

    fit('Should not exist', () => {
      expect(fixture.nativeElement.querySelector('div.container span')).toBeNull();
    });

    fit('Should have defined value', () => {
      component.label = 'Test label';
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.container span').innerText).toEqual(component.label);
    });
  });

  describe('Icon', () => {
    fit('Should exist', () => {
      component.icon = faTShirt;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.container fa-icon svg.fa-shirt')).toBeTruthy();
    });

    fit('Should not exist', () => {
      expect(fixture.nativeElement.querySelector('div.container fa-icon')).toBeNull();
    });
  });

  describe('Dots', () => {
    fit('Should exist', () => {
      expect(fixture.nativeElement.querySelector('sfc-dots')).toBeTruthy();
    });

    fit('Should have open attribute', () => {
      const dotsEl = fixture.debugElement.query(By.css('sfc-dots'));

      expect(dotsEl.attributes['ng-reflect-open']).toEqual('false');
      expect(dotsEl.componentInstance.open).toBeFalse();
    });

    fit('Should reflect open attribute value', () => {
      component.open = true;
      fixture.detectChanges();

      const dotsEl = fixture.debugElement.query(By.css('sfc-dots'));

      expect(dotsEl.attributes['ng-reflect-open']).toEqual('true');
      expect(dotsEl.componentInstance.open).toBeTrue();
    });

    fit('Should not exist, if label provided', () => {
      component.label = 'Test label';
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('sfc-dots')).toBeNull();
    });

    fit('Should not exist, if icon provided', () => {
      component.icon = faTShirt;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('sfc-dots')).toBeNull();
    });

    fit('Should not exist, if defaultDots is false', () => {
      component.defaultDots = false;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('sfc-dots')).toBeNull();
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

  describe('Bordered', () => {
    fit('Should not have open class', () => {
      expect(fixture.debugElement.nativeElement.className).not.toContain(UIClass.Bordered);
    });

    fit('Should have open class', () => {
      component.bordered = true;
      fixture.detectChanges();

      expect(fixture.debugElement.nativeElement.className).toContain(UIClass.Bordered);
    });
  });

  describe('Position', () => {
    fit('Should have default position class', () => {
      expect(fixture.debugElement.nativeElement.className).toContain(Position.Left);
    });

    fit('Should have defined position classes', () => {
      component.position = [Position.Top, Position.Center];
      fixture.detectChanges();

      expect(fixture.debugElement.nativeElement.className).not.toContain(Position.Left);
      expect(fixture.debugElement.nativeElement.className).toContain(Position.Top);
      expect(fixture.debugElement.nativeElement.className).toContain(Position.Center);
    });

    fit("Should have default value, when window size is less or equal Tablet limit", () => {
      component.position = [Position.Right];
      fixture.detectChanges();

      component.ngOnInit();
      fixture.detectChanges();

      windowMock.innerWidth = MediaLimits.Tablet;
      component.ngAfterContentInit();
      fixture.detectChanges();

      expect(component.position).toEqual([Position.Bottom, Position.Center]);
    });

    fit("Should have initial value, when window size is less or equal Tablet limit", () => {
      component.position = [Position.Left];
      component.autoResize = false;
      fixture.detectChanges();

      component.ngOnInit();
      fixture.detectChanges();

      windowMock.innerWidth = MediaLimits.Tablet;
      component.ngAfterContentInit();
      fixture.detectChanges();

      expect(component.position).toEqual([Position.Left]);
    });

    fit("Should have initial value after size become more than Tablet limit", () => {
      component.position = [Position.Right];
      fixture.detectChanges();

      component.ngOnInit();
      fixture.detectChanges();

      windowMock.innerWidth = MediaLimits.MobileLarge;
      component.ngAfterContentInit();
      fixture.detectChanges();

      windowMock.innerWidth = MediaLimits.Laptop;
      component.ngAfterContentInit();
      fixture.detectChanges();

      expect(component.position).toEqual([Position.Right]);
    });
  });

  describe('Click outside', () => {
    fit('Should call click outside method', () => {
      spyOn<any>(component, nameof<DropdownMenuComponent>('onClickOutside'));

      document.dispatchEvent(new MouseEvent('click'));

      expect(component.onClickOutside).toHaveBeenCalledOnceWith({ value: true, target: document });
    });

    fit('Should not call click outside method', () => {
      spyOn<any>(component, nameof<DropdownMenuComponent>('onClickOutside'));
      component.hideOnClickOutside = false;
      fixture.detectChanges();

      document.dispatchEvent(new MouseEvent('click'));

      expect(component.onClickOutside).not.toHaveBeenCalled();
    });

    fit('Should hide dropdown, when fit was open', () => {
      component.open = true;
      fixture.detectChanges();

      expect(component.open).toBeTrue();

      document.dispatchEvent(new MouseEvent('click'));

      expect(component.open).toBeFalse();
    });

    fit('Should not hide dropdown, when fit wasnt open', () => {
      expect(component.open).toBeFalse();

      document.dispatchEvent(new MouseEvent('click'));

      expect(component.open).toBeFalse();
    });

    fit('Should not hide dropdown, when click on component', () => {
      component.open = true;
      fixture.detectChanges();

      expect(component.open).toBeTrue();

      fixture.debugElement.nativeElement.dispatchEvent(new MouseEvent('click'));

      expect(component.open).toBeTrue();
    });
  });

  describe('Items', () => {
    fit('Should not exist any items', () => {
      expect(fixture.nativeElement.querySelectorAll('sfc-dropdown-menu-item').length).toEqual(0);
    });

    fit('Should exist items', () => {
      component.items.push({ label: 'Test label1' });
      component.items.push({ label: 'Test label2' });
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('sfc-dropdown-menu-item').length).toEqual(component.items.length);
    });

    fit('Should have defined attributes', () => {
      component.items.push({ label: 'Test label1' });
      fixture.detectChanges();

      const itemEl = fixture.debugElement.query(By.css('sfc-dropdown-menu-item'));

      expect(itemEl.componentInstance.item).toEqual(component.items[0]);
    });

    fit('Should emit selected event', () => {
      spyOn(component.selected, 'emit');
      component.items.push({ label: 'Test label1' });
      fixture.detectChanges();

      fixture.nativeElement.querySelector('sfc-dropdown-menu-item').dispatchEvent(new MouseEvent('click'));

      expect(component.selected.emit).toHaveBeenCalledOnceWith(component.items[0]);
    });

    fit('Should set open state to false', () => {
      component.items.push({ label: 'Test label1' });
      component.open = true;
      fixture.detectChanges();

      expect(component.open).toBeTrue();

      fixture.nativeElement.querySelector('sfc-dropdown-menu-item').dispatchEvent(new MouseEvent('click'));

      expect(component.open).toBeFalse();
    });

    fit('Should active selected item', () => {
      component.items.push({ label: 'Test label1' }, { label: 'Test label2', active: true });
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('sfc-dropdown-menu-item')[0].className).not.toContain(UIClass.Active);
      expect(fixture.nativeElement.querySelectorAll('sfc-dropdown-menu-item')[1].className).toContain(UIClass.Active);

      fixture.nativeElement.querySelectorAll('sfc-dropdown-menu-item')[0].dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('sfc-dropdown-menu-item')[0].className).toContain(UIClass.Active);
      expect(fixture.nativeElement.querySelectorAll('sfc-dropdown-menu-item')[1].className).not.toContain(UIClass.Active);
    });

    fit('Should not set open state to false', () => {
      component.items.push({ label: 'Test label1' });
      component.open = true;
      component.hideOnClick = false;
      fixture.detectChanges();

      expect(component.open).toBeTrue();

      fixture.nativeElement.querySelector('sfc-dropdown-menu-item').dispatchEvent(new MouseEvent('click'));

      expect(component.open).toBeTrue();
    });
  });
});
