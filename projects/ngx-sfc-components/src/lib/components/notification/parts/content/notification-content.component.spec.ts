import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonComponent, ButtonType, CommonConstants } from 'ngx-sfc-common';
import { NotificationType } from '../../enums/notification-type.enum';
import { NotificationContentComponent } from './notification-content.component';
import { faTShirt } from '@fortawesome/free-solid-svg-icons';

describe('Component: NotificationContentComponent', () => {
  let component: NotificationContentComponent;
  let fixture: ComponentFixture<NotificationContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [ButtonComponent, NotificationContentComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create component', () => {
      expect(component).toBeTruthy();
    });

    fit('Should create main elements', () => {
      expect(fixture.nativeElement.querySelector('div.container')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.illustration')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.message')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.message > h1')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.message > p')).toBeTruthy();
    });

    fit('Should have default model', () => {
      expect(component.model).toEqual({});
    });
  });

  describe('Type', () => {
    fit("Should have default value", () => {
      expect(fixture.nativeElement.className).toContain(NotificationType.Info);
    });

    fit("Should have defined value", () => {
      component.type = NotificationType.Success;
      fixture.detectChanges();

      expect(fixture.nativeElement.className).toContain(NotificationType.Success);
    });
  });

  describe('Illustration', () => {
    describe('Icon', () => {
      fit('Should not create icon', () => {
        expect(fixture.nativeElement.querySelector('div.illustration > div > fa-icon')).toBeNull();
      });

      fit("Should create icon", () => {
        component.model.icon = faTShirt;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.illustration > div > fa-icon svg.fa-shirt')).toBeTruthy();
      });
    });

    describe('Image', () => {
      fit("Should not exist, if source not provided", () => {
        expect(fixture.nativeElement.querySelector('div.illustration > div > img')).toBeNull();
      });

      fit("Should not exist, if icon provided", () => {
        component.model.icon = faTShirt;
        component.model.image = '/testImage.png';
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.illustration > div > img')).toBeNull();
      });

      fit("Should exist", () => {
        component.model.image = '/testImage.png';
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.illustration > div > img')).toBeTruthy();
      });

      fit("Should have defined src value", () => {
        component.model.image = '/testImage.png';
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.illustration > div > img').src).toContain(component.model.image);
      });
    });
  });

  describe('Message', () => {
    describe('Title', () => {
      fit('Should have default value', () => {
        expect(fixture.nativeElement.querySelector('div.message > h1').innerText).toEqual(CommonConstants.EMPTY_STRING);
      });

      fit('Should have defined value', () => {
        component.model.title = 'test title';
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.message > h1').innerText).toEqual(component.model.title.toUpperCase());
      });
    });

    describe('SubTitle', () => {
      fit('Should have default value', () => {
        expect(fixture.nativeElement.querySelector('div.message > p').innerText).toEqual(CommonConstants.EMPTY_STRING);
      });

      fit('Should have defined value', () => {
        component.model.subTitle = 'sub title';
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.message > p').innerText).toEqual(component.model.subTitle);
      });
    });
  });

  describe('Button', () => {
    fit('Should not create', () => {
      expect(fixture.nativeElement.querySelector('sfc-button')).toBeNull();
    });

    fit('Should create', () => {
      component.model.showButton = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('sfc-button')).toBeTruthy();
    });

    fit('Should have defined text', () => {
      component.model.showButton = true;
      component.model.buttonText = 'Test btn text';
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('sfc-button')).componentInstance.text).toEqual(component.model.buttonText);
    });

    fit('Should have default text', () => {
      component.model.showButton = true;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('sfc-button')).componentInstance.text).toEqual(component.type);
    });

    fit('Should have constant types', () => {
      component.model.showButton = true;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('sfc-button')).componentInstance.types).toEqual([ButtonType.Rounded, ButtonType.Filled]);
    });

    fit('Should emit event', () => {
      spyOn(component.buttonClicked, 'emit');
      component.model.showButton = true;
      fixture.detectChanges();

      fixture.debugElement.query(By.css('sfc-button')).nativeElement.dispatchEvent(new MouseEvent('click'));

      expect(component.buttonClicked.emit).toHaveBeenCalledTimes(1);
    });
  });
});
