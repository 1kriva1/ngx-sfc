import { Component, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonComponent, CloseComponent, DestroyParentDirective, ShowHideElementDirective, TemplateContentComponent, TemplateReferenceDirective, UIConstants } from 'ngx-sfc-common';
import { NotificationContentComponent } from '../no-export-index';
import { NotificationTemplate } from './enums/notification-template.enum';
import { NotificationType } from './enums/notification-type.enum';
import { INotificationAutoCloseModel } from './notification-auto-close.model';
import { NotificationComponent } from './notification.component';

@Component({
  template: `<ng-template #contentRef>
                  <h1 class="reference">Reference</h1>
              </ng-template>

             <sfc-notification [showClose]="showClose" [autoCloseModel]="autoCloseModel">

                <ng-template *ngIf="showContent" [sfcTemplateReference]="NotificationTemplate.Content">
                  <h2 class="content">Content</h2>
                </ng-template>

             </sfc-notification>`
})
class TestNotificationComponent {

  NotificationTemplate = NotificationTemplate;

  @ViewChild(NotificationComponent, { static: false })
  notification?: NotificationComponent;

  @ViewChild('contentRef', { static: false })
  contentTemplateRef?: TemplateRef<any>;

  showContent: boolean = false;

  showClose: boolean = false;

  autoCloseModel: INotificationAutoCloseModel = { enabled: false };
}

describe('Component: NotificationComponent', () => {
  let component: TestNotificationComponent;
  let fixture: ComponentFixture<TestNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [ButtonComponent, CloseComponent, ShowHideElementDirective, DestroyParentDirective, NotificationContentComponent,
        TemplateContentComponent, TemplateReferenceDirective, NotificationComponent, TestNotificationComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create component', () => {
      expect(component.notification).toBeTruthy();
    });

    fit('Should create main elements', () => {
      expect(fixture.nativeElement.querySelector('sfc-notification')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.container')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.notification')).toBeTruthy();
    });

    fit('Should have defined model', () => {
      expect(component.notification?.model).toEqual({ showButton: true });
    });

    fit('Should have defined automodel', () => {
      expect(component.notification?.autoCloseModel).toEqual({ enabled: false, interval: 5000 });
    });
  });

  describe('Type', () => {
    fit("Should have default value", () => {
      expect(fixture.nativeElement.querySelector('sfc-notification').className).toContain(NotificationType.Info);
    });

    fit("Should have defined value", () => {
      (component.notification as NotificationComponent).type = NotificationType.Success;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('sfc-notification').className).toContain(NotificationType.Success);
    });
  });

  describe('Destroy', () => {
    fit('Should not destroy component', () => {
      expect(fixture.nativeElement.querySelector('sfc-notification')).toBeTruthy();
    });

    fit('Should not destroy component, if time not pass', fakeAsync(() => {
      expect(fixture.nativeElement.querySelector('sfc-notification')).toBeTruthy();

      component.showClose = true;
      fixture.detectChanges();

      fixture.debugElement.query(By.css('sfc-close')).nativeElement.dispatchEvent(new KeyboardEvent('click'));
      fixture.detectChanges();

      tick(100);

      expect(fixture.nativeElement.querySelector('sfc-notification')).toBeTruthy();

      flush();
    }));

    fit('Should destroy component by clicking close', fakeAsync(() => {
      expect(fixture.nativeElement.querySelector('sfc-notification')).toBeTruthy();

      component.showClose = true;
      fixture.detectChanges();

      fixture.debugElement.query(By.css('sfc-close')).nativeElement.dispatchEvent(new KeyboardEvent('click'));
      fixture.detectChanges();

      tick(500);

      expect(fixture.nativeElement.querySelector('sfc-notification')).toBeNull();

      flush();
    }));

    fit('Should destroy component automaticly', fakeAsync(() => {
      expect(fixture.nativeElement.querySelector('sfc-notification')).toBeTruthy();

      component.autoCloseModel.enabled = true;
      component.notification?.ngOnInit();
      fixture.detectChanges();

      // autoclose default interval
      tick(5000);
      fixture.detectChanges();

      // destroy interval
      tick(500);

      expect(fixture.nativeElement.querySelector('sfc-notification')).toBeNull();

      flush();
    }));
  });

  describe('Show & Hide', () => {
    fit('Should show notification', (done) => {
      fixture.whenStable().then(() => {
        fixture.detectChanges();

        const el = fixture.debugElement.query(By.css('div.notification'));

        expect(el.styles['visibility']).toEqual(UIConstants.CSS_VISIBILITY_VISIBLE);
        expect(el.styles['opacity']).toEqual('1');

        done();
      });
    });

    fit('Should hide notification', (done) => {
      component.showClose = true;
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        fixture.debugElement.query(By.css('sfc-close')).nativeElement.dispatchEvent(new KeyboardEvent('click'));
        fixture.detectChanges();

        const el = fixture.debugElement.query(By.css('div.notification'));

        expect(el.styles['visibility']).toEqual(UIConstants.CSS_VISIBILITY_HIDDEN);
        expect(el.styles['opacity']).toEqual('0');

        done();
      });
    });
  });

  describe('Close', () => {
    fit('Should create component', () => {
      component.showClose = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('sfc-close')).toBeTruthy();
    });

    fit('Should not create component', () => {
      component.showClose = false;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('sfc-close')).toBeNull();
    });

    fit('Should emit closed event', () => {
      spyOn(component.notification?.closed as EventEmitter<void>, 'emit');
      component.showClose = true;
      fixture.detectChanges();

      fixture.debugElement.query(By.css('sfc-close')).nativeElement.dispatchEvent(new MouseEvent('click'));

      expect(component.notification?.closed.emit).toHaveBeenCalledTimes(1);
    });
  });

  describe('Content', () => {
    fit('Should have reference content', () => {
      (component.notification as NotificationComponent).content = component.contentTemplateRef;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('h1.reference')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('h2.content')).toBeNull();
    });

    fit("Should have template content", () => {
      component.showContent = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('h2.content')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('h1.reference')).toBeNull();
    });

    fit("Should have default content", () => {
      expect(fixture.nativeElement.querySelector('sfc-notification-content')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('h1.reference')).toBeNull();
      expect(fixture.nativeElement.querySelector('h2.content')).toBeNull();
    });

    fit("Should default content have defined values", () => {
      const defaultContentEl = fixture.debugElement.query(By.css('sfc-notification-content'));

      expect(defaultContentEl.componentInstance.type).toEqual(component.notification?.type);
      expect(defaultContentEl.componentInstance.model).toEqual(component.notification?.model);
    });
  });
});
