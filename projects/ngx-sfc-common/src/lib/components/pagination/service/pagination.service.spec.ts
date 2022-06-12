import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { PaginationConstants } from '../pagination.constants';
import { IPaginationEvent } from './pagination.event';
import { PaginationService } from './pagination.service';

describe('Service: Pagination', () => {
  let service: PaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginationService);
  });

  fit('Should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Total observable', () => {
    fit('Should not be defined', () => {
      expect(service.total$).toBeUndefined();
    });

    fit('Should be defined', () => {
      service.init(of([1, 2, 3]));
      expect(service.total$).toBeTruthy();
    });

    fit('Shoul return valid value', done => {
      service.init(of([1, 2, 3]));

      service.total$.subscribe((total: number) => {
        expect(total).toBe(3);
        done();
      })
    });
  });

  describe('Total Pages observable', () => {
    fit('Should not be defined', () => {
      expect(service.totalPages$).toBeUndefined();
    });

    fit('Should be defined', () => {
      service.init(of([1, 2, 3]));
      expect(service.totalPages$).toBeTruthy();
    });

    fit('Shoul return valid result with default values', done => {
      service.init(of([1, 2, 3, 4, 5, 6]));

      service.totalPages$.subscribe((totalPages: number) => {
        expect(totalPages).toBe(2);
        done();
      })
    });

    fit('Shoul return valid result with defined values', done => {
      service.init(of([1, 2, 3, 4, 5, 6]), 1, 2);

      service.totalPages$.subscribe((totalPages: number) => {
        expect(totalPages).toBe(3);
        done();
      })
    });
  });

  describe('Pagination observable', () => {
    fit('Should not be defined', () => {
      expect(service.pagination$).toBeUndefined();
    });

    fit('Should be defined', () => {
      service.init(of([1, 2, 3]));
      expect(service.pagination$).toBeTruthy();
    });

    fit('Shoul return valid event data with default values', done => {
      service.init(of([1, 2, 3, 4, 5, 6]));

      service.pagination$.subscribe((event: IPaginationEvent) => {
        expect(event.page).toBe(1);
        expect(event.next).toBe(2);
        expect(event.previous).toBe(1);
        expect(event.total).toBe(2);
        done();
      });
    });

    fit('Shoul return valid event data with defined values', done => {
      service.init(of([1, 2, 3, 4, 5, 6]), 2, 2);

      service.pagination$.subscribe((event: IPaginationEvent) => {
        expect(event.page).toBe(2);
        expect(event.next).toBe(3);
        expect(event.previous).toBe(1);
        expect(event.total).toBe(3);
        done();
      });
    });

    fit('Shoul return default page if page more than total pages', done => {
      service.init(of([1, 2, 3, 4, 5, 6]), 22);

      service.pagination$.subscribe((event: IPaginationEvent) => {
        expect(event.page).toBe(PaginationConstants.DEFAULT_PAGE);
        done();
      });
    });

    fit('Should have valid event data after move to page', done => {
      const scheduler: TestScheduler = new TestScheduler((actual, expected) => {
        expect(actual[1].value).toEqual(expected.value);
      })

      service.init(of([1, 2, 3, 4, 5, 6]), 2);

      scheduler.run((expected) => {
        expected.cold('pageValue').subscribe(() => {
          service.page(1);
        });

        expected.expectObservable(service.pagination$).toBe('pageValue', {
          pageValue: {
            page: 1,
            nextPage: 2,
            prevPage: 1,
            totalPages: 2
          }
        });

        done();
      });
    });
  });
});