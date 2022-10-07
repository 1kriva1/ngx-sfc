import { Directive, ElementRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';

@Directive({
  selector: '[sfcDomChanges]'
})
export class DomChangesDirective implements OnDestroy {

  @Output()
  public sfcDomChanges = new EventEmitter<MutationRecord>();

  @Input()
  options: MutationObserverInit = {
    attributes: true,
    childList: true,
    characterData: true
  };

  private changes: MutationObserver;

  constructor(private elementRef: ElementRef) {
    const element = this.elementRef.nativeElement;

    this.changes = new MutationObserver((mutations: MutationRecord[]) =>
      mutations.forEach((mutation: MutationRecord) =>
        this.sfcDomChanges.emit(mutation)));

    this.changes.observe(element, this.options);
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }
}
