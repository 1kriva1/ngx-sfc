import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShirt } from '@fortawesome/free-solid-svg-icons';
import { CommonConstants, getCssLikeValue, Position, TooltipComponent, WINDOW } from 'ngx-sfc-common';
import { AvatarConstants } from '../../avatar.constants';
import { AvatarBadgePosition } from './avatar-badge-position.enum';
import { AvatarBadgeComponent } from './avatar-badge.component';
import { AvatarBadgeConstants } from './avatar-badge.constants';

describe('Component: AvatarBadge', () => {
  let component: AvatarBadgeComponent;
  let fixture: ComponentFixture<AvatarBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [TooltipComponent, AvatarBadgeComponent],
      providers: [
        { provide: WINDOW, useFactory: (() => { return <any>{}; }) }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create component', () => {
      expect(component).toBeTruthy();
    });

    fit('Should have main element', () => {
      expect(fixture.nativeElement.querySelector('span.container')).toBeTruthy();
    });
  });

  describe('Styles', () => {
    fit('Should have default width and height values', () => {
      const assertValue = getCssLikeValue(AvatarConstants.DEFAULT_RADIUS * AvatarBadgeConstants.SIZE_MULTIPLIER);

      expect(fixture.debugElement.styles['height']).toEqual(assertValue);
      expect(fixture.debugElement.styles['width']).toEqual(assertValue);
    });

    fit('Should have defined width and height values', () => {
      component.radius = 180;
      fixture.detectChanges();

      const assertValue = getCssLikeValue(component.radius * AvatarBadgeConstants.SIZE_MULTIPLIER);

      expect(fixture.debugElement.styles['height']).toEqual(assertValue);
      expect(fixture.debugElement.styles['width']).toEqual(assertValue);
    });

    fit('Should have default background', () => {
      expect(fixture.debugElement.styles['background']).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit('Should have defined background', () => {
      component.background = 'red';
      fixture.detectChanges();

      expect(fixture.debugElement.styles['background']).toEqual('red');
    });

    fit('Should have defined background from modal', () => {
      component.model = { background: 'red', position: AvatarBadgePosition.LeftBottom };
      fixture.detectChanges();

      expect(fixture.debugElement.styles['background']).toEqual('red');
    });

    fit('Should have default font size', () => {
      const assertValue = getCssLikeValue(AvatarConstants.DEFAULT_RADIUS * AvatarBadgeConstants.TEXT_SIZE_MULTIPLIER);

      expect(fixture.debugElement.styles['fontSize']).toEqual(assertValue);
    });

    fit('Should have defined font size', () => {
      component.radius = 180;
      fixture.detectChanges();

      const assertValue = getCssLikeValue(component.radius * AvatarBadgeConstants.TEXT_SIZE_MULTIPLIER);

      expect(fixture.debugElement.styles['fontSize']).toEqual(assertValue);
    });

    describe('Position', () => {
      fit('Should styles for Right position', () => {
        component.model = { position: AvatarBadgePosition.Right };
        fixture.detectChanges();

        expect(fixture.debugElement.styles['right']).toEqual('-13px');
        expect(fixture.debugElement.styles['bottom']).toEqual('calc(50% - 15px)');
      });

      fit('Should styles for RightTop position', () => {
        component.model = { position: AvatarBadgePosition.RightTop };
        fixture.detectChanges();

        expect(fixture.debugElement.styles['right']).toEqual('2px');
        expect(fixture.debugElement.styles['bottom']).toEqual('calc(75% - 15px)');
      });

      fit('Should styles for RightBottom position', () => {
        component.model = { position: AvatarBadgePosition.RightBottom };
        fixture.detectChanges();

        expect(fixture.debugElement.styles['right']).toEqual('2px');
        expect(fixture.debugElement.styles['bottom']).toEqual('calc(25% - 15px)');
      });

      fit('Should styles for Left position', () => {
        component.model = { position: AvatarBadgePosition.Left };
        fixture.detectChanges();

        expect(fixture.debugElement.styles['left']).toEqual('-13px');
        expect(fixture.debugElement.styles['bottom']).toEqual('calc(50% - 15px)');
      });

      fit('Should styles for LeftTop position', () => {
        component.model = { position: AvatarBadgePosition.LeftTop };
        fixture.detectChanges();

        expect(fixture.debugElement.styles['left']).toEqual('2px');
        expect(fixture.debugElement.styles['bottom']).toEqual('calc(75% - 15px)');
      });

      fit('Should styles for LeftBottom position', () => {
        component.model = { position: AvatarBadgePosition.LeftBottom };
        fixture.detectChanges();

        expect(fixture.debugElement.styles['left']).toEqual('2px');
        expect(fixture.debugElement.styles['bottom']).toEqual('calc(25% - 15px)');
      });

      fit('Should styles for Top position', () => {
        component.model = { position: AvatarBadgePosition.Top };
        fixture.detectChanges();

        expect(fixture.debugElement.styles['right']).toEqual('calc(50% - 15px)');
        expect(fixture.debugElement.styles['top']).toEqual('-13px');
      });

      fit('Should styles for Bottom position', () => {
        component.model = { position: AvatarBadgePosition.Bottom };
        fixture.detectChanges();

        expect(fixture.debugElement.styles['right']).toEqual('calc(50% - 15px)');
        expect(fixture.debugElement.styles['bottom']).toEqual('-13px');
      });
    });
  });

  describe('Content', () => {
    describe('Label', () => {
      fit('Should exist', () => {
        component.model = {
          position: AvatarBadgePosition.LeftTop,
          label: 'Test label'
        };
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.label')).toBeDefined();
      });

      fit('Should not exist', () => {
        component.model = {
          position: AvatarBadgePosition.LeftTop
        };
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.label')).toBeNull();
      });

      fit('Should has defined value', () => {
        component.model = {
          position: AvatarBadgePosition.LeftTop,
          label: 'Test label'
        };
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.label').innerText)
          .toEqual(component.model.label);
      });
    });

    describe('Icon', () => {
      fit('Should exist', () => {
        component.model = {
          position: AvatarBadgePosition.LeftTop,
          icon: faShirt
        };
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('fa-icon')).toBeDefined();
      });

      fit('Should not exist', () => {
        component.model = {
          position: AvatarBadgePosition.LeftTop
        };
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('fa-icon')).toBeDefined();
      });

      fit('Should has defined value', () => {
        component.model = {
          position: AvatarBadgePosition.LeftTop,
          icon: faShirt
        };
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('fa-icon svg').classList).toContain('fa-shirt');
      });
    });

    describe('Tooltip', () => {
      fit('Should tooltip exist', () => {
        component.model = {
          position: AvatarBadgePosition.LeftTop,
          tooltip: { position: Position.Top, value: 'Tooltip test' }
        };
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.tooltip')).toBeDefined();
      });

      fit('Should tooltip not exist', () => {
        component.model = {
          position: AvatarBadgePosition.LeftTop
        };
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span.tooltip')).toBeNull();
      });

      fit("Should tooltip have default attributes", () => {
        component.model = {
          position: AvatarBadgePosition.LeftTop,
          tooltip: { position: Position.Top, value: 'Tooltip test' }
        };
        fixture.detectChanges();

        const tooltipEl = fixture.debugElement.query(By.css('span.tooltip'));

        expect(tooltipEl.componentInstance.tooltipPosition).toEqual(component.model.tooltip?.position);
        expect(tooltipEl.componentInstance.tooltipShow).toBeFalse();
        expect(tooltipEl.componentInstance.value).toEqual(component.model.tooltip?.value);
      });
    });
  });
});
