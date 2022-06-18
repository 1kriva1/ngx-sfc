import { TestBed } from '@angular/core/testing';
import { CarouselNavigationService } from './carousel-navigation.service';

describe('Service: CarouselNavigation', () => {
  let service: CarouselNavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarouselNavigationService);
  });

  fit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
