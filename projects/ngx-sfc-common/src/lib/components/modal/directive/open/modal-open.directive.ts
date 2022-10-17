import { Directive, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from '../../service/modal.service';

@Directive({
  selector: '[sfcModalOpen]'
})
export class ModalOpenDirective implements OnDestroy {

  private _closeSubscription: Subscription;
  private _openSubscription: Subscription;

  constructor(private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private modalService: ModalService) {
    this._closeSubscription = this.modalService.close$.subscribe(() => this.viewContainer.clear());

    this._openSubscription = this.modalService.open$
      .subscribe(() => {
        this.viewContainer.clear();
        this.viewContainer.createEmbeddedView(this.templateRef);
      });
  }

  ngOnDestroy(): void {
    this._closeSubscription.unsubscribe();
    this._openSubscription.unsubscribe();
  }
}
