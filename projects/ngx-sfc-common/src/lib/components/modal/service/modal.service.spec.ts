import { TestBed } from '@angular/core/testing';
import { IModalEvent } from './modal.event';
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

    fit('Should be defined modal observable', () => {
        expect(service.modal$).toBeTruthy();
    });

    fit('Should emit on open', done => {
        const assertArgs = { data: 'test' };
        let assertEvent: IModalEvent = { open: false };

        service.modal$.subscribe((event: IModalEvent) => {
            expect(event).toEqual(assertEvent);
        });

        assertEvent = { open: true, args: assertArgs };

        service.open(assertArgs);

        done();
    });

    fit('Should emit on close', done => {
        service.modal$.subscribe((event: IModalEvent) => {
            expect(event).toEqual({ open: false });
        });

        service.close();

        done();
    });

    fit('Should emit on toggle', done => {
        let firstToggle = false;

        service.modal$.subscribe((event: IModalEvent) => {
            expect(event).toEqual({ open: firstToggle });
        });

        firstToggle = true;

        service.toggle();

        firstToggle = false;

        service.toggle();

        done();
    });

    fit('Should isOpen has default value', () => {
        expect(service.isOpen).toBeFalse();
    });

    fit('Should isOpen change value', () => {
        expect(service.isOpen).toBeFalse();

        service.toggle();

        expect(service.isOpen).toBeTrue();
    });
});
