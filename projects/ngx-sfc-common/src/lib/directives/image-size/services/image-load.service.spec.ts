import { TestBed } from '@angular/core/testing';
import { ImageLoadEvent } from './image-load.event';
import { ImageLoadService } from './image-load.service';

describe('Service: ImageLoad', () => {
    let service: ImageLoadService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ImageLoadService);
    });

    fit('Should be created', () => {
        expect(service).toBeTruthy();
    });

    fit('Should be defined load observable', () => {
        expect(service.load$).toBeTruthy();
    });

    fit('Should emit on load', done => {
        const assertEvent: ImageLoadEvent = { natural: { height: 1, width: 1 }, offset: { height: 1, width: 1 } };

        service.load$.subscribe((event: any) => {
            expect(event).toEqual(assertEvent);
            done();
        });

        service.load(assertEvent);
    });

    fit('Should emit on load', done => {
        const assertEvent: ImageLoadEvent = { natural: { height: 1, width: 1 }, offset: { height: 1, width: 1 } };

        service.load$.subscribe((event: any) => {
            expect(event).toEqual(assertEvent);
            done();
        });

        service.load(assertEvent);
    });

    fit('Should not emit twice on load with same event', done => {
        const assertEvent: ImageLoadEvent = { natural: { height: 1, width: 1 }, offset: { height: 1, width: 1 } };
        let assertCount = 1;

        service.load$.subscribe(_ => {
            expect(assertCount).toEqual(1);
            assertCount += 1;
            done();
        });

        service.load(assertEvent);

        service.load(assertEvent);
    });
});
