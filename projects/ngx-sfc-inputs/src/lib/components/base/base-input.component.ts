import { ChangeDetectorRef, AfterViewInit, Input, ViewChild, HostBinding, ElementRef, Renderer2, Directive, Optional } from '@angular/core';
import { NgControl, ControlValueAccessor, ValidationErrors } from '@angular/forms';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { addPropertyToObject, CommonConstants, isDefined, isNullOrEmptyString, removePropertyFromObject, UIClass } from 'ngx-sfc-common';
import { InputReferenceDirective } from '../../directives/reference/input-reference.directive';
import { InputUIClass } from '../../enums/input-ui.enum';
import { InputConstants } from '../../constants/input.constants';
import { IValidationModel } from '../../models/validation.model';

@Directive()
export default abstract class BaseInputComponent<T> implements ControlValueAccessor, AfterViewInit {

    // INPUTS

    @Input()
    id!: string;

    @Input()
    label!: string;

    @Input()
    @HostBinding(`class.${UIClass.Disabled}`)
    disabled: boolean = false;

    @Input()
    placeholder: string = CommonConstants.EMPTY_STRING;

    @Input()
    icon?: IconDefinition | null;

    /*
    * Helper text  under input
    */
    @Input()
    helperText!: string;

    /*
    * Validation messages (key - validation rule, value - error message)
    */
    @Input()
    validations: IValidationModel = {};

    // END INPUTS

    // PROPERTIES

    get inputId(): string {
        return `${InputConstants.ID_PREFIX}${this.id}`;
    }

    _value: T | null = null;
    set value(value: T | null) {
        this._value = value;
    }
    get value(): T | null {
        return this._value;
    }

    get labelClass(): any {
        return this.placeholder || this.isFocused || this.value ? UIClass.Active : CommonConstants.EMPTY_STRING;
    }

    get placeholderValue() {
        return this.placeholder && !this.isFocused ? this.placeholder : CommonConstants.EMPTY_STRING;
    }

    /*
    * Return helper text if input has NOT error, 
    * otherwise return first error message
    */
    get helperTextValue() {
        return this.input?.isInvalid || !this.isValid ? this.errorMessage : this.helperText;
    }

    /**
     * input componnent validation flag
     */
    isValid: boolean = true;

    /**
     * input componnent validation errors
     */
    innerErrors: ValidationErrors = {};

    /*
    * Get first error message from custom validation error mappings (or default)
    */
    private get errorMessage() {
        return this.input ? this.validationMessages[0] || InputConstants.DEFAULT_ERROR_MESSAGE : CommonConstants.EMPTY_STRING;
    }

    private get validationMessages(): string[] {
        const messages: string[] = [];

        Object.keys(this.validations).forEach(key => {
            if (this.validationErrors[key]) {
                messages.push(this.validations[key]);
            }
        });

        return messages;
    }

    /*
    * Return all input validation errors (ngControl errors)
    */
    get validationErrors() {
        return this.input
            ? isDefined(this.input.errors) ? { ...this.input.errors, ...this.innerErrors } : this.innerErrors
            : this.innerErrors
    }

    // END PROPERTIES

    // CLASSES

    /*
    * Is input on focus
    */
    @HostBinding(`class.${UIClass.Focus}`)
    get isFocused() {
        return this.input ? this.input.isFocused : false;
    }

    @HostBinding(`class.${InputUIClass.HasIcon}`)
    protected get hasIcon() {
        return isDefined(this.icon);
    }

    @HostBinding(`class.${InputUIClass.HasValue}`)
    protected get hasValue() {
        return !isNullOrEmptyString(this.value as any);
    }

    // END CLASSES

    @ViewChild(InputReferenceDirective, { static: false })
    input!: InputReferenceDirective;

    @ViewChild(InputReferenceDirective, { static: false, read: ElementRef })
    inputElementRef!: ElementRef;

    @ViewChild('iconRef', { static: false, read: ElementRef })
    iconElementRef!: ElementRef;

    constructor(@Optional() protected ngControl: NgControl,
        protected changeDetector: ChangeDetectorRef,
        protected renderer: Renderer2,
        protected elementRef: ElementRef) {
        if (this.ngControl)
            this.ngControl.valueAccessor = this;
    }

    ngAfterViewInit(): void {
        if (this.iconElementRef)
            this.setOnFocusEvent(this.iconElementRef.nativeElement);

        this.changeDetector.detectChanges();
    }

    // METHODS    

    setOnFocusEvent(element: ElementRef) {
        if (element) {
            this.renderer.listen(element, 'click', () => this.inputElementRef.nativeElement.focus());
        }
    }

    clearInnerErrors() {
        this.innerErrors = {};
        this.isValid = true;
    }

    toggleInnerErrors(validationKey: string, isValid: boolean) {
        this.isValid = isValid;

        if (isValid)
            removePropertyFromObject(this.innerErrors, validationKey);
        else
            this.innerErrors = addPropertyToObject(this.innerErrors, validationKey, true);
    }

    // END METHODS    

    /*
    * Write form value to the DOM element (model => view)
    */
    writeValue(value: T): void {
        this.value = value;
    }

    /*
     * Write form disabled state to the DOM element (model => view)
     */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    /*
     * Update form when DOM element value changes (view => model)
     */
    registerOnChange(fn: any): void {
        // Store the provided function as an internal method.
        this.propagateChange = fn;
    }

    /*
     * Update form when DOM element is blurred (view => model)
     */
    registerOnTouched(fn: any): void {
        // Store the provided function as an internal method.
        this.propagateBlur = fn;
    }

    onChange(event: Event) {
        this.value = (event.target as any).value;
        this.propagateChange(this.value);
    }

    onBlur() {
        this.propagateBlur();
    }

    private propagateChange = (_: any) => { };

    private propagateBlur = () => { };
}