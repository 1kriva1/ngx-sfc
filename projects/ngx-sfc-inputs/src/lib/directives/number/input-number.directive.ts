import { Directive, Input, ElementRef, HostListener } from "@angular/core";
import { CommonConstants } from "ngx-sfc-common";

@Directive({ selector: '[sfcNumberInput]' })
export class InputNumberDirective {

    @Input()
    decimals: boolean = false;

    @Input()
    sign: boolean = true;

    @Input()
    decimalSeparator: string = '.';

    private previousValue: string = '';

    private integerUnsigned: string = '^(?!0.)\\d+$';

    private integerSigned: string = '^-?(?!0.)\\d+$';

    private decimalUnsigned: string = '^[0-9]+(.[0-9]+)?$';

    private decimalSigned: string = '^-?[0-9]+(.[0-9]+)?$';

    private signOnlyNotAtStart: RegExp = /(?!^)-/g;

    private leadingZero: RegExp = /^0+/;

    private allowedKeys: string[] = [
        'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Escape', 'Tab'
    ];

    constructor(private element: ElementRef) { }

    @HostListener('input', ['$event'])
    onInput(event: Event): void {
        const newValue: string = (event.target as any).value,
            numberValue = newValue === '-' ? '0' : newValue.replace(this.signOnlyNotAtStart, '');

        if (!this.validateValue(numberValue))
            event.preventDefault();
    }

    @HostListener('paste', ['$event'])
    onPaste(event: ClipboardEvent): void {
        const value = event.clipboardData?.getData('text/plain');

        if (value) {
            this.validateValue(value);
            event.preventDefault();
        }
    }

    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent): void {
        const cursorPosition: number = (event.target as any)['selectionStart'],
            originalValue: string = (event.target as any)['value'],
            key: string = event.key,
            controlOrCommand = (event.ctrlKey === true || event.metaKey === true),
            signExists = originalValue.includes('-'),
            separatorExists = originalValue.includes(this.decimalSeparator),
            separatorIsCloseToSign = (signExists && cursorPosition <= 1),
            firstCharacterIsSeparator = (originalValue.charAt(0) != this.decimalSeparator);

        // when decimals are allowed, add
        // decimal separator to allowed codes when
        // its position is not close to the the sign (-. and .-)
        if (this.decimals && !separatorIsCloseToSign && !separatorExists) {
            if (this.decimalSeparator == '.')
                this.allowedKeys.push('.');
            else
                this.allowedKeys.push(',');
        }

        // when minus sign is allowed, add its
        // key to allowed key only when the
        // cursor is in the first position, and
        // first character is different from
        // decimal separator
        if (this.sign && !signExists &&
            firstCharacterIsSeparator && cursorPosition == 0) {
            this.allowedKeys.push('-');
        }

        // allow some non-numeric characters
        if (this.allowedKeys.indexOf(key) != -1 ||
            // Allow: Ctrl+A and Command+A
            (key == 'a' && controlOrCommand) ||
            // Allow: Ctrl+C and Command+C
            (key == 'c' && controlOrCommand) ||
            // Allow: Ctrl+V and Command+V
            (key == 'v' && controlOrCommand) ||
            // Allow: Ctrl+X and Command+X
            (key == 'x' && controlOrCommand)) {
            // let it happen, don't do anything
            return;
        }

        // save value before keydown event
        this.previousValue = originalValue;

        // allow number characters only
        const isNumber = (new RegExp(this.integerUnsigned)).test(key);

        if (isNumber) return; else event.preventDefault();
    }

    private validateValue(value: string): boolean {
        // allow 0 at start
        value = value.replace(this.leadingZero, '');

        // choose the appropiate regular expression
        let regex: string = CommonConstants.EMPTY_STRING;

        if (!this.decimals && !this.sign) regex = this.integerUnsigned;
        if (!this.decimals && this.sign) regex = this.integerSigned;
        if (this.decimals && !this.sign) regex = this.decimalUnsigned;
        if (this.decimals && this.sign) regex = this.decimalSigned;

        // when a numbers begins with a decimal separator,
        // fix it adding a zero in the beginning
        const firstCharacter = value.charAt(0);
        if (firstCharacter == this.decimalSeparator)
            value = 0 + value;

        // when a numbers ends with a decimal separator,
        // fix it adding a zero in the end
        const lastCharacter = value.charAt(value.length - 1);
        if (lastCharacter == this.decimalSeparator)
            value = value + 0;

        // test number with regular expression, when
        // number is invalid, replace it with a previous value

        const valid: boolean = (new RegExp(regex)).test(value);

        this.element.nativeElement['value'] = valid ? value : this.previousValue;

        return valid;
    }
}