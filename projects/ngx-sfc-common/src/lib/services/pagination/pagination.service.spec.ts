import { TestBed } from '@angular/core/testing';
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

  fit('Shoul return default page', () => {
    expect(service.pageValue).toEqual(PaginationService.START_PAGE);
  });

  fit('Should be defined', () => {
    expect(service.page$).toBeTruthy();
  });

  fit('Should move to page', done => {
    const expectedPage: number = 12;

    service.page$.subscribe((page: number) => {
      expect(page).toBe(expectedPage);
      done();
    });

    service.page(expectedPage);

    expect(service.pageValue).toEqual(expectedPage);
  });

  fit('Should reset page', () => {
    service.page(12);

    service.reset();

    expect(service.pageValue).toEqual(PaginationService.START_PAGE);
  });
});