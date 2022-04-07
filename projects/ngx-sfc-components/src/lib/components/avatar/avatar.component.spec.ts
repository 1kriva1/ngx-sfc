import { Component, forwardRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CommonConstants, getCssLikeValue } from 'ngx-sfc-common';
import { AvatarBadgeComponent } from 'ngx-sfc-components';
import { StarsComponent } from '../stars/stars.component';
import { AvatarComponent } from './avatar.component';
import { AvatarConstants } from './avatar.constants';

@Component({
  template: `
            <sfc-avatar>
              <sfc-avatar-badge *ngIf="showBadge">
              </sfc-avatar-badge>
            </sfc-avatar>  
            `
})
class TestAvatarComponent {

  showBadge = false;

  @ViewChild(forwardRef(() => AvatarComponent), { static: false })
  avatar!: AvatarComponent;

  @ViewChild(forwardRef(() => AvatarBadgeComponent), { static: false })
  avatarBadge!: AvatarBadgeComponent;
}

describe('Component: AvatarComponent', () => {
  let component: TestAvatarComponent;
  let fixture: ComponentFixture<TestAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StarsComponent, AvatarBadgeComponent, AvatarComponent, TestAvatarComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create component', () => {
      expect(component.avatar).toBeTruthy();
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
          .toEqual((AvatarConstants.DEFAULT_STROKE * component.avatar.STROKE_HOVER_VALUE).toString());
      });

      avaterImgEl.triggerEventHandler('mouseleave', { target: avaterImgEl.nativeElement });
      fixture.detectChanges();

      circlesEls.forEach((circleEl: any) => {
        expect(circleEl.attributes['stroke-width'].nodeValue).toEqual(AvatarConstants.DEFAULT_STROKE.toString());
      });
    });

    fit('Should have default image model', () => {
      expect(component.avatar.imageModel.NormalizedRadius).toEqual(76);
      expect(component.avatar.imageModel.Circumference).toEqual(478);
      expect(component.avatar.imageModel.Width).toEqual(160);
      expect(component.avatar.imageModel.Height).toEqual(160);
      expect(component.avatar.imageModel.ImageRadius).toEqual(64.6);
      expect(component.avatar.imageModel.ImageId).toBeDefined();
    });

    fit('Should have default progress model', () => {
      expect(component.avatar.progressModel.color).toEqual(AvatarConstants.PROGRESS_DEFAULT_COLOR);
      expect(component.avatar.progressModel.filledColor).toEqual(AvatarConstants.PROGRESS_DEFAULT_FILLED_COLOR);
    });

    fit('Should have default data', () => {
      expect(component.avatar.data.image).toEqual(AvatarConstants.DATA_DEFAULT_IMAGE);
      expect(component.avatar.data.firstName).toBeUndefined();
      expect(component.avatar.data.lastName).toBeUndefined();
      expect(component.avatar.data.title).toBeUndefined();
    });
  });

  describe('SVG', () => {
    fit("Should have width and height values", () => {
      const svgEl = fixture.debugElement.query(By.css('svg'));
      expect(svgEl.attributes['width']).toEqual((component.avatar.imageModel.Width).toString());
      expect(svgEl.attributes['height']).toEqual((component.avatar.imageModel.Height).toString());
    });

    fit("Pattern should have defined attributes", () => {
      const patternEl = fixture.debugElement.query(By.css('svg > defs > pattern')),
        patternImgEl = fixture.debugElement.query(By.css('svg > defs > pattern > image'));

      expect(patternEl.attributes['width']).toEqual(component.avatar.imageModel.Width.toString());
      expect(patternEl.attributes['height']).toEqual(component.avatar.imageModel.Height.toString());
      expect(patternEl.attributes['patternUnits']).toEqual('userSpaceOnUse');
      expect(patternEl.properties['id']).toEqual(component.avatar.imageModel.ImageId);

      expect(patternImgEl.attributes['width']).toEqual(component.avatar.imageModel.Width.toString());
      expect(patternImgEl.attributes['height']).toEqual(component.avatar.imageModel.Height.toString());
      expect(patternImgEl.attributes['preserveAspectRatio']).toEqual('xMidYMid slice');
      expect(patternImgEl.attributes['xlink:href']).toEqual(component.avatar.data.image as string);
    });

    fit("Progress circle should have defined attributes", () => {
      const circleEl = fixture.debugElement.queryAll(By.css('circle.progress'))[0];

      expect(circleEl.attributes['stroke']).toEqual(AvatarConstants.PROGRESS_DEFAULT_COLOR);
      expect(circleEl.attributes['stroke-width']).toEqual(component.avatar.stroke.toString());
      expect(circleEl.attributes['fill']).toEqual('transparent');
      expect(circleEl.attributes['r']).toEqual(component.avatar.imageModel.NormalizedRadius.toString());
      expect(circleEl.attributes['cx']).toEqual(component.avatar.radius.toString());
      expect(circleEl.attributes['cy']).toEqual(component.avatar.radius.toString());
    });

    fit("Progress filled circle should have defined attributes", () => {
      const circleEl = fixture.debugElement.queryAll(By.css('circle.progress'))[1];

      expect(circleEl.attributes['stroke-dasharray'])
        .toEqual(component.avatar.imageModel.Circumference + ' ' + component.avatar.imageModel.Circumference);
      expect(circleEl.attributes['stroke']).toEqual(AvatarConstants.PROGRESS_DEFAULT_FILLED_COLOR);
      expect(circleEl.attributes['stroke-width']).toEqual(component.avatar.stroke.toString());
      expect(circleEl.attributes['fill']).toEqual('transparent');
      expect(circleEl.attributes['r']).toEqual(component.avatar.imageModel.NormalizedRadius.toString());
      expect(circleEl.attributes['cx']).toEqual(component.avatar.radius.toString());
      expect(circleEl.attributes['cy']).toEqual(component.avatar.radius.toString());
      expect((circleEl.styles as any)['stroke-dashoffset'].toString()).toEqual(component.avatar.strokeDashOffset.toString());
    });

    fit("Image circle should have defined attributes", () => {
      const circleEl = fixture.debugElement.queryAll(By.css('circle'))[2];

      expect(circleEl.attributes['cx']).toEqual(component.avatar.radius.toString());
      expect(circleEl.attributes['cy']).toEqual(component.avatar.radius.toString());
      expect(circleEl.attributes['r']).toEqual(component.avatar.imageModel.ImageRadius.toString());
      expect(circleEl.attributes['fill']).toEqual(`url('#${component.avatar.imageModel.ImageId}')`);
    });
  });

  describe('Stars', () => {
    fit('Should not exist by default', () => {
      expect(fixture.nativeElement.querySelector('sfc-stars')).toBeNull();
    });

    fit('Should exist', () => {
      component.avatar.stars = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('sfc-stars')).toBeTruthy();
    });

    fit("Should have defined attributes", () => {
      component.avatar.stars = true;
      component.avatar.starsValue = 3.2;
      fixture.detectChanges();

      const starsEl = fixture.debugElement.query(By.css('sfc-stars'));

      expect(starsEl.attributes['ng-reflect-value']).toEqual(component.avatar.starsValue.toString());
    });
  });

  describe('Data', () => {
    fit("Should have default value for fullname", () => {
      expect(fixture.nativeElement.querySelector('div.fullname span').innerText).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit("Should have default value for fullname", () => {
      component.avatar.data = { firstName: 'FirstName', lastName: 'LastName' };
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.fullname span').innerText)
        .toEqual(`${component.avatar.data.firstName} ${component.avatar.data.lastName}`);
    });

    fit("Should have defined font size value for fullname", () => {
      const fullNameEl = fixture.debugElement.query(By.css('div.fullname'));

      expect(fullNameEl.styles['fontSize']).toEqual(`${getCssLikeValue(component.avatar.radius / component.avatar.FULLNAME_PART_VALUE)}`);
    });

    fit("Should have default value for title", () => {
      expect(fixture.nativeElement.querySelector('div.title span').innerText).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit("Should have default value for fullname", () => {
      component.avatar.data = { title: 'Test title' };
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.title span').innerText).toEqual(component.avatar.data.title);
    });

    fit("Should have defined font size value  for fullname", () => {
      const fullNameEl = fixture.debugElement.query(By.css('div.title'));

      expect(fullNameEl.styles['fontSize']).toEqual(`${getCssLikeValue(component.avatar.radius / component.avatar.TITLE_PART_VALUE)}`);
    });
  });

  describe('Content', () => {
    fit("Should not exist", () => {
      expect(fixture.nativeElement.querySelector('sfc-avatar-badge')).toBeNull();
    });

    fit("Should exist", () => {
      component.showBadge = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('sfc-avatar-badge')).toBeTruthy();
    });

    fit("Should reflect values from avatar", () => {
      component.showBadge = true;
      fixture.detectChanges();

      (component.avatar.badges as any).reset([component.avatarBadge]);
      component.avatar.ngAfterContentInit();
      fixture.detectChanges();

      expect(component.avatarBadge.normalizedRadius).toEqual(component.avatar.imageModel.NormalizedRadius);
      expect(component.avatarBadge.radius).toEqual(component.avatar.radius);
      expect(component.avatarBadge.stroke).toEqual(component.avatar.stroke);
      expect(component.avatarBadge.background).toEqual(component.avatar.progressModel.filledColor);
    });

    fit("Should not reflect background values", () => {
      component.showBadge = true;
      fixture.detectChanges();

      component.avatarBadge.background = 'red';
      (component.avatar.badges as any).reset([component.avatarBadge]);
      component.avatar.ngAfterContentInit();
      fixture.detectChanges();

      expect(component.avatarBadge.background).not.toEqual(component.avatar.progressModel.filledColor as string);
      expect(component.avatarBadge.background).toEqual('red');
    });
  });
});
