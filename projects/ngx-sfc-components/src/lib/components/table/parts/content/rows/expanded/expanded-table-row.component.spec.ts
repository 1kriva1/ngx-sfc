import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Position, TemplateContentComponent, TemplateReferenceDirective, UIClass } from 'ngx-sfc-common';
import { ExpandedTableRowTemplate } from './expanded-table-row-template.enum';
import { ExpandedTableRowComponent } from './expanded-table-row.component';

describe('Component: ExpandedTableRow', () => {
    let component: ExpandedTableRowComponent;
    let fixture: ComponentFixture<ExpandedTableRowComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TemplateContentComponent, ExpandedTableRowComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ExpandedTableRowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('General', () => {
        fit('Should create component', () => {
            expect(component).toBeTruthy();
        });

        fit('Should have main elements', () => {
            expect(fixture.nativeElement.querySelector('div.container')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('div.content')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('div.expanded')).toBeTruthy();
        });

        fit('Should not be even by default', () => {
            expect(fixture.nativeElement.classList.contains(UIClass.Even)).toBeFalse();
        });

        fit('Should be even, if index is even', () => {
            component.model.index = 1;
            fixture.detectChanges();

            expect(fixture.nativeElement.classList.contains(UIClass.Even)).toBeTrue();
        });

        fit('Should not be even, if index is not even', () => {
            component.model.index = 0;
            fixture.detectChanges();

            expect(fixture.nativeElement.classList.contains(UIClass.Even)).toBeFalse();
        });

        fit('Should not have pointer class by default', () => {
            expect(fixture.nativeElement.classList.contains(UIClass.Pointer)).toBeFalse();
        });

        fit('Should have pointer class', () => {
            component.selectOnClick = true;
            fixture.detectChanges();

            expect(fixture.nativeElement.classList.contains(UIClass.Pointer)).toBeTrue();
        });

        fit('Should not have pointer class', () => {
            component.selectOnClick = false;
            fixture.detectChanges();

            expect(fixture.nativeElement.classList.contains(UIClass.Pointer)).toBeFalse();
        });

        fit('Should not be expanded by default', () => {
            expect(component.expanded).toBeFalsy();
        });

        fit('Should be expanded', () => {
            fixture.nativeElement.querySelector('div.content').dispatchEvent(new MouseEvent('click', {}));
            fixture.detectChanges();

            expect(component.expanded).toBeTrue();
        });

        fit('Should toggle expanded', () => {
            fixture.nativeElement.querySelector('div.content').dispatchEvent(new MouseEvent('click', {}));
            fixture.detectChanges();

            expect(component.expanded).toBeTruthy();

            fixture.nativeElement.querySelector('div.content').dispatchEvent(new MouseEvent('click', {}));
            fixture.detectChanges();

            expect(component.expanded).toBeFalsy();
        });

        fit('Should context data have default value', () => {
            expect(component.contextData).toEqual({
                model: { dataModel: { data: {} }, index: 0 },
                columns: [],
                columnWidth: 1,
                position: Position.Left,
                expanded: false,
                even: false,
            });
        });

        fit('Should context data have defined value', () => {
            component.columnWidth = 6;
            component.position = Position.Left;
            component.model = { dataModel: { data: { field: 1 } }, index: 1 };
            component.columns = [
                { name: '', field: '' }, { name: '', field: '' }, { name: '', field: '' },
                { name: '', field: '' }, { name: '', field: '' }, { name: '', field: '' }];
            fixture.detectChanges();

            fixture.nativeElement.querySelector('div.content').dispatchEvent(new MouseEvent('click', {}));
            fixture.detectChanges();

            expect(component.contextData).toEqual({
                model: component.model,
                columns: component.columns,
                columnWidth: component.columnWidth,
                position: component.position,
                expanded: true,
                even: true
            });
        });
    });

    describe('Content', () => {
        fit('Should not be expanded', () => {
            expect(fixture.debugElement.query(By.css('div.expanded')).nativeElement.clientHeight > 0).toBeFalsy();
        });

        fit('Should be expanded', () => {
            fixture.nativeElement.querySelector('div.content').dispatchEvent(new MouseEvent('click', {}));
            fixture.detectChanges();

            expect(fixture.debugElement.query(By.css('div.expanded')).nativeElement.clientHeight > 0).toBeTruthy();
        });
    });
});

@Component({
    template: `<ng-template #contentRef let-row>
                <div class="content-ref">
                  <span class="content-width">{{row.columnWidth}}</span>
                  <span class="content-position">{{row.position}}</span>
                  <span class="content-expanded">{{row.expanded}}</span>
                  <span class="content-column-first">{{row.columns[0].name}}</span>
                  <span class="content-data">{{row.model.dataModel.data.field}}</span>
                  <span class="content-even">{{row.even}}</span>
                </div>
              </ng-template>  
              
              <ng-template #expandedContentRef let-content>
                <div class="expanded-content-ref">
                  <span class="content-width">{{content.columnWidth}}</span>
                  <span class="content-position">{{content.position}}</span>
                  <span class="content-expanded">{{content.expanded}}</span>
                  <span class="content-column-first">{{content.columns[0].name}}</span>
                  <span class="content-data">{{content.model.dataModel.data.field}}</span>
                  <span class="content-even">{{content.even}}</span>
                </div>
              </ng-template>
  
             <sfc-expanded-table-row>
  
             <ng-template *ngIf="showContent" [sfcTemplateReference]="ExpandedTableRowTemplate.Row" let-row>
                <div class="content-template">
                  <span class="content-width">{{row.columnWidth}}</span>
                  <span class="content-position">{{row.position}}</span>
                  <span class="content-expanded">{{row.expanded}}</span>
                  <span class="content-column-first">{{row.columns[0].name}}</span>
                  <span class="content-data">{{row.model.dataModel.data.field}}</span>
                  <span class="content-even">{{row.even}}</span>
                </div>
               </ng-template>
  
               <ng-template *ngIf="showContent" [sfcTemplateReference]="ExpandedTableRowTemplate.Content" let-content>
                <div class="expanded-content-template">
                  <span class="content-width">{{content.columnWidth}}</span>
                  <span class="content-position">{{content.position}}</span>
                  <span class="content-expanded">{{content.expanded}}</span>
                  <span class="content-column-first">{{content.columns[0].name}}</span>
                  <span class="content-data">{{content.model.dataModel.data.field}}</span>
                  <span class="content-even">{{content.even}}</span>
                </div>
               </ng-template>
             </sfc-expanded-table-row>`
})
class TestExpandedTableRowComponent {

    ExpandedTableRowTemplate = ExpandedTableRowTemplate;

    @ViewChild(ExpandedTableRowComponent, { static: false })
    expandedTableRow!: ExpandedTableRowComponent;

    @ViewChild('contentRef', { static: false })
    contentTemplateRef!: TemplateRef<any>;

    @ViewChild('expandedContentRef', { static: false })
    expandedContentTemplateRef!: TemplateRef<any>;

    showContent: boolean = false;
}

describe('Component: ExpandedTableRow: Templates', () => {
    let component: TestExpandedTableRowComponent;
    let fixture: ComponentFixture<TestExpandedTableRowComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TemplateContentComponent, TemplateReferenceDirective, ExpandedTableRowComponent, TestExpandedTableRowComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestExpandedTableRowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('Row', () => {
        fit("Should add content from template reference", () => {
            component.expandedTableRow.columns = [{ name: 'content-column-name-reference', field: '' }];
            component.expandedTableRow.columnWidth = 6;
            component.expandedTableRow.position = Position.Right;
            component.expandedTableRow.model = { dataModel: { data: { field: 'test' } }, index: 0 };
            (component.expandedTableRow as ExpandedTableRowComponent).row = component.contentTemplateRef;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('div.content-ref > span.content-width').innerText).toEqual('6');
            expect(fixture.nativeElement.querySelector('div.content-ref > span.content-position').innerText).toEqual('right');
            expect(fixture.nativeElement.querySelector('div.content-ref > span.content-expanded').innerText).toEqual('false');
            expect(fixture.nativeElement.querySelector('div.content-ref > span.content-column-first').innerText).toEqual('content-column-name-reference');
            expect(fixture.nativeElement.querySelector('div.content-ref > span.content-data').innerText).toEqual('test');
            expect(fixture.nativeElement.querySelector('div.content-ref > span.content-even').innerText).toEqual('false');
        });

        fit("Should add content from template content", () => {
            component.showContent = true;
            component.expandedTableRow.columns = [{ name: 'content-column-name-content', field: '' }];
            component.expandedTableRow.columnWidth = 6;
            component.expandedTableRow.position = Position.Right;
            component.expandedTableRow.model = { dataModel: { data: { field: 'test' } }, index: 1 };
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('div.content-template > span.content-width').innerText).toEqual('6');
            expect(fixture.nativeElement.querySelector('div.content-template > span.content-position').innerText).toEqual('right');
            expect(fixture.nativeElement.querySelector('div.content-template > span.content-expanded').innerText).toEqual('false');
            expect(fixture.nativeElement.querySelector('div.content-template > span.content-column-first').innerText).toEqual('content-column-name-content');
            expect(fixture.nativeElement.querySelector('div.content-template > span.content-data').innerText).toEqual('test');
            expect(fixture.nativeElement.querySelector('div.content-template > span.content-even').innerText).toEqual('true');
        });
    });

    describe('Content', () => {
        fit("Should add expanded content from template reference", () => {
            component.expandedTableRow.columns = [{ name: 'expanded-content-column-name-reference', field: '' }];
            component.expandedTableRow.columnWidth = 6;
            component.expandedTableRow.position = Position.Right;
            component.expandedTableRow.model = { dataModel: { data: { field: 'test' } }, index: 0 };
            (component.expandedTableRow as ExpandedTableRowComponent).content = component.expandedContentTemplateRef;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('div.expanded-content-ref > span.content-width').innerText).toEqual('6');
            expect(fixture.nativeElement.querySelector('div.expanded-content-ref > span.content-position').innerText).toEqual('right');
            expect(fixture.nativeElement.querySelector('div.expanded-content-ref > span.content-expanded').innerText).toEqual('false');
            expect(fixture.nativeElement.querySelector('div.expanded-content-ref > span.content-column-first').innerText).toEqual('expanded-content-column-name-reference');
            expect(fixture.nativeElement.querySelector('div.expanded-content-ref > span.content-data').innerText).toEqual('test');
            expect(fixture.nativeElement.querySelector('div.expanded-content-ref> span.content-even').innerText).toEqual('false');
        });

        fit("Should add expanded content from template content", () => {
            component.showContent = true;
            component.expandedTableRow.columns = [{ name: 'expanded-content-column-name-content', field: '' }];
            component.expandedTableRow.columnWidth = 6;
            component.expandedTableRow.position = Position.Left;
            component.expandedTableRow.model = { dataModel: { data: { field: 'test' } }, index: 1 };
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('div.expanded-content-template > span.content-width').innerText).toEqual('6');
            expect(fixture.nativeElement.querySelector('div.expanded-content-template > span.content-position').innerText).toEqual('left');
            expect(fixture.nativeElement.querySelector('div.expanded-content-template > span.content-expanded').innerText).toEqual('false');
            expect(fixture.nativeElement.querySelector('div.expanded-content-template > span.content-column-first').innerText).toEqual('expanded-content-column-name-content');
            expect(fixture.nativeElement.querySelector('div.expanded-content-template > span.content-data').innerText).toEqual('test');
            expect(fixture.nativeElement.querySelector('div.expanded-content-template > span.content-even').innerText).toEqual('true');
        });
    });
});

