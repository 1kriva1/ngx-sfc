import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonType, ComponentSize, MouseDownDirective, Position, ScrollIntoViewDirective, ScrollTrackerDirective } from 'ngx-sfc-common';
import { UIClass } from 'ngx-sfc-common';
import { CommonConstants } from 'ngx-sfc-common';
import { ComponentSizeDirective } from 'ngx-sfc-common';
import { ButtonComponent } from 'ngx-sfc-common';
import { DateTimeValueActionType } from '../../service/value/datetime-value.enum';
import { DateTimeValueService } from '../../service/value/datetime-value.service';
import { DateTimeViewService } from '../../service/view/datetime-view.service';
import { DateTimeViewActionType } from '../../service/view/enums/datetime-view.enum';
import { DateTimeYearComponent } from './datetime-year.component';

describe('Component: DateTimeYear', () => {
  let component: DateTimeYearComponent;
  let fixture: ComponentFixture<DateTimeYearComponent>;
  let valueServiceSpy: jasmine.SpyObj<DateTimeValueService>;
  let viewServiceSpy: jasmine.SpyObj<DateTimeViewService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [MouseDownDirective, ComponentSizeDirective, ScrollIntoViewDirective, ScrollTrackerDirective, ButtonComponent, DateTimeYearComponent]
    }).compileComponents();

    valueServiceSpy = jasmine.createSpyObj('DateTimeValueService', ['update']);
    viewServiceSpy = jasmine.createSpyObj('DateTimeViewService', ['update']);
    valueServiceSpy.value = new Date(2034, 9, 30);

    TestBed.overrideComponent(DateTimeYearComponent, {
      set: {
        providers: [
          { provide: DateTimeValueService, useValue: valueServiceSpy },
          { provide: DateTimeViewService, useValue: viewServiceSpy }
        ]
      }
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateTimeYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create an instance', () => {
      expect(component).toBeTruthy();
    });

    fit('Should create main elements', () => {
      expect(fixture.nativeElement.querySelector('div.container')).toBeTruthy();
      expect(fixture.nativeElement.querySelectorAll('div.handler').length).toEqual(2);
      expect(fixture.nativeElement.querySelectorAll('sfc-button').length).toEqual(2);
      expect(fixture.nativeElement.querySelector('div.years')).toBeTruthy();
    });
  });

  describe('Handlers', () => {
    fit('Should have constant text', () => {
      fixture.nativeElement.querySelectorAll('sfc-button span.text').forEach((el: any) => {
        expect(el.innerText).toEqual(CommonConstants.EMPTY_STRING);
      })
    });

    fit('Should have constant type', () => {
      const handlers: DebugElement[] = fixture.debugElement.queryAll(By.css('sfc-button'));

      handlers.forEach(el => {
        expect(el.componentInstance.types).toEqual([ButtonType.Rounded]);
      });
    });

    fit('Should have constant size', () => {
      const handlers: DebugElement[] = fixture.debugElement.queryAll(By.css('sfc-button'));

      handlers.forEach(el => {
        expect(el.attributes['ng-reflect-size']).toEqual(ComponentSize.Small);
      });
    });

    fit('Should have before icon', () => {
      const handlerBefore: DebugElement = fixture.debugElement.query(By.css('sfc-button'));

      expect(handlerBefore.componentInstance.iconBefore.iconName).toEqual('chevron-up');
      expect(handlerBefore.componentInstance.iconBefore.prefix).toEqual('fas');
    });

    fit('Should have after icon', () => {
      const handlerAfter: DebugElement = fixture.debugElement.queryAll(By.css('sfc-button'))[1];

      expect(handlerAfter.componentInstance.iconBefore.iconName).toEqual('chevron-down');
      expect(handlerAfter.componentInstance.iconBefore.prefix).toEqual('fas');
    });

    fit('Should update years list on before action', () => {
      component.year = 1992;
      updateYearList();

      fixture.debugElement.queryAll(By.css('div.year')).forEach((item, index) => {
        expect(item.nativeElement.innerText).toEqual((1984 + index).toString());
      });
    });

    fit('Should update years list on after action', () => {
      component.year = 1992;
      updateYearList(false);

      fixture.debugElement.queryAll(By.css('div.year')).forEach((item, index) => {
        expect(item.nativeElement.innerText).toEqual((1986 + index).toString());
      });
    });
  });

  describe('List', () => {
    fit('Should be empty', () => {
      expect(fixture.debugElement.queryAll(By.css('div.year')).length).toEqual(0);
    });

    fit('Should be not empty', () => {
      component.year = 1992;
      fixture.detectChanges();

      expect(fixture.debugElement.queryAll(By.css('div.year')).length).toEqual(15);
    });

    fit('Should have defined text', () => {
      component.year = 1992;
      fixture.detectChanges();

      fixture.debugElement.queryAll(By.css('div.year')).forEach((item, index) => {
        expect(item.nativeElement.innerText).toEqual((1985 + index).toString());
      });
    });

    fit('Should current year be selected', () => {
      component.year = 1992;
      fixture.detectChanges();

      const selectedYearEl = fixture.debugElement.queryAll(By.css(`div.year.${UIClass.Selected}`));
      expect(selectedYearEl.length).toEqual(1);
      expect(selectedYearEl[0].nativeElement.innerText).toEqual('1992');
    });

    fit('Should change selected year', () => {
      component.year = 1992;
      fixture.detectChanges();

      selectYear(fixture.debugElement.queryAll(By.css('div.year'))[4], 1989);

      const selectedYearEl = fixture.debugElement.queryAll(By.css(`div.year.${UIClass.Selected}`));

      expect(selectedYearEl.length).toEqual(1);
      expect(selectedYearEl[0].nativeElement.innerText).toEqual('1989');
    });

    fit('Should be disabled by minDate', () => {
      component.minDate = new Date(1991, 11, 1);
      component.year = 1992;
      fixture.detectChanges();

      const disabledYearEl = fixture.debugElement.queryAll(By.css(`div.year.${UIClass.Disabled}`));

      expect(disabledYearEl.length).toEqual(6);
      disabledYearEl.forEach((item, index) => {
        expect(item.nativeElement.innerText).toEqual((1985 + index).toString());
      });
    });

    fit('Should be disabled by maxDate', () => {
      component.maxDate = new Date(1993, 11, 1);
      component.year = 1992;
      fixture.detectChanges();

      const disabledYearEl = fixture.debugElement.queryAll(By.css(`div.year.${UIClass.Disabled}`));

      expect(disabledYearEl.length).toEqual(6);
      disabledYearEl.forEach((item, index) => {
        expect(item.nativeElement.innerText).toEqual((1994 + index).toString());
      });
    });

    fit('Should be disabled by minDate and maxDate', () => {
      component.minDate = new Date(1991, 11, 1);
      component.maxDate = new Date(1993, 11, 1);
      component.year = 1992;
      fixture.detectChanges();

      const disabledYearEl = fixture.debugElement.queryAll(By.css(`div.year.${UIClass.Disabled}`));

      expect(disabledYearEl.length).toEqual(12);
      disabledYearEl.forEach((item, index) => {
        if (index < 6)
          expect(item.nativeElement.innerText).toEqual((1985 + index).toString());
        else
          expect(item.nativeElement.innerText).toEqual((1994 + (index - 6)).toString());
      });
    });

    fit('Should emit on value service', () => {
      component.year = 1992;
      fixture.detectChanges();

      selectYear(fixture.debugElement.queryAll(By.css('div.year'))[4], 1989);

      expect(valueServiceSpy.update).toHaveBeenCalledOnceWith({ type: DateTimeValueActionType.Year, parameter: 1989 });
    });

    fit('Should emit on view service', () => {
      component.year = 1992;
      fixture.detectChanges();

      const event = selectYear(fixture.debugElement.queryAll(By.css('div.year'))[4], 1993);

      expect(viewServiceSpy.update).toHaveBeenCalledOnceWith({ type: DateTimeViewActionType.Year, event: event });
    });

    describe('Scroll', () => {
      fit('Should scroll target not exist', () => {
        expect(component.scrollTarget).toBeUndefined();
      });

      fit('Should scroll target exist', () => {
        component.year = 1992;
        fixture.detectChanges();

        component.ngAfterViewInit();
        fixture.detectChanges();

        expect(component.scrollTarget).toBeTruthy();
      });

      fit('Should current year be scroll target element', () => {
        component.year = 1992;
        fixture.detectChanges();

        component.ngAfterViewInit();
        fixture.detectChanges();

        const selectedYearEl = fixture.debugElement.queryAll(By.css('div.year'))[7];
        expect(component.scrollTarget).toEqual(selectedYearEl.nativeElement);
      });

      fit('Should have constant positions for scrolling', () => {
        expect(fixture.debugElement.query(By.css('div.years')).attributes['ng-reflect-positions'])
          .toEqual(`${Position.Bottom},${Position.Top}`)
      });

      fit('Should on bottom scroll update years list', () => {
        component.year = 1992;
        fixture.detectChanges();

        scrollYearList();

        fixture.debugElement.queryAll(By.css('div.year')).forEach((item, index) => {
          expect(item.nativeElement.innerText).toEqual((1986 + index).toString());
        });
      });

      fit('Should on bottom scroll change scrollTop', () => {
        component.year = 1992;
        fixture.detectChanges();

        const yearsElBefore = fixture.debugElement.query(By.css('div.years')).nativeElement;

        expect(yearsElBefore.scrollTop).toEqual(0);

        scrollYearList();

        const yearsElAfter = fixture.debugElement.query(By.css('div.years')).nativeElement;

        expect(yearsElAfter.scrollTop).not.toEqual(0);
        expect(yearsElAfter.scrollTop).toBeGreaterThan(0);
      });

      fit('Should on top scroll update years list', () => {
        component.year = 1992;
        fixture.detectChanges();

        scrollYearList(false);

        fixture.debugElement.queryAll(By.css('div.year')).forEach((item, index) => {
          expect(item.nativeElement.innerText).toEqual((1984 + index).toString());
        });
      });

      fit('Should on top scroll change scrollTop', () => {
        component.year = 1992;
        fixture.detectChanges();

        const yearsEl = fixture.debugElement.query(By.css('div.years')).nativeElement;

        expect(Math.round(yearsEl.scrollTop) > 0).toBeFalse();

        scrollYearList(false);

        expect(Math.round(yearsEl.scrollTop) > 0).toBeTrue();
      });
    });
  });

  function selectYear(yearEl: DebugElement, value: number | null = null): any {
    const event = { target: yearEl.nativeElement, button: 0 };
    yearEl.triggerEventHandler('mousedown', event);
    fixture.detectChanges();

    if (value) {
      component.year = value;
      fixture.detectChanges();
    }

    return event;
  }

  function scrollYearList(bottom = true) {
    const targetEl = fixture.debugElement.query(By.css('div.years')).nativeElement;

    if (bottom)
      targetEl.scrollTop = targetEl.scrollHeight;
    else
      targetEl.scrollTop = 0;

    targetEl.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();
  }

  function updateYearList(before: boolean = true): void {
    const handlerEl = fixture.debugElement.queryAll(By.css('sfc-button'))[before ? 0 : 1],
      event = { target: handlerEl.nativeElement, button: 0 };
    handlerEl.triggerEventHandler('mousedown', event);
    fixture.detectChanges();
  }
});
