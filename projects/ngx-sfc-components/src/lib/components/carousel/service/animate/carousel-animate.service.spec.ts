import { TestBed } from '@angular/core/testing';
import { CarouselAnimateService } from './carousel-animate.service';

describe('Service: CarouselAnimate', () => {
  let service: CarouselAnimateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarouselAnimateService);
  });

  fit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
