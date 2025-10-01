import {
    animate, animateChild, group, query,
    state, style, transition, trigger
} from '@angular/animations';
import {
    AfterViewInit, Component, ContentChildren, HostListener, Inject, Input, OnDestroy,
    Optional, QueryList, TemplateRef
} from '@angular/core';
import { ModalOpenDirective } from './directive/open/modal-open.directive';
import { UIConstants } from '../../constants';
import { TemplateReferenceDirective } from '../../directives';
import { DOCUMENT } from '../../services';
import { IDefaultModalFooterModel } from './footer/default/default-modal-footer.model';
import { IDefaultModalHeaderModel } from './header/default/default-modal-header.model';
import { ModalTemplate } from './modal-template.enum';
import { ModalService } from './service/modal.service';
import { ModalOpenOnClickDirective } from './directive/click/modal-open-on-click.directive';
import { isDefined } from '../../utils';

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
export class ModalComponent implements AfterViewInit, OnDestroy {

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
    defaultHeaderModel!: IDefaultModalHeaderModel;

    @Input()
    defaultFooterModel!: IDefaultModalFooterModel;

    // End Defaults

    @Input()
    hideOnEsc: boolean = true;

    @Input()
    hideOnClickOutside: boolean = true;

    // hide modal header (even default)
    @Input()
    showHeader: boolean = true;

    // hide modal footer (even default)
    @Input()
    showFooter: boolean = true;

    @HostListener('document:keydown.escape')
    onEscapeKeyDownHandler() {
        if (this.hideOnEsc)
            this.close();
    }

    @ContentChildren(TemplateReferenceDirective, { read: TemplateReferenceDirective })
    templates: QueryList<TemplateReferenceDirective> | undefined;

    /* Properties */

    public get id(): string {
        return isDefined(this.openOnClickDirective)
            ? this.openOnClickDirective.id : this.openDirective.id;
    }

    // value of body overflow style when modal created
    // this prevent scrolling when modal has opened
    private bodyOverflow: string;

    /* End Properties */

    constructor(
        public modalService: ModalService,
        @Inject(DOCUMENT) private document: Document,
        @Optional() private openDirective: ModalOpenDirective,
        @Optional() private openOnClickDirective: ModalOpenOnClickDirective) {
        // remember body overflow
        this.bodyOverflow = this.document.body.style.overflow;
    }

    ngAfterViewInit(): void {
        // set body overflow to hidden, to prevent page scrolling
        this.document.body.style.overflow = UIConstants.CSS_VISIBILITY_HIDDEN;
    }

    ngOnDestroy(): void {
        // return back body overflow value when modal has closed
        this.document.body.style.overflow = this.bodyOverflow;
    }

    public close(): void {
        this.modalService.close(this.id);
    }
}
