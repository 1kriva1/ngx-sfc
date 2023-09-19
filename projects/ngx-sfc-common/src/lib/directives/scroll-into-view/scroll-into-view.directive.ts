import { Directive, Input } from '@angular/core';
import { isChromeBrowser, isDefined } from '../../utils';

@Directive({
  selector: '[sfcScrollIntoView]'
})
export class ScrollIntoViewDirective {

  @Input()
  set sfcScrollIntoView(target: HTMLElement) {
    if (!isDefined(target))
      return;

    if (this.local)
      target.scrollTop = target.offsetHeight / 2;
    else {
      if (isChromeBrowser())
        (target as any).scrollIntoViewIfNeeded();
      else
        target.scrollIntoView(this.options);
    }
  }

  /**
   * Scroll into middle of local container(not whole page)
   */
  @Input()
  local: boolean = false;

  @Input()
  options: ScrollIntoViewOptions = { behavior: 'smooth', block: 'center', inline: 'start' };
}