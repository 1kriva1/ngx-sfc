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
        const assertArgs = { data: 'test' }, id: string = 'id';
        let assertEvent: IModalEvent = { id: id, open: false };

        service.modal$.subscribe((event: IModalEvent) => {
            expect(event).toEqual(assertEvent);
        });

        assertEvent = { id: id, open: true, args: assertArgs };

        service.open(id, assertArgs);

        done();
    });

    fit('Should emit on close', done => {
        const id: string = 'id';
        service.modal$.subscribe((event: IModalEvent) => {
            expect(event).toEqual({ id: id, open: false, args: undefined });
        });

        service.close(id);

        done();
    });

    fit('Should emit on toggle', done => {
        const id: string = 'id';
        let firstToggle = false;

        service.modal$.subscribe((event: IModalEvent) => {
            expect(event).toEqual({ id: id, open: firstToggle, args: undefined });
        });

        firstToggle = true;

        service.toggle(id);

        firstToggle = false;

        service.toggle(id);

        done();
    });

    fit('Should isOpen has default value', () => {
        expect(service.isOpen).toBeFalse();
    });

    fit('Should isOpen change value', () => {
        expect(service.isOpen).toBeFalse();

        service.toggle('id');

        expect(service.isOpen).toBeTrue();
    });
});
