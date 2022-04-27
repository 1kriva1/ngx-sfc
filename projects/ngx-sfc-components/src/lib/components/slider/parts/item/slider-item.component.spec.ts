import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonConstants } from 'ngx-sfc-common';
import { SliderItemComponent } from './slider-item.component';

describe('Component: SliderItemComponent', () => {
  let component: SliderItemComponent;
  let fixture: ComponentFixture<SliderItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SliderItemComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create component', () => {
      expect(component).toBeTruthy();
    });

    fit('Should create main elements', () => {
      expect(fixture.nativeElement.querySelector('li')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('li div')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('li div h2')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('li div span')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('li img')).toBeTruthy();
    });

    fit('Should have default model', () => {
      expect(component.model).toEqual({ imageSrc: CommonConstants.EMPTY_STRING });
    });
  });

  describe('Data', () => {
    fit('Should have defined title', () => {
      component.model.title = 'Test title';
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('li div h2').innerText).toEqual(component.model.title.toUpperCase());
    });

    fit('Should have defined sub-title', () => {
      component.model.subTitle = 'Test sub title';
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('li div span').innerText).toEqual(component.model.subTitle);
    });

    fit('Should have defined image', () => {
      component.model.imageSrc = '/testImage.png';
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('li img').src).toContain(component.model.imageSrc);
    });
  });
});
