import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UIClass } from 'ngx-sfc-common';
import { CommonConstants } from 'ngx-sfc-common';
import { CloseComponent } from 'ngx-sfc-common';
import { TagsChipComponent } from './tags-chip.component';

describe('Component: TagsChip', () => {
  let component: TagsChipComponent;
  let fixture: ComponentFixture<TagsChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [CloseComponent, TagsChipComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create an instance', () => {
      expect(component).toBeTruthy();
    });

    fit('Should have main elements', () => {
      expect(fixture.nativeElement.querySelector('.container')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('span')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('sfc-close')).toBeTruthy();
    });
  });

  describe('Image', () => {
    fit("Should not exist", () => {
      expect(fixture.nativeElement.querySelector('img')).toBeNull();
    });

    fit("Should exist", () => {
      component.imageSrc = 'test-image';
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('img')).toBeDefined();
    });

    fit("Should have defined src value", () => {
      component.imageSrc = 'test-image';
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('img').attributes['src'].value).toEqual(component.imageSrc);
    });
  });

  describe('Label', () => {
    fit("Display value: default value", () => {
      expect(fixture.debugElement.query(By.css('span')).nativeElement.innerText).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit("Display value: should has value", () => {
      component.label = 'test value';
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('span')).nativeElement.innerText).toEqual(component.label);
    });
  });

  describe('Disabled', () => {
    fit("Should not be disabled", () => {
      expect(fixture.nativeElement.className).not.toContain(UIClass.Disabled);
    });

    fit("Should be disabled", () => {
      component.disabled = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.className).toContain(UIClass.Disabled);
    });
  });

  describe('Remove', () => {
    fit("Should emit remove event", () => {
      spyOn(component.remove, 'emit');

      const removeBtn = fixture.debugElement.query(By.css('sfc-close'));
      removeBtn.triggerEventHandler('click', { target: removeBtn.nativeElement });
      fixture.detectChanges();

      expect(component.remove.emit).toHaveBeenCalled();
    });

    fit("Should emit right value in event", () => {
      spyOn(component.remove, 'emit');
      component.label = 'test value';
      fixture.detectChanges();

      const removeBtn = fixture.debugElement.query(By.css('sfc-close'));
      removeBtn.triggerEventHandler('click', { target: removeBtn.nativeElement });
      fixture.detectChanges();

      expect(component.remove.emit).toHaveBeenCalledWith(component.label);
    });
  });
});
