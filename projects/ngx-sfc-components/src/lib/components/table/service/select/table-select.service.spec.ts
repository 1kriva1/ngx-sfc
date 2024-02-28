import { TestBed } from '@angular/core/testing';
import { ITableSelectEvent } from './table-select.event';
import { TableSelectService } from './table-select.service';

describe('Service: TableSelect', () => {
  let service: TableSelectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableSelectService);
  });

  fit('Should be created', () => {
    expect(service).toBeTruthy();
  });

  fit('Should selected observable exist', () => {
    expect(service.select$).toBeTruthy();
  });

  fit('Should return event data', done => {
    service.select$.subscribe((event: ITableSelectEvent) => {
      expect(event).toBeDefined();
      done();
    });

    service.select(0, true);
  });

  fit('Select select', done => {
    service.select$.subscribe((event: ITableSelectEvent) => {
      expect(event.index).toEqual(11);
      expect(event.selected).toBeTruthy();
      done();
    });

    service.select(11, true);
    expect(service.selectedItems).toEqual([11]);
  });

  fit('Should unselect', done => {
    service.select$.subscribe((event: ITableSelectEvent) => {
      expect(event.index).toEqual(11);
      expect(event.selected).toBeFalsy();
      done();
    });

    service.select(11, false);
    expect(service.unselectedItems).toEqual([11]);
  });

  fit('Should toggle', () => {
    service.select(11, true);

    expect(service.selectedItems).toEqual([11]);
    expect(service.unselectedItems).toEqual([]);

    service.select(11, false);

    expect(service.selectedItems).toEqual([]);
    expect(service.unselectedItems).toEqual([11]);
  });

  fit('Should toggle several items', () => {
    service.select(11, true);

    expect(service.selectedItems).toEqual([11]);
    expect(service.unselectedItems).toEqual([]);

    service.select(12, false);

    expect(service.selectedItems).toEqual([11]);
    expect(service.unselectedItems).toEqual([12]);
  });

  fit('Should select all', done => {
    service.select$.subscribe((event: ITableSelectEvent) => {
      expect(event.index).toBeNull();
      expect(event.selected).toBeTruthy();
      done();
    });

    service.selectAll(true);
    expect(service.unselectedItems).toEqual([]);
    expect(service.selectedItems).toEqual([]);
  });

  fit('Should unselect all', done => {
    service.select$.subscribe((event: ITableSelectEvent) => {
      expect(event.index).toBeNull();
      expect(event.selected).toBeFalsy();
      done();
    });

    service.selectAll(false);
    expect(service.selectedItems).toEqual([]);
    expect(service.unselectedItems).toEqual([]);
  });
});
