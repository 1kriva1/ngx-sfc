import { TestBed } from '@angular/core/testing';
import { ModalService } from './modal.service';

describe('Service: Modal', () => {
    let service: ModalService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ModalService);
    });

    fit('Should be created', () => {
        expect(service).toBeTruthy();
    });

    fit('Should be defined open observable', () => {
        expect(service.open$).toBeTruthy();
    });

    fit('Should emit on open', done => {
        const assertEvent = { data: 'test' };

        service.open$.subscribe((event: any) => {
            expect(event).toEqual(assertEvent);
            done();
        });

        service.open(assertEvent);
    });

    fit('Should be defined close observable', () => {
        expect(service.close$).toBeTruthy();
    });

    fit('Should emit on close', done => {
        service.close$.subscribe(() => {
            expect(true).toBeTrue();
            done();
        });

        service.close();
    });
});
