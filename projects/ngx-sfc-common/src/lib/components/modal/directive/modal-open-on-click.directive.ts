import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { isDefined } from '../../../utils';
import { ModalService } from '../service/modal.service';

@Directive({
  selector: '[sfcModalOpenOnClick]'
})
export class ModalOpenOnClickDirective implements OnInit, OnDestroy {

  @Input('sfcModalOpenOnClick')
  set modalOpenOnClick(elements: HTMLElement | HTMLElement[]) {
    if (!isDefined(elements))
      return;

    if (elements instanceof HTMLElement)
      this.elements = [elements];
    else
      this.elements = elements;

    this.elements.forEach(el => {
      el.addEventListener('click', this.clickHandler);
    });
  }

  private clickHandler = ((event: MouseEvent): void => {
    this.viewContainer.clear();
    this.viewContainer.createEmbeddedView(this.templateRef);
    this.modalService.open(event.currentTarget);
  }).bind(this);

  private elements: HTMLElement[] = [];

  private _closeSubscription?: Subscription;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private modalService: ModalService) {
  }

  ngOnInit(): void {
    this._closeSubscription = this.modalService.close$
      .subscribe(() => {
        this.viewContainer.clear();
      });
  }

  ngOnDestroy(): void {
    this._closeSubscription?.unsubscribe();
    this.elements.forEach(el => el.removeEventListener('click', this.clickHandler));
  }
}
