import {
  AfterViewInit, ChangeDetectorRef, Component, forwardRef,
  QueryList, TemplateRef, ViewChild, ViewChildren
} from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TemplateReferenceDirective } from "../../directives";
import { TemplateContentComponent } from "./template-content.component";

@Component({
  template: `<ng-template #reference let-data>
                  <h1 class="reference">{{data.Title}}</h1>
              </ng-template>

              <ng-template *ngIf="showTemplate" [sfcTemplateReference]="'template-1'" let-data>
                <h2 class="template-1">{{data.Title}}</h2>
              </ng-template>

              <ng-template *ngIf="showTemplate" [sfcTemplateReference]="'template-2'" let-data>
                <h2 class="template-2">{{data.Title}}</h2>
              </ng-template>

              <ng-template *ngIf="showDefault" #defaultRef let-data>
                  <h3 class="default">{{data.Title}}</h3>
              </ng-template>
              
              <sfc-template-content [referenceContent]="header" [templatesContent]="templates"
                [templateType]="templateType" [defaultContent]="default" [contextData]="data"></sfc-template-content>
            `
})
class TestTemplateContentComponent implements AfterViewInit {

  @ViewChild(forwardRef(() => TemplateContentComponent), { static: false })
  templateContent?: TemplateContentComponent;

  @ViewChild('reference', { static: false })
  reference?: TemplateRef<any>;

  @ViewChild('defaultRef', { static: false })
  default?: TemplateRef<any>;

  @ViewChildren(forwardRef(() => TemplateReferenceDirective), { read: TemplateReferenceDirective })
  templates: QueryList<TemplateReferenceDirective> | undefined;

  showDefault = false;

  showTemplate = false;

  templateType = 'template-1'

  data = {
    Title: 'Test title'
  }

  constructor(private changeDetecktor: ChangeDetectorRef) { }
  ngAfterViewInit(): void {
    this.changeDetecktor.detectChanges();
  }
}

describe('Component: TemplateContentComponent', () => {
  let component: TestTemplateContentComponent;
  let fixture: ComponentFixture<TestTemplateContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TemplateReferenceDirective, TemplateContentComponent, TestTemplateContentComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTemplateContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Reference content', () => {
    fit('Should create reference template', () => {
      (component.templateContent as TemplateContentComponent).referenceContent = component.reference;
      component.ngAfterViewInit();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('h1.reference')).toBeTruthy();
    });

    fit('Should have context data', () => {
      (component.templateContent as TemplateContentComponent).referenceContent = component.reference;
      component.ngAfterViewInit();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('h1.reference').innerText).toEqual(component.data.Title);
    });

    fit('Should not create template and default content', () => {
      (component.templateContent as TemplateContentComponent).referenceContent = component.reference;
      component.showDefault = true;
      component.showTemplate = true;
      component.ngAfterViewInit();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('h2.template-1')).toBeNull();
      expect(fixture.nativeElement.querySelector('h2.template-2')).toBeNull();
      expect(fixture.nativeElement.querySelector('h3.default')).toBeNull();
    });
  });

  describe('Template content', () => {
    fit('Should create template', () => {
      component.showTemplate = true;
      component.ngAfterViewInit();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('h2.template-1')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('h2.template-2')).toBeNull();
    });

    fit('Should create second template', () => {
      component.showTemplate = true;
      component.templateType = 'template-2'
      component.ngAfterViewInit();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('h2.template-1')).toBeNull();
      expect(fixture.nativeElement.querySelector('h2.template-2')).toBeTruthy();
    });

    fit('Should have context data', () => {
      component.showTemplate = true;
      component.ngAfterViewInit();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('h2.template-1').innerText).toEqual(component.data.Title);
    });

    fit('Should not create reference and default content', () => {
      component.showTemplate = true;
      component.ngAfterViewInit();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('h1.reference')).toBeNull();
      expect(fixture.nativeElement.querySelector('h3.default')).toBeNull();
    });
  });

  describe('Default content', () => {
    fit('Should create default content', () => {
      component.showDefault = true;
      (component.templateContent as TemplateContentComponent).defaultContent = component.default;
      component.ngAfterViewInit();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('h3.default')).toBeTruthy();
    });

    fit('Should have context data', () => {
      component.showDefault = true;
      (component.templateContent as TemplateContentComponent).defaultContent = component.default;
      component.ngAfterViewInit();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('h3.default').innerText).toEqual(component.data.Title);
    });

    fit('Should not create reference and template content', () => {
      (component.templateContent as TemplateContentComponent).defaultContent = component.default;
      component.showDefault = true;
      component.ngAfterViewInit();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('h1.reference')).toBeNull();
      expect(fixture.nativeElement.querySelector('h2.template-1')).toBeNull();
      expect(fixture.nativeElement.querySelector('h2.template-2')).toBeNull();
    });
  });
});