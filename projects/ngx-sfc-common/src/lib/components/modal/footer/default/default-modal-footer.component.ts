import { Component, Input, OnInit } from '@angular/core';
import { IDefaultModalFooterModel } from './default-modal-footer.model';
import { isDefined, isNullOrEmptyString } from '../../../../utils';
import { ButtonType } from '../../../button/button-type.enum';
import { ComponentSize } from '../../../../enums';
import { ModalService } from '../../service/modal.service';
import { DefaultModalFooterConstants } from './default-modal-footer.constants';

@Component({
  selector: 'sfc-default-modal-footer',
  templateUrl: './default-modal-footer.component.html',
  styleUrls: ['./default-modal-footer.component.scss']
})
export class DefaultModalFooterComponent implements OnInit {

  ComponentSize = ComponentSize;
  ButtonType = ButtonType;

  // component
  Constants = DefaultModalFooterConstants;

  /* Inputs */

  @Input()
  id!: string;

  @Input()
  model!: IDefaultModalFooterModel;

  /* End Inputs */

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
    if (!this.model) {
      this.model = Object.assign({}, DefaultModalFooterConstants.DEFAULT_MODAL_FOOTER_MODEL);
    } else {
      if (isNullOrEmptyString(this.model.applyButtonText))
        this.model.applyButtonText = DefaultModalFooterConstants.DEFAULT_MODAL_FOOTER_MODEL.applyButtonText;

      if (isNullOrEmptyString(this.model.cancelButtonText))
        this.model.cancelButtonText = DefaultModalFooterConstants.DEFAULT_MODAL_FOOTER_MODEL.cancelButtonText;

      if (!isDefined(this.model.applyButton))
        this.model.applyButton = DefaultModalFooterConstants.DEFAULT_MODAL_FOOTER_MODEL.applyButton;

      if (!isDefined(this.model.cancelButton))
        this.model.cancelButton = DefaultModalFooterConstants.DEFAULT_MODAL_FOOTER_MODEL.cancelButton;
    }
  }

  onButtonClick(isCancelButton: boolean = false): void {
    if (isCancelButton) {
      if (this.model.onCancel) {
        return this.model?.onCancel(this.modalService.args);
      }
    } else {
      if (this.model.onApply) {
        return this.model.onApply(this.modalService.args);
      }
    }

    this.modalService.toggle(this.id);
  }
}