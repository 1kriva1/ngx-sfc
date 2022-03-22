import { Component, Input, OnInit } from '@angular/core';
import { IDefaultModalHeaderModel } from './default-modal-header.model';
import { isDefined } from '../../../../utils';
import { ModalService } from '../../service/modal.service';

@Component({
  selector: 'sfc-default-modal-header',
  templateUrl: './default-modal-header.component.html',
  styleUrls: ['./default-modal-header.component.scss']
})
export class DefaultModalHeaderComponent implements OnInit {

  private readonly DEFAULT_MODAL_HEADER_MODEL: IDefaultModalHeaderModel = {
    icon: 'fa fa-window-restore',
    showCloseIcon: true,
    text: 'Modal'
  }

  @Input()
  model?: IDefaultModalHeaderModel;

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
    if (!isDefined(this.model))
      this.model = this.DEFAULT_MODAL_HEADER_MODEL;
  }

  onClose() {
    this.modalService.close();
  }
}
