import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UIClass } from 'ngx-sfc-common';
import { ISideMenuItemModel, SideMenuItemType } from '../../side-menu.model';
import { SideMenuHeaderComponent } from '../header/side-menu-header.component';
import { SideMenuItemContentComponent } from './content/side-menu-item-content.component';
import { SideMenuItemComponent } from './side-menu-item.component';

describe('Component: SideMenuItemComponent', () => {
  let component: SideMenuItemComponent;
  let fixture: ComponentFixture<SideMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, FontAwesomeModule],
      declarations: [SideMenuHeaderComponent, SideMenuItemContentComponent, SideMenuItemComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create component', () => {
      expect(component).toBeTruthy();
    });

    fit('Should create main elements', () => {
      expect(fixture.nativeElement.querySelector('div.container')).toBeTruthy();
      expect(fixture.nativeElement.querySelectorAll('sfc-side-menu-item-content').length).toEqual(1);
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

  describe('Parent', () => {
    fit('Should have defined attributes', () => {
      const parentEl = fixture.debugElement.query(By.css('div.container > sfc-side-menu-item-content'));

      expect(parentEl.componentInstance.item).toEqual(component.item);
      expect(parentEl.attributes['ng-reflect-open']).toEqual('false');
      expect(parentEl.componentInstance.open).toEqual(component.open);
      expect(parentEl.attributes['ng-reflect-open-parent']).toEqual('false');
      expect(parentEl.componentInstance.openParent).toEqual(component.openParent);
      expect(parentEl.attributes['ng-reflect-has-children']).toEqual('false');
      expect(parentEl.componentInstance.hasChildren).toEqual(false);
    });

    fit('Should hasChildren to be true', () => {
      component.item.items?.push({ active: false, icon: undefined, label: '', type: SideMenuItemType.Item });
      fixture.detectChanges();

      const parentEl = fixture.debugElement.query(By.css('div.container > sfc-side-menu-item-content'));

      expect(parentEl.attributes['ng-reflect-has-children']).toEqual('true');
      expect(parentEl.componentInstance.hasChildren).toBeTrue();
    });

    describe('Active', () => {
      fit('Should not have active attribute value', () => {
        const parentEl = fixture.debugElement.query(By.css('div.container > sfc-side-menu-item-content'));

        expect(parentEl.attributes['ng-reflect-active']).toEqual('false');
        expect(parentEl.componentInstance.active).toBeFalse();
      });

      fit('Should have active attribute value', () => {
        component.item.active = true;
        fixture.detectChanges();

        const parentEl = fixture.debugElement.query(By.css('div.container > sfc-side-menu-item-content'));

        expect(parentEl.attributes['ng-reflect-active']).toEqual('true');
        expect(parentEl.componentInstance.active).toBeTrue();
      });

      fit('Should have active attribute value, when has childrens', () => {
        component.item.items?.push({ active: true, icon: undefined, label: '', type: SideMenuItemType.Item });
        fixture.detectChanges();

        const parentEl = fixture.debugElement.query(By.css('div.container > sfc-side-menu-item-content'));

        expect(parentEl.attributes['ng-reflect-active']).toEqual('true');
        expect(parentEl.componentInstance.active).toBeTrue();
      });

      fit('Should not have active attribute value, when has childrens and any child is active', () => {
        component.item.items?.push({ active: false, icon: undefined, label: '', type: SideMenuItemType.Item });
        fixture.detectChanges();

        const parentEl = fixture.debugElement.query(By.css('div.container > sfc-side-menu-item-content'));

        expect(parentEl.attributes['ng-reflect-active']).toEqual('false');
        expect(parentEl.componentInstance.active).toBeFalse();
      });

      fit('Should not have active attribute value, when has active childrens, but open parent', () => {
        component.item.items?.push({ active: false, icon: undefined, label: '', type: SideMenuItemType.Item });
        component.openParent = true;
        fixture.detectChanges();

        const parentEl = fixture.debugElement.query(By.css('div.container > sfc-side-menu-item-content'));

        expect(parentEl.attributes['ng-reflect-active']).toEqual('false');
        expect(parentEl.componentInstance.active).toBeFalse();
      });
    });

    describe('Open parent', () => {
      fit('Should openParent to be true', () => {
        component.openParent = true;
        fixture.detectChanges();

        const parentEl = fixture.debugElement.query(By.css('div.container > sfc-side-menu-item-content'));

        expect(parentEl.attributes['ng-reflect-open-parent']).toEqual('true');
        expect(parentEl.componentInstance.openParent).toBeTrue();
      });

      fit('Should openParent to be false on init, when any child exist', () => {
        component.ngOnInit();
        fixture.detectChanges();

        const parentEl = fixture.debugElement.query(By.css('div.container > sfc-side-menu-item-content'));

        expect(parentEl.attributes['ng-reflect-open-parent']).toEqual('false');
        expect(parentEl.componentInstance.openParent).toBeFalse();
      });

      fit('Should openParent to be false on init, when any child are active', () => {
        component.item.items?.push({ active: false, icon: undefined, label: '', type: SideMenuItemType.Item });
        component.ngOnInit();
        fixture.detectChanges();

        const parentEl = fixture.debugElement.query(By.css('div.container > sfc-side-menu-item-content'));

        expect(parentEl.attributes['ng-reflect-open-parent']).toEqual('false');
        expect(parentEl.componentInstance.openParent).toBeFalse();
      });

      fit('Should openParent to be true on init', () => {
        component.item.items?.push({ active: true, icon: undefined, label: '', type: SideMenuItemType.Item });
        component.ngOnInit();
        fixture.detectChanges();

        const parentEl = fixture.debugElement.query(By.css('div.container > sfc-side-menu-item-content'));

        expect(parentEl.attributes['ng-reflect-open-parent']).toEqual('true');
        expect(parentEl.componentInstance.openParent).toBeTrue();
      });

      fit('Should emit select event', () => {
        spyOn(component.selectItem, 'emit');

        fixture.debugElement.query(By.css('div.container > sfc-side-menu-item-content'))
          .nativeElement.dispatchEvent(new MouseEvent('click'));
        fixture.detectChanges();

        const parentEl = fixture.debugElement.query(By.css('div.container > sfc-side-menu-item-content'));

        expect(parentEl.attributes['ng-reflect-open-parent']).toEqual('true');
        expect(parentEl.componentInstance.openParent).toBeTrue();
        expect(component.selectItem.emit).toHaveBeenCalledOnceWith(component.item);
      });
    });

  });

  describe('Children', () => {

    fit('Should show childrens', () => {
      component.item.items?.push({ active: false, icon: undefined, label: '', type: SideMenuItemType.Item });
      component.openParent = true;
      fixture.detectChanges();

      expect(fixture.debugElement
        .queryAll(By.css('div.children > sfc-side-menu-item-content')).length).toEqual(1);
    });

    fit('Should not show childrens, when any childrens', () => {
      component.openParent = true;
      fixture.detectChanges();

      expect(fixture.debugElement
        .queryAll(By.css('div.children > sfc-side-menu-item-content')).length).toEqual(0);
    });

    fit('Should not show childrens, when openParent is false', () => {
      component.item.items?.push({ active: false, icon: undefined, label: '', type: SideMenuItemType.Item });
      fixture.detectChanges();

      expect(fixture.debugElement
        .queryAll(By.css('div.children > sfc-side-menu-item-content')).length).toEqual(0);
    });

    fit('Should have defined attributes', () => {
      component.item.items?.push({ active: false, icon: undefined, label: '', type: SideMenuItemType.Item });
      component.openParent = true;
      fixture.detectChanges();

      const childrenEls = fixture.debugElement.queryAll(By.css('div.children > sfc-side-menu-item-content'));

      childrenEls.forEach(child => {
        expect(child.componentInstance.item).toEqual((component.item.items as ISideMenuItemModel[])[0]);
        expect(child.attributes['ng-reflect-open']).toEqual('false');
        expect(child.componentInstance.open).toEqual(component.open);
        expect(child.attributes['ng-reflect-open-parent']).toEqual('true');
        expect(child.componentInstance.openParent).toBeTrue();
      });
    });

    fit('Should emit select event', () => {
      spyOn(component.selectItem, 'emit');
      component.item.items?.push({ active: false, icon: undefined, label: '', type: SideMenuItemType.Item });
      component.item.items?.push({ active: true, icon: undefined, label: '', type: SideMenuItemType.Item });
      component.openParent = true;
      fixture.detectChanges();

      const childrenEls = fixture.debugElement.queryAll(By.css('div.children > sfc-side-menu-item-content'));

      childrenEls[1].nativeElement.dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();

      const childrenAfterEls = fixture.debugElement.queryAll(By.css('div.children > sfc-side-menu-item-content'));

      childrenAfterEls.forEach(child => {
        expect(child.attributes['ng-reflect-active']).toEqual('false');
        expect(child.componentInstance.active).toBeFalse();
      });

      expect(component.selectItem.emit).toHaveBeenCalledOnceWith((component.item.items as ISideMenuItemModel[])[1]);
    });

    describe('Active', () => {
      fit('Should not have active attribute value', () => {
        component.item.items?.push({ active: false, icon: undefined, label: '', type: SideMenuItemType.Item });
        component.openParent = true;
        fixture.detectChanges();

        const childrenEls = fixture.debugElement.queryAll(By.css('div.children > sfc-side-menu-item-content'));

        expect(childrenEls[0].attributes['ng-reflect-active']).toEqual('false');
        expect(childrenEls[0].componentInstance.active).toBeFalse();
      });

      fit('Should have active attribute value', () => {
        component.item.items?.push({ active: true, icon: undefined, label: '', type: SideMenuItemType.Item });
        component.openParent = true;
        fixture.detectChanges();

        const childrenEls = fixture.debugElement.queryAll(By.css('div.children > sfc-side-menu-item-content'));

        expect(childrenEls[0].attributes['ng-reflect-active']).toEqual('true');
        expect(childrenEls[0].componentInstance.active).toBeTrue();
      });
    });
  });
});
