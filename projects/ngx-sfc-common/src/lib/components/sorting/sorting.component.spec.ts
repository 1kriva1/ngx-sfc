import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonConstants } from '../../constants';
import { SortingDirection, UIClass } from '../../enums';
import { SortingComponent } from './sorting.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTShirt } from '@fortawesome/free-solid-svg-icons';

describe('Component: SortingComponent', () => {
  let component: SortingComponent;
  let fixture: ComponentFixture<SortingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [SortingComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create component', () => {
      expect(component).toBeTruthy();
    });

    fit('Should have main elements', () => {
      expect(fixture.nativeElement.querySelector('div.container')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.content')).toBeTruthy();
    });

    fit('Should have default model', () => {
      (component.model as any) = null;
      component.ngOnInit();

      expect(component.model).toEqual({ active: false, enabled: false, direction: SortingDirection.Ascending });
    });

    fit("Should call unsubscribe on resize observable, when component destroyed", () => {
      const unsubscribeSpy = spyOn(
        (component as any)._subscription,
        'unsubscribe'
      ).and.callThrough();

      component?.ngOnDestroy();

      expect(unsubscribeSpy).toHaveBeenCalled();
    });

    fit("Should not have enabled class", () => {
      expect(fixture.nativeElement.className).not.toContain(UIClass.Enabled);
    });

    fit("Should have enabled class", () => {
      component.model.enabled = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.className).toContain(UIClass.Enabled);
    });

    fit("Should not have active class", () => {
      expect(fixture.nativeElement.className).not.toContain(UIClass.Active);
    });

    fit("Should have active class", () => {
      component.model.active = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.className).toContain(UIClass.Active);
    });
  });

  describe('Icons', () => {
    fit('Should not exist', () => {
      expect(fixture.nativeElement.querySelector('div.icons')).toBeNull();
    });

    fit('Should exist', () => {
      component.model.enabled = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.icons')).toBeTruthy();
    });

    fit('Should have valid icon', () => {
      component.model = { enabled: true, active: false, direction: SortingDirection.Descending };
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.icons fa-icon svg').classList).toContain('fa-chevron-down');
    });

    fit('Should have custom icon value', () => {
      component.model = {
        enabled: true,
        active: false,
        direction: SortingDirection.Ascending,
        icons: [
          { direction: SortingDirection.Ascending, icon: faTShirt },
          { direction: SortingDirection.Descending, icon: faTShirt }
        ]
      };
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.icons fa-icon svg').classList).toContain('fa-shirt');

      component.model.direction = SortingDirection.Descending;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.icons fa-icon svg').classList).toContain('fa-shirt');
    });

    fit('Should not change icon, when sorting not active', () => {
      component.model = { enabled: true, active: false, direction: SortingDirection.Descending };
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.icons fa-icon svg').classList).toContain('fa-chevron-down');

      fixture.debugElement.nativeElement.dispatchEvent(new MouseEvent('click', {}));
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.icons fa-icon svg').classList).toContain('fa-chevron-down');
    });

    fit('Should change icon', () => {
      component.model = { enabled: true, active: true, direction: SortingDirection.Descending };
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.icons fa-icon svg').classList).toContain('fa-chevron-down');

      fixture.debugElement.nativeElement.dispatchEvent(new MouseEvent('click', {}));
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.icons fa-icon svg').classList).toContain('fa-chevron-up');
    });
  });

  describe('Sorting', () => {
    fit('Should not call sort, when sorting not enabled', () => {
      const sortSpy = spyOn<any>((component as any).service, 'sort');

      fixture.debugElement.nativeElement.dispatchEvent(new MouseEvent('click', {}));

      expect(sortSpy).not.toHaveBeenCalled();
    });

    fit('Should call sort', () => {
      const sortSpy = spyOn<any>((component as any).service, 'sort');
      component.model.enabled = true;

      fixture.debugElement.nativeElement.dispatchEvent(new MouseEvent('click', {}));

      expect(sortSpy).toHaveBeenCalledTimes(1);
    });

    fit('Should call sort with default id', () => {
      const sortSpy = spyOn<any>((component as any).service, 'sort');
      component.model.enabled = true;

      fixture.debugElement.nativeElement.dispatchEvent(new MouseEvent('click', {}));

      expect(sortSpy).toHaveBeenCalledOnceWith({ id: CommonConstants.EMPTY_STRING, direction: SortingDirection.Ascending });
    });

    fit('Should call service with default ascending direction', () => {
      const sortSpy = spyOn<any>((component as any).service, 'sort');
      component.model.enabled = true;
      component.id = 'sort-id';

      fixture.debugElement.nativeElement.dispatchEvent(new MouseEvent('click', {}));

      expect(sortSpy).toHaveBeenCalledWith({ id: component.id, direction: SortingDirection.Ascending });
    });

    fit('Should call service with new descending direction', () => {
      const sortSpy = spyOn<any>((component as any).service, 'sort');
      component.model.enabled = true;
      component.model.active = true;

      fixture.debugElement.nativeElement.dispatchEvent(new MouseEvent('click', {}));

      expect(sortSpy).toHaveBeenCalledWith({ id: component.id, direction: SortingDirection.Descending });
    });

    fit('Should call service with new directions', () => {
      const sortSpy = spyOn<any>((component as any).service, 'sort');
      component.model.enabled = true;
      component.model.active = true;

      fixture.debugElement.nativeElement.dispatchEvent(new MouseEvent('click', {}));

      expect(sortSpy).toHaveBeenCalledWith({ id: component.id, direction: SortingDirection.Descending });

      fixture.debugElement.nativeElement.dispatchEvent(new MouseEvent('click', {}));

      expect(sortSpy).toHaveBeenCalledWith({ id: component.id, direction: SortingDirection.Ascending });
    });

    fit('Should return direction to initial state (ascending)', () => {
      component.model.enabled = true;
      component.model.active = true;
      component.id = 'testId';

      expect(component.model.direction).toEqual(SortingDirection.Ascending);

      fixture.debugElement.nativeElement.dispatchEvent(new MouseEvent('click', {}));

      expect(component.model.direction).toEqual(SortingDirection.Descending);

      (component as any).service.sort({ id: 'testIdNew', direction: SortingDirection.Descending });

      expect(component.model.direction).toEqual(SortingDirection.Ascending);
    });
  });
});

@Component({
  template: `<sfc-sorting>
              <h1 class="custom-content">Test content</h1>
             </sfc-sorting>`
})
class TestSfcSortingComponent { }

describe('Component: SortingComponent: Template content', () => {
  let fixture: ComponentFixture<TestSfcSortingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SortingComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSfcSortingComponent);
    fixture.detectChanges();
  });

  fit('Should have provided template content', () => {
    expect(fixture.nativeElement.querySelector('h1.custom-content')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('h1.custom-content').innerText).toEqual('Test content');
  });
});
