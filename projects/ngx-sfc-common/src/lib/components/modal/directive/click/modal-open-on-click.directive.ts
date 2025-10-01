import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { filter, Subscription } from 'rxjs';
import { ModalService } from '../../service/modal.service';
import { isDefined } from '../../../../utils/index';
import { IModalEvent } from '../../service/modal.event';
import { IModalOpenOnClickModel } from './modal-open-on-click.model';

@Directive({
  selector: '[sfcModalOpenOnClick]'
})
export class ModalOpenOnClickDirective implements OnInit, OnDestroy {

  /* Inputs */

  @Input('sfcModalOpenOnClick')
  set modalOpenOnClick(model: IModalOpenOnClickModel) {
    if (!isDefined(model.elements) || !isDefined(model.id))
      return;

    this._id = model.id;

    if (model.elements instanceof HTMLElement)
      this.elements = [model.elements];
    else
      this.elements = model.elements;

    this.elements.forEach(el => el.addEventListener('click', this.clickHandler));
  }

  /* End Inputs */

  /* Properties */

  private _id!: string;
  public get id(): string { return this._id; }

  private elements: HTMLElement[] = [];

  private clickHandler = ((): void => {
    this.viewContainer.clear();
    this.viewContainer.createEmbeddedView(this.templateRef);
    this.modalService.toggle(this.id);
  }).bind(this);

  /* End Properties */

  /* Subscriptions */

  private _closeSubscription?: Subscription;

  /* End Subscriptions */

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private modalService: ModalService) {
  }

  ngOnInit(): void {
    this._closeSubscription = this.modalService.modal$
      .pipe(filter((event: IModalEvent) => !event.open && this.id === event.id))
      .subscribe(() => this.viewContainer.clear());
  }

  ngOnDestroy(): void {
    this._closeSubscription?.unsubscribe();
    this.elements.forEach(el => el.removeEventListener('click', this.clickHandler));
  }
}
