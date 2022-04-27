import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { getCssLikeValue } from 'ngx-sfc-common';
import { of } from 'rxjs';
import { SliderButtonType } from './parts/button/slider-button-type.enum';
import { SliderButtonComponent } from './parts/button/slider-button.component';
import { SliderItemComponent } from './parts/item/slider-item.component';
import { SliderPaginationComponent } from './parts/pagination/slider-pagination.component';
import { SliderAutomaticService } from './service/automatic/slider-automatic.service';
import { SliderMoveType } from './service/slider/slider-move-type.enum';
import { SliderService } from './service/slider/slider.service';
import { SliderType } from './slider-type.enum';
import { SliderComponent } from './slider.component';

describe('Component: SliderComponent', () => {
  let component: SliderComponent;
  let fixture: ComponentFixture<SliderComponent>;
  let sliderServiceSpy: jasmine.SpyObj<SliderService>;
  let sliderAutomaticServiceSpy: jasmine.SpyObj<SliderAutomaticService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SliderButtonComponent, SliderItemComponent, SliderPaginationComponent, SliderComponent],

    }).compileComponents();

    sliderServiceSpy = jasmine.createSpyObj('SliderService', ['move', 'select', 'init']);
    sliderServiceSpy.model$ = of({ index: 0, count: 0 });
    sliderAutomaticServiceSpy = jasmine.createSpyObj('SliderAutomaticService', ['start', 'toggle', 'stop']);

    TestBed.overrideComponent(SliderComponent, {
      set: {
        providers: [
          { provide: SliderService, useValue: sliderServiceSpy },
          { provide: SliderAutomaticService, useValue: sliderAutomaticServiceSpy }
        ]
      }
    })
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create component', () => {
      expect(component).toBeTruthy();
    });

    fit('Should create main elements', () => {
      expect(fixture.nativeElement.querySelector('div.container')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.slider')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('ul')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.buttons')).toBeTruthy();
      expect(fixture.nativeElement.querySelectorAll('div.buttons sfc-slider-button').length).toEqual(2);
      expect(fixture.nativeElement.querySelector('div.actions')).toBeTruthy();
    });

    fit('Should have default styles for items container', () => {
      component.ngAfterViewInit();
      fixture.detectChanges();

      const itemsContainerEl = fixture.debugElement.query(By.css('ul'));

      expect(itemsContainerEl.styles['width']).toEqual(getCssLikeValue(0));

      expect(itemsContainerEl.styles['left']).toEqual(getCssLikeValue(0));
    });

    fit('Should have styles related to items count and index', () => {
      sliderServiceSpy.model$ = of({ index: 1, count: 2 });
      fixture.detectChanges();

      component.ngAfterViewInit();
      fixture.detectChanges();

      const itemsContainerEl = fixture.debugElement.query(By.css('ul'));

      expect(itemsContainerEl.styles['width']).toEqual(getCssLikeValue(1200));

      expect(itemsContainerEl.styles['left']).toEqual(getCssLikeValue(-600));
    });

    fit('Should call init method of Slider service', () => {
      expect(sliderServiceSpy.init).toHaveBeenCalledTimes(1);
    });

    fit('Should not call start method of AutomaticSlider service', () => {
      expect(sliderAutomaticServiceSpy.start).not.toHaveBeenCalled();
    });
  });

  describe('Items', () => {
    fit('Should not have any items by default', () => {
      expect(fixture.nativeElement.querySelectorAll('sfc-slider-item').length).toEqual(0);
    });

    fit('Should have defined items', () => {
      component.items = [{ imageSrc: '/testImage1.png' }, { imageSrc: '/testImage2.png' }];
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('sfc-slider-item').length).toEqual(2);
    });

    fit('Should have defined model value', () => {
      component.items = [{ imageSrc: '/testImage1.png' }, { imageSrc: '/testImage2.png' }];
      fixture.detectChanges();

      const items = fixture.debugElement.queryAll(By.css('sfc-slider-item'));

      items.forEach((item, index) => {
        expect(item.componentInstance.model).toEqual(component.items[index]);
      });
    });
  });

  describe('Buttons', () => {
    fit('Should have defined input values by default', () => {
      const buttonELts = fixture.debugElement.queryAll(By.css('sfc-slider-button'));

      buttonELts.forEach((button, index) => {
        expect(button.componentInstance.active).toBeFalse();
        expect(button.componentInstance.type).toEqual(index === 0 ? SliderButtonType.Next : SliderButtonType.Previous);
      });
    });

    fit('Should change active state on mouse enter/leave', () => {
      fixture.debugElement.nativeElement
        .dispatchEvent(new MouseEvent('mouseenter'));
      fixture.detectChanges();

      const buttonELts = fixture.debugElement.queryAll(By.css('sfc-slider-button'));

      buttonELts.forEach(button => {
        expect(button.componentInstance.active).toBeTrue();
      });

      fixture.debugElement.nativeElement
        .dispatchEvent(new MouseEvent('mouseleave'));
      fixture.detectChanges();

      const buttonAfterELts = fixture.debugElement.queryAll(By.css('sfc-slider-button'));

      buttonAfterELts.forEach(button => {
        expect(button.componentInstance.active).toBeFalse();
      });
    });

    fit('Should call move method of Slider service for next', () => {
      fixture.debugElement.queryAll(By.css('sfc-slider-button'))[0].nativeElement
        .dispatchEvent(new MouseEvent('click'));

      expect(sliderServiceSpy.move).toHaveBeenCalledOnceWith(SliderMoveType.Next);
    });

    fit('Should call move method of Slider service for previous', () => {
      fixture.debugElement.queryAll(By.css('sfc-slider-button'))[1].nativeElement
        .dispatchEvent(new MouseEvent('click'));

      expect(sliderServiceSpy.move).toHaveBeenCalledOnceWith(SliderMoveType.Previous);
    });
  });

  describe('Counter', () => {
    fit('Should exist by default', () => {
      expect(fixture.nativeElement.querySelector('div.counter')).toBeTruthy();
    });

    fit('Should not exist', () => {
      component.showCount = false;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.counter')).toBeNull();
    });

    fit('Should have default value', () => {
      expect(fixture.nativeElement.querySelector('div.counter').innerText).toEqual('0 / 0');
    });

    fit('Should have defined value', () => {
      sliderServiceSpy.model$ = of({ index: 0, count: 2 });
      fixture.detectChanges();

      component.ngAfterViewInit();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.counter').innerText).toEqual('1 / 2');
    });
  });

  describe('Pagination', () => {
    fit('Should exist by default', () => {
      expect(fixture.nativeElement.querySelector('sfc-slider-pagination')).toBeTruthy();
    });

    fit('Should not exist', () => {
      component.pagination = false;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('sfc-slider-pagination')).toBeNull();
    });

    fit('Should have ralated input values', () => {
      sliderServiceSpy.model$ = of({ index: 1, count: 2 });
      fixture.detectChanges();

      component.ngAfterViewInit();
      fixture.detectChanges();

      const paginationEl = fixture.debugElement.query(By.css('sfc-slider-pagination'));

      expect(paginationEl.componentInstance.index).toEqual(1);
      expect(paginationEl.componentInstance.count).toEqual(2);
    });

    fit('Should call select method of Slider service', () => {
      sliderServiceSpy.model$ = of({ index: 0, count: 2 });
      fixture.detectChanges();

      component.ngAfterViewInit();
      fixture.detectChanges();

      fixture.debugElement.queryAll(By.css('sfc-slider-pagination li'))[1].nativeElement
        .dispatchEvent(new MouseEvent('click'));

      expect(sliderServiceSpy.select).toHaveBeenCalledOnceWith(1);
    });
  });

  describe('Automatic', () => {
    fit('Should not exist container by default', () => {
      expect(fixture.nativeElement.querySelector('div.automatic')).toBeNull();
    });

    fit('Should exist container', () => {
      component.type = SliderType.Automatic;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.automatic')).toBeTruthy();
    });

    fit('Should have pause icon', () => {
      component.type = SliderType.Automatic;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.automatic i.fas.fa-pause-circle')).toBeTruthy();
    });

    fit('Should have play icon', () => {
      component.type = SliderType.Automatic;
      sliderAutomaticServiceSpy.pause = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.automatic i.fas.fa-play-circle')).toBeTruthy();
    });

    fit('Should call toggle method of AutomaticSlider service', () => {
      component.type = SliderType.Automatic;
      fixture.detectChanges();

      fixture.debugElement.query(By.css('div.automatic')).nativeElement
        .dispatchEvent(new MouseEvent('click'));

      expect(sliderAutomaticServiceSpy.toggle).toHaveBeenCalledTimes(1);
    });

    fit('Should call stop method of AutomaticSlider service', () => {
      component.type = SliderType.Automatic;
      fixture.detectChanges();

      fixture.debugElement.nativeElement
        .dispatchEvent(new MouseEvent('mouseenter'));
      fixture.detectChanges();

      expect(sliderAutomaticServiceSpy.stop).toHaveBeenCalledTimes(1);
    });    

    fit('Should call start method of AutomaticSlider service', () => {
      component.type = SliderType.Automatic;
      fixture.detectChanges();

      fixture.debugElement.nativeElement
        .dispatchEvent(new MouseEvent('mouseleave'));
      fixture.detectChanges();

      expect(sliderAutomaticServiceSpy.start).toHaveBeenCalledTimes(1);
    });

    fit('Should call start method of AutomaticSlider service on init', () => {
      component.type = SliderType.Automatic;
      component.ngAfterViewInit();

      expect(sliderAutomaticServiceSpy.start).toHaveBeenCalledTimes(1);
    });

    fit('Should not call start method of AutomaticSlider service', () => {
      component.type = SliderType.Automatic;
      sliderAutomaticServiceSpy.pause = true;
      fixture.detectChanges();

      fixture.debugElement.nativeElement
        .dispatchEvent(new MouseEvent('mouseleave'));
      fixture.detectChanges();

      expect(sliderAutomaticServiceSpy.start).not.toHaveBeenCalled();
    });
  });
});
