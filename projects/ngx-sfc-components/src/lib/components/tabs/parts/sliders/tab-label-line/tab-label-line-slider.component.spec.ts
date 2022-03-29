import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TabLabelLineSliderComponent } from './tab-label-line-slider.component';

describe('Component: TabLabelLineSliderComponent', () => {
  let component: TabLabelLineSliderComponent;
  let fixture: ComponentFixture<TabLabelLineSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabLabelLineSliderComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabLabelLineSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create component', () => {
      expect(component).toBeTruthy();
    });

    fit('Should create main elements', () => {
      expect(fixture.nativeElement.querySelector('div.slider')).toBeTruthy();
    });
  });

  describe('Styles', () => {
    fit('Should have default styles', () => {      
      let sliderEl = fixture.debugElement.query(By.css('div.slider'));

      expect(sliderEl.styles['left']).toEqual('calc(0%)');
      expect(sliderEl.styles['width']).toEqual('calc(100%)');
    });

    fit('Should have defined styles', () => {
      component.count = 10;
      component.index = 2;
      fixture.detectChanges();

      let sliderEl = fixture.debugElement.query(By.css('div.slider'));

      expect(sliderEl.styles['left']).toEqual('calc(20%)');
      expect(sliderEl.styles['width']).toEqual('calc(10%)');
    });
  });
});
