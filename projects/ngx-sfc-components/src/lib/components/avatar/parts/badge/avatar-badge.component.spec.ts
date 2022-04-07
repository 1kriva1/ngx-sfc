import { Component, forwardRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CommonConstants, getCssLikeValue } from 'ngx-sfc-common';
import { AvatarConstants } from '../../avatar.constants';
import { AvatarBadgePosition } from './avatar-badge-position.enum';
import { AvatarBadgeComponent } from './avatar-badge.component';
import { AvatarBadgeConstants } from './avatar-badge.constants';

@Component({
  template: `
              <sfc-avatar-badge [position]="position" [background]="background">
                <h2 *ngIf="showContent">{{data}}</h2>
              </sfc-avatar-badge>
              
            `
})
class TestAvatarBadgeComponent {

  position = AvatarBadgePosition.Right;

  background?: string;

  data!: string;

  showContent = false;

  @ViewChild(forwardRef(() => AvatarBadgeComponent), { static: false })
  badge!: AvatarBadgeComponent;
}

describe('Component: AvatarBadgeComponent', () => {
  let component: TestAvatarBadgeComponent;
  let fixture: ComponentFixture<TestAvatarBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvatarBadgeComponent, TestAvatarBadgeComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAvatarBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create component', () => {
      expect(component.badge).toBeTruthy();
    });

    fit('Should have main element', () => {
      expect(fixture.nativeElement.querySelector('span.container')).toBeTruthy();
    });
  });

  describe('Content', () => {
    fit('Should not exist', () => {
      expect(fixture.nativeElement.querySelector('h2')).toBeNull();
    });

    fit('Should exist', () => {
      component.showContent = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('h2')).toBeTruthy();
    });

    fit('Should have defined value', () => {
      component.showContent = true;
      component.data = 'Test data';
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('h2').innerText).toEqual(component.data);
    });
  });

  describe('Styles', () => {
    fit('Should have default width and height values', () => {
      const badgeEl = fixture.debugElement.query(By.css('sfc-avatar-badge')),
        assertValue = getCssLikeValue(AvatarConstants.DEFAULT_RADIUS * AvatarBadgeConstants.SIZE_MULTIPLIER);

      expect(badgeEl.styles['height']).toEqual(assertValue);
      expect(badgeEl.styles['width']).toEqual(assertValue);
    });

    fit('Should have defined width and height values', () => {
      component.badge.radius = 180;
      fixture.detectChanges();

      const badgeEl = fixture.debugElement.query(By.css('sfc-avatar-badge')),
        assertValue = getCssLikeValue(component.badge.radius * AvatarBadgeConstants.SIZE_MULTIPLIER);

      expect(badgeEl.styles['height']).toEqual(assertValue);
      expect(badgeEl.styles['width']).toEqual(assertValue);
    });

    fit('Should have default background', () => {
      const badgeEl = fixture.debugElement.query(By.css('sfc-avatar-badge'));

      expect(badgeEl.styles['background']).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit('Should have defined background', () => {
      component.badge.background = 'red';
      fixture.detectChanges();

      const badgeEl = fixture.debugElement.query(By.css('sfc-avatar-badge'));

      expect(badgeEl.styles['background']).toEqual('red');
    });

    fit('Should have default font size', () => {
      const badgeEl = fixture.debugElement.query(By.css('sfc-avatar-badge')),
        assertValue = getCssLikeValue(AvatarConstants.DEFAULT_RADIUS * AvatarBadgeConstants.TEXT_SIZE_MULTIPLIER);

      expect(badgeEl.styles['fontSize']).toEqual(assertValue);
    });

    fit('Should have defined font size', () => {
      component.badge.radius = 180;
      fixture.detectChanges();

      const badgeEl = fixture.debugElement.query(By.css('sfc-avatar-badge')),
        assertValue = getCssLikeValue(component.badge.radius * AvatarBadgeConstants.TEXT_SIZE_MULTIPLIER);

      expect(badgeEl.styles['fontSize']).toEqual(assertValue);
    });

    describe('Position', () => {
      fit('Should styles for Right position', () => {
        const badgeEl = fixture.debugElement.query(By.css('sfc-avatar-badge'));

        expect(badgeEl.styles['right']).toEqual('-10px');
        expect(badgeEl.styles['bottom']).toEqual('calc(50% - 12px)');
      });

      fit('Should styles for RightTop position', () => {
        component.position = AvatarBadgePosition.RightTop;
        fixture.detectChanges();

        const badgeEl = fixture.debugElement.query(By.css('sfc-avatar-badge'));

        expect(badgeEl.styles['right']).toEqual('2px');
        expect(badgeEl.styles['bottom']).toEqual('calc(75% - 12px)');
      });

      fit('Should styles for RightBottom position', () => {
        component.position = AvatarBadgePosition.RightBottom;
        fixture.detectChanges();

        const badgeEl = fixture.debugElement.query(By.css('sfc-avatar-badge'));

        expect(badgeEl.styles['right']).toEqual('2px');
        expect(badgeEl.styles['bottom']).toEqual('calc(25% - 12px)');
      });

      fit('Should styles for Left position', () => {
        component.position = AvatarBadgePosition.Left;
        fixture.detectChanges();

        const badgeEl = fixture.debugElement.query(By.css('sfc-avatar-badge'));

        expect(badgeEl.styles['left']).toEqual('-10px');
        expect(badgeEl.styles['bottom']).toEqual('calc(50% - 12px)');
      });

      fit('Should styles for LeftTop position', () => {
        component.position = AvatarBadgePosition.LeftTop;
        fixture.detectChanges();

        const badgeEl = fixture.debugElement.query(By.css('sfc-avatar-badge'));

        expect(badgeEl.styles['left']).toEqual('2px');
        expect(badgeEl.styles['bottom']).toEqual('calc(75% - 12px)');
      });

      fit('Should styles for LeftBottom position', () => {
        component.position = AvatarBadgePosition.LeftBottom;
        fixture.detectChanges();

        const badgeEl = fixture.debugElement.query(By.css('sfc-avatar-badge'));

        expect(badgeEl.styles['left']).toEqual('2px');
        expect(badgeEl.styles['bottom']).toEqual('calc(25% - 12px)');
      });

      fit('Should styles for Top position', () => {
        component.position = AvatarBadgePosition.Top;
        fixture.detectChanges();

        const badgeEl = fixture.debugElement.query(By.css('sfc-avatar-badge'));

        expect(badgeEl.styles['right']).toEqual('calc(50% - 12px)');
        expect(badgeEl.styles['top']).toEqual('-10px');
      });

      fit('Should styles for Bottom position', () => {
        component.position = AvatarBadgePosition.Bottom;
        fixture.detectChanges();

        const badgeEl = fixture.debugElement.query(By.css('sfc-avatar-badge'));

        expect(badgeEl.styles['right']).toEqual('calc(50% - 12px)');
        expect(badgeEl.styles['bottom']).toEqual('-10px');
      });
    });
  });
});
