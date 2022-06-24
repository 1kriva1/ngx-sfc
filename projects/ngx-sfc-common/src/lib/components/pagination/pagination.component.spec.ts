import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { ShowHideElementDirective } from '../../directives';
import { UIClass } from '../../enums';
import { DelimeterComponent } from '../delimeter/delimeter.component';
import { PaginationComponent } from './pagination.component';
import { PaginationConstants } from './pagination.constants';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('Component: PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [ShowHideElementDirective, DelimeterComponent, PaginationComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create component', () => {
      expect(component).toBeTruthy();
    });

    fit('Should have main elements', () => {
      component.data$ = of([1, 2, 3]);
      component.ngOnInit();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.container')).toBeTruthy();
      expect(fixture.nativeElement.querySelectorAll('sfc-delimeter').length).toEqual(2);
    });

    fit('Should not have pages if data is empty', () => {
      component.data$ = of([]);
      component.ngOnInit();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('ul')).toBeNull();
    });

    fit('Should not have pages', () => {
      component.data$ = of([1, 2, 3]);
      component.ngOnInit();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('ul')).toBeTruthy();
    });
  });

  describe('Previous button', () => {
    fit('Should not show', () => {
      component.data$ = of([1, 2, 3, 4, 5, 6]);
      component.ngOnInit();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('ul li')[0].style.visibility).toEqual(UIClass.Hidden);
    });

    fit('Should show', () => {
      component.data$ = of([1, 2, 3, 4, 5, 6]);
      component.ngOnInit();
      fixture.detectChanges();

      // second page
      clickPaginationButton(2);

      expect(fixture.nativeElement.querySelectorAll('ul li')[0].style.visibility).toEqual(UIClass.Visible);
    });

    fit('Should have static icon', () => {
      component.data$ = of([1, 2, 3, 4, 5, 6]);
      component.ngOnInit();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('ul li')[0].querySelector('fa-icon svg.fa-chevron-left')).toBeTruthy();
    });

    fit('Should return to previous page', () => {
      component.data$ = of([1, 2, 3, 4, 5, 6]);
      component.ngOnInit();
      fixture.detectChanges();

      assertActivePage(0);

      clickPaginationButton(2);

      assertActivePage(1);

      clickPaginationButton(0);

      assertActivePage(0);
    });
  });

  describe('Next button', () => {
    fit('Should not show', () => {
      component.data$ = of([1, 2, 3, 4, 5, 6]);
      component.ngOnInit();
      fixture.detectChanges();

      clickPaginationButton(2);

      expect(fixture.nativeElement.querySelectorAll('ul li')[3].style.visibility).toEqual(UIClass.Hidden);
    });

    fit('Should show', () => {
      component.data$ = of([1, 2, 3, 4, 5, 6]);
      component.ngOnInit();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('ul li')[3].style.visibility).toEqual(UIClass.Visible);
    });

    fit('Should have static icon', () => {
      component.data$ = of([1, 2, 3, 4, 5, 6]);
      component.ngOnInit();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('ul li')[3].querySelector('fa-icon svg.fa-chevron-right')).toBeTruthy();
    });

    fit('Should move to next page', () => {
      component.data$ = of([1, 2, 3, 4, 5, 6]);
      component.ngOnInit();
      fixture.detectChanges();

      assertActivePage(0);

      clickPaginationButton(3);

      assertActivePage(1);
    });
  });

  describe('First page', () => {
    fit('Should not exist (by default)', () => {
      component.count = 2;
      component.data$ = of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
      component.ngOnInit();
      fixture.detectChanges();

      expectLimitPageExist(true, false);
    });

    fit('Should not exist (full count)', () => {
      component.limits = true;
      component.full = true;
      component.count = 2;
      component.data$ = of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
      component.ngOnInit();
      fixture.detectChanges();

      expectLimitPageExist(true, false);
    });

    fit('Should not exist (already first page)', () => {
      component.limits = true;
      component.count = 2;
      component.data$ = of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
      component.ngOnInit();
      fixture.detectChanges();

      expectLimitPageExist(true, false);
    });

    fit('Should not exist (found in range)', () => {
      component.limits = true;
      component.data$ = of([1, 2, 3]);
      component.ngOnInit();
      fixture.detectChanges();

      expectLimitPageExist(true, false);
    });

    fit('Should exist', () => {
      component.limits = true;
      component.count = 2;
      component.data$ = of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
      component.ngOnInit();
      fixture.detectChanges();

      clickPaginationButton(4);

      expectLimitPageExist(true, true);
    });

    fit('Should have valid text', () => {
      component.limits = true;
      component.count = 2;
      component.data$ = of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
      component.ngOnInit();
      fixture.detectChanges();

      clickPaginationButton(4);

      expect(fixture.nativeElement.querySelectorAll('ul li')[1].querySelector('button').innerText)
        .toEqual(PaginationConstants.DEFAULT_PAGE.toString());
    });

    fit('Should return to first page', () => {
      component.limits = true;
      component.count = 2;
      component.data$ = of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
      component.ngOnInit();
      fixture.detectChanges();

      clickPaginationButton(4);

      assertActivePage(2);

      clickPaginationButton(1);

      assertActivePage(0);
    });
  });

  describe('Last page', () => {
    fit('Should not exist (by default)', () => {
      component.count = 2;
      component.data$ = of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
      component.ngOnInit();
      fixture.detectChanges();

      expectLimitPageExist(false, false);
    });

    fit('Should not exist (full count)', () => {
      component.limits = true;
      component.full = true;
      component.count = 2;
      component.data$ = of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
      component.ngOnInit();
      fixture.detectChanges();

      expectLimitPageExist(false, false);
    });

    fit('Should not exist (already last page)', () => {
      component.limits = true;
      component.count = 2;
      component.data$ = of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
      component.ngOnInit();
      fixture.detectChanges();

      clickPaginationButton(4);

      expectLimitPageExist(false, false);
    });

    fit('Should not exist (found in range)', () => {
      component.limits = true;
      component.count = 2;
      component.data$ = of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
      component.ngOnInit();
      fixture.detectChanges();

      clickPaginationButton(5);

      clickPaginationButton(5);

      expectLimitPageExist(false, false);
    });

    fit('Should exist', () => {
      component.limits = true;
      component.count = 2;
      component.data$ = of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
      component.ngOnInit();
      fixture.detectChanges();

      expectLimitPageExist(false, true);
    });

    fit('Should have valid text', () => {
      component.limits = true;
      component.count = 2;
      component.data$ = of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
      component.ngOnInit();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('ul li')[4].querySelector('button').innerText)
        .toEqual('3');
    });

    fit('Should move to last page', () => {
      component.limits = true;
      component.count = 2;
      component.data$ = of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
      component.ngOnInit();
      fixture.detectChanges();

      clickPaginationButton(4);

      assertActivePage(2);
    });
  });

  describe('Pages', () => {
    fit('Should have expected pages count', () => {
      component.data$ = of([1, 2, 3, 4, 5, 6]);
      component.ngOnInit();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('ul li').length).toEqual(4);
    });

    fit('Should have expected pages count, when input count more than data count', () => {
      component.count = 14;
      component.data$ = of([1, 2, 3, 4, 5, 6]);
      component.ngOnInit();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('ul li').length).toEqual(4);
    });

    fit('Should have expected pages count, when input count less than data count', () => {
      component.count = 1;
      component.data$ = of([1, 2, 3, 4, 5, 6]);
      component.ngOnInit();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('ul li').length).toEqual(3);
    });

    fit('Should have expected pages count with full count', () => {
      component.full = true;
      component.data$ = of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
      component.ngOnInit();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('ul li').length).toEqual(5);
    });

    fit('Should show only part of pages range', () => {
      component.count = 2;
      component.data$ = of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
      component.ngOnInit();
      fixture.detectChanges();

      clickPaginationButton(2);

      clickPaginationButton(3);

      const pageBtns = fixture.nativeElement.querySelectorAll('ul li button');

      expect(pageBtns.length).toEqual(4);
      expect(pageBtns[1].innerText).toEqual('2');
      expect(pageBtns[2].innerText).toEqual('3');
    });

    fit('Should have appropriate page numbers', () => {
      component.full = true;
      component.data$ = of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
      component.ngOnInit();
      fixture.detectChanges();

      const pageBtns: any[] = fixture.nativeElement.querySelectorAll('ul li button');
      [].slice.call(pageBtns, 1, -1).forEach((pageBtn: any, index) => {
        expect(pageBtn.innerText).toEqual(`${index + 1}`);
      });
    });

    fit('Should be active first page by default', () => {
      component.data$ = of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
      component.ngOnInit();
      fixture.detectChanges();

      assertActivePage(0);
    });

    fit('Should change active page on click', () => {
      component.data$ = of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
      component.ngOnInit();
      fixture.detectChanges();

      clickPaginationButton(2);

      assertActivePage(1);
    });
  });

  function expectLimitPageExist(isFirst: boolean, isExpect: boolean) {
    const buttons = fixture.nativeElement.querySelectorAll('ul li'),
      index = isFirst ? 2 : 3;
    if (isExpect)
      expect(buttons[index].querySelector('span').innerText).toEqual('...');
    else
      expect(buttons[index].querySelector('span')).toBeNull();
  }

  function clickPaginationButton(index: number) {
    fixture.debugElement.queryAll(By.css('ul li'))[index]
      .nativeElement.dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();
  }

  function assertActivePage(activeIndex: number) {
    const pageBtns = fixture.nativeElement.querySelectorAll('ul li button');

    [].slice.call(pageBtns, 1, -1).forEach((pageBtn: any, index: number) => {
      if (index == activeIndex)
        expect(pageBtn.className).toContain(UIClass.Active);
      else
        expect(pageBtn.className).not.toContain(UIClass.Active);
    });
  }
});
