import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonConstants, getCssLikeValue } from 'ngx-sfc-common';
import { InputConstants } from '../../constants/input.constants';
import { BaseTextInputComponent } from '../base/text/base-text-input.component';

@Component({
  selector: 'sfc-text-area-input',
  templateUrl: './text-area-input.component.html',
  styleUrls: ['../../styles/input.component.scss', './text-area-input.component.scss']
})
export class TextAreaInputComponent extends BaseTextInputComponent implements AfterViewInit {

  @ViewChild("textAreaRef", { static: false })
  protected textAreaElementRef!: ElementRef;

  override ngAfterViewInit(): void {
    this.alignTextAreHeight();
    super.ngAfterViewInit();
  }

  get charCounterValue(): string {
    //Think about this:  this.value.replace(/\r?\n/g, "");
    return super.charsCounterValue 
      ? super.charsCounterValue 
      : this.value?.length 
        ? this.value.length.toString() : CommonConstants.EMPTY_STRING;
  }

  onKeyUp(event: KeyboardEvent) {
    if (event.key === InputConstants.ENTER_KEY || event.key === InputConstants.BACKSPACE_KEY)
      this.alignTextAreHeight();
  }

  private alignTextAreHeight() {
    this.textAreaElementRef.nativeElement.style.height = getCssLikeValue(0);
    this.textAreaElementRef.nativeElement.style.height = getCssLikeValue(this.textAreaElementRef.nativeElement.scrollHeight);
  }
}
