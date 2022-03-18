import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MediaLimits, Position, UIClass } from '../../enums';
import { ResizeService, WINDOW } from '../../services';
import { TooltipType } from './tooltip-type.enum';
import { TooltipComponent } from './tooltip.component';

@Component({
  template: `<span [sfc-tooltip]='value' 
                   [tooltipType]='type' 
                   [tooltipPosition]='position' 
                   [tooltipShow]='show'>
                  test content
             </span>`
})
class TestTooltipComponent {

  @ViewChild(TooltipComponent, { static: false })
  tooltipComponent?: TooltipComponent;

  value?: string;

  type: TooltipType = TooltipType.Hover;

  position: Position = Position.Top;

  show: boolean = false;
}

describe('Component: TooltipComponent', () => {
  let component: TestTooltipComponent;
  let fixture: ComponentFixture<TestTooltipComponent>;
  let tooltipEl: DebugElement;
  let windowMock: any = <any>{};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TooltipComponent, TestTooltipComponent],
      providers: [
        ResizeService,
        { provide: WINDOW, useFactory: (() => { return windowMock; }) }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTooltipComponent);
    component = fixture.componentInstance;
    windowMock.innerWidth = MediaLimits.Laptop;
    tooltipEl = fixture.debugElement.query(By.css('span'));
    fixture.detectChanges();
  });

  describe('General', () => {
    fit("Should call unsubscribe on resize observable, when component destroyed", () => {
      const unsubscribeSpy = spyOn(
        (component.tooltipComponent as any)._resizeSubscription,
        'unsubscribe'
      ).and.callThrough();

      component.tooltipComponent?.ngOnDestroy();

      expect(unsubscribeSpy).toHaveBeenCalled();
    });
  });

  describe('Value', () => {
    fit('Should not have value, as value not defined', () => {
      expect(getTooltipContent()).toEqual('none');
    });

    fit('Should not have defined value, as tooltip not hovered', () => {
      component.value = 'test tooltip';
      fixture.detectChanges();

      expect(getTooltipContent()).toEqual('none');
    });

    fit('Should have defined value, as tooltip hovered', () => {
      component.value = 'test tooltip';
      component.show = true;
      fixture.detectChanges();

      expect(getTooltipContent()).toEqual('"' + component.value + '"');
    });
  });

  describe('Visibility', () => {
    fit('Should be hidden', () => {
      expect(getTooltipContent('visibility')).toEqual(UIClass.Hidden);
    });

    fit('Should be visible, when hovered', () => {
      component.show = true;
      fixture.detectChanges();

      expect(getTooltipContent('visibility')).toEqual(UIClass.Visible);
    });

    fit('Should be visible, when clicked', () => {
      component.type = TooltipType.Click;
      fixture.detectChanges();

      tooltipEl.triggerEventHandler('click', { target: tooltipEl.nativeElement });
      fixture.detectChanges();

      expect(getTooltipContent('visibility')).toEqual(UIClass.Visible);
    });

    fit('Should toggle visibility on click events', () => {
      component.type = TooltipType.Click;
      fixture.detectChanges();

      expect(getTooltipContent('visibility')).toEqual(UIClass.Hidden);

      tooltipEl.triggerEventHandler('click', { target: tooltipEl.nativeElement });
      fixture.detectChanges();

      expect(getTooltipContent('visibility')).toEqual(UIClass.Visible);

      tooltipEl.triggerEventHandler('click', { target: tooltipEl.nativeElement });
      fixture.detectChanges();

      expect(getTooltipContent('visibility')).toEqual(UIClass.Hidden);
    });
  });

  describe('Position', () => {
    fit("Should have default value", () => {
      expect(component.tooltipComponent?.tooltipPosition).toEqual(Position.Top);
    });

    fit("Should have defined value", () => {
      component.position = Position.Bottom;
      fixture.detectChanges();

      expect(component.tooltipComponent?.tooltipPosition).toEqual(Position.Bottom);
    });

    fit("Should have default value, when window size is less or equal Tablet limit", () => {
      component.position = Position.Right;
      fixture.detectChanges();

      component.tooltipComponent?.ngOnInit();
      fixture.detectChanges();

      windowMock.innerWidth = MediaLimits.Tablet;
      component.tooltipComponent?.ngAfterContentInit();
      fixture.detectChanges();

      expect(component.tooltipComponent?.tooltipPosition).toEqual(Position.Bottom);
    });

    fit("Should have initial value after size become more than Tablet limit", () => {
      component.position = Position.Right;
      fixture.detectChanges();

      component.tooltipComponent?.ngOnInit();
      fixture.detectChanges();

      windowMock.innerWidth = MediaLimits.Phone;
      component.tooltipComponent?.ngAfterContentInit();
      fixture.detectChanges();

      windowMock.innerWidth = MediaLimits.Laptop;
      component.tooltipComponent?.ngAfterContentInit();
      fixture.detectChanges();

      expect(component.tooltipComponent?.tooltipPosition).toEqual(Position.Right);
    });
  });

  describe('Type', () => {
    fit("Should have default value", () => {
      expect(component.tooltipComponent?.tooltipType).toEqual(TooltipType.Hover);
    });

    fit("Should have defined value", () => {
      component.type = TooltipType.Click;
      fixture.detectChanges();

      expect(component.tooltipComponent?.tooltipType).toEqual(TooltipType.Click);
    });
  });

  describe('Show', () => {
    fit("Should not have show class", () => {
      expect(tooltipEl.nativeElement.className).not.toContain('show');
    });

    fit("Should have show class", () => {
      component.show = true;
      fixture.detectChanges();

      expect(tooltipEl.nativeElement.className).toContain('show');
    });
  });


  function getTooltipContent(property: string = 'content') {
    return window.getComputedStyle(tooltipEl.nativeElement, ':before')
      .getPropertyValue(property);
  }
});
