import { TestBed } from '@angular/core/testing';
import { ILoaderEvent } from '../loader.event';
import { LoaderService } from './loader.service';

describe('Service: Loader', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  describe('General', () => {
    fit('Should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('Register', () => {
    fit('Should register loader', done => {
      const loaderId = 'test_loader';

      service.registerLoader({ id: loaderId, status: false })
        .subscribe((event: ILoaderEvent) => {
          expect(event).toBeDefined();
          expect(event.id).toEqual(loaderId);
          expect(event.status).toBeFalsy();
          done();
        });
    });

    fit('Should register several loaders', done => {
      const loaderId1 = 'test_loader1',
        loaderId2 = 'test_loader2';

      service.registerLoader({ id: loaderId1, status: false })
        .subscribe((event: ILoaderEvent) => {
          expect(event).toBeDefined();
          expect(event.id).toEqual(loaderId1);
          expect(event.status).toBeFalsy();
        });

      service.registerLoader({ id: loaderId2, status: true })
        .subscribe((event: ILoaderEvent) => {
          expect(event).toBeTruthy();
          expect(event.id).toEqual(loaderId2);
          expect(event.status).toBeTruthy();
        });

      done();
    });

    fit('Should not register new loader, if it already exist', done => {
      const loaderId1 = 'test_loader1';

      service.registerLoader({ id: loaderId1, status: false })
        .subscribe((event: ILoaderEvent) => {
          expect(event).toBeDefined();
          expect(event.id).toEqual(loaderId1);
          expect(event.status).toBeFalsy();
        });

      service.registerLoader({ id: loaderId1, status: true })
        .subscribe((event: ILoaderEvent) => {
          expect(event).toBeDefined();
          expect(event.id).toEqual(loaderId1);
          expect(event.status).toBeFalsy();
        });

      done();
    });
  });

  describe('Show', () => {
    fit('Should show loader', done => {
      const loaderId1 = 'test_loader1';
      let isShow = false;

      service.registerLoader({ id: loaderId1, status: isShow })
        .subscribe((event: ILoaderEvent) => {
          expect(event.status).toEqual(isShow);
        });

      isShow = true;
      service.showLoader(loaderId1);
      done();
    });

    fit('Should emit event only for specific loader Id', () => {
      const loaderId1 = 'test_loader1',
        loaderId2 = 'test_loader2',
        assertCalledCount1 = 2,
        assertCalledCount2 = 1;
      let isShow1 = false,
        calledCount1 = 0,
        calledCount2 = 0;

      service.registerLoader({ id: loaderId1, status: false })
        .subscribe((event: ILoaderEvent) => {
          calledCount1++;
          expect(event.status).toEqual(isShow1);
        });

      service.registerLoader({ id: loaderId2, status: false })
        .subscribe((event: ILoaderEvent) => {
          calledCount2++;
          expect(event.status).toBeFalse();
        });

      isShow1 = true;
      service.showLoader(loaderId1);

      service.showLoader(loaderId1);

      expect(calledCount1).toEqual(assertCalledCount1);
      expect(calledCount2).toEqual(assertCalledCount2);
    });

    fit('Should not emit event if loader status not changed', done => {
      const loaderId = 'test_loader',
        assertCalledCount = 1;

      let isShow = true,
        calledCount = 0;

      service.registerLoader({ id: loaderId, status: isShow })
        .subscribe((event: ILoaderEvent) => {
          calledCount++;
          expect(event.status).toEqual(isShow);
          done();
        });

      service.showLoader(loaderId);

      expect(calledCount).toEqual(assertCalledCount);
    });

    fit('Should not register new loader', () => {
      const loaderId = 'test_loader';

      service.showLoader(loaderId);

      expect(service.showLoader(loaderId)).toBeNull();
    });

    fit('Should register new loader', done => {
      const loaderId = 'test_loader';

      service.showLoader(loaderId, true)
        ?.subscribe((event: ILoaderEvent) => {
          expect(event.status).toBeTruthy();
          done();
        });
    });
  });

  describe('Hide', () => {
    fit('Should hide loader', done => {
      const loaderId1 = 'test_loader1';
      let isShow = true;

      service.registerLoader({ id: loaderId1, status: isShow })
        .subscribe((event: ILoaderEvent) => {
          expect(event.status).toEqual(isShow);
        });

      isShow = false;
      service.hideLoader(loaderId1);
      done();
    });

    fit('Should emit event only for specific loader Id', () => {
      const loaderId1 = 'test_loader1',
        loaderId2 = 'test_loader2',
        assertCalledCount1 = 2,
        assertCalledCount2 = 1;
      let isShow1 = true,
        calledCount1 = 0,
        calledCount2 = 0;

      service.registerLoader({ id: loaderId1, status: true })
        .subscribe((event: ILoaderEvent) => {
          calledCount1++;
          expect(event.status).toEqual(isShow1);
        });

      service.registerLoader({ id: loaderId2, status: true })
        .subscribe((event: ILoaderEvent) => {
          calledCount2++;
          expect(event.status).toBeTruthy();
        });

      isShow1 = false;
      service.hideLoader(loaderId1);

      service.hideLoader(loaderId1);

      expect(calledCount1).toEqual(assertCalledCount1);
      expect(calledCount2).toEqual(assertCalledCount2);
    });

    fit('Should not emit event if loader status not changed', done => {
      const loaderId = 'test_loader',
        assertCalledCount = 1;

      let isShow = false,
        calledCount = 0;

      service.registerLoader({ id: loaderId, status: isShow })
        .subscribe((event: ILoaderEvent) => {
          calledCount++;
          expect(event.status).toEqual(isShow);
          done();
        });

      service.hideLoader(loaderId);

      expect(calledCount).toEqual(assertCalledCount);
    });
  });

  describe('Remove', () => {
    fit('Should remove loader', done => {
      const loaderId = 'test_loader',
        assertCalledCount = 2;
      let isShow = false,
        calledCount = 0;

      service.registerLoader({ id: loaderId, status: isShow })
        .subscribe((event: ILoaderEvent) => {
          calledCount++;
          expect(event).toBeDefined();
          expect(event.id).toEqual(loaderId);
          expect(event.status).toEqual(isShow);
        });

      isShow = true;
      service.showLoader(loaderId)
        ?.subscribe((event: ILoaderEvent) => {
          expect(event.status).toBeTruthy();
        });

      service.removeLoader(loaderId);

      service.showLoader(loaderId);

      expect(service.showLoader(loaderId)).toBeNull();

      isShow = false;
      service.hideLoader(loaderId);

      expect(calledCount).toEqual(assertCalledCount);
      done();
    });

    fit('Should not remove loader', () => {
      const loaderId = 'test_loader',
        assertCalledCount = 3;
      let isShow = false,
        calledCount = 0;

      service.registerLoader({ id: loaderId, status: isShow })
        .subscribe((event: ILoaderEvent) => {
          calledCount++;
          expect(event).toBeDefined();
          expect(event.id).toEqual(loaderId);
          expect(event.status).toEqual(isShow);
        });

      isShow = true;
      service.showLoader(loaderId)
        ?.subscribe((event: ILoaderEvent) => {
          expect(event.status).toBeTruthy();
        });

      service.removeLoader('test_loader_1');

      isShow = false;
      service.hideLoader(loaderId);

      expect(calledCount).toEqual(assertCalledCount);
    });
  });

});
