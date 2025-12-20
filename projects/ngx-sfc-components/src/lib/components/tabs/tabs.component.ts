import { Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList, TemplateRef } from '@angular/core';
import { CommonConstants, firstOrDefault, isDefined, TemplateReferenceDirective } from 'ngx-sfc-common';
import { BehaviorSubject, combineLatest, map, Observable, startWith } from 'rxjs';
import { TabService } from './service/tab.service';
import { TabsTemplate } from './tabs-template.enum';
import { ITabsViewModel } from './models/tabs-view.model';
import { ITabModel } from './models/tab.model';
import { empty } from 'ngx-sfc-common';

@Component({
  selector: 'sfc-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  providers: [TabService]
})
export class TabsComponent implements OnInit {

  TabsTemplate = TabsTemplate;

  @Input()
  tabs: ITabModel[] = [];

  // Template references 

  @Input()
  label?: TemplateRef<any>;

  @Input()
  slider?: TemplateRef<any>;

  @Input()
  body?: TemplateRef<any>;

  // End Template references

  @Output()
  selected: EventEmitter<ITabModel> = new EventEmitter<ITabModel>();

  @ContentChildren(TemplateReferenceDirective, { read: TemplateReferenceDirective })
  templates: QueryList<TemplateReferenceDirective> | undefined;

  public vm$?: Observable<ITabsViewModel>;

  private tabsSubject?: BehaviorSubject<ITabModel[]>;

  public data: any | empty = null;

  constructor(private tabService: TabService) { }

  ngOnInit(): void {
    this.tabsSubject = new BehaviorSubject<ITabModel[]>(this.tabs)

    const selectedIndex = this.getSelectedIndex(this.tabs),
      tabs$ = this.tabsSubject.asObservable(),
      selected$ = this.tabService.selected$
        .pipe(
          startWith(selectedIndex)
        );

    this.vm$ = combineLatest([
      tabs$,
      selected$
    ]).pipe(
      map(([tabs, selectedIndex]) => {
        this.updateSelected(tabs, selectedIndex);

        return {
          tabs: tabs,
          selectedTab: isDefined(selectedIndex) ? tabs[selectedIndex] : null,
          sliderContextData: { count: tabs.length, index: selectedIndex },
          tabWidth: 100 / (tabs ? tabs.length : 1)
        }
      })
    );
  }

  public selectTab(tab: ITabModel, index: number) {
    if (!tab.disabled && !tab.selected) {
      this.tabService.select(index);
      this.selected.emit(tab);
    }
  }

  private getSelectedIndex(tabs: ITabModel[]): number {
    let selectedIndex = tabs.indexOf(firstOrDefault(tabs,
      tab => tab.selected! && !tab.disabled) as ITabModel);

    if (selectedIndex == CommonConstants.NOT_FOUND_INDEX) {
      selectedIndex = tabs.indexOf(firstOrDefault(tabs, tab => !tab.disabled) as ITabModel);
      return selectedIndex == CommonConstants.NOT_FOUND_INDEX ? 0 : selectedIndex;
    }

    return selectedIndex;
  }

  private updateSelected(tabs: ITabModel[], selectedIndex: number): void {
    tabs.forEach((item: ITabModel, index: number) => {
      item.selected = index == selectedIndex;

      if (item.selected) {
        this.data = item.data;
      }
    });
  }
}
