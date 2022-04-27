import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UIClass } from 'ngx-sfc-common';
import { SliderPaginationComponent } from './slider-pagination.component';

describe('Component: SliderPaginationComponent', () => {
  let component: SliderPaginationComponent;
  let fixture: ComponentFixture<SliderPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SliderPaginationComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create component', () => {
      expect(component).toBeTruthy();
    });

    fit('Should create main elements', () => {
      expect(fixture.nativeElement.querySelector('ul')).toBeTruthy();
    });

    fit('Should have default values', () => {
      expect(component.count).toEqual(0);
      expect(component.index).toEqual(0);
      expect(component.items.length).toEqual(0);
    });

    fit('Should have defined items count', () => {
      component.count = 10;
      fixture.detectChanges();

      expect(component.items.length).toEqual(component.count);
      expect(fixture.nativeElement.querySelectorAll('li').length).toEqual(component.count);
    });
  });

  describe('Dot', () => {
    fit('Should not have active class', () => {
      component.count = 2;
      component.index = 1;
      fixture.detectChanges();
      
      expect(fixture.nativeElement.querySelectorAll('li')[0].className).not.toContain(UIClass.Active);
    });

    fit('Should have active class', () => {
      component.count = 2;
      component.index = 0;
      fixture.detectChanges();
      
      expect(fixture.nativeElement.querySelectorAll('li')[0].className).toContain(UIClass.Active);
    });

    fit('Should emit selected event', () => {
      spyOn(component.selected, 'emit');
      component.count = 2;
      fixture.detectChanges();

      fixture.nativeElement.querySelectorAll('li')[1].dispatchEvent(new MouseEvent('click'));

      expect(component.selected.emit).toHaveBeenCalledOnceWith(1);
    });
  });
});
