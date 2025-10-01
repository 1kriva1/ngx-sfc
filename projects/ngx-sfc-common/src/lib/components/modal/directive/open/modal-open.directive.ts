import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { filter, Subscription } from 'rxjs';
import { IModalEvent } from '../../service/modal.event';
import { ModalService } from '../../service/modal.service';

@Directive({
  selector: '[sfcModalOpen]'
})
export class ModalOpenDirective implements OnDestroy {

  /* Inputs */

  @Input('sfcModalOpen')
  public id!: string;

  /* End Inputs */

  /* Subscriptions */

  private _openSubscription: Subscription;

  /* End Subscriptions */

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private modalService: ModalService) {

    this._openSubscription = this.modalService.modal$
      .pipe(filter((event: IModalEvent) => event.id === this.id))
      .subscribe((event: IModalEvent) => {
        this.viewContainer.clear();

        if (event.open)
          this.viewContainer.createEmbeddedView(this.templateRef);
      });
  }

  ngOnDestroy(): void {
    this._openSubscription.unsubscribe();
  }
}