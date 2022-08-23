import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { CommonConstants, ShowHideElementDirective, UIClass } from 'ngx-sfc-common';
import { InputConstants } from '../../constants/input.constants';
import { InputReferenceDirective } from '../../directives';
import { StarComponent } from './parts/star/star.component';
import { StarsInputComponent } from './stars-input.component';
import { StarsState } from './stars.enum';

describe('Component: StarsInput', () => {
  let component: StarsInputComponent;
  let fixture: ComponentFixture<StarsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, BrowserAnimationsModule],
      declarations: [ShowHideElementDirective, InputReferenceDirective, StarComponent, StarsInputComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create an instance', () => {
      expect(component).toBeTruthy();
    });

    fit('Should have main elements', () => {
      expect(fixture.nativeElement.querySelector('.container')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('input[type=number]')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.content')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.component')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('label')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.stars')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.right-side-info')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.helper-text')).toBeTruthy();
    });
  });

  describe('Input', () => {
    fit("Should have default id value", () => {
      expect(fixture.debugElement.query(By.css('input[type=number]')).nativeElement.id).toEqual(`${InputConstants.ID_PREFIX}undefined`);
    });

    fit("Should have defined id value", () => {
      component.id = 'test-id';
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('input[type=number]')).nativeElement.id).toEqual(`${InputConstants.ID_PREFIX}test-id`);
    });

    fit("Should have default value", () => {
      expect(fixture.nativeElement.querySelector('input[type=number]').value).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit("Should have defined value", () => {
      component.writeValue(4);
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('input[type=number]').value).toEqual('4');
    });

    fit("Should not be disabled", () => {
      expect(fixture.nativeElement.querySelector('input[type=number]').disabled).toBeFalse();
    });

    fit("Should be disabled", () => {
      component.disabled = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('input[type=number]').disabled).toBeTrue();
    });
  });

  describe('Label', () => {
    fit("Should have default value", () => {
      expect(fixture.nativeElement.querySelector('label').innerText).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit("Should have defined value", () => {
      const labelAssertValue = 'test label';
      component.label = labelAssertValue;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('label').innerText).toEqual(labelAssertValue);
    });

    fit("Should select max value", () => {
      component.items = [1, 2, 3];
      fixture.detectChanges();

      expect(component.value).toEqual(null);

      fixture.nativeElement.querySelector('label').dispatchEvent(new MouseEvent('click', {}));
      fixture.detectChanges();

      expect(component.value).toEqual(3);
    });
  });

  describe('Icon', () => {
    fit('Should not exist', () => {
      expect(fixture.nativeElement.querySelector('.icon')).toBeNull();
    });

    fit('Should exist', () => {
      component.icon = faUser;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.icon')).toBeTruthy();
    });

    fit('Should have defined value', () => {
      component.icon = faUser;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.icon svg.fa-user')).toBeTruthy();
    });

    fit("Should select max value", () => {
      component.items = [1, 2, 3];
      component.icon = faUser;
      fixture.detectChanges();

      expect(component.value).toEqual(null);

      fixture.nativeElement.querySelector('.icon').dispatchEvent(new MouseEvent('click', {}));
      fixture.detectChanges();

      expect(component.value).toEqual(3);
    });
  });

  describe('Stars', () => {
    fit('Should not exist', () => {
      expect(fixture.nativeElement.querySelector('sfc-star')).toBeNull();
    });

    fit('Should exist', () => {
      component.items = [1, 2, 3];
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('sfc-star').length).toEqual(3);
    });

    fit('Should have ascending order', () => {
      component.items = [30, 21, 29];
      component.ngOnInit();
      fixture.detectChanges();

      const starsEls = fixture.debugElement.queryAll(By.css('sfc-star'));
      expect(starsEls[0].componentInstance.value).toEqual(21);
      expect(starsEls[1].componentInstance.value).toEqual(29);
      expect(starsEls[2].componentInstance.value).toEqual(30);
    });

    fit("Should have defined parameters", () => {
      component.disabled = true;
      component.items = [3, 2, 1];
      fixture.detectChanges();

      fixture.debugElement.queryAll(By.css('sfc-star')).forEach((starComponent, index) => {
        expect(starComponent.componentInstance.disabled).toBeTrue();
        expect(starComponent.componentInstance.value).toEqual(component.items[index]);
        expect(starComponent.componentInstance.state).toEqual(StarsState.None);
        expect(starComponent.componentInstance.id).toEqual(component.inputId);
      });
    });

    fit("Should change value", () => {
      component.items = [30, 21, 29];
      component.ngOnInit();
      fixture.detectChanges();

      fixture.nativeElement.querySelector('sfc-star label').dispatchEvent(new MouseEvent('click', {}));
      fixture.detectChanges();

      expect(component.value).toEqual(21);
    });

    describe('States', () => {
      fit("Should have mone state", () => {
        component.items = [3, 2, 1];
        component.ngOnInit();
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('sfc-star')).componentInstance.state).toEqual(StarsState.None);
      });

      fit("Should have common state", () => {
        component.items = [3, 2, 1];
        component.value = 2;
        component.ngOnInit();
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('sfc-star')).componentInstance.state).toEqual(StarsState.Common);
      });

      fit("Should have max state", () => {
        component.items = [3, 2, 1];
        component.value = 3;
        component.ngOnInit();
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('sfc-star')).componentInstance.state).toEqual(StarsState.Max);
      });

      fit("Should have min state", () => {
        component.items = [3, 2, 1];
        component.value = 1;
        component.ngOnInit();
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('sfc-star')).componentInstance.state).toEqual(StarsState.Min);
      });
    });
  });

  describe('Helper text', () => {
    fit("Should be empty by default", () => {
      expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit("Should have value", () => {
      const helperTextAssertValue = 'test helper text';
      component.helperText = helperTextAssertValue;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual(helperTextAssertValue);
    });
  });

  describe('Side info', () => {
    fit("Should be hidden by default", () => {
      expect(fixture.nativeElement.querySelector('.right-side-info').style.visibility).toEqual(UIClass.Hidden);
    });

    fit("Should be hidden, when counter and reset are false", () => {
      component.value = 3;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.right-side-info').style.visibility).toEqual(UIClass.Hidden);
    });

    fit("Should be hidden, when value not defined", () => {
      component.reset = true;
      component.counter = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.right-side-info').style.visibility).toEqual(UIClass.Hidden);
    });

    fit("Should be visible", () => {
      component.reset = true;
      component.counter = true;
      component.value = 3;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.right-side-info').style.visibility).toEqual(UIClass.Visible);
    });

    describe('Counter', () => {
      fit("Should not exist", () => {
        component.counter = false;
        component.value = 1;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.counter')).toBeNull();
      });

      fit("Should exist", () => {
        component.counter = true;
        component.value = 1;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.counter')).toBeTruthy();
      });

      fit("Should have default text", () => {
        component.counter = true;
        component.value = 1;
        fixture.detectChanges();

        const counterSpan = fixture.nativeElement.querySelector('div.counter span:last-child');
        expect(counterSpan.innerText).toEqual('/0');
      });

      fit("Should text reflect stars count", () => {
        component.counter = true;
        component.items = [3, 2, 1];
        component.value = 1;
        fixture.detectChanges();

        const counterSpan = fixture.nativeElement.querySelector('div.counter span:last-child');
        expect(counterSpan.innerText).toEqual('/3');
      });

      fit("Should have defined index", () => {
        component.counter = true;
        component.items = [13, 22, 31];
        component.value = 22;
        component.ngOnInit();
        fixture.detectChanges();

        const counterSpan = fixture.nativeElement.querySelector('div.counter span:first-child');
        expect(counterSpan.innerText).toEqual('2');
      });
    });

    describe('Reset', () => {
      fit("Should not exist", () => {
        component.reset = false;
        component.value = 1;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.reset')).toBeNull();
      });

      fit("Should not exist, when disabled", () => {
        component.reset = true;
        component.disabled = true;
        component.value = 1;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.reset')).toBeNull();
      });

      fit("Should exist", () => {
        component.reset = true;
        component.value = 1;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.reset')).toBeTruthy();
      });

      fit("Should have permanent text", () => {
        component.reset = true;
        component.value = 1;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.reset').innerText).toEqual('RESET');
      });

      fit("Should reset value", () => {
        component.reset = true;
        component.items = [3, 2, 1];
        component.value = 3;
        fixture.detectChanges();

        expect(component.value).toEqual(3);

        const resetButton = fixture.debugElement.query(By.css('span.reset'));
        resetButton.triggerEventHandler('click', { target: resetButton.nativeElement });
        fixture.detectChanges();

        expect(component.value).toBeNull();
      });
    });
  });
});
