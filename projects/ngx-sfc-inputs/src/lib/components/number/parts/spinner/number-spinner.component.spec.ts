import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { ShowHideElementDirective, UIClass } from 'ngx-sfc-common';
import { NumberSpinnerComponent } from './number-spinner.component';

describe('Component: NumberSpinner', () => {
  let component: NumberSpinnerComponent;
  let fixture: ComponentFixture<NumberSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [ShowHideElementDirective, NumberSpinnerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create an instance', () => {
      expect(component).toBeTruthy();
    });

    fit('Should have main elements', () => {
      expect(fixture.nativeElement.querySelector('.container')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.lever.previous')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.lever.previous fa-icon')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.lever.next')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.lever.next fa-icon')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.label')).toBeTruthy();
    });
  });

  describe('Host classes', () => {
    describe('Fixed width', () => {
      fit("Should not have class", () => {
        expect(fixture.nativeElement.className).not.toContain(UIClass.Fixed);
      });

      fit("Should have class", () => {
        component.model.fixedWidth = true;
        fixture.detectChanges();

        expect(fixture.nativeElement.className).toContain(UIClass.Fixed);
      });
    });

    describe('Fixed actions', () => {
      fit("Should not have class", () => {
        expect(fixture.nativeElement.className).not.toContain(`${UIClass.Fixed}-actions`);
      });

      fit("Should have class", () => {
        component.model.fixedActions = true;
        fixture.detectChanges();

        expect(fixture.nativeElement.className).toContain(`${UIClass.Fixed}-actions`);
      });
    });

    describe('Disabled', () => {
      fit("Should not have class", () => {
        expect(fixture.nativeElement.className).not.toContain(UIClass.Disabled);
      });

      fit("Should have class", () => {
        component.model.disabled = true;
        fixture.detectChanges();

        expect(fixture.nativeElement.className).toContain(UIClass.Disabled);
      });
    });
  });

  describe('Lever', () => {
    describe('Previous', () => {
      fit('Should emit update action', () => {
        spyOn(component.update, 'emit');

        fixture.debugElement.query(By.css('.lever.previous')).nativeElement
          .dispatchEvent(new MouseEvent('click'));

        expect(component.update.emit).toHaveBeenCalledTimes(1);
      });

      fit('Should emit update with previous number', () => {
        component.model.value = 2;
        spyOn(component.update, 'emit');

        fixture.debugElement.query(By.css('.lever.previous')).nativeElement
          .dispatchEvent(new MouseEvent('click'));

        expect(component.update.emit).toHaveBeenCalledOnceWith(1);
      });

      fit('Should emit update with defined step', () => {
        component.model.value = 2;
        component.model.step = 2;
        spyOn(component.update, 'emit');

        fixture.debugElement.query(By.css('.lever.previous')).nativeElement
          .dispatchEvent(new MouseEvent('click'));

        expect(component.update.emit).toHaveBeenCalledOnceWith(0);
      });

      fit('Should have default icon', () => {
        expect(fixture.nativeElement.querySelector('.lever.previous svg.fa-angle-left')).toBeTruthy();
      });

      fit('Should have defined icon', () => {
        component.model.prevIcon = faUser;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('.lever.previous svg.fa-user')).toBeTruthy();
      });

      fit('Should show icon', () => {
        expect(component.showPrevious).toBeTrue();
      });

      fit('Should not show icon', () => {
        component.model.min = 0;

        expect(component.showPrevious).toBeFalse();
      });
    });

    describe('Next', () => {
      fit('Should emit update action', () => {
        spyOn(component.update, 'emit');

        fixture.debugElement.query(By.css('.lever.next')).nativeElement
          .dispatchEvent(new MouseEvent('click'));

        expect(component.update.emit).toHaveBeenCalledTimes(1);
      });

      fit('Should emit update with next number', () => {
        component.model.value = 2;
        spyOn(component.update, 'emit');

        fixture.debugElement.query(By.css('.lever.next')).nativeElement
          .dispatchEvent(new MouseEvent('click'));

        expect(component.update.emit).toHaveBeenCalledOnceWith(3);
      });

      fit('Should emit update with defined step', () => {
        component.model.value = 2;
        component.model.step = 2;
        spyOn(component.update, 'emit');

        fixture.debugElement.query(By.css('.lever.next')).nativeElement
          .dispatchEvent(new MouseEvent('click'));

        expect(component.update.emit).toHaveBeenCalledOnceWith(4);
      });

      fit('Should have default icon', () => {
        expect(fixture.nativeElement.querySelector('.lever.next svg.fa-angle-right')).toBeTruthy();
      });

      fit('Should have defined icon', () => {
        component.model.nextIcon = faUser;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('.lever.next svg.fa-user')).toBeTruthy();
      });

      fit('Should show icon', () => {
        component.model.max = 1;

        expect(component.showNext).toBeTrue();
      });

      fit('Should not show icon', () => {
        component.model.max = 0;
        component.model.value = 1;

        expect(component.showNext).toBeFalse();
      });
    });
  });

  describe('Label', () => {
    fit('Should have default value', () => {
      expect(fixture.nativeElement.querySelector('.label').innerText).toEqual('0');
    });

    fit('Should have defined value', () => {
      component.model.value = 100;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.label').innerText).toEqual('100');
    });
  });
});
