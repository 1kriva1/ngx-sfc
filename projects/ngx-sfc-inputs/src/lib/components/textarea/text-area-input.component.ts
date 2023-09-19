import { AfterViewChecked, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonConstants, getCssLikeValue } from 'ngx-sfc-common';
import { BaseTextInputComponent } from '../base/text/base-text-input.component';

@Component({
  selector: 'sfc-text-area-input',
  templateUrl: './text-area-input.component.html',
  styleUrls: ['../../styles/input.component.scss', './text-area-input.component.scss',
    './text-area-input-bordered.component.scss']
})
export class TextAreaInputComponent
  extends BaseTextInputComponent<string>
  implements AfterViewChecked {

  @ViewChild("textAreaRef", { static: false })
  protected textAreaElementRef!: ElementRef;

  ngAfterViewChecked(): void {
    this.alignHeight();
  }

  override get charsCounterValue(): string {
    //Think about this:  this.value.replace(/\r?\n/g, "");
    return super.charsCounterValue
      ? super.charsCounterValue
      : this.value?.length
        ? this.value.length.toString() : CommonConstants.EMPTY_STRING;
  }

  // for stretching text area input on large texts (new lines)
  public alignHeight(): void {
    this.textAreaElementRef.nativeElement.style.height = getCssLikeValue(0);
    this.textAreaElementRef.nativeElement.style.height = getCssLikeValue(this.textAreaElementRef.nativeElement.scrollHeight);
  }
}
