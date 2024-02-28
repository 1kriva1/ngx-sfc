import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { CloseComponent, CommonConstants, ShowHideElementDirective, UIClass } from 'ngx-sfc-common';
import { InputConstants } from '../../constants/input.constants';
import { ValidationConstants } from '../../constants/validation.constants';
import { InputReferenceDirective } from '../../directives';
import { InputUIClass } from '../../enums/input-ui.enum';
import { TagsChipComponent } from './parts/chip/tags-chip.component';
import { TagsInputComponent } from './tags-input.component';
import { TagsInputConstants } from './tags-input.constants';

describe('Component: TagsInput', () => {
  let component: TagsInputComponent;
  let fixture: ComponentFixture<TagsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [CloseComponent, ShowHideElementDirective, InputReferenceDirective,
        TagsChipComponent, TagsInputComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsInputComponent);
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
      expect(fixture.nativeElement.querySelector('.tags')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('input[type=text]')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('label')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.helper-text')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.right-side-info')).toBeTruthy();
    });

    fit("Should focus text input on click event", () => {
      const containerEl = fixture.debugElement.query(By.css('.container'));
      containerEl.triggerEventHandler('click', { target: containerEl.nativeElement });
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('input[type="text"]')).toEqual(document.activeElement);
    });
  });

  describe('Has value class', () => {
    fit("Should not have hasValue class", () => {
      component.writeValue([]);
      fixture.detectChanges();

      expect(fixture.nativeElement.className).not.toContain(InputUIClass.HasValue);
    });

    fit("Should have hasValue class", () => {
      setTags();
      fixture.detectChanges();

      expect(fixture.nativeElement.className).toContain(InputUIClass.HasValue);
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

    fit("Should focus text input on click event", () => {
      component.icon = faUser;
      fixture.detectChanges();

      component.ngAfterViewInit();
      fixture.detectChanges();

      const iconEl = fixture.debugElement.query(By.css('.icon'));
      iconEl.triggerEventHandler('click', { target: iconEl.nativeElement });
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('input[type="text"]')).toEqual(document.activeElement);
    });
  });

  describe('Chips', () => {
    fit("Should not exist", () => {
      const chips = fixture.debugElement.queryAll(By.css('sfc-tags-chip'));
      expect(chips.length).toEqual(0);
    });

    fit("Should exist", () => {
      setTags();
      fixture.detectChanges();

      const chips = fixture.debugElement.queryAll(By.css('sfc-tags-chip'));
      expect(chips.length).toEqual(2);
    });

    fit("Should be disabled disabled", () => {
      component.disabled = true;
      setTags();
      fixture.detectChanges();

      fixture.debugElement.queryAll(By.css('sfc-tags-chip')).forEach(chip => {
        expect(chip.componentInstance.disabled).toBeTruthy();
      });
    });

    fit("Should have defined labels", () => {
      setTags();
      fixture.detectChanges();

      const chips = fixture.debugElement.queryAll(By.css('sfc-tags-chip'));
      for (let index = 0; index < chips.length; index++) {
        expect(chips[index].componentInstance.label).toEqual('test' + (index + 1))
      }
    });

    fit("Should remove tag", () => {
      setTags();
      fixture.detectChanges();

      const chipsBeforeRemove = fixture.debugElement.queryAll(By.css('sfc-tags-chip'));
      expect(chipsBeforeRemove.length).toEqual(2);

      const chipToRemove = chipsBeforeRemove[0].query(By.css('sfc-close'));
      chipToRemove.triggerEventHandler('click', { target: chipToRemove.nativeElement });
      fixture.detectChanges();

      const chipsAfterRemove = fixture.debugElement.queryAll(By.css('sfc-tags-chip'));
      expect(chipsAfterRemove.length).toEqual(1);
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

    fit("Should be linked to input element", () => {
      const inputEl = fixture.nativeElement.querySelector('input.text-input');
      expect(inputEl.labels).toBeDefined();
      expect(inputEl.labels.length).toEqual(1);
      expect(inputEl.labels[0].htmlFor).toEqual(inputEl.id);
    });

    fit("Should be active, when placeholder exist", () => {
      component.placeholder = 'test placeholder';
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('label').className).toEqual(UIClass.Active);
    });

    fit("Should be active, when value defined", () => {
      component.writeValue(['a']);
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('label').className).toEqual(UIClass.Active);
    });

    fit("Should be active, when input in focus", () => {
      const inputEl = fixture.debugElement.query(By.css('input'));
      inputEl.triggerEventHandler('focus', { target: inputEl.nativeElement });
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('label').className).toEqual(UIClass.Active);
    });

    fit("Should be active, when new tag has value", () => {
      const value = 'b',
        inputEl = fixture.debugElement.query(By.css('input'));
      inputEl.triggerEventHandler('input', { target: { nativeElement: inputEl.nativeElement, value: value } });
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('label').className).toEqual(UIClass.Active);
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
      expect(fixture.nativeElement.querySelector('input.text-input').value).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit("Should not be disabled", () => {
      expect(fixture.nativeElement.querySelector('input.text-input').disabled).toBeFalse();
    });

    fit("Should be disabled", () => {
      component.disabled = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('input.text-input').disabled).toBeTrue();
    });

    fit("Should add active class for label on focus event", () => {
      const inputEl = fixture.debugElement.query(By.css('input'));
      inputEl.triggerEventHandler('focus', { target: inputEl.nativeElement });
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('label').className).toEqual(UIClass.Active);
    });

    fit("Should remove active class from label on blur event", () => {
      const inputEl = fixture.debugElement.query(By.css('input'));
      inputEl.triggerEventHandler('focus', { target: inputEl.nativeElement });
      inputEl.triggerEventHandler('blur', { target: inputEl.nativeElement });
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('label').className).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit("Should change new tag value", () => {
      const value = 'trigger input event',
        inputEl = fixture.debugElement.query(By.css('input'));
      inputEl.triggerEventHandler('input', { target: { nativeElement: inputEl.nativeElement, value: value } });
      fixture.detectChanges();

      expect(component.newTagValue).toEqual(value);
    });

    fit("Should add new tag", () => {
      const assertValue = 'test value',
        inputEl = fixture.debugElement.query(By.css('input'));
      inputEl.triggerEventHandler('input', { target: { value: assertValue } });
      fixture.detectChanges();

      inputEl.triggerEventHandler('keyup.enter', { target: inputEl.nativeElement });
      fixture.detectChanges();

      const chips = fixture.debugElement.queryAll(By.css('sfc-tags-chip'));
      expect(chips.length).toEqual(1);
    });

    fit("Should hide inner validation message on blur event", () => {
      const assertValue = 'test2',
        inputEl = fixture.debugElement.query(By.css('input'));

      setTags();
      fixture.detectChanges();

      inputEl.triggerEventHandler('input', { target: { value: assertValue } });
      fixture.detectChanges();

      inputEl.triggerEventHandler('keyup.enter', { target: inputEl.nativeElement });
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual(ValidationConstants.DUPLICATE_VALIDATION[ValidationConstants.DUPLICATE_VALIDATOR_KEY]);
      expect(inputEl.nativeElement.value).toEqual(assertValue);

      inputEl.triggerEventHandler('blur', { target: { target: inputEl.nativeElement } });
      fixture.detectChanges();

      const chips = fixture.debugElement.queryAll(By.css('sfc-tags-chip'));
      expect(chips.length).toEqual(2);
      expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual(CommonConstants.EMPTY_STRING);
      expect(inputEl.nativeElement.value).toEqual(assertValue);
    });

    describe('Inner validation', () => {
      fit("Should raise validation error, when try to add empty value", () => {
        const assertValue = CommonConstants.EMPTY_STRING,
          inputEl = fixture.debugElement.query(By.css('input'));
        inputEl.triggerEventHandler('input', { target: { value: assertValue } });
        fixture.detectChanges();

        inputEl.triggerEventHandler('keyup.enter', { target: inputEl.nativeElement });
        fixture.detectChanges();

        const chips = fixture.debugElement.queryAll(By.css('sfc-tags-chip'));
        expect(chips.length).toEqual(0);
        expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual(ValidationConstants.EMPTY_VALIDATION[ValidationConstants.EMPTY_VALIDATOR_KEY]);
      });

      fit("Should raise validation error, when try to add duplicate value", () => {
        const assertValue = 'test1',
          inputEl = fixture.debugElement.query(By.css('input'));
        inputEl.triggerEventHandler('input', { target: { value: assertValue } });
        fixture.detectChanges();

        inputEl.triggerEventHandler('keyup.enter', { target: inputEl.nativeElement });
        fixture.detectChanges();

        inputEl.triggerEventHandler('input', { target: { value: assertValue } });
        fixture.detectChanges();

        inputEl.triggerEventHandler('keyup.enter', { target: inputEl.nativeElement });
        fixture.detectChanges();

        const chips = fixture.debugElement.queryAll(By.css('sfc-tags-chip'));
        expect(chips.length).toEqual(1);
        expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual(ValidationConstants.DUPLICATE_VALIDATION[ValidationConstants.DUPLICATE_VALIDATOR_KEY]);
        expect(inputEl.nativeElement.value).toEqual(assertValue);
      });

      fit("Should raise validation error, when try to add duplicate value(extra spaces)", () => {
        const assertValue = 'test1',
          extraSpacesValue = assertValue + '   ',
          inputEl = fixture.debugElement.query(By.css('input'));

        inputEl.triggerEventHandler('input', { target: { value: assertValue } });
        fixture.detectChanges();

        inputEl.triggerEventHandler('keyup.enter', { target: inputEl.nativeElement });
        fixture.detectChanges();

        inputEl.triggerEventHandler('input', { target: { value: extraSpacesValue } });
        fixture.detectChanges();

        inputEl.triggerEventHandler('keyup.enter', { target: inputEl.nativeElement });
        fixture.detectChanges();

        const chips = fixture.debugElement.queryAll(By.css('sfc-tags-chip'));
        expect(chips.length).toEqual(1);
        expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual(ValidationConstants.DUPLICATE_VALIDATION[ValidationConstants.DUPLICATE_VALIDATOR_KEY]);
        expect(inputEl.nativeElement.value).toEqual(extraSpacesValue);
      });

      fit("Should raise validation error, when try to add empty and than duplicate value", () => {
        const assertValue = 'test1',
          inputEl = fixture.debugElement.query(By.css('input'));

        setTags();
        fixture.detectChanges();

        inputEl.triggerEventHandler('input', { target: { value: '' } });
        fixture.detectChanges();

        inputEl.triggerEventHandler('keyup.enter', { target: inputEl.nativeElement });
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual(ValidationConstants.EMPTY_VALIDATION[ValidationConstants.EMPTY_VALIDATOR_KEY]);
        expect(inputEl.nativeElement.value).toEqual('');

        inputEl.triggerEventHandler('input', { target: { value: assertValue } });
        fixture.detectChanges();

        inputEl.triggerEventHandler('keyup.enter', { target: inputEl.nativeElement });
        fixture.detectChanges();

        const chips = fixture.debugElement.queryAll(By.css('sfc-tags-chip'));
        expect(chips.length).toEqual(2);
        expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual(ValidationConstants.DUPLICATE_VALIDATION[ValidationConstants.DUPLICATE_VALIDATOR_KEY]);
        expect(inputEl.nativeElement.value).toEqual(assertValue);
      });

      fit("Should raise validation error, when try to add value that exceed max length", () => {
        component.maxTagLength = 4;
        fixture.detectChanges();

        const assertValue = 'test1',
          inputEl = fixture.debugElement.query(By.css('input'));

        inputEl.triggerEventHandler('input', { target: { value: assertValue } });
        fixture.detectChanges();

        inputEl.triggerEventHandler('keyup.enter', { target: inputEl.nativeElement });
        fixture.detectChanges();

        const chips = fixture.debugElement.queryAll(By.css('sfc-tags-chip'));
        expect(chips.length).toEqual(0);
        expect(fixture.nativeElement.querySelector('span.helper-text').innerText)
          .toEqual(TagsInputConstants.LENGTH_VALIDATION(component.maxTagLength, component.minTagLength)[TagsInputConstants.LENGTH_VALIDATOR_KEY]);
      });

      fit("Should raise validation error, when try to add value that not fit limits", () => {
        component.maxTagLength = 4;
        component.minTagLength = 1;
        fixture.detectChanges();

        const assertValue = 'test1',
          inputEl = fixture.debugElement.query(By.css('input'));

        inputEl.triggerEventHandler('input', { target: { value: assertValue } });
        fixture.detectChanges();

        inputEl.triggerEventHandler('keyup.enter', { target: inputEl.nativeElement });
        fixture.detectChanges();

        const chips = fixture.debugElement.queryAll(By.css('sfc-tags-chip'));
        expect(chips.length).toEqual(0);
        expect(fixture.nativeElement.querySelector('span.helper-text').innerText)
          .toEqual(TagsInputConstants.LENGTH_VALIDATION(component.maxTagLength, component.minTagLength)[TagsInputConstants.LENGTH_VALIDATOR_KEY]);
      });

      fit("Should raise validation error, when try to add value that less than min length", () => {
        component.minTagLength = 4;
        fixture.detectChanges();

        const assertValue = 'tes',
          inputEl = fixture.debugElement.query(By.css('input'));

        inputEl.triggerEventHandler('input', { target: { value: assertValue } });
        fixture.detectChanges();

        inputEl.triggerEventHandler('keyup.enter', { target: inputEl.nativeElement });
        fixture.detectChanges();

        const chips = fixture.debugElement.queryAll(By.css('sfc-tags-chip'));
        expect(chips.length).toEqual(0);
        expect(fixture.nativeElement.querySelector('span.helper-text').innerText)
          .toEqual(TagsInputConstants.LENGTH_VALIDATION(component.maxTagLength, component.minTagLength)[TagsInputConstants.LENGTH_VALIDATOR_KEY]);
      });

      fit("Should bew valid, when try to add empty and than valid value", () => {
        const assertValue = 'test3',
          inputEl = fixture.debugElement.query(By.css('input'));

        setTags();
        fixture.detectChanges();

        inputEl.triggerEventHandler('input', { target: { value: '' } });
        fixture.detectChanges();

        inputEl.triggerEventHandler('keyup.enter', { target: inputEl.nativeElement });
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual(ValidationConstants.EMPTY_VALIDATION[ValidationConstants.EMPTY_VALIDATOR_KEY]);
        expect(inputEl.nativeElement.value).toEqual('');

        inputEl.triggerEventHandler('input', { target: { value: assertValue } });
        fixture.detectChanges();

        inputEl.triggerEventHandler('keyup.enter', { target: inputEl.nativeElement });
        fixture.detectChanges();

        const chips = fixture.debugElement.queryAll(By.css('sfc-tags-chip'));
        expect(chips.length).toEqual(3);
        expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual('');
        expect(inputEl.nativeElement.value).toEqual('');
      });
    });
  });

  describe('Placeholder', () => {
    fit("Should be empty by default", () => {
      const inputEl = fixture.nativeElement.querySelector('input');
      expect(inputEl.placeholder).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit("Should have value", () => {
      const placeholderAssertValue = "test placeholder",
        inputEl = fixture.nativeElement.querySelector('input');
      component.placeholder = placeholderAssertValue;
      fixture.detectChanges();

      expect(inputEl.placeholder).toEqual(placeholderAssertValue);
    });

    fit("Should show default new tag placeholder", () => {
      setTags();
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('input'));

      expect(inputEl.nativeElement.placeholder).toEqual(TagsInputConstants.DEFAULT_NEW_TAG_PLACEHOLDER);
    });

    fit("Should show defined new tag placeholder", () => {
      setTags();
      component.newTagPlaceholder = 'test new tag';
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('input'));

      expect(inputEl.nativeElement.placeholder).toEqual(component.newTagPlaceholder);
    });

    fit("Should not show new tag placeholder", () => {
      setTags();
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('input'));

      inputEl.triggerEventHandler('focus', { target: inputEl.nativeElement });
      fixture.detectChanges();

      expect(inputEl.nativeElement.placeholder).toEqual(CommonConstants.EMPTY_STRING);
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

  describe('Characters counter', () => {
    fit("Should be hidden", () => {
      expect(fixture.nativeElement.querySelector('span.right-side-info').style.visibility).toEqual(UIClass.Hidden);
    });

    fit("Should be visible", () => {
      component.innerErrors = { 'sfc-min-array-length': { requiredLength: 10 } };
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('span.right-side-info').style.visibility).toEqual(UIClass.Visible);
    });

    fit("Should have relevant text", () => {
      component.innerErrors = { 'sfc-max-array-length': { requiredLength: 10 } };
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('span.right-side-info').innerText).toEqual('0/10');
    });
  });

  function setTags() {
    const value = ['test1', 'test2'];
    component.writeValue(value);
    component.ngOnInit();
  }
});
