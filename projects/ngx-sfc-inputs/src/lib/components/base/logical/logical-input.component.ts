import { Directive } from '@angular/core';
import { BaseInputComponent } from '../base-input.component';

@Directive()
export abstract class BaseLogicalInputComponent extends BaseInputComponent<boolean> {
    get labelValue(): string {
        return this.label || this.placeholder;
    }
}