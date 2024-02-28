import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShirt } from '@fortawesome/free-solid-svg-icons';
import { CommonConstants, getCssLikeValue, Position, TooltipComponent, WINDOW } from 'ngx-sfc-common';
import { StarsComponent } from '../stars/stars.component';
import { AvatarComponent } from './avatar.component';
import { AvatarConstants } from './avatar.constants';
import { AvatarBadgePosition } from './parts/badge/avatar-badge-position.enum';
import { AvatarBadgeComponent } from './parts/badge/avatar-badge.component';

describe('Component: AvatarComponent', () => {
  let component: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [StarsComponent, TooltipComponent, AvatarBadgeComponent, AvatarComponent],
      providers: [
        { provide: WINDOW, useFactory: (() => { return <any>{}; }) }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create component', () => {
      expect(component).toBeTruthy();
    });

    fit('Should have main element', () => {
      expect(fixture.nativeElement.querySelector('div.container')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.avatar-image-container')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.avatar')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.avatar-image')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('svg')).toBeTruthy();
      expect(fixture.nativeElement.querySelectorAll('circle').length).toEqual(3);
      expect(fixture.nativeElement.querySelectorAll('circle.progress').length).toEqual(2);
      expect(fixture.nativeElement.querySelector('div.avatar-data-container')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.fullname')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.title')).toBeTruthy();
    });

    fit("Should increase/decrease stroke on hover", () => {
      const circlesEls = fixture.nativeElement.querySelectorAll('circle.progress');

      circlesEls.forEach((circleEl: any) => {
        expect(circleEl.attributes['stroke-width'].nodeValue).toEqual(AvatarConstants.DEFAULT_STROKE.toString());
      });

      const avaterImgEl = fixture.debugElement.query(By.css('div.avatar'));
      avaterImgEl.triggerEventHandler('mouseenter', { target: avaterImgEl.nativeElement });
      fixture.detectChanges();

      circlesEls.forEach((circleEl: any) => {
        expect(circleEl.attributes['stroke-width'].nodeValue)
          .toEqual((AvatarConstants.DEFAULT_STROKE * component.STROKE_HOVER_VALUE).toString());
      });

      avaterImgEl.triggerEventHandler('mouseleave', { target: avaterImgEl.nativeElement });
      fixture.detectChanges();

      circlesEls.forEach((circleEl: any) => {
        expect(circleEl.attributes['stroke-width'].nodeValue).toEqual(AvatarConstants.DEFAULT_STROKE.toString());
      });
    });

    fit('Should have default image model', () => {
      expect(component.imageModel.NormalizedRadius).toEqual(76);
      expect(component.imageModel.Circumference).toEqual(478);
      expect(component.imageModel.Width).toEqual(160);
      expect(component.imageModel.Height).toEqual(160);
      expect(component.imageModel.ImageRadius).toEqual(64.6);
      expect(component.imageModel.ImageId).toBeDefined();
    });

    fit('Should have default progress model', () => {
      expect(component.progressModel.color).toEqual(AvatarConstants.PROGRESS_DEFAULT_COLOR);
      expect(component.progressModel.filledColor).toEqual(AvatarConstants.PROGRESS_DEFAULT_FILLED_COLOR);
    });

    fit('Should have default data', () => {
      expect(component.data.image).toEqual(AvatarConstants.DATA_DEFAULT_IMAGE);
      expect(component.data.firstName).toBeUndefined();
      expect(component.data.lastName).toBeUndefined();
      expect(component.data.title).toBeUndefined();
    });
  });

  describe('SVG', () => {
    fit("Should have width and height values", () => {
      const svgEl = fixture.debugElement.query(By.css('svg'));
      expect(svgEl.attributes['width']).toEqual((component.imageModel.Width).toString());
      expect(svgEl.attributes['height']).toEqual((component.imageModel.Height).toString());
    });

    fit("Pattern should have defined attributes", () => {
      const patternEl = fixture.debugElement.query(By.css('svg > defs > pattern')),
        patternImgEl = fixture.debugElement.query(By.css('svg > defs > pattern > image'));

      expect(patternEl.attributes['width']).toEqual(component.imageModel.Width.toString());
      expect(patternEl.attributes['height']).toEqual(component.imageModel.Height.toString());
      expect(patternEl.attributes['patternUnits']).toEqual('userSpaceOnUse');
      expect(patternEl.properties['id']).toEqual(component.imageModel.ImageId);

      expect(patternImgEl.attributes['width']).toEqual(component.imageModel.Width.toString());
      expect(patternImgEl.attributes['height']).toEqual(component.imageModel.Height.toString());
      expect(patternImgEl.attributes['preserveAspectRatio']).toEqual('xMidYMid slice');
      expect(patternImgEl.attributes['xlink:href']).toEqual(component.data.image as string);
    });

    fit("Progress circle should have defined attributes", () => {
      const circleEl = fixture.debugElement.queryAll(By.css('circle.progress'))[0];

      expect(circleEl.attributes['stroke']).toEqual(AvatarConstants.PROGRESS_DEFAULT_COLOR);
      expect(circleEl.attributes['stroke-width']).toEqual(component.stroke.toString());
      expect(circleEl.attributes['fill']).toEqual('transparent');
      expect(circleEl.attributes['r']).toEqual(component.imageModel.NormalizedRadius.toString());
      expect(circleEl.attributes['cx']).toEqual(component.radius.toString());
      expect(circleEl.attributes['cy']).toEqual(component.radius.toString());
    });

    fit("Progress filled circle should have defined attributes", () => {
      const circleEl = fixture.debugElement.queryAll(By.css('circle.progress'))[1];

      expect(circleEl.attributes['stroke-dasharray'])
        .toEqual(component.imageModel.Circumference + ' ' + component.imageModel.Circumference);
      expect(circleEl.attributes['stroke']).toEqual(AvatarConstants.PROGRESS_DEFAULT_FILLED_COLOR);
      expect(circleEl.attributes['stroke-width']).toEqual(component.stroke.toString());
      expect(circleEl.attributes['fill']).toEqual('transparent');
      expect(circleEl.attributes['r']).toEqual(component.imageModel.NormalizedRadius.toString());
      expect(circleEl.attributes['cx']).toEqual(component.radius.toString());
      expect(circleEl.attributes['cy']).toEqual(component.radius.toString());
      expect((circleEl.styles as any)['stroke-dashoffset'].toString()).toEqual(component.strokeDashOffset.toString());
    });

    fit("Image circle should have defined attributes", () => {
      const circleEl = fixture.debugElement.queryAll(By.css('circle'))[2];

      expect(circleEl.attributes['cx']).toEqual(component.radius.toString());
      expect(circleEl.attributes['cy']).toEqual(component.radius.toString());
      expect(circleEl.attributes['r']).toEqual(component.imageModel.ImageRadius.toString());
      expect(circleEl.attributes['fill']).toEqual(`url('#${component.imageModel.ImageId}')`);
    });
  });

  describe('Stars', () => {
    fit('Should not exist by default', () => {
      expect(fixture.nativeElement.querySelector('sfc-stars')).toBeNull();
    });

    fit('Should exist', () => {
      component.stars = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('sfc-stars')).toBeTruthy();
    });

    fit("Should have defined attributes", () => {
      component.stars = true;
      component.starsValue = 3.2;
      fixture.detectChanges();

      const starsEl = fixture.debugElement.query(By.css('sfc-stars'));

      expect(starsEl.attributes['ng-reflect-value']).toEqual(component.starsValue.toString());
    });
  });

  describe('Data', () => {
    fit("Should have default value for fullname", () => {
      expect(fixture.nativeElement.querySelector('div.fullname span').innerText).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit("Should have default value for fullname", () => {
      component.data = { firstName: 'FirstName', lastName: 'LastName' };
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.fullname span').innerText)
        .toEqual(`${component.data.firstName} ${component.data.lastName}`);
    });

    fit("Should have defined font size value for fullname", () => {
      const fullNameEl = fixture.debugElement.query(By.css('div.fullname'));

      expect(fullNameEl.styles['fontSize']).toEqual(`${getCssLikeValue(component.radius / component.FULLNAME_PART_VALUE)}`);
    });

    fit("Should have default value for title", () => {
      expect(fixture.nativeElement.querySelector('div.title span').innerText).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit("Should have default value for fullname", () => {
      component.data = { title: 'Test title' };
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.title span').innerText).toEqual(component.data.title);
    });

    fit("Should have defined font size value  for fullname", () => {
      const fullNameEl = fixture.debugElement.query(By.css('div.title'));

      expect(fullNameEl.styles['fontSize']).toEqual(`${getCssLikeValue(component.radius / component.TITLE_PART_VALUE)}`);
    });
  });

  describe('Badges', () => {
    fit("Should not exist", () => {
      expect(fixture.nativeElement.querySelector('sfc-avatar-badge')).toBeNull();
    });

    fit("Should exist", () => {
      component.badges = [{ position: AvatarBadgePosition.Top }];
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('sfc-avatar-badge')).toBeTruthy();
    });

    fit("Should have appropriate attributes", () => {
      component.badges = [
        {
          position: AvatarBadgePosition.Top,
          label: 'Label test',
          background: 'blue',
          icon: faShirt,
          tooltip: { value: 'Tooltip test', position: Position.Bottom }
        }
      ];
      fixture.detectChanges();

      const badgeEl = fixture.debugElement.query(By.css('sfc-avatar-badge'));

      expect(badgeEl.componentInstance.model).toEqual(component.badges[0]);
      expect(badgeEl.componentInstance.normalizedRadius).toEqual(component.imageModel.NormalizedRadius);
      expect(badgeEl.componentInstance.radius).toEqual(component.radius);
      expect(badgeEl.componentInstance.stroke).toEqual(component.stroke);
      expect(badgeEl.componentInstance.background).toEqual(component.progressModel.filledColor);
    });

    fit("Should create defined count", () => {
      component.badges = [
        { position: AvatarBadgePosition.Top },
        { position: AvatarBadgePosition.Bottom },
        { position: AvatarBadgePosition.Right }
      ];
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('sfc-avatar-badge').length).toEqual(3);
    });
  });
});
