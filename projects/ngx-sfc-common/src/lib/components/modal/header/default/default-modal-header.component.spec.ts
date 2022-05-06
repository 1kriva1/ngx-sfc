import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CloseComponent } from '../../../close/close.component';
import { ModalService } from '../../service/modal.service';
import { DefaultModalHeaderComponent } from './default-modal-header.component';

describe('Component: DefaultModalHeaderComponent', () => {
  let component: DefaultModalHeaderComponent;
  let fixture: ComponentFixture<DefaultModalHeaderComponent>;
  let modalServiceSpy: jasmine.SpyObj<ModalService>;

  beforeEach(async () => {
    modalServiceSpy = jasmine.createSpyObj('ModalService', ['close']);

    await TestBed.configureTestingModule({
      declarations: [CloseComponent, DefaultModalHeaderComponent],
      providers: [{ provide: ModalService, useValue: modalServiceSpy }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultModalHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Model', () => {
    fit('Should be default model', () => {
      expect(fixture.nativeElement.querySelector('i.icon').className).toContain('fa fa-window-restore');
      expect(fixture.nativeElement.querySelector('span.label').innerText).toContain('Modal');
      expect(fixture.nativeElement.querySelector('span.close')).toBeDefined();
    });

    fit('Should be defined model', () => {
      component.model = { text: 'Custom text', icon: 'fa fa-test', showCloseIcon: false };
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('i.icon').className).toContain(component.model.icon);
      expect(fixture.nativeElement.querySelector('span.label').innerText).toContain(component.model.text);
      expect(fixture.nativeElement.querySelector('span.close')).toBeNull();
    });
  });

  describe('Close', () => {
    fit('Should create component', () => {
      expect(fixture.nativeElement.querySelector('sfc-close')).toBeTruthy();
    });

    fit('Should call modal service close method', () => {
      const closeEl: any = fixture.debugElement.query(By.css('sfc-close'));

      closeEl.nativeElement.dispatchEvent(new MouseEvent('click'));

      expect(modalServiceSpy.close).toHaveBeenCalledTimes(1);
    });
  });
});
