import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TimelineItemComponent } from './parts/item/timeline-item.component';
import { TimelineComponent } from './timeline.component';

describe('Component: TimelineComponent', () => {
  let component: TimelineComponent;
  let fixture: ComponentFixture<TimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [TimelineItemComponent, TimelineComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create component', () => {
      expect(component).toBeTruthy();
    });

    fit('Should create main elements', () => {
      expect(fixture.nativeElement.querySelector('div.container')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('ul.timeline')).toBeTruthy();
    });

    fit('Should have default items', () => {
      expect(component.items).toEqual([]);
    });
  });

  describe('Items', () => {
    fit('Should not have any items by default', () => {
      expect(fixture.nativeElement.querySelectorAll('sfc-timeline-item').length).toEqual(0);
    });

    fit('Should have defined items', () => {
      component.items = [{ title: 'item 1' }, { title: 'item 2' }];
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('sfc-timeline-item').length).toEqual(2);
    });

    fit('Should have defined model value', () => {
      component.items = [{ title: 'item 1' }, { title: 'item 2' }];
      fixture.detectChanges();

      const items = fixture.debugElement.queryAll(By.css('sfc-timeline-item'));

      items.forEach((item, index) => {
        expect(item.componentInstance.model).toEqual(component.items[index]);
      });
    });
  });
});
