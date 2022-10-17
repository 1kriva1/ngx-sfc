import { Component, Input, OnInit } from '@angular/core';
import { IDefaultModalFooterModel } from './default-modal-footer.model';
import { isDefined } from '../../../../utils';
import { ButtonType } from '../../../button/button-type.enum';
import { ComponentSize } from '../../../../enums';
import { ModalService } from '../../service/modal.service';

@Component({
  selector: 'sfc-default-modal-footer',
  templateUrl: './default-modal-footer.component.html',
  styleUrls: ['./default-modal-footer.component.scss']
})
export class DefaultModalFooterComponent implements OnInit {

  private readonly DEFAULT_MODAL_FOOTER_MODEL: IDefaultModalFooterModel = {
    cancelButton: true,
    applyButton: true
  }

  readonly BUTTON_CUSTOM_SIZE = 0.9;

  ComponentSize = ComponentSize;
  ButtonType = ButtonType;

  @Input()
  model?: IDefaultModalFooterModel;

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
    if (!isDefined(this.model)) {
      this.model = this.DEFAULT_MODAL_FOOTER_MODEL;
    }
  }

  onButtonClick(isCancelButton: boolean = false): void {
    if (isCancelButton) {
      if (this.model?.onCancel) {
        return this.model?.onCancel();
      }
    } else {
      if (this.model?.onApply) {
        return this.model?.onApply();
      }
    }

    this.modalService.close();
  }
}
