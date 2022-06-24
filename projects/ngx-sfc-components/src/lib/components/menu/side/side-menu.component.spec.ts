import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DelimeterComponent, HamburgerComponent, UIClass } from 'ngx-sfc-common';
import { SideMenuHeaderComponent } from './parts/header/side-menu-header.component';
import { SideMenuItemContentComponent } from './parts/item/content/side-menu-item-content.component';
import { SideMenuItemComponent } from './parts/item/side-menu-item.component';
import { SideMenuTitleComponent } from './parts/title/side-menu-title.component';
import { SideMenuComponent } from './side-menu.component';
import { ISideMenuItemModel, SideMenuItemType } from './side-menu.model';

describe('Component: SideMenuComponent', () => {
  let component: SideMenuComponent;
  let fixture: ComponentFixture<SideMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, FontAwesomeModule],
      declarations: [HamburgerComponent, DelimeterComponent, SideMenuHeaderComponent, SideMenuItemContentComponent,
        SideMenuTitleComponent, SideMenuItemComponent, SideMenuComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create component', () => {
      expect(component).toBeTruthy();
    });

    fit('Should create main elements', () => {
      expect(fixture.nativeElement.querySelector('div.container')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('ul')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('sfc-side-menu-header')).toBeTruthy();
    });

    fit('Should have default model', () => {
      expect(component.model).toEqual({ open: false, items: [] });
    });
  });

  describe('Open', () => {
    fit('Should not have open class', () => {
      expect(fixture.debugElement.nativeElement.className).not.toContain(UIClass.Open);
    });

    fit('Should have open class', () => {
      component.model.open = true;
      fixture.detectChanges();

      expect(fixture.debugElement.nativeElement.className).toContain(UIClass.Open);
    });
  });

  describe('Header', () => {
    fit('Should have open attribute', () => {
      const headerEl = fixture.debugElement.query(By.css('sfc-side-menu-header'));

      expect(headerEl.attributes['ng-reflect-open']).toEqual('false');
      expect(headerEl.componentInstance.open).toBeFalse();
      expect(component.model.open).toBeFalse();
    });

    fit('Should toggle open attribute', () => {
      const hamburgerEl = fixture.debugElement.query(By.css('sfc-side-menu-header sfc-hamburger')),
        headerEl = fixture.debugElement.query(By.css('sfc-side-menu-header'));

      hamburgerEl.nativeElement.dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();

      expect(headerEl.attributes['ng-reflect-open']).toEqual('true');
      expect(headerEl.componentInstance.open).toBeTrue();
      expect(component.model.open).toBeTrue();
    });
  });

  describe('Items', () => {
    fit('Should not have any items', () => {
      const itemEls = fixture.debugElement.queryAll(By.css('sfc-side-menu-item')),
        titleEls = fixture.debugElement.queryAll(By.css('sfc-side-menu-title'));

      expect(itemEls.length).toEqual(0);
      expect(titleEls.length).toEqual(0);
    });

    fit('Should have items', () => {
      component.model.items?.push({ active: false, icon: undefined, label: '', type: SideMenuItemType.Item });
      component.model.items?.push({ active: false, icon: undefined, label: '', type: SideMenuItemType.Title });
      fixture.detectChanges();

      const itemEls = fixture.debugElement.queryAll(By.css('sfc-side-menu-item')),
        titleEls = fixture.debugElement.queryAll(By.css('sfc-side-menu-title'));

      expect(itemEls.length).toEqual(1);
      expect(titleEls.length).toEqual(1);
    });

    describe('Item', () => {
      fit('Should have defined attributes', () => {
        component.model.items?.push({ active: false, icon: undefined, label: '', type: SideMenuItemType.Item });
        fixture.detectChanges();

        const itemEl = fixture.debugElement.query(By.css('sfc-side-menu-item'));

        expect(itemEl.componentInstance.item).toEqual(component.model.items[0]);
        expect(itemEl.attributes['ng-reflect-open']).toEqual('false');
        expect(itemEl.componentInstance.open).toEqual(component.open);
      });

      fit('Should emit selected event', () => {
        spyOn(component.selected, 'emit');

        component.model.items?.push({ active: false, icon: undefined, label: '', type: SideMenuItemType.Item });
        fixture.detectChanges();

        const itemContentEl = fixture.debugElement.query(By.css('sfc-side-menu-item sfc-side-menu-item-content'));

        itemContentEl.nativeElement.dispatchEvent(new MouseEvent('click'));
        fixture.detectChanges();

        expect(component.selected.emit).toHaveBeenCalledOnceWith(component.model.items[0]);
      });

      fit('Should change active state', () => {
        component.model.items?.push({ active: false, icon: undefined, label: '', type: SideMenuItemType.Item });
        component.model.items?.push({ active: true, icon: undefined, label: '', type: SideMenuItemType.Item });
        component.model.items?.push({
          active: false,
          items: [{ active: true, icon: undefined, label: '', type: SideMenuItemType.Item }],
          icon: undefined, label: '', type: SideMenuItemType.Item
        });
        fixture.detectChanges();

        const itemContentEl = fixture.debugElement.queryAll(By.css('sfc-side-menu-item sfc-side-menu-item-content'));

        itemContentEl[0].nativeElement.dispatchEvent(new MouseEvent('click'));
        fixture.detectChanges();

        expect(component.model.items[0].active).toBeTrue();
        expect(component.model.items[1].active).toBeFalse();
        expect(component.model.items[2].active).toBeFalse();
        expect((component.model.items[2].items as ISideMenuItemModel[])[0].active).toBeFalse();
      });

      fit('Should change active state for child', () => {
        component.model.items?.push({ active: true, icon: undefined, label: '', type: SideMenuItemType.Item });
        component.model.items?.push({
          active: false,
          items: [{ active: false, icon: undefined, label: '', type: SideMenuItemType.Item }],
          icon: undefined, label: '', type: SideMenuItemType.Item
        });
        fixture.detectChanges();

        // open childrens
        const itemContentEl = fixture.debugElement.queryAll(By.css('sfc-side-menu-item-content'))[1];
        itemContentEl.nativeElement.dispatchEvent(new MouseEvent('click'));
        fixture.detectChanges();

        const itemContentChildEl = fixture.debugElement.queryAll(By.css('sfc-side-menu-item-content'))[2];
        itemContentChildEl.nativeElement.dispatchEvent(new MouseEvent('click'));
        fixture.detectChanges();

        expect(component.model.items[0].active).toBeFalse();
        expect(component.model.items[1].active).toBeFalse();
        expect((component.model.items[1].items as ISideMenuItemModel[])[0].active).toBeTrue();
      });
    });

    describe('Title', () => {
      fit('Should have defined attributes', () => {
        component.model.items?.push({ active: false, icon: undefined, label: 'Test title', type: SideMenuItemType.Title });
        fixture.detectChanges();

        const itemEl = fixture.debugElement.query(By.css('sfc-side-menu-title'));

        expect(itemEl.attributes['ng-reflect-open']).toEqual('false');
        expect(itemEl.componentInstance.open).toEqual(component.open);

        expect(itemEl.attributes['ng-reflect-label']).toEqual('Test title');
        expect(itemEl.componentInstance.label).toEqual(component.model.items[0].label);
      });
    });
  });
});
