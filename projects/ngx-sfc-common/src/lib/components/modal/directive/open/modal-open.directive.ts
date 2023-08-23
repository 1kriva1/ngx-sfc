import { Directive, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { IModalEvent } from '../../service/modal.event';
import { ModalService } from '../../service/modal.service';

@Directive({
  selector: '[sfcModalOpen]'
})
export class ModalOpenDirective implements OnDestroy {

  private _openSubscription: Subscription;

  constructor(private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private modalService: ModalService) {

    this._openSubscription = this.modalService.modal$
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
