import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { CommonConstants, UIClass } from 'ngx-sfc-common';
import { InputConstants } from '../../constants/input.constants';
import { InputReferenceDirective } from '../../directives/reference/input-reference.directive';
import { BubblesInputComponent } from './bubbles-input.component';
import { BubbleComponent } from './parts/bubble/bubble.component';

describe('Component: BubblesInput', () => {
  let component: BubblesInputComponent;
  let fixture: ComponentFixture<BubblesInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [BubbleComponent, InputReferenceDirective, BubblesInputComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BubblesInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create an instance', () => {
      expect(component).toBeTruthy();
    });

    fit('Should have main elements', () => {
      expect(fixture.nativeElement.querySelector('.container')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.content')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.component')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.bubbles')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('input[type=text]')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.helper-text')).toBeTruthy();
    });
  });

  describe('Bubbles', () => {
    fit("Should not exist", () => {
      expect(fixture.debugElement.queryAll(By.css('sfc-bubble')).length).toEqual(0);
    });

    fit("Should exist", () => {
      setBubbles();

      expect(fixture.debugElement.queryAll(By.css('sfc-bubble')).length).toEqual(2);
    });

    fit("Should have defined model", () => {
      setBubbles();

      fixture.debugElement.queryAll(By.css('sfc-bubble')).forEach((bubble, index) => {
        expect(bubble.componentInstance.model).toEqual({
          ...component.items[index],
          active: false,
          disabled: false,
          icon: undefined,
          imageSrc: undefined
        });
      });
    });

    fit("Should check bubble", () => {
      setBubbles();

      const bubbles = fixture.debugElement.queryAll(By.css('sfc-bubble'));
      expect(fixture.debugElement.queryAll(By.css(`sfc-bubble.${UIClass.Active}`)).length)
        .toEqual(0);

      const secondBubbleEl = bubbles[1];
      secondBubbleEl.triggerEventHandler('click', { target: secondBubbleEl.nativeElement });
      fixture.detectChanges();

      expect(fixture.debugElement.queryAll(By.css(`sfc-bubble.${UIClass.Active}`)).length)
        .toEqual(1);
      expect(secondBubbleEl.componentInstance.model.active).toBeTrue();
    });

    fit("Should uncheck bubble", () => {
      setBubbles();

      toggleBubbles();

      const bubbles = fixture.debugElement.queryAll(By.css('sfc-bubble'));
      expect(fixture.debugElement.queryAll(By.css(`sfc-bubble.${UIClass.Active}`)).length)
        .toEqual(2);

      const secondBubbleEl = bubbles[1];

      expect(secondBubbleEl.componentInstance.model.active).toBeTrue();

      secondBubbleEl.triggerEventHandler('click', { target: secondBubbleEl.nativeElement });
      fixture.detectChanges();

      expect(fixture.debugElement.queryAll(By.css(`sfc-bubble.${UIClass.Active}`)).length)
        .toEqual(1);
      expect(secondBubbleEl.componentInstance.model.active).toBeFalse();
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
  });

  describe('Label', () => {
    fit("Should not exist", () => {
      expect(fixture.nativeElement.querySelector('label')).toBeNull();
    });

    fit("Should exist", () => {
      const labelAssertValue = 'test label';
      component.label = labelAssertValue;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('label')).toBeTruthy();
    });

    fit("Should have defined value", () => {
      const labelAssertValue = 'test label';
      component.label = labelAssertValue;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('label').innerText).toEqual(labelAssertValue);
    });

    fit("Should be linked to input element", () => {
      component.label = 'Test label';
      fixture.detectChanges();

      const inputEl = fixture.nativeElement.querySelector('input');
      expect(inputEl.labels).toBeDefined();
      expect(inputEl.labels.length).toEqual(1);
      expect(inputEl.labels[0].htmlFor).toEqual(inputEl.id);
    });

    fit("Should check all bubbles on click", () => {
      const labelAssertValue = 'test label';
      component.label = labelAssertValue;

      setBubbles();

      expect(component.value).toEqual([]);
      expect(fixture.debugElement.queryAll(By.css(`sfc-bubble.${UIClass.Active}`)).length)
        .toEqual(0);

      const labelEl = fixture.debugElement.query(By.css('label'));
      labelEl.triggerEventHandler('click', { target: labelEl.nativeElement });
      fixture.detectChanges();

      expect(fixture.debugElement.queryAll(By.css(`sfc-bubble.${UIClass.Active}`)).length)
        .toEqual(2);
      expect(component.value).toEqual([1, 2]);
    });

    fit("Should uncheck all bubbles on click", () => {
      const labelAssertValue = 'test label';
      component.label = labelAssertValue;

      setBubbles();

      toggleBubbles();

      expect(fixture.debugElement.queryAll(By.css(`sfc-bubble.${UIClass.Active}`)).length)
        .toEqual(2);

      const labelEl = fixture.debugElement.query(By.css('label'));
      labelEl.triggerEventHandler('click', { target: labelEl.nativeElement });
      fixture.detectChanges();

      expect(fixture.debugElement.queryAll(By.css(`sfc-bubble.${UIClass.Active}`)).length)
        .toEqual(0);
      expect(component.value).toEqual([]);
    });
  });

  describe('Input', () => {
    fit("Should have default id value", () => {
      expect(fixture.debugElement.query(By.css('input')).nativeElement.id).toEqual(`${InputConstants.ID_PREFIX}undefined`);
    });

    fit("Should have defined id value", () => {
      component.id = 'test-id';
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('input')).nativeElement.id).toEqual(`${InputConstants.ID_PREFIX}test-id`);
    });

    fit("Should have default value", () => {
      expect(fixture.nativeElement.querySelector('input').value).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit("Should not be disabled", () => {
      expect(fixture.nativeElement.querySelector('input').disabled).toBeFalse();
    });

    fit("Should be disabled", () => {
      component.disabled = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('input').disabled).toBeTrue();
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

  function setBubbles(): void {
    component.items = [
      { key: 1, label: 'Test1' },
      { key: 2, label: 'Test2' }
    ];
    component.ngOnInit();
    fixture.detectChanges();
  }

  function toggleBubbles(): void {
    fixture.debugElement.queryAll(By.css('sfc-bubble')).forEach(bubble => {
      bubble.triggerEventHandler('click', { target: bubble.nativeElement });
      fixture.detectChanges();
    });
  }
});
