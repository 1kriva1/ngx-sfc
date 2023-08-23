import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateTimeConstants, MouseDownDirective, UIClass } from 'ngx-sfc-common';
import { DateTimeValueService } from '../../service/value/datetime-value.service';
import { DateTimeViewService } from '../../service/view/datetime-view.service';
import { DateTimeCalendarComponent } from './datetime-calendar.component';
import { By } from '@angular/platform-browser';
import { WeekDay } from '@angular/common';
import { DebugElement } from '@angular/core';
import { DateTimeValueActionType } from '../../service/value/datetime-value.enum';
import { DateTimeViewActionType } from '../../service/view/enums/datetime-view.enum';

describe('Component: DateTimeCalendar', () => {
  let component: DateTimeCalendarComponent;
  let fixture: ComponentFixture<DateTimeCalendarComponent>;
  let valueServiceSpy: jasmine.SpyObj<DateTimeValueService>;
  let viewServiceSpy: jasmine.SpyObj<DateTimeViewService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MouseDownDirective, DateTimeCalendarComponent]
    }).compileComponents();

    valueServiceSpy = jasmine.createSpyObj('DateTimeValueService', ['update']);
    viewServiceSpy = jasmine.createSpyObj('DateTimeViewService', ['update']);
    valueServiceSpy.value = new Date(2034, 9, 30);

    TestBed.overrideComponent(DateTimeCalendarComponent, {
      set: {
        providers: [
          { provide: DateTimeValueService, useValue: valueServiceSpy },
          { provide: DateTimeViewService, useValue: viewServiceSpy }
        ]
      }
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateTimeCalendarComponent);
    component = fixture.componentInstance;
    component.currentDate = new Date(2034, 9, 30);
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create an instance', () => {
      expect(component).toBeTruthy();
    });

    fit('Should create main elements', () => {
      expect(fixture.nativeElement.querySelector('div.container')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.title')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('table')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('thead tr')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('tbody')).toBeTruthy();
    });

    fit('Should have defined calendar month', () => {
      expect(fixture.nativeElement.querySelector('div.title').innerText).toEqual('OCTOBER 2034');
    });

    fit('Should re-create calendar on date change', () => {
      spyOn<any>(component, 'initCalendar').and.callThrough();
      component.currentDate = new Date(2021, 0, 1);
      fixture.detectChanges();

      component.currentDate = new Date(2020, 0, 1);
      fixture.detectChanges();

      expect(component['initCalendar']).toHaveBeenCalledTimes(2);
    });

  });

  describe('Header', () => {
    fit('Should have all days', () => {
      expect(fixture.debugElement.queryAll(By.css('th')).length).toEqual(DateTimeConstants.DAYS_IN_WEEK);
    });

    fit('Should have days in order', () => {
      fixture.debugElement.queryAll(By.css('th')).forEach((dayEl, index) => {
        const indexValue = index + 1 >= DateTimeConstants.DAYS_OF_WEEK_3.length ? 0 : index + component.weekStart;
        expect(dayEl.nativeElement.innerText.toLocaleLowerCase())
          .toEqual(DateTimeConstants.DAYS_OF_WEEK_3[indexValue].toLocaleLowerCase());
      });
    });

    fit('Should have days in order with sunday as start of week', () => {
      component.weekStart = WeekDay.Sunday;
      component.currentDate = new Date(2034, 9, 30);
      fixture.detectChanges();

      fixture.debugElement.queryAll(By.css('th')).forEach((dayEl, index) => {
        expect(dayEl.nativeElement.innerText.toLocaleLowerCase())
          .toEqual(DateTimeConstants.DAYS_OF_WEEK_3[index].toLocaleLowerCase());
      });
    });
  });

  describe('Calendar', () => {
    fit('Should have 5 weeks in month', () => {
      component.currentDate = new Date(2021, 0, 1);
      fixture.detectChanges();

      expect(fixture.debugElement.queryAll(By.css('tbody tr')).length).toEqual(5);
    });

    fit('Should have 4 weeks in month', () => {
      component.currentDate = new Date(2021, 1, 1);
      fixture.detectChanges();

      expect(fixture.debugElement.queryAll(By.css('tbody tr')).length).toEqual(4);
    });

    fit('Should have 7 days in a week', () => {
      component.currentDate = new Date(2021, 0, 1);
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('tbody tr')).queryAll(By.css('td')).length).toEqual(DateTimeConstants.DAYS_IN_WEEK);
    });

    fit('Should have all days in month', () => {
      component.currentDate = new Date(2021, 0, 1);
      fixture.detectChanges();

      expect(fixture.debugElement.queryAll(By.css('tbody tr a')).length).toEqual(31);
    });

    fit('Should hide days not in current month', () => {
      component.currentDate = new Date(2021, 0, 1);
      fixture.detectChanges();

      for (let i = 0; i < 4; i++) {
        expect(getDayEl(i)).toBeNull();
      }
    });

    fit('Should have defined day numbers', () => {
      component.currentDate = new Date(2021, 0, 1);
      fixture.detectChanges();

      for (let i = 1; i <= 3; i++) {
        expect(getDayEl(3 + i).nativeElement.innerText).toEqual('0' + i);
      }
    });

    describe('Selected', () => {
      fit('Should be selected only one day', () => {
        valueServiceSpy.value = component.currentDate = new Date(2021, 0, 1);
        fixture.detectChanges();

        expect(fixture.debugElement.queryAll(By.css(`a.${UIClass.Selected}`)).length).toEqual(1);
      });

      fit('Should become unselected after select other day', () => {
        valueServiceSpy.value = component.currentDate = new Date(2021, 0, 1);
        fixture.detectChanges();

        expect(getDayEl(4, UIClass.Selected)).toBeTruthy();

        selectDate(getDayEl(5), new Date(2021, 0, 2));

        expect(getDayEl(4, UIClass.Selected)).toBeNull();
        expect(getDayEl(5, UIClass.Selected)).toBeTruthy();
      });
    });

    describe('Disabled', () => {
      fit('Should be disabled by minDate', () => {
        component.minDate = new Date(2021, 0, 2);
        valueServiceSpy.value = component.currentDate = new Date(2021, 0, 3);
        fixture.detectChanges();

        expect(fixture.debugElement.queryAll(By.css(`tbody tr a.${UIClass.Disabled}`)).length).toEqual(1);
        expect(getDayEl(4)).toBeTruthy();
      });

      fit('Should be disabled by maxDate', () => {
        component.maxDate = new Date(2021, 0, 2);
        valueServiceSpy.value = component.currentDate = new Date(2021, 0, 1);
        fixture.detectChanges();

        expect(getDayEl(4, UIClass.Disabled)).toBeNull();
        expect(getDayEl(5, UIClass.Disabled)).toBeNull();
        expect(fixture.debugElement.queryAll(By.css(`tbody tr a.${UIClass.Disabled}`)).length).toEqual(29);
      });

      fit('Should be disabled by disabledDays', () => {
        component.disabledDays = [new Date(2021, 0, 1)];
        valueServiceSpy.value = component.currentDate = new Date(2021, 0, 2);
        fixture.detectChanges();

        expect(fixture.debugElement.queryAll(By.css(`tbody tr a.${UIClass.Disabled}`)).length).toEqual(1);
        expect(getDayEl(4)).toBeTruthy();
      });

      fit('Should be disabled by minDate, maxDate and disabledDays', () => {
        component.disabledDays = [new Date(2021, 0, 1)];
        component.minDate = new Date(2021, 0, 3);
        component.maxDate = new Date(2021, 0, 5);
        valueServiceSpy.value = component.currentDate = new Date(2021, 0, 4);
        fixture.detectChanges();

        expect(fixture.debugElement.queryAll(By.css(`a.${UIClass.Disabled}`)).length).toEqual(28);
      });

      fit('Should be disabled and also selected day', () => {
        component.disabledDays = [new Date(2021, 0, 1)];
        valueServiceSpy.value = component.currentDate = new Date(2021, 0, 1);
        fixture.detectChanges();

        expect(fixture.debugElement.queryAll(By.css(`a.${UIClass.Disabled}`)).length).toEqual(1);
        expect(fixture.debugElement.queryAll(By.css(`a.${UIClass.Selected}`)).length).toEqual(0);
      });
    });

    describe('Select event', () => {
      fit('Should not change selected day by default', () => {
        const selectedDate = new Date(2021, 0, 1);
        valueServiceSpy.currentValue = component.currentDate = selectedDate;
        fixture.detectChanges();

        selectDate(getDayEl(4));

        expect(valueServiceSpy.update).not.toHaveBeenCalled();
      });

      fit('Should change selected day', () => {
        const selectedDate = new Date(2021, 0, 1);
        valueServiceSpy.currentValue = component.currentDate = selectedDate;
        fixture.detectChanges();

        selectDate(getDayEl(5), new Date(2021, 0, 2));

        expect(valueServiceSpy.update).toHaveBeenCalledOnceWith({ type: DateTimeValueActionType.Date, value: new Date(2021, 0, 2) });
      });

      fit('Should not change selected day that already selected', () => {
        const selectedDate = new Date(2021, 0, 1);
        valueServiceSpy.currentValue = component.currentDate = selectedDate;
        fixture.detectChanges();

        selectDate(getDayEl(5), new Date(2021, 0, 2));
        selectDate(getDayEl(5), new Date(2021, 0, 2));

        expect(valueServiceSpy.update).toHaveBeenCalledOnceWith({ type: DateTimeValueActionType.Date, value: new Date(2021, 0, 2) });
      });

      fit('Should not update view', () => {
        const selectedDate = new Date(2021, 0, 1);
        valueServiceSpy.currentValue = component.currentDate = selectedDate;
        fixture.detectChanges();

        selectDate(getDayEl(5), new Date(2021, 0, 2));

        expect(viewServiceSpy.update).not.toHaveBeenCalled();
      });

      fit('Should update view', () => {
        const selectedDate = new Date(2021, 0, 1);
        valueServiceSpy.currentValue = component.currentDate = selectedDate;
        component.switchOnClick = true;
        fixture.detectChanges();

        const event = selectDate(getDayEl(5), new Date(2021, 0, 2));

        expect(viewServiceSpy.update).toHaveBeenCalledOnceWith({ type: DateTimeViewActionType.Date, event: event });
      });
    });
  });

  function selectDate(dateEl: DebugElement, value: Date | null = null): MouseEvent {
    const event: any = { target: dateEl.nativeElement, button: 0 };
    dateEl.triggerEventHandler('mousedown', event);
    fixture.detectChanges();

    if (value) {
      valueServiceSpy.value = valueServiceSpy.currentValue = component.currentDate = value;
      fixture.detectChanges();
    }

    return event;
  }

  function getDayEl(index: number, uiClass: UIClass | null = null): DebugElement {
    const cssQuery = uiClass ? `a.${uiClass}` : 'a';
    return fixture.debugElement.query(By.css('tbody tr')).queryAll(By.css('td'))[index].query(By.css(cssQuery));
  }
});
