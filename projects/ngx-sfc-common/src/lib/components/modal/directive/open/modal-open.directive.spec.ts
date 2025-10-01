import { Component, ViewChild } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ModalService } from "../../service/modal.service";
import { ModalOpenDirective } from "./modal-open.directive";

@Component({
    template: `<div *sfcModalOpen="'id'">
                    <span class="modal-content">Modal content</span>
                </div>
                `
})
class TestModalOpenComponent {

    constructor(public modalService: ModalService) { }

    @ViewChild(ModalOpenDirective, { static: false })
    directive: ModalOpenDirective = null as unknown as ModalOpenDirective;
}

describe('Directive: ModalOpen', () => {
    let component: TestModalOpenComponent;
    let fixture: ComponentFixture<TestModalOpenComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ModalOpenDirective, TestModalOpenComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestModalOpenComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('General', () => {
        fit('Should create an instance', () => {
            expect(component.directive).toBeDefined();
        });

        fit("Should call unsubscribe on open subscription, when directive destroyed", () => {
            const unsubscribeSpy = spyOn(
                (component.directive as any)._openSubscription,
                'unsubscribe'
            ).and.callThrough();

            component.directive?.ngOnDestroy();

            expect(unsubscribeSpy).toHaveBeenCalled();
        });
    });

    describe('Open', () => {
        fit('Should not exist content', () => {
            expect(fixture.nativeElement.querySelector('span.modal-content')).toBeNull();
        });

        fit('Should content exist', () => {
            component.modalService.open('id');

            expect(fixture.nativeElement.querySelector('span.modal-content')).toBeTruthy();
        });
    });

    describe('Close', () => {
        fit('Should hide content', () => {
            component.modalService.open('id');

            expect(fixture.nativeElement.querySelector('span.modal-content')).toBeTruthy();

            component.modalService.close('id');

            expect(fixture.nativeElement.querySelector('span.modal-content')).toBeNull();
        });
    });
});