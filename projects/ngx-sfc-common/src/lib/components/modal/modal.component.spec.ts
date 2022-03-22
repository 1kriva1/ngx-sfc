import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentSizeDirective, TemplateReferenceDirective } from '../../directives';
import { nameof } from '../../utils';
import { ButtonComponent } from '../button/button.component';
import { DefaultModalFooterComponent } from './footer/default/default-modal-footer.component';
import { DefaultModalHeaderComponent } from './header/default/default-modal-header.component';
import { ModalTemplate } from './modal-template.enum';
import { ModalComponent } from './modal.component';
import { ModalService } from './service/modal.service';

@Component({
  template: `<ng-template #headerRef>
                  <h1 class="reference-header">{{HEADER_MODEL.Title}}</h1>
              </ng-template>  
              
              <ng-template #bodyRef>
                  <h1 class="reference-body">{{BODY_MODEL.Title}}</h1>
              </ng-template>  
              
              <ng-template #footerRef>
                  <h1 class="reference-footer">{{FOOTER_MODEL.Title}}</h1>
              </ng-template>

             <sfc-modal>

              <ng-template *ngIf="showContent" [sfcTemplateReference]="ModalTemplate.Header">
                <h2 class="template-header">{{HEADER_MODEL.Title}}</h2>
              </ng-template>

              <ng-template *ngIf="showContent" [sfcTemplateReference]="ModalTemplate.Body">
                <h2 class="template-body">{{BODY_MODEL.Title}}</h2>
              </ng-template>

              <ng-template *ngIf="showContent" [sfcTemplateReference]="ModalTemplate.Footer">
                <h2 class="template-footer">{{FOOTER_MODEL.Title}}</h2>
              </ng-template>

             </sfc-modal>`
})
class TestSfcModalComponent {

  ModalTemplate = ModalTemplate;

  @ViewChild(ModalComponent, { static: false })
  modal?: ModalComponent;

  @ViewChild('headerRef', { static: false })
  headerTemplateRef?: TemplateRef<any>;

  @ViewChild('bodyRef', { static: false })
  bodyTemplateRef?: TemplateRef<any>;

  @ViewChild('footerRef', { static: false })
  footerTemplateRef?: TemplateRef<any>;

  showContent: boolean = false;

  readonly HEADER_MODEL = {
    Title: 'Header title'
  }

  readonly BODY_MODEL = {
    Title: 'Body title'
  }

  readonly FOOTER_MODEL = {
    Title: 'Footer title'
  }
}
describe('Component: ModalComponent', () => {
  let component: TestSfcModalComponent;
  let fixture: ComponentFixture<TestSfcModalComponent>;
  let modalServiceSpy: jasmine.SpyObj<ModalService>;

  beforeEach(async () => {
    modalServiceSpy = jasmine.createSpyObj('ModalService', ['close']);

    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [ModalComponent, DefaultModalHeaderComponent, DefaultModalFooterComponent,
        ButtonComponent, ComponentSizeDirective, TemplateReferenceDirective, TestSfcModalComponent],
      providers: [{ provide: ModalService, useValue: modalServiceSpy }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSfcModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create component', () => {
      expect(component.modal).toBeTruthy();
    });

    fit("Should have main elements", () => {
      expect(fixture.nativeElement.querySelector('div.overlay')).not.toBeNull();
      expect(fixture.nativeElement.querySelector('div.content')).not.toBeNull();
      expect(fixture.nativeElement.querySelector('div.header')).not.toBeNull();
      expect(fixture.nativeElement.querySelector('div.body')).not.toBeNull();
      expect(fixture.nativeElement.querySelector('div.footer')).not.toBeNull();
    });

    fit("Should call modal service close method", () => {
      spyOn<any>(component.modal, nameof<ModalComponent>('close')).and.callThrough();

      document.dispatchEvent(new KeyboardEvent("keydown", { "key": "Esc" }));

      expect(modalServiceSpy.close).toHaveBeenCalledTimes(1);
      expect((component.modal as any)[nameof<ModalComponent>('close')]).toHaveBeenCalledTimes(1);
    });

    fit("Should not call modal service close method", () => {
      spyOn<any>(component.modal, nameof<ModalComponent>('close')).and.callThrough();
      (component.modal as any).hideOnEsc = false;
      fixture.detectChanges();

      document.dispatchEvent(new KeyboardEvent("keydown", { "key": "Esc" }));

      expect(modalServiceSpy.close).not.toHaveBeenCalled();
      expect((component.modal as any)[nameof<ModalComponent>('close')]).not.toHaveBeenCalled();
    });
  });

  describe('Overlay', () => {
    fit('Should call modal service close method', () => {
      spyOn<any>(component.modal, nameof<ModalComponent>('close')).and.callThrough();

      fixture.debugElement.query(By.css('div.overlay'))
        .nativeElement.dispatchEvent(new MouseEvent('click'));

      expect(modalServiceSpy.close).toHaveBeenCalledTimes(1);
      expect((component.modal as any)[nameof<ModalComponent>('close')]).toHaveBeenCalledTimes(1);
    });

    fit('Should not call modal service close method', () => {
      spyOn<any>(component.modal, nameof<ModalComponent>('close')).and.callThrough();
      (component.modal as any).hideOnClickOutside = false;
      fixture.detectChanges();

      fixture.debugElement.query(By.css('div.overlay'))
        .nativeElement.dispatchEvent(new MouseEvent('click'));

      expect(modalServiceSpy.close).not.toHaveBeenCalled();
      expect((component.modal as any)[nameof<ModalComponent>('close')]).not.toHaveBeenCalled();
    });
  });

  describe('Content', () => {
    fit('Should not call modal service close method', () => {
      spyOn<any>(component.modal, nameof<ModalComponent>('close')).and.callThrough();

      fixture.debugElement.query(By.css('div.content'))
        .nativeElement.dispatchEvent(new MouseEvent('click'));

      expect(modalServiceSpy.close).not.toHaveBeenCalled();
      expect((component.modal as any)[nameof<ModalComponent>('close')]).not.toHaveBeenCalled();
    });
  });

  describe('Header', () => {
    fit("Should have reference content", () => {
      (component.modal as any).header = component.headerTemplateRef;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('h1.reference-header')).not.toBeNull();
      expect(fixture.nativeElement.querySelector('h1.reference-header').textContent).toEqual(component.HEADER_MODEL.Title);
      expect(fixture.nativeElement.querySelector('h2.template-header')).toBeNull();
    });

    fit("Should have template content", () => {
      component.showContent = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('h2.template-header')).not.toBeNull();
      expect(fixture.nativeElement.querySelector('h2.template-header').textContent).toEqual(component.HEADER_MODEL.Title);
      expect(fixture.nativeElement.querySelector('h1.reference-header')).toBeNull();
    });

    fit("Should have default content", () => {
      expect(fixture.nativeElement.querySelector('sfc-default-modal-header')).not.toBeNull();
      expect(fixture.nativeElement.querySelector('h1.reference-header')).toBeNull();
      expect(fixture.nativeElement.querySelector('h2.template-header')).toBeNull();
    });
  });

  describe('Body', () => {
    fit("Should have reference content", () => {
      (component.modal as any).body = component.bodyTemplateRef;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('h1.reference-body')).not.toBeNull();
      expect(fixture.nativeElement.querySelector('h1.reference-body').textContent).toEqual(component.BODY_MODEL.Title);
      expect(fixture.nativeElement.querySelector('h2.template-body')).toBeNull();
    });

    fit("Should have template content", () => {
      component.showContent = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('h2.template-body')).not.toBeNull();
      expect(fixture.nativeElement.querySelector('h2.template-body').textContent).toEqual(component.BODY_MODEL.Title);
      expect(fixture.nativeElement.querySelector('h1.reference-body')).toBeNull();
    });
  });

  describe('Footer', () => {
    fit("Should have reference content", () => {
      (component.modal as any).footer = component.footerTemplateRef;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('h1.reference-footer')).not.toBeNull();
      expect(fixture.nativeElement.querySelector('h1.reference-footer').textContent).toEqual(component.FOOTER_MODEL.Title);
      expect(fixture.nativeElement.querySelector('h2.template-footer')).toBeNull();
    });

    fit("Should have template content", () => {
      component.showContent = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('h2.template-footer')).not.toBeNull();
      expect(fixture.nativeElement.querySelector('h2.template-footer').textContent).toEqual(component.FOOTER_MODEL.Title);
      expect(fixture.nativeElement.querySelector('h1.reference-footer')).toBeNull();
    });

    fit("Should have default content", () => {
      expect(fixture.nativeElement.querySelector('sfc-default-modal-footer')).not.toBeNull();
      expect(fixture.nativeElement.querySelector('h1.reference-footer')).toBeNull();
      expect(fixture.nativeElement.querySelector('h2.template-footer')).toBeNull();
    });
  });
});
