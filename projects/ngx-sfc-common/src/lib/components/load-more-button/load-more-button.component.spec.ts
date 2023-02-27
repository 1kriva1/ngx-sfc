import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { MouseDownDirective } from '../../directives';
import { DelimeterComponent } from '../delimeter/delimeter.component';
import { LoadMoreButtonComponent } from './load-more-button.component';

describe('Component: LoadMoreButton', () => {
  let component: LoadMoreButtonComponent;
  let fixture: ComponentFixture<LoadMoreButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [DelimeterComponent, MouseDownDirective, LoadMoreButtonComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadMoreButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit("Should create component", () => {
      expect(component).toBeTruthy();
    });

    fit("Should have main elements", () => {
      expect(fixture.nativeElement.querySelector('div.container')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('sfc-delimeter')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.button')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('fa-icon')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('span')).toBeTruthy();
    });

    fit('Should emit more event', () => {
      spyOn(component.more, 'emit');

      const buttonEl = fixture.debugElement.query(By.css('div.button')),
        event: any = { target: buttonEl.nativeElement, button: 0 };
      buttonEl.triggerEventHandler('mousedown', event);

      expect(component.more.emit).toHaveBeenCalledOnceWith(event);
    });
  });

  describe('Label', () => {
    fit("Should have default value", () => {
      expect(fixture.nativeElement.querySelector('.button span').innerText).toEqual('SHOW MORE');
    });

    fit("Should have defined value", () => {
      component.label = 'Test label';
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.button span').innerText).toEqual('TEST LABEL');
    });
  });

  describe('Label', () => {
    fit("Should have default value", () => {
      expect(fixture.nativeElement.querySelector('fa-icon svg.fa-circle-chevron-down')).toBeTruthy();
    });

    fit("Should have defined value", () => {
      component.icon = faUser;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('fa-icon svg.fa-user')).toBeTruthy();
    });
  });
});
