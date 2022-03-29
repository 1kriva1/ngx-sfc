import {
    animate, animateChild, group, query,
    state, style, transition, trigger
} from '@angular/animations';
import {
    Component, ContentChildren, HostListener, Input,
    QueryList, TemplateRef
} from '@angular/core';
import { TemplateReferenceDirective } from '../../directives';
import { IDefaultModalFooterModel } from './footer/default/default-modal-footer.model';
import { IDefaultModalHeaderModel } from './header/default/default-modal-header.model';
import { ModalTemplate } from './modal-template.enum';
import { ModalService } from './service/modal.service';

@Component({
    selector: 'sfc-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    animations: [
        trigger('hideOverlay', [
            state('initial', style({ opacity: 1, visibility: 'visible' })),
            state('void', style({ opacity: 0, visibility: 'hidden' })),

            transition('* => void', [
                group([
                    query(':self', [
                        animate('400ms cubic-bezier(.55, 0, .1, 1)', style({
                            opacity: 0,
                            visibility: 'hidden'
                        }))
                    ]),
                    query('@hideContent', [animateChild()])
                ])
            ])
        ]),
        trigger('hideContent', [
            state('initial', style({ opacity: 1, visibility: 'visible', transform: 'scale(1)' })),
            state('void', style({ opacity: 0, visibility: 'hidden', transform: 'scale(1.2)' })),
            transition('* => void', animate('400ms cubic-bezier(.55, 0, .1, 1)'))
        ])
    ]
})
export class ModalComponent {

    ModalTemplate = ModalTemplate;

    // Template references 

    @Input()
    body?: TemplateRef<any>;

    @Input()
    header?: TemplateRef<any>;

    @Input()
    footer?: TemplateRef<any>;

    // End Template references        

    // Defaults

    @Input()
    defaultHeaderModel?: IDefaultModalHeaderModel;

    @Input()
    defaultFooterModel?: IDefaultModalFooterModel;

    // End Defaults

    @Input()
    hideOnEsc: boolean = true;

    @Input()
    hideOnClickOutside: boolean = true;

    @HostListener('document:keydown.escape')
    onEscapeKeyDownHandler() {
        if (this.hideOnEsc)
            this.close();
    }

    @ContentChildren(TemplateReferenceDirective, { read: TemplateReferenceDirective })
    templates: QueryList<TemplateReferenceDirective> | undefined;

    constructor(private modalService: ModalService) { }

    close() {
        this.modalService.close();
    }
}
