import { ChangeDetectorRef, Directive, DoCheck, ElementRef, Input, IterableDiffer, IterableDiffers, OnInit, Optional, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ComponentSizeDirective, ILoadContainerModel, isDefined, LoaderFunction } from 'ngx-sfc-common';
import { BehaviorSubject, Observable } from 'rxjs';
import { ValidationConstants } from '../../../constants/validation.constants';
import { BaseInputComponent } from '../base-input.component';

@Directive()
export abstract class BaseDataInputComponent<T, V>
    extends BaseInputComponent<V>
    implements OnInit, DoCheck {

    @Input()
    data: T[] = [];

    @Input()
    data$!: Observable<T[]>;

    @Input()
    loader!: LoaderFunction;

    @Input()
    showLoadMoreButton: boolean = true;

    public loadModel!: ILoadContainerModel;

    public items: T[] = [];

    protected dataDiffer!: IterableDiffer<any>;
    protected dataSubject!: BehaviorSubject<T[]>;

    constructor(
        @Optional() ngControl: NgControl,
        @Optional() componentSize: ComponentSizeDirective,
        changeDetector: ChangeDetectorRef,
        renderer: Renderer2,
        elementRef: ElementRef,
        private iterableDiffers: IterableDiffers) {
        super(ngControl, componentSize, changeDetector, renderer, elementRef);
        this.dataDiffer = iterableDiffers.find([]).create<IterableDiffer<T>>(undefined);
    }

    ngOnInit(): void {
        this.validations = { ...this.validations, ...ValidationConstants.DATA_VALIDATION };

        // if data is static, make it observable
        if (!isDefined(this.data$)) {
            this.dataSubject = new BehaviorSubject(this.data);
            this.data$ = this.dataSubject.asObservable();
        }
    }

    ngDoCheck(): void {
        if (this.dataDiffer.diff(this.data)) {
            this.dataSubject.next(this.data);
        }
    }
}