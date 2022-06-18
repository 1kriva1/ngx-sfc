import { TestBed } from '@angular/core/testing';
import { CarouselService } from './carousel.service';

describe('Service: Carousel', () => {
  let service: CarouselService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarouselService);
  });

  fit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
