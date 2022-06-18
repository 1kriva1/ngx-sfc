import { TestBed } from '@angular/core/testing';
import { DOCUMENT, WINDOW } from 'ngx-sfc-common';
import { CarouselAutoplayService } from './carousel-autoplay.service';

describe('Service: CarouselAutoplay', () => {
  let service: CarouselAutoplayService;
  let windowMock: any = <any>{};
  let documentMock: any = <any>{};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: WINDOW, useFactory: (() => { return windowMock; }) },
        { provide: DOCUMENT, useFactory: (() => { return documentMock; }) }
      ]
    });
    service = TestBed.inject(CarouselAutoplayService);
  });

  fit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
