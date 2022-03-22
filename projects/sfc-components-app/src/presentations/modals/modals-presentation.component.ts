import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasePresentationComponent } from '../base-presentations.component';
import { ModalService, ModalTemplate } from 'ngx-sfc-common';

@Component({
  templateUrl: './modals-presentation.component.html',
  styleUrls: ['../../shared/styles/shared.component.scss']
})
export class ModalsPresentationComponent extends BasePresentationComponent {

  ModalTemplate = ModalTemplate;

  readonly clickFunc = (() => {
    if (confirm('Close?')) {
      this.modalService.close();
    }
  }).bind(this);

  readonly HEADER_MODEL: any = {
    Title: 'Header template title',
    Icon: 'fa fa-star',
    Click: this.clickFunc
  }

  readonly BODY_TEMPLATE_MODEL: any = {
    Title: 'Body title',
    Icon: 'fa fa-star',
    Click: this.clickFunc
  }

  readonly FOOTER_MODEL: any = {
    Title: 'Footer title',
    Icon: 'fa fa-star',
    Click: this.clickFunc
  }

  readonly BODY_REFERENCE_MODEL: any = {
    Items: [
      {
        Title: 'Body reference title 1',
        Icon: 'fa fa-star',
        Click: this.clickFunc
      },
      {
        Title: 'Body reference title 2',
        Icon: 'fa fa-star',
        Click: this.clickFunc
      },
      {
        Title: 'Body reference title 3',
        Icon: 'fa fa-star',
        Click: this.clickFunc
      },
      {
        Title: 'Body reference title 4',
        Icon: 'fa fa-star',
        Click: this.clickFunc
      },
      {
        Title: 'Body reference title 5',
        Icon: 'fa fa-star',
        Click: this.clickFunc
      },
      {
        Title: 'Body reference title 6',
        Icon: 'fa fa-star',
        Click: this.clickFunc
      }]
  }

  constructor(
    protected override router: Router,
    protected override activatedRoute: ActivatedRoute,
    private modalService: ModalService
  ) { super(router, activatedRoute) }
}
