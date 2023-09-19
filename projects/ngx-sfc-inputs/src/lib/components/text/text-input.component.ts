import { Component, Input, OnInit } from '@angular/core';
import { faEye, faEyeSlash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { BaseTextInputComponent } from '../base/text/base-text-input.component';
import { TextType } from './text-type.enum';

@Component({
  selector: 'sfc-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['../../styles/input.component.scss', './text-input.component.scss',
    './text-input-bordered.component.scss']
})
export class TextInputComponent extends BaseTextInputComponent<string> implements OnInit {

  @Input()
  type: string = TextType.Text;

  _isPassword = false;

  ngOnInit(): void {
    this._isPassword = this.isPassword;
  }

  get isPassword(): boolean {
    return this.type === TextType.Password;
  }

  get passwordIcon(): IconDefinition {
    return this.isPassword ? faEye : faEyeSlash;
  }

  togglePasswordVisibility() {
    this.type = this.type == TextType.Password ? TextType.Text : TextType.Password;
  }
}
