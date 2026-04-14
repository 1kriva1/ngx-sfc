import { ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Optional, Output, QueryList, Renderer2, TemplateRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { faArrowsSpin, faPlus } from '@fortawesome/free-solid-svg-icons';
import {
    ModalTemplate, IDefaultModalFooterModel, IDefaultModalHeaderModel,
    ComponentSizeDirective, TemplateReferenceDirective, ModalService,
    stopAndPreventPropagation
} from 'ngx-sfc-common';
import { BaseInputComponent } from '../base/base-input.component';
import { AvatarInputConstants } from './avatar-input.constants';
import { AvatarBadgePosition, getProgressColorDefaultFunc, IAvatarBadgeModel, IAvatarDataModel, IAvatarProgressModel } from 'ngx-sfc-components';
import { AvatarInputTemplate } from './avatar-input-template.enum';
import { IAvatarInputModalContextModel } from './models/avatar-input-modal-context.model';
import { IAvatarInputModel } from './models/avatar-input.model';
import { IAvatarInputModalEventModel } from './models/avatar-input-modal-event.model';
import { empty } from 'ngx-sfc-common';

@Component({
    selector: 'sfc-avatar-input',
    templateUrl: './avatar-input.component.html',
    styleUrls: [
        '../../styles/input.component.scss',
        '../../styles/vertical-input.component.scss',
        './avatar-input.component.scss'],
    providers: [ModalService]
})
export class AvatarInputComponent
    extends BaseInputComponent<number>
    implements OnInit {

    // icons
    faPlus = faPlus;
    faArrowsSpin = faArrowsSpin;

    // ngx-sfc-common
    ModalTemplate = ModalTemplate;

    // component
    Template = AvatarInputTemplate;
    Constants = AvatarInputConstants;

    // Inputs

    @Input()
    avatarModel: IAvatarInputModel | null = null;

    @Input()
    defaultAvatar: string | null = null;

    @Input()
    hideOnClickOutside: boolean = false;

    @Input()
    applyLabel: string = AvatarInputConstants.MODAL.APPLY_BUTTON_TEXT;

    @Input()
    cancelLabel: string = AvatarInputConstants.MODAL.CANCEL_BUTTON_TEXT;

    @Input()
    headerLabel: string | null = null;

    @Input()
    radius: number = AvatarInputConstants.AVATAR.RADIUS;

    @Input()
    clear: boolean = false;

    @Input()
    progressColor: string | empty = AvatarInputConstants.AVATAR.PROGRESS_COLOR;

    @Input()
    stars: boolean = true;

    @Input()
    progress: boolean = true;

    // Template references

    @Input()
    body?: TemplateRef<any>;

    @Input()
    loader?: TemplateRef<any>;

    // End Template references

    // End Inputs

    // Outputs

    @Output()
    changeValueModel: EventEmitter<any> = new EventEmitter<any>();

    // End Outputs

    // Modal

    @ContentChildren(TemplateReferenceDirective, { read: TemplateReferenceDirective })
    public templates: QueryList<TemplateReferenceDirective> | undefined;

    public headerModalModel!: IDefaultModalHeaderModel;

    public footerModalModel!: IDefaultModalFooterModel;

    public get modalContextData(): IAvatarInputModalContextModel {
        return {
            value: this.value,
            onSelect: (model: IAvatarInputModalEventModel, selected: boolean) => this.onSelect(model, selected)
        };
    }

    // End Modal

    // Avatar

    public avatarData: IAvatarDataModel = {};

    public avatarProgress: number = 0;

    public avatarStars: number = 0;

    public get avatarProgressModel(): IAvatarProgressModel {
        return {
            color: this.progressColor!,
            filledColor: this.hasValue ? getProgressColorDefaultFunc(this.avatarProgress) : undefined
        }
    }

    public get avatarBadges(): IAvatarBadgeModel[] {
        return this.hasValue && this.progress ? [
            {
                position: AvatarBadgePosition.RightBottom,
                label: `${this.avatarProgress}`
            }
        ] : [];
    }

    // End Avatar

    private model: any | null = null;

    override bordered: boolean = false;

    constructor(
        private modalService: ModalService,
        @Optional() ngControl: NgControl,
        @Optional() componentSize: ComponentSizeDirective,
        changeDetector: ChangeDetectorRef,
        renderer: Renderer2,
        elementRef: ElementRef) {
        super(ngControl, componentSize as any, changeDetector, renderer, elementRef);
    }

    ngOnInit(): void {
        if (this.hasValue && this.avatarModel) {
            this.setAvatarData(this.avatarModel)
        } else {
            this.avatarData = { image: this.defaultAvatar };
        }

        this.headerModalModel = {
            showCloseIcon: true,
            icon: this.icon,
            text: this.headerLabel || this.label
        };

        this.footerModalModel = {
            cancelButton: true,
            cancelButtonText: this.cancelLabel,
            applyButton: true,
            applyButtonText: this.applyLabel,
            onApply: (args: any) => this.onApply(args)
        };
    }

    public openModal(): void {
        const modalArgs: IAvatarInputModalEventModel = {
            value: this.value,
            model: this.model,
            avatarModel: this.avatarModel,
        };
        this.modalService.args = modalArgs;
        this.modalService.toggle(AvatarInputConstants.MODAL.ID);
    }

    public onClear(event: Event): void {
        stopAndPreventPropagation(event);
        this.onChange(null);
        this.setAvatarData(null);
        this.changeValueModel.emit(null);
    }

    private setAvatarData(model: IAvatarInputModel | null): void {
        if (model) {
            this.avatarData = model.avatar;
            this.avatarProgress = model.progress;
            this.avatarStars = model.stars;
        } else {
            this.avatarData = { image: this.defaultAvatar };
            this.avatarProgress = 0;
            this.avatarStars = 0;
        }
    }

    private onSelect(model: IAvatarInputModalEventModel, selected: boolean): void {
        this.modalService.args = selected ? model : null;
    }

    private onApply(event: IAvatarInputModalEventModel | null): void {
        if (event?.value !== this.value) {
            this.onChange(event?.value!);
            this.setAvatarData(event?.avatarModel!);
            this.changeValueModel.emit(event?.model);
        }

        this.modalService.toggle(AvatarInputConstants.MODAL.ID);
    }
}