import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { faPencil, faUser } from '@fortawesome/free-solid-svg-icons';
import { BasePresentationComponent } from '../base-presentations.component';

@Component({
  templateUrl: './text-presentation.component.html',
  styleUrls: ['../../shared/styles/shared.component.scss']
})
export class TextPresentationComponent extends BasePresentationComponent
  implements OnInit {

  faUser = faUser;
  faPencil = faPencil;

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group(
      {
        fullEmpty: [null],
        onlyPlaceholder: [null],
        lastName: [{
          value: '',
          disabled: false
        }, []],
        firstName: [''],
        disabledInput: [
          {
            value: 'I am disabled value1',
            disabled: true
          }
        ],
        password: [{
          value: '',
          disabled: false
        }, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/)]],
        helper: [''],
        defined: ['defined value'],
        icon: [''],
        definedValidation: ["defined val", {
          validators: [Validators.required, Validators.minLength(2), Validators.maxLength(5)]
        }],
        undefinedValidation: ["s", {
          validators: [Validators.required, Validators.minLength(2)]
        }],
        small: [null],
        large: ['Large text input'],
        customSize: [null]
      }
    );
  }
}
