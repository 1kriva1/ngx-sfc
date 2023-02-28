import { Directive, Input } from '@angular/core';
import { BaseInputComponent } from '../base-input.component';

@Directive()
export abstract class BaseLogicalInputComponent extends BaseInputComponent<boolean> {

    @Input()
    sideLabel!: string;

    get labelValue(): string {
        return this.label || this.sideLabel || this.placeholder;
    }
}