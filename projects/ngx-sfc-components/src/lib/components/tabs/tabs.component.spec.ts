import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { isDefined, nameof, TemplateContentComponent, TemplateReferenceDirective } from 'ngx-sfc-common';
import { Subject } from 'rxjs';
import { ITabModel } from './models/tab.model';
import { TabService } from './service/tab.service';
import { TabsTemplate } from './tabs-template.enum';
import { TabsComponent } from './tabs.component';

@Component({
    template: `<ng-template #labelRef let-tab>
                    <h1 class="reference-label">{{tab.data.Title}}</h1>
                </ng-template>  
                
                <ng-template #sliderRef let-data>
                    <div class="reference-slider">
                        <span class="count">{{data.count}}</span>
                        <span class="index">{{data.index}}</span>
                    </div>
                </ng-template>  
                
                <ng-template #bodyRef let-data>
                    <h1 class="reference-body">{{data.Title}}</h1>
                </ng-template>
  
               <sfc-tabs [tabs]="TABS">
  
                  <ng-template *ngIf="showContent" [sfcTemplateReference]="TabsTemplate.Label" let-tab>
                    <h2 class="template-label">{{tab.data.Title}}</h2>
                  </ng-template>
  
                  <ng-template *ngIf="showContent" [sfcTemplateReference]="TabsTemplate.Slider" let-data>
                    <div class="template-slider">
                        <span class="count">{{data.count}}</span>
                        <span class="index">{{data.index}}</span>
                    </div>
                  </ng-template>
  
                  <ng-template *ngIf="showContent" [sfcTemplateReference]="TabsTemplate.Body" let-data>
                    <h2 class="template-body">{{data.Title}}</h2>
                  </ng-template>
  
               </sfc-tabs>`
})
class TestTabsComponent {

    TabsTemplate = TabsTemplate;

    @ViewChild(TabsComponent, { static: false })
    tabs?: TabsComponent;

    @ViewChild('labelRef', { static: false })
    labelTemplateRef?: TemplateRef<any>;

    @ViewChild('sliderRef', { static: false })
    sliderTemplateRef?: TemplateRef<any>;

    @ViewChild('bodyRef', { static: false })
    bodyTemplateRef?: TemplateRef<any>;

    showContent: boolean = false;

    readonly TABS: ITabModel[] = [
        {
            data: { Title: 'Test title' },
            selected: false,
            disabled: false
        }
    ]
}
describe('Component: TabsComponent', () => {
    let component: TestTabsComponent;
    let fixture: ComponentFixture<TestTabsComponent>;
    let tabServiceSpy: jasmine.SpyObj<TabService>;

    beforeEach(async () => {
        tabServiceSpy = jasmine.createSpyObj('TabService', ['select']);
        tabServiceSpy.selected$ = new Subject<number>();

        TestBed.overrideProvider(TabService, { useValue: tabServiceSpy });

        await TestBed.configureTestingModule({
            imports: [FontAwesomeModule],
            declarations: [TemplateReferenceDirective, TemplateContentComponent, TabsComponent, TestTabsComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestTabsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('General', () => {
        fit('Should create component', () => {
            expect(component.tabs).toBeTruthy();
        });

        fit('Should create main elements', () => {
            expect(fixture.nativeElement.querySelector('div.container')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('div.tabs-container')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('div.tabs')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('div.body-container')).toBeTruthy();
        });
    });

    describe('Tabs', () => {
        fit('Should exist one tab', () => {
            expect(fixture.nativeElement.querySelectorAll('div.tab').length).toEqual(1);
        });

        fit('Should exist defined tabs count', () => {
            initTabs(2);

            expect(fixture.nativeElement.querySelectorAll('div.tab').length).toEqual(2);
        });

        fit('Should not exist any tab', () => {
            initTabs(0);

            expect(fixture.nativeElement.querySelectorAll('div.tab').length).toEqual(0);
        });

        describe('Width', () => {
            fit('Should have width for one tab', () => {
                const tabEls: DebugElement[] = fixture.debugElement.queryAll(By.css('div.tab'));

                tabEls.forEach(tab => {
                    expect(tab.styles['width']).toEqual('100%');
                });
            });

            fit('Should have width for three tabs', () => {
                initTabs(3);

                const tabEls: DebugElement[] = fixture.debugElement.queryAll(By.css('div.tab'));

                tabEls.forEach(tab => {
                    expect(tab.styles['width']).toEqual('33.3333%');
                });
            });
        });

        describe('Select tab', () => {
            fit('Should select tab', () => {
                spyOn<any>(component.tabs, nameof<TabsComponent>('selectTab')).and.callThrough();
                initTabs(3);

                selectTab(2);

                expect(tabServiceSpy.select).toHaveBeenCalledOnceWith(2);
                expect((component.tabs as any)[nameof<TabsComponent>('selectTab')]).toHaveBeenCalledOnceWith(component.tabs?.tabs[2], 2);
            });

            fit('Should not select tab, if fit already selected', () => {
                spyOn<any>(component.tabs, nameof<TabsComponent>('selectTab')).and.callThrough();
                initTabs(3);
                (component.tabs as TabsComponent).tabs[2].selected = true;
                fixture.detectChanges();

                selectTab(2);

                expect(tabServiceSpy.select).not.toHaveBeenCalled();
            });

            fit('Should not select tab, if fit disabled', () => {
                spyOn<any>(component.tabs, nameof<TabsComponent>('selectTab')).and.callThrough();
                initTabs(3);
                (component.tabs as TabsComponent).tabs[2].disabled = true;
                fixture.detectChanges();

                selectTab(2);

                expect(tabServiceSpy.select).not.toHaveBeenCalled();
            });
        });

        describe('Label', () => {
            fit("Should have reference content", () => {
                (component.tabs as TabsComponent).label = component.labelTemplateRef;
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('h1.reference-label')).toBeTruthy();
                expect(fixture.nativeElement.querySelector('h1.reference-label').innerText).toEqual('Test title');
                expect(fixture.nativeElement.querySelector('h2.template-label')).toBeNull();
            });

            fit("Should have template content", () => {
                component.showContent = true;
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('h2.template-label')).toBeTruthy();
                expect(fixture.nativeElement.querySelector('h2.template-label').innerText).toEqual('Test title');
                expect(fixture.nativeElement.querySelector('h1.reference-label')).toBeNull();
            });
        });

        describe('Slider', () => {
            fit("Should have reference content", () => {
                (component.tabs as TabsComponent).slider = component.sliderTemplateRef;
                fixture.detectChanges();

                initTabs(3, 2);

                expect(fixture.nativeElement.querySelector('div.reference-slider')).toBeTruthy();
                expect(fixture.nativeElement.querySelector('div.reference-slider .count').innerText).toEqual('3');
                expect(fixture.nativeElement.querySelector('div.reference-slider .index').innerText).toEqual('2');
                expect(fixture.nativeElement.querySelector('div.template-slider')).toBeNull();
            });

            fit("Should have template content", () => {
                component.showContent = true;
                fixture.detectChanges();

                initTabs(3, 2);

                expect(fixture.nativeElement.querySelector('div.template-slider')).toBeTruthy();
                expect(fixture.nativeElement.querySelector('div.template-slider .count').innerText).toEqual('3');
                expect(fixture.nativeElement.querySelector('div.template-slider .index').innerText).toEqual('2');
                expect(fixture.nativeElement.querySelector('div.reference-slider')).toBeNull();
            });
        });

        describe('Body', () => {
            fit('Should show first tabs body', () => {
                (component.tabs as TabsComponent).body = component.bodyTemplateRef;
                fixture.detectChanges();

                initTabs(3);

                expect(fixture.nativeElement.querySelector('h1.reference-body').innerText).toEqual('Test title 0');
            });

            fit('Should show last tabs body, after select', () => {
                (component.tabs as TabsComponent).body = component.bodyTemplateRef;
                fixture.detectChanges();

                initTabs(3);

                selectTab(2);

                expect(fixture.nativeElement.querySelector('h1.reference-body').innerText).toEqual('Test title 2');
            });

            fit('Should show second tabs body, because first is disabled', () => {
                (component.tabs as TabsComponent).body = component.bodyTemplateRef;
                fixture.detectChanges();

                initTabs(3, undefined, 0);

                expect(fixture.nativeElement.querySelector('h1.reference-body').innerText).toEqual('Test title 1');
            });

            fit('Should show second tabs body, because is selected', () => {
                (component.tabs as TabsComponent).body = component.bodyTemplateRef;
                fixture.detectChanges();

                initTabs(3, 1);

                expect(fixture.nativeElement.querySelector('h1.reference-body').innerText).toEqual('Test title 1');
            });

            fit("Should have reference content", () => {
                (component.tabs as TabsComponent).body = component.bodyTemplateRef;
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('h1.reference-body')).toBeTruthy();
                expect(fixture.nativeElement.querySelector('h2.template-body')).toBeNull();
            });

            fit("Should have template content", () => {
                component.showContent = true;
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('h2.template-body')).toBeTruthy();
                expect(fixture.nativeElement.querySelector('h1.reference-body')).toBeNull();
            });
        });
    });

    function initTabs(count: number = 1, selectedIndex?: number, disabledIndex?: number) {
        const tabs: ITabModel[] = [];
        for (let index = 0; index < count; index++) {
            tabs.push({
                data: { Title: `Test title ${index}` },
                selected: isDefined(selectedIndex)
                    ? selectedIndex == index
                    : false,
                disabled: isDefined(disabledIndex)
                    ? disabledIndex == index
                    : false,
            })
        };
        (component.tabs as TabsComponent).tabs = tabs;
        component.tabs?.ngOnInit();
        fixture.detectChanges();
    }

    function selectTab(index: number) {
        const tabEls: DebugElement[] = fixture.debugElement.queryAll(By.css('div.tab'));
        tabEls[index].nativeElement.dispatchEvent(new KeyboardEvent('click'));
        (tabServiceSpy.selected$ as any).next(index);
        fixture.detectChanges();
    }
});
