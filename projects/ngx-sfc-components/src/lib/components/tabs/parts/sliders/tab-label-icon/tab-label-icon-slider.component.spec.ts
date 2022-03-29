import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TabLabelIconSliderComponent } from './tab-label-icon-slider.component';

describe('Component: TabLabelIconSliderComponent', () => {
  let component: TabLabelIconSliderComponent;
  let fixture: ComponentFixture<TabLabelIconSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabLabelIconSliderComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabLabelIconSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create component', () => {
      expect(component).toBeTruthy();
    });

    fit('Should create main elements', () => {
      expect(fixture.nativeElement.querySelector('div.slider')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.slider > div.indicator')).toBeTruthy();
    });
  });

  describe('Styles', () => {
    fit('Should have default styles', () => {
      let sliderEl = fixture.debugElement.query(By.css('div.slider'));

      expect(sliderEl.styles['transform']).toEqual('translateX(0%)');
      expect(sliderEl.styles['width']).toEqual('calc(100%)');
    });

    fit('Should have defined styles', () => {
      component.count = 10;
      component.index = 2;
      fixture.detectChanges();

      let sliderEl = fixture.debugElement.query(By.css('div.slider'));

      expect(sliderEl.styles['transform']).toEqual('translateX(200%)');
      expect(sliderEl.styles['width']).toEqual('calc(10%)');
    });
  });
});
