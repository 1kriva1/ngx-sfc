import { TestBed } from '@angular/core/testing';
import { MediaLimits, WINDOW } from 'ngx-sfc-common';
import { Subscription } from 'rxjs';
import { ColumnsToggleService } from './columns-toggle.service';

describe('Service:  ColumnsToggle', () => {
  let service: ColumnsToggleService;
  let windowMock: any = <any>{};
  let subscription: Subscription;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: WINDOW, useFactory: (() => { return windowMock; }) }
      ]
    });
    service = TestBed.inject(ColumnsToggleService);
  });

  afterEach(() => {
    if (subscription)
      subscription.unsubscribe();
  });

  fit('Should be created', () => {
    expect(service).toBeTruthy();
  });

  fit('Should showColumns observable be created', () => {
    expect(service.showColumns$).toBeDefined();
  });

  fit('Should return False, when window innerWidth less than max value', done => {
    windowMock.innerWidth = MediaLimits.Tablet - 1;

    subscription = service.showColumns$.subscribe(value => {
      expect(value).toBeFalsy();
    });

    done();
  });

  fit('Should return True, when window innerWidth equal than max value', done => {
    windowMock.innerWidth = MediaLimits.Tablet;

    subscription = service.showColumns$.subscribe(value => {
      expect(value).toBeTruthy();
    });

    done();
  });

  fit('Should return True, when window innerWidth more than max value', done => {
    windowMock.innerWidth = MediaLimits.Tablet + 1;

    subscription = service.showColumns$.subscribe(value => {
      expect(value).toBeTruthy();
    });

    done();
  });

  fit('Should toggle value, when window innerWidth less than max value', done => {
    windowMock.innerWidth = MediaLimits.Tablet - 1;
    let isFirstCalled: boolean = false;

    subscription = service.showColumns$.subscribe(value => {
      expect(value).toEqual(isFirstCalled ? true : false);
      isFirstCalled = true;
    });

    service.toggle();
    done();
  });
});
