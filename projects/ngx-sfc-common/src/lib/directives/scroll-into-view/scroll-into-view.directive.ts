import { Directive, Input } from '@angular/core';
import { isChromeBrowser, isDefined } from '../../utils';

@Directive({
  selector: '[sfcScrollIntoView]'
})
export class ScrollIntoViewDirective {

  @Input()
  set sfcScrollIntoView(value: HTMLElement) {
    if (!isDefined(value))
      return;

    if (isChromeBrowser())
      (value as any).scrollIntoViewIfNeeded();
    else
      value.scrollIntoView(this.options);
  }

  @Input()
  options: ScrollIntoViewOptions = { behavior: 'smooth', block: 'center', inline: 'start' };
}