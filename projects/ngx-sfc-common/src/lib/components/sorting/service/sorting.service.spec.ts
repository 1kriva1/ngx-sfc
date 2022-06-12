import { TestBed } from '@angular/core/testing';
import { SortingDirection } from '../../../enums';
import { ISortingEvent } from './sorting.event';
import { SortingService } from './sorting.service';

describe('Service: Sorting', () => {
  let service: SortingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortingService);
  });

  fit('Should be created', () => {
    expect(service).toBeTruthy();
  });

  fit('Should be defined open observable', () => {
    expect(service.sorting$).toBeTruthy();
  });

  fit('Should emit on open', done => {
    const assertEvent: ISortingEvent = { id: 'id', direction: SortingDirection.Ascending };

    service.sorting$.subscribe((event: any) => {
      expect(event).toEqual(assertEvent);
      done();
    });

    service.sort(assertEvent);
  });
});
