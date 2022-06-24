import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonConstants } from 'ngx-sfc-common';
import { TimelineItemPosition } from './timeline-item-position.enum';
import { TimelineItemComponent } from './timeline-item.component';
import { faTShirt } from '@fortawesome/free-solid-svg-icons';

describe('Component: TimelineItemComponent', () => {
  let component: TimelineItemComponent;
  let fixture: ComponentFixture<TimelineItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [TimelineItemComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create component', () => {
      expect(component).toBeTruthy();
    });

    fit('Should create main elements', () => {
      expect(fixture.nativeElement.querySelector('li.container')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.date-time')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.date-time > span')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.marker')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.marker > div.delimeter')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.content')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.content > div.title')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.content > div.title > span')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.content > p')).toBeTruthy();
    });

    fit('Should have default model', () => {
      expect(component.model).toEqual({ title: CommonConstants.EMPTY_STRING });
    });
  });

  describe('Position', () => {
    fit("Should have default value", () => {
      expect(fixture.nativeElement.className).toContain(TimelineItemPosition.Left);
    });

    fit("Should have defined value", () => {
      component.model.position = TimelineItemPosition.Right;
      fixture.detectChanges();

      expect(fixture.nativeElement.className).toContain(TimelineItemPosition.Right);
    });
  });

  describe('Period', () => {
    fit("Should not have class", () => {
      expect(fixture.nativeElement.className).not.toContain('period');
    });

    fit("Should have class", () => {
      component.model.period = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.className).toContain('period');
    });
  });

  describe('DateTime label', () => {
    fit('Should have default value', () => {
      expect(fixture.nativeElement.querySelector('div.date-time > span').innerText).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit('Should have defined value', () => {
      component.model.dateTimeLabel = '23.33';
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.date-time > span').innerText).toEqual(component.model.dateTimeLabel);
    });
  });

  describe('Content', () => {
    describe('Icon', () => {
      fit("Should not exist", () => {
        expect(fixture.nativeElement.querySelector('div.content > div.title > fa-icon')).toBeNull();
      });

      fit("Should exist", () => {
        component.model.icon = faTShirt;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.content > div.title > fa-icon svg.fa-shirt')).toBeTruthy();
      });
    });

    describe('Image', () => {
      fit("Should not exist, if source not provided", () => {
        expect(fixture.nativeElement.querySelector('div.content > div.title > img')).toBeNull();
      });

      fit("Should not exist, if icon provided", () => {
        component.model.icon = faTShirt;
        component.model.image = '/testImage.png';
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.content > div.title > img')).toBeNull();
      });

      fit("Should exist", () => {
        component.model.image = '/testImage.png';
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.content > div.title > img')).toBeTruthy();
      });

      fit("Should have defined src value", () => {
        component.model.image = '/testImage.png';
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.content > div.title > img').src).toContain(component.model.image);
      });
    });

    describe('Title', () => {
      fit('Should have default value', () => {
        expect(fixture.nativeElement.querySelector('div.content > div.title > span').innerText).toEqual(CommonConstants.EMPTY_STRING);
      });

      fit('Should have defined value', () => {
        component.model.title = 'test title';
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.content > div.title > span').innerText).toEqual(component.model.title);
      });
    });

    describe('Description', () => {
      fit('Should have default value', () => {
        expect(fixture.nativeElement.querySelector('div.content > p').innerText).toEqual(CommonConstants.EMPTY_STRING);
      });

      fit('Should have defined value', () => {
        component.model.description = 'description';
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.content > p').innerText).toEqual(component.model.description);
      });
    });
  });
});
