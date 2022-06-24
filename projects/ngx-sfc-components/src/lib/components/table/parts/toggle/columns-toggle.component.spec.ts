import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ShowHideElementDirective, UIClass, WINDOW } from 'ngx-sfc-common';
import { ColumnsToggleComponent } from './columns-toggle.component';
import { ColumnsToggleConstants } from './columns-toggle.constants';
import { ColumnsToggleService } from './service/columns-toggle.service';

describe('Component: ColumnsToggle', () => {
  let component: ColumnsToggleComponent;
  let fixture: ComponentFixture<ColumnsToggleComponent>;
  let windowMock: any = <any>{};
  let service: ColumnsToggleService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [ShowHideElementDirective, ColumnsToggleComponent],
      providers: [
        { provide: WINDOW, useFactory: (() => { return windowMock; }) }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnsToggleComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ColumnsToggleService);
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create component', () => {
      expect(component).toBeTruthy();
    });

    fit('Should have main elements', () => {
      expect(fixture.nativeElement.querySelector('div.container')).toBeTruthy();
      expect(fixture.nativeElement.querySelectorAll('span.icon').length).toEqual(2);
      expect(fixture.nativeElement.querySelectorAll('fa-icon').length).toEqual(2);
      expect(fixture.nativeElement.querySelector('span.label')).toBeTruthy();
    });

    fit('Should call toggle method of columns toggle service', () => {
      const toggleSpy = spyOn<any>((component as any).service, 'toggle');

      fixture.debugElement.nativeElement.dispatchEvent(new MouseEvent('click', {}));

      expect(toggleSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Icons', () => {
    fit('Should show icon has relevant class', () => {
      expect(fixture.nativeElement.querySelectorAll('fa-icon svg')[0].classList).toContain('fa-eye');
    });

    fit('Should hide icon has relevant class', () => {
      service.toggle();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('fa-icon svg')[1].classList).toContain('fa-eye-slash');
    });

    fit('Should show icon be visible', () => {
      expect(fixture.nativeElement.querySelectorAll('span.icon')[0].style.visibility).toEqual(UIClass.Visible);
      expect(fixture.nativeElement.querySelectorAll('span.icon')[1].style.visibility).toEqual(UIClass.Hidden);
    });

    fit('Should hide icon be visible', () => {
      service.toggle();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('span.icon')[0].style.visibility).toEqual(UIClass.Hidden);
      expect(fixture.nativeElement.querySelectorAll('span.icon')[1].style.visibility).toEqual(UIClass.Visible);
    });
  });

  describe('Label', () => {
    fit('Should be show label', () => {
      expect(fixture.nativeElement.querySelector('span.label').innerText.toUpperCase()).toEqual(ColumnsToggleConstants.SHOW.LABEL.toUpperCase());
    });

    fit('Should be hide label', () => {
      service.toggle();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('span.label').innerText.toUpperCase()).toEqual(ColumnsToggleConstants.HIDE.LABEL.toUpperCase());
    });
  });
});
