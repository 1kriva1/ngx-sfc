import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from '../../../button/button.component';
import { ModalService } from '../../service/modal.service';
import { DefaultModalFooterComponent } from './default-modal-footer.component';
import { ComponentSizeDirective } from '../../../../directives/component-size/component-size.directive';
import { IDefaultModalFooterModel } from './default-modal-footer.model';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ButtonType } from '../../../button/button-type.enum';

describe('Component: DefaultModalFooterComponent', () => {
  let component: DefaultModalFooterComponent;
  let fixture: ComponentFixture<DefaultModalFooterComponent>;
  let modalServiceSpy: jasmine.SpyObj<ModalService>;

  beforeEach(async () => {
    modalServiceSpy = jasmine.createSpyObj('ModalService', ['close']);

    await TestBed.configureTestingModule({
      declarations: [DefaultModalFooterComponent, ButtonComponent, ComponentSizeDirective],
      providers: [{ provide: ModalService, useValue: modalServiceSpy }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultModalFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Apply button', () => {
    fit('Should exist by default', () => {
      expect(fixture.nativeElement.querySelectorAll('sfc-button span.text')[0].innerText)
        .toEqual('Ok');
    });

    fit('Should have appropriate attributes', () => {
      const applyBtn: DebugElement = fixture.debugElement.queryAll(By.css('sfc-button'))[0];

      expect(applyBtn.componentInstance.types).toEqual([ButtonType.Rounded]);
      expect(applyBtn.attributes['ng-reflect-custom-size']).toEqual(component.BUTTON_CUSTOM_SIZE.toString());
    });

    fit('Should not exist', () => {
      (component.model as IDefaultModalFooterModel).applyButton = false;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('sfc-button span.text').innerText)
        .not.toEqual('Ok');
    });

    fit('Should call modal service', () => {
      const applyBtn: any = fixture.debugElement.queryAll(By.css('sfc-button'))[0];

      applyBtn.nativeElement.dispatchEvent(new MouseEvent('click'));

      expect(modalServiceSpy.close).toHaveBeenCalledTimes(1);
    });

    fit('Should call model method', () => {
      (component?.model as IDefaultModalFooterModel).onApply = () => { };
      fixture.detectChanges();

      spyOn(component?.model as any, 'onApply');

      const applyBtn: any = fixture.debugElement.queryAll(By.css('sfc-button'))[0];

      applyBtn.nativeElement.dispatchEvent(new MouseEvent('click'));

      expect(modalServiceSpy.close).not.toHaveBeenCalledTimes(1);
      expect(component?.model?.onApply).toHaveBeenCalledTimes(1);
    });
  });

  describe('Cancel button', () => {
    fit('Should exist by default', () => {
      expect(fixture.nativeElement.querySelectorAll('sfc-button span.text')[1].innerText)
        .toEqual('Cancel');
    });

    fit('Should have appropriate attributes', () => {
      const cancelBtn: DebugElement = fixture.debugElement.queryAll(By.css('sfc-button'))[1];

      expect(cancelBtn.componentInstance.types).toEqual([ButtonType.Rounded]);
      expect(cancelBtn.attributes['ng-reflect-custom-size']).toEqual(component.BUTTON_CUSTOM_SIZE.toString());
    });

    fit('Should not exist', () => {
      (component.model as IDefaultModalFooterModel).cancelButton = false;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('sfc-button span.text').innerText)
        .not.toEqual('Cancel');
    });

    fit('Should call modal service', () => {
      const cancelBtn: any = fixture.debugElement.queryAll(By.css('sfc-button'))[1];

      cancelBtn.nativeElement.dispatchEvent(new MouseEvent('click'));

      expect(modalServiceSpy.close).toHaveBeenCalledTimes(1);
    });

    fit('Should call model method', () => {
      (component?.model as IDefaultModalFooterModel).onCancel = () => { };
      fixture.detectChanges();

      spyOn(component?.model as any, 'onCancel');

      const cancelBtn: any = fixture.debugElement.queryAll(By.css('sfc-button'))[1];

      cancelBtn.nativeElement.dispatchEvent(new MouseEvent('click'));

      expect(modalServiceSpy.close).not.toHaveBeenCalledTimes(1);
      expect(component?.model?.onCancel).toHaveBeenCalledTimes(1);
    });
  });
});
