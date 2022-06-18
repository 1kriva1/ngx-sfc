import { TestBed } from '@angular/core/testing';
import { CarouselLazyLoadService } from './carousel-lazy-load.service';

describe('Service: CarouselLazyLoad', () => {
  let service: CarouselLazyLoadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarouselLazyLoadService);
  });

  fit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
