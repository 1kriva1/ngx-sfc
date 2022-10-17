import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { ModalService } from '../../service/modal.service';
import { ModalOpenOnClickDirective } from './modal-open-on-click.directive';

@Component({
  template: `<button #button1>Modal Button 1</button>     
             <button #button2>Modal Button 2</button>         
             <div *sfcModalOpenOnClick="[button1, button2]">
                  <span class="modal-content">Modal content</span>
              </div>
              `
})
class TestModalOpenOnClickComponent {

  @ViewChild(ModalOpenOnClickDirective, { static: false })
  directive: ModalOpenOnClickDirective = null as unknown as ModalOpenOnClickDirective;
}

describe('Directive: ModalOpenOnClick', () => {

  let component: TestModalOpenOnClickComponent;
  let fixture: ComponentFixture<TestModalOpenOnClickComponent>;
  let modalServiceSpy: jasmine.SpyObj<ModalService>;

  beforeEach(async () => {
    modalServiceSpy = jasmine.createSpyObj('ModalService', ['open', 'close', 'close$']);
    modalServiceSpy.close$ = of();

    await TestBed.configureTestingModule({
      declarations: [ModalOpenOnClickDirective, TestModalOpenOnClickComponent],
      providers: [{ provide: ModalService, useValue: modalServiceSpy }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestModalOpenOnClickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create an instance', () => {
      expect(component.directive).toBeDefined();
    });

    fit("Should call unsubscribe on close subscription, when directive destroyed", () => {
      const unsubscribeSpy = spyOn(
        (component.directive as any)._closeSubscription,
        'unsubscribe'
      ).and.callThrough();

      component.directive?.ngOnDestroy();

      expect(unsubscribeSpy).toHaveBeenCalled();
    });
  });

  describe('Elements', () => {
    fit('Should have two buttons', () => {
      const elements: any = (<any>component.directive).elements;

      expect(elements).toBeDefined();
      expect(elements.length).toEqual(2);
      expect(elements[0].innerText).toEqual('Modal Button 1');
      expect(elements[1].innerText).toEqual('Modal Button 2');
      expect(Array.isArray(elements)).toBeTruthy();
    });

    fit('Should have one button(second)', () => {
      component.directive.modalOpenOnClick = fixture.nativeElement.querySelectorAll('button')[1];
      fixture.detectChanges();

      const elements: any = (<any>component.directive).elements;

      expect(elements.length).toEqual(1);
      expect(elements[0].innerText).toEqual('Modal Button 2');
      expect(Array.isArray(elements)).toBeTruthy();
    });

    fit('Should have previous elements', () => {
      component.directive.modalOpenOnClick = null as unknown as HTMLElement;
      fixture.detectChanges();

      const elements: any = (<any>component.directive).elements;

      expect(elements.length).toEqual(2);
      expect(elements[0].innerText).toEqual('Modal Button 1');
      expect(elements[1].innerText).toEqual('Modal Button 2');
    });
  });

  describe('Click event', () => {
    fit('Should call modal open', () => {
      const btnEl: any = fixture.debugElement.query(By.css('button'));

      btnEl.nativeElement.dispatchEvent(new MouseEvent('click'));

      expect(modalServiceSpy.open).toHaveBeenCalledTimes(1);
      expect(modalServiceSpy.open).toHaveBeenCalledWith(btnEl.nativeElement);
    });

    fit('Should not call modal open', () => {
      component.directive.ngOnDestroy();
      fixture.detectChanges();

      const btnEl: any = fixture.debugElement.query(By.css('button'));

      btnEl.nativeElement.dispatchEvent(new MouseEvent('click'));

      expect(modalServiceSpy.open).not.toHaveBeenCalled();
    });

    fit('Should not call modal open for unregistered button', () => {
      component.directive.ngOnDestroy();
      fixture.detectChanges();

      component.directive.modalOpenOnClick = fixture.nativeElement.querySelectorAll('button')[1];
      fixture.detectChanges();

      const btnEls: any = fixture.debugElement.queryAll(By.css('button'));

      btnEls[0].nativeElement.dispatchEvent(new MouseEvent('click'));

      expect(modalServiceSpy.open).not.toHaveBeenCalled();

      btnEls[1].nativeElement.dispatchEvent(new MouseEvent('click'));

      expect(modalServiceSpy.open).toHaveBeenCalledTimes(1);
      expect(modalServiceSpy.open).toHaveBeenCalledWith(btnEls[1].nativeElement);
    });
  });
});
